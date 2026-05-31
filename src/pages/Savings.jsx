import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { formatCurrency } from '../utils/formatCurrency'
import { useToast } from '../components/Toast'
import CurrencyInput from '../components/CurrencyInput'

export default function Savings() {
  const { user } = useAuth()
  const toast = useToast()
  const [savings, setSavings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [updateModal, setUpdateModal] = useState(null)
  const [addAmount, setAddAmount] = useState('')
  const [setAmount, setSetAmount] = useState('')

  useEffect(() => { fetchSavings() }, [])

  const fetchSavings = async () => {
    setLoading(true)
    const { data } = await supabase.from('savings').select('*').eq('user_id', user.id).order('created_at')
    setSavings(data || [])
    setLoading(false)
  }

  const handleSave = async (form) => {
    try {
      const payload = {
        name: form.name,
        target_amount: parseFloat(form.monthly_amount) || 0,
      }
      if (editData?.id) {
        await supabase.from('savings').update(payload).eq('id', editData.id)
        toast('Tabungan diperbarui', 'success')
      } else {
        await supabase.from('savings').insert({ ...payload, user_id: user.id, current_amount: 0 })
        toast('Tabungan dibuat', 'success')
      }
      setShowForm(false)
      fetchSavings()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  const handleAdd = async () => {
    if (!addAmount) return
    const add = parseFloat(addAmount)
    if (!add || add <= 0) return
    const current = Number(updateModal.current_amount)
    await supabase.from('savings').update({ current_amount: current + add }).eq('id', updateModal.id)
    toast(`+${formatCurrency(add)} ditambahkan`, 'success')
    setUpdateModal(null); setAddAmount('')
    fetchSavings()
  }

  const handleSet = async () => {
    if (!setAmount) return
    await supabase.from('savings').update({ current_amount: parseFloat(setAmount) }).eq('id', updateModal.id)
    toast('Saldo diperbarui', 'success')
    setUpdateModal(null); setSetAmount('')
    fetchSavings()
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus tabungan ini?')) return
    await supabase.from('savings').delete().eq('id', id)
    toast('Tabungan dihapus', 'success')
    fetchSavings()
  }

  const totalTerkumpul = savings.reduce((s, sv) => s + Number(sv.current_amount), 0)
  const totalPerBulan = savings.reduce((s, sv) => s + Number(sv.target_amount), 0)

  return (
    <div className="animate-in">
      <div className="flex-between mb-16">
        <div>
          <h1 className="page-title">Tabungan</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>
            <span style={{ color: 'var(--success)', fontWeight: 700 }}>{formatCurrency(totalTerkumpul)}</span>
            <span style={{ color: 'var(--text-muted)' }}> terkumpul · {formatCurrency(totalPerBulan)}/bln dialokasikan</span>
          </p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => { setEditData(null); setShowForm(true) }}>
          + Tabungan Baru
        </button>
      </div>

      {loading ? (
        <div className="sv-grid">
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 130 }} />)}
        </div>
      ) : savings.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">◎</div>
            <strong>Belum ada tabungan</strong>
            <p>Buat tabungan dan tentukan berapa yang disisihkan per bulan</p>
            <button className="btn btn-primary mt-16" onClick={() => setShowForm(true)}>Buat Tabungan</button>
          </div>
        </div>
      ) : (
        <div className="sv-grid">
          {savings.map(sv => (
            <div key={sv.id} className="sv-card">
              <div className="sv-card-header">
                <span className="sv-name">{sv.name}</span>
                <div className="sv-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => { setEditData(sv); setShowForm(true) }}>✎</button>
                  <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(sv.id)}>✕</button>
                </div>
              </div>

              <div className="sv-body">
                <div>
                  <div className="sv-terkumpul tabular">{formatCurrency(sv.current_amount)}</div>
                  <div className="sv-label">Total terkumpul</div>
                </div>
                <div className="sv-per-bulan">
                  <div className="sv-pb-val tabular">{formatCurrency(sv.target_amount)}</div>
                  <div className="sv-label">/bulan</div>
                </div>
              </div>

              <button className="sv-update-btn"
                onClick={() => { setUpdateModal(sv); setAddAmount(''); setSetAmount(String(sv.current_amount)) }}>
                + Tambah Saldo
              </button>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <SavingsForm
          editData={editData}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

      {updateModal && (
        <div className="modal-overlay" onClick={() => setUpdateModal(null)}>
          <div className="modal" style={{ maxWidth: 360 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{updateModal.name}</h2>
              <button className="btn btn-ghost" onClick={() => setUpdateModal(null)}>✕</button>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              Terkumpul: <strong style={{ color: 'var(--text-primary)' }}>{formatCurrency(updateModal.current_amount)}</strong>
            </p>
            <div className="form-group">
              <label className="form-label">Tambah nominal</label>
              <div className="flex gap-8">
                <CurrencyInput value={addAmount} onChange={setAddAmount} autoFocus style={{ flex: 1 }} />
                <button className="btn btn-primary" onClick={handleAdd} disabled={!addAmount}>+</button>
              </div>
            </div>
            <div className="sv-divider">atau set total</div>
            <div className="form-group">
              <label className="form-label">Total saldo saat ini</label>
              <div className="flex gap-8">
                <CurrencyInput value={setAmount} onChange={setSetAmount} style={{ flex: 1 }} />
                <button className="btn btn-secondary" onClick={handleSet} disabled={!setAmount}>Set</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .sv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }

        .sv-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 18px 20px;
          display: flex; flex-direction: column; gap: 14px;
        }
        .sv-card-header { display: flex; justify-content: space-between; align-items: center; }
        .sv-name { font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; }
        .sv-actions { display: flex; gap: 2px; }

        .sv-body { display: flex; justify-content: space-between; align-items: flex-end; }
        .sv-terkumpul { font-size: 1.4rem; font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary); }
        .sv-label { font-size: 0.65rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px; }
        .sv-per-bulan { text-align: right; }
        .sv-pb-val { font-size: 1rem; font-weight: 700; color: var(--accent); letter-spacing: -0.02em; }

        .sv-update-btn {
          width: 100%; padding: 9px; border: 1px solid var(--border);
          border-radius: var(--radius-sm); background: var(--bg-input);
          font-family: var(--font-sans); font-size: 0.8rem; font-weight: 600;
          color: var(--text-secondary); cursor: pointer; transition: all 0.15s;
        }
        .sv-update-btn:hover { background: var(--accent-dim); border-color: var(--accent); color: var(--accent); }

        .sv-divider {
          text-align: center; font-size: 0.72rem; color: var(--text-muted);
          font-weight: 500; padding: 8px 0 14px; position: relative;
        }
        .sv-divider::before, .sv-divider::after {
          content: ''; position: absolute; top: 50%; width: 38%; height: 1px; background: var(--border);
        }
        .sv-divider::before { left: 0; }
        .sv-divider::after { right: 0; }

        @media (max-width: 640px) {
          .sv-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

function SavingsForm({ editData, onSave, onClose }) {
  const [form, setForm] = useState({
    name: editData?.name || '',
    monthly_amount: editData?.target_amount ? String(editData.target_amount) : '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name) return
    setLoading(true)
    await onSave(form)
    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{editData?.id ? 'Edit Tabungan' : 'Tabungan Baru'}</h2>
          <button className="btn btn-ghost" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nama Tabungan</label>
            <input
              className="form-input" type="text"
              placeholder="Dana Darurat, Liburan, Motor..."
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Sisihkan per Bulan</label>
            <CurrencyInput
              value={form.monthly_amount}
              onChange={raw => setForm(f => ({ ...f, monthly_amount: raw }))}
            />
          </div>
          <div className="flex gap-8 mt-16">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
              {loading ? 'Menyimpan...' : editData?.id ? 'Perbarui' : 'Buat'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
