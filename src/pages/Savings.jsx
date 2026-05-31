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
  const [updateAmount, setUpdateAmount] = useState('')
  const [addAmount, setAddAmount] = useState('')

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
        toast('Target tabungan dibuat', 'success')
      }
      setShowForm(false)
      fetchSavings()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  const handleSetAmount = async () => {
    if (!updateAmount) return
    const newAmount = Math.max(0, parseFloat(updateAmount))
    await supabase.from('savings').update({ current_amount: newAmount }).eq('id', updateModal.id)
    toast('Saldo diperbarui', 'success')
    setUpdateModal(null)
    setUpdateAmount('')
    fetchSavings()
  }

  const handleAddAmount = async () => {
    if (!addAmount) return
    const add = parseFloat(addAmount)
    if (isNaN(add) || add <= 0) return
    const current = Number(updateModal.current_amount)
    await supabase.from('savings').update({ current_amount: current + add }).eq('id', updateModal.id)
    toast(`+${formatCurrency(add)} ditambahkan`, 'success')
    setUpdateModal(null)
    setAddAmount('')
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
  const done = savings.filter(s => Number(s.current_amount) >= Number(s.target_amount)).length

  return (
    <div className="animate-in">
      <div className="flex-between mb-16">
        <div>
          <h1 className="page-title">Tabungan</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>
            {savings.length} target · {done > 0 && `${done} tercapai · `}
            <span style={{ color: 'var(--success)', fontWeight: 700 }}>{formatCurrency(totalSaved)}</span>
            {totalTarget > 0 && <span style={{ color: 'var(--text-muted)' }}> / {formatCurrency(totalTarget)}</span>}
          </p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => { setEditData(null); setShowForm(true) }}>
          + Target Baru
        </button>
      </div>

      {/* Overall progress */}
      {totalTarget > 0 && (
        <div className="card mb-20">
          <div className="flex-between mb-10">
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Total progress tabungan
            </span>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--success)' }}>
              {((totalSaved / totalTarget) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="progress-bar" style={{ height: 7 }}>
            <div className="progress-fill" style={{
              width: `${Math.min((totalSaved / totalTarget) * 100, 100)}%`,
              background: 'linear-gradient(90deg, var(--accent), var(--success))',
            }} />
          </div>
        </div>
      )}

      {loading ? (
        <div className="sv-grid">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 180 }} />)}
        </div>
      ) : savings.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">◎</div>
            <strong>Belum ada target tabungan</strong>
            <p>Mulai atur target untuk mencapai tujuan finansialmu</p>
            <button className="btn btn-primary mt-16" onClick={() => setShowForm(true)}>Buat Target Pertama</button>
          </div>
        </div>
      ) : (
        <div className="sv-grid">
          {savings.map(sv => {
            const pct = sv.target_amount > 0 ? Math.min((sv.current_amount / sv.target_amount) * 100, 100) : 0
            const isDone = pct >= 100
            const remaining = Math.max(0, sv.target_amount - sv.current_amount)
            const daysLeft = sv.deadline ? Math.ceil((new Date(sv.deadline) - new Date()) / 86400000) : null
            const isOverdue = daysLeft !== null && daysLeft < 0 && !isDone
            const isUrgent = daysLeft !== null && daysLeft >= 0 && daysLeft < 30 && !isDone
            const urgencyColor = isDone ? 'var(--success)' : isOverdue ? 'var(--danger)' : isUrgent ? 'var(--warning)' : 'var(--accent)'

            return (
              <div key={sv.id} className={`sv-card ${isDone ? 'sv-done' : ''}`} style={{ '--sv-color': urgencyColor }}>
                <div className="sv-header">
                  <div className="sv-title-wrap">
                    <h3 className="sv-name">{sv.name}</h3>
                    {sv.deadline && (
                      <span className={`sv-deadline ${isOverdue ? 'overdue' : isUrgent ? 'urgent' : ''}`}>
                        {isDone ? '✓ Tercapai' : isOverdue ? 'Deadline lewat' : daysLeft === 0 ? 'Hari ini!' : `${daysLeft} hari lagi`}
                      </span>
                    )}
                  </div>
                  <div className="sv-actions">
                    {isDone && <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>✓ Done</span>}
                    <button className="btn btn-ghost btn-sm" onClick={() => { setEditData(sv); setShowForm(true) }}>✎</button>
                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(sv.id)}>✕</button>
                  </div>
                </div>

                <div className="sv-amounts">
                  <div>
                    <div className="sv-current tabular">{formatCurrency(sv.current_amount)}</div>
                    <div className="sv-target-label">dari {formatCurrency(sv.target_amount)}</div>
                  </div>
                  <div className="sv-pct-circle">
                    <span className="sv-pct-num" style={{ color: urgencyColor }}>{pct.toFixed(0)}<span style={{ fontSize: '0.6em' }}>%</span></span>
                  </div>
                </div>

                <div className="sv-bar-wrap">
                  <div className="progress-bar" style={{ height: 8 }}>
                    <div className="progress-fill" style={{
                      width: `${pct}%`,
                      background: isDone ? 'var(--success)' : isOverdue ? 'var(--danger)' : isUrgent ? 'var(--warning)' : 'linear-gradient(90deg, var(--accent), var(--info))',
                    }} />
                  </div>
                  {!isDone && remaining > 0 && (
                    <span className="sv-remaining">Sisa {formatCurrency(remaining)}</span>
                  )}
                </div>

                <button
                  className="sv-update-btn"
                  onClick={() => { setUpdateModal(sv); setUpdateAmount(String(sv.current_amount)); setAddAmount('') }}
                >
                  Update Saldo
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <SavingsFormModal editData={editData} onSave={handleSave} onClose={() => setShowForm(false)} />
      )}

      {/* Update modal */}
      {updateModal && (
        <div className="modal-overlay" onClick={() => setUpdateModal(null)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{updateModal.name}</h2>
              <button className="btn btn-ghost" onClick={() => setUpdateModal(null)}>✕</button>
            </div>

            <div className="update-tabs">
              <div className="update-section">
                <label className="form-label">Tambah nominal</label>
                <div className="flex gap-8">
                  <CurrencyInput
                    value={addAmount}
                    onChange={raw => setAddAmount(raw)}
                    autoFocus
                    style={{ flex: 1 }}
                  />
                  <button className="btn btn-primary" onClick={handleAddAmount} disabled={!addAmount}>
                    +
                  </button>
                </div>
              </div>
              <div className="update-divider">atau</div>
              <div className="update-section">
                <label className="form-label">Set total saldo</label>
                <div className="flex gap-8">
                  <CurrencyInput
                    value={updateAmount}
                    onChange={raw => setUpdateAmount(raw)}
                    style={{ flex: 1 }}
                  />
                  <button className="btn btn-secondary" onClick={handleSetAmount} disabled={!updateAmount}>
                    Set
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .sv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 14px;
        }
        .sv-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: border-color 0.2s;
          position: relative;
          overflow: hidden;
        }
        .sv-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--sv-color);
          opacity: 0.8;
        }
        .sv-card:hover { border-color: var(--border-light); }
        .sv-card.sv-done { border-color: var(--success); }

        .sv-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
        }
        .sv-title-wrap { flex: 1; min-width: 0; }
        .sv-name {
          font-size: 0.9375rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .sv-deadline {
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-top: 3px;
          display: block;
        }
        .sv-deadline.urgent { color: var(--warning); }
        .sv-deadline.overdue { color: var(--danger); }

        .sv-actions {
          display: flex;
          align-items: center;
          gap: 2px;
          flex-shrink: 0;
        }

        .sv-amounts {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .sv-current {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          line-height: 1.1;
        }
        .sv-target-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
          margin-top: 2px;
        }
        .sv-pct-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 2px solid var(--border-light);
          background: var(--bg-input);
        }
        .sv-pct-num {
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          font-variant-numeric: tabular-nums;
        }

        .sv-bar-wrap { display: flex; flex-direction: column; gap: 5px; }
        .sv-remaining { font-size: 0.68rem; color: var(--text-muted); font-weight: 500; }

        .sv-update-btn {
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 8px;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s;
          width: 100%;
          text-align: center;
          letter-spacing: -0.01em;
        }
        .sv-update-btn:hover {
          background: var(--accent-dim);
          border-color: var(--accent);
          color: var(--accent);
        }

        .update-tabs { display: flex; flex-direction: column; gap: 0; }
        .update-section { padding: 4px 0; }
        .update-divider {
          text-align: center;
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
          padding: 10px 0;
          position: relative;
        }
        .update-divider::before, .update-divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 40%;
          height: 1px;
          background: var(--border);
        }
        .update-divider::before { left: 0; }
        .update-divider::after { right: 0; }

        @media (max-width: 768px) {
          .sv-grid { grid-template-columns: 1fr; gap: 10px; }
          .sv-card { padding: 16px; }
          .sv-current { font-size: 1.3rem; }
          .sv-update-btn { padding: 10px; font-size: 0.8rem; }
          .scc-top { flex-wrap: wrap; }
        }
        @media (max-width: 640px) {
          .sv-grid { grid-template-columns: 1fr; }
        }
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
          <h2 className="modal-title">{editData?.id ? 'Edit Target' : 'Target Tabungan Baru'}</h2>
          <button className="btn btn-ghost" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nama Target</label>
            <input
              className="form-input"
              type="text"
              placeholder="Contoh: Dana Darurat, Liburan, HP Baru..."
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Target Nominal</label>
            <CurrencyInput
              value={form.target_amount}
              onChange={raw => setForm(f => ({ ...f, target_amount: raw }))}
              required
              min="1"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Deadline <span style={{ color: 'var(--text-muted)', textTransform: 'none', letterSpacing: 0 }}>(opsional)</span></label>
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
