import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { formatCurrency } from '../utils/formatCurrency'
import { useToast } from '../components/Toast'

export default function Savings() {
  const { user } = useAuth()
  const toast = useToast()
  const [savings, setSavings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [updateModal, setUpdateModal] = useState(null)
  const [updateAmount, setUpdateAmount] = useState('')

  useEffect(() => { fetchSavings() }, [])

  const fetchSavings = async () => {
    setLoading(true)
    const { data } = await supabase.from('savings').select('*').eq('user_id', user.id).order('created_at')
    setSavings(data || [])
    setLoading(false)
  }

  const handleSave = async (form) => {
    try {
      if (editData?.id) {
        await supabase.from('savings').update({
          name: form.name,
          target_amount: parseFloat(form.target_amount),
          deadline: form.deadline || null,
        }).eq('id', editData.id)
        toast('Target diperbarui', 'success')
      } else {
        await supabase.from('savings').insert({
          user_id: user.id,
          name: form.name,
          target_amount: parseFloat(form.target_amount),
          current_amount: 0,
          deadline: form.deadline || null,
        })
        toast('Target tabungan ditambahkan', 'success')
      }
      setShowForm(false)
      fetchSavings()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  const handleUpdateAmount = async () => {
    if (!updateAmount) return
    const newAmount = Math.max(0, parseFloat(updateAmount))
    await supabase.from('savings').update({ current_amount: newAmount }).eq('id', updateModal.id)
    toast('Saldo tabungan diperbarui', 'success')
    setUpdateModal(null)
    setUpdateAmount('')
    fetchSavings()
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus target tabungan ini?')) return
    await supabase.from('savings').delete().eq('id', id)
    toast('Target dihapus', 'success')
    fetchSavings()
  }

  const totalSaved = savings.reduce((s, sv) => s + Number(sv.current_amount), 0)
  const totalTarget = savings.reduce((s, sv) => s + Number(sv.target_amount), 0)

  return (
    <div className="animate-in">
      <div className="flex-between mb-16">
        <div>
          <h1 className="page-title">Tabungan</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>
            Total tersimpan: <strong style={{ color: 'var(--success)' }}>{formatCurrency(totalSaved)}</strong>
            {totalTarget > 0 && ` dari ${formatCurrency(totalTarget)}`}
          </p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => { setEditData(null); setShowForm(true) }}>
          + Target Baru
        </button>
      </div>

      {loading ? (
        <div className="grid-2">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 180 }} />)}
        </div>
      ) : savings.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">◎</div>
            <strong>Belum ada target tabungan</strong>
            <p>Mulai atur target untuk mencapai tujuan finansial kamu</p>
            <button className="btn btn-primary mt-16" onClick={() => setShowForm(true)}>+ Buat Target</button>
          </div>
        </div>
      ) : (
        <div className="grid-2">
          {savings.map(sv => {
            const pct = sv.target_amount > 0 ? Math.min((sv.current_amount / sv.target_amount) * 100, 100) : 0
            const isDone = pct >= 100
            const remaining = Math.max(0, sv.target_amount - sv.current_amount)
            const daysLeft = sv.deadline ? Math.ceil((new Date(sv.deadline) - new Date()) / 86400000) : null

            return (
              <div key={sv.id} className={`savings-card ${isDone ? 'done' : ''}`}>
                <div className="flex-between mb-16">
                  <div>
                    <div className="savings-name">{sv.name}</div>
                    {sv.deadline && (
                      <div className={`text-xs mt-4 ${daysLeft < 30 ? 'text-warning' : 'text-muted'}`}>
                        {daysLeft > 0 ? `${daysLeft} hari lagi` : 'Deadline terlewat'}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4">
                    {isDone && <span className="badge badge-success">✓ Tercapai</span>}
                    <button className="btn btn-ghost btn-sm" onClick={() => { setEditData(sv); setShowForm(true) }}>✎</button>
                    <button className="btn btn-ghost btn-sm text-danger" onClick={() => handleDelete(sv.id)}>✕</button>
                  </div>
                </div>

                <div className="savings-amounts">
                  <div>
                    <div className="savings-current">{formatCurrency(sv.current_amount)}</div>
                    <div className="text-xs text-muted mt-4">Terkumpul</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="savings-target">{formatCurrency(sv.target_amount)}</div>
                    <div className="text-xs text-muted mt-4">Target</div>
                  </div>
                </div>

                <div className="progress-bar mt-12" style={{ height: 10 }}>
                  <div
                    className="progress-fill"
                    style={{
                      width: `${pct}%`,
                      background: isDone ? 'var(--success)' : `linear-gradient(90deg, var(--info), var(--success))`
                    }}
                  />
                </div>

                <div className="flex-between mt-8">
                  <span className="text-xs text-muted">{pct.toFixed(1)}% tercapai</span>
                  {!isDone && <span className="text-xs text-secondary">Sisa: {formatCurrency(remaining)}</span>}
                </div>

                <button
                  className="btn btn-secondary btn-sm btn-block mt-12"
                  onClick={() => { setUpdateModal(sv); setUpdateAmount(String(sv.current_amount)) }}
                >
                  Update Saldo
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <SavingsFormModal
          editData={editData}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Update Amount Modal */}
      {updateModal && (
        <div className="modal-overlay" onClick={() => setUpdateModal(null)}>
          <div className="modal" style={{ maxWidth: 360 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Update Saldo</h2>
              <button className="btn btn-ghost" onClick={() => setUpdateModal(null)}>✕</button>
            </div>
            <p className="text-sm text-secondary mb-16">{updateModal.name}</p>
            <div className="form-group">
              <label className="form-label">Saldo Saat Ini (Rp)</label>
              <input
                className="form-input"
                type="number"
                value={updateAmount}
                onChange={e => setUpdateAmount(e.target.value)}
                min="0"
                autoFocus
              />
            </div>
            <div className="flex gap-8">
              <button className="btn btn-secondary" onClick={() => setUpdateModal(null)}>Batal</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleUpdateAmount}>Simpan</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .savings-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          transition: all 0.2s;
        }
        .savings-card:hover { border-color: var(--border-light); }
        .savings-card.done { border-color: var(--success); background: var(--success-dim); }
        .savings-name { font-weight: 600; font-size: 1rem; color: var(--text-primary); }
        .savings-amounts { display: flex; justify-content: space-between; align-items: flex-end; }
        .savings-current { font-family: var(--font-serif); font-size: 1.6rem; color: var(--text-primary); }
        .savings-target { font-size: 1rem; color: var(--text-secondary); }
      `}</style>
    </div>
  )
}

function SavingsFormModal({ editData, onSave, onClose }) {
  const [form, setForm] = useState({
    name: editData?.name || '',
    target_amount: editData?.target_amount || '',
    deadline: editData?.deadline || '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.target_amount) return
    setLoading(true)
    await onSave(form)
    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{editData?.id ? 'Edit Target' : 'Buat Target Tabungan'}</h2>
          <button className="btn btn-ghost" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nama Target</label>
            <input
              className="form-input"
              type="text"
              placeholder="Misal: Dana Darurat, Liburan Bali..."
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Target Nominal (Rp)</label>
            <input
              className="form-input"
              type="number"
              placeholder="0"
              value={form.target_amount}
              onChange={e => setForm(f => ({ ...f, target_amount: e.target.value }))}
              required
              min="1"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Deadline (opsional)</label>
            <input
              className="form-input"
              type="date"
              value={form.deadline}
              onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
            />
          </div>
          <div className="flex gap-8 mt-16">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
              {loading ? 'Menyimpan...' : editData?.id ? 'Perbarui' : 'Buat Target'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
