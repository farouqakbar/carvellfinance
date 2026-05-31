import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { formatCurrency, getCurrentMonth, getMonthLabel } from '../utils/formatCurrency'
import { useToast } from '../components/Toast'
import CurrencyInput from '../components/CurrencyInput'

function getMonthOptions() {
  const opts = []
  const now = new Date()
  for (let i = 0; i < 24; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
    const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    opts.push({ val, label: d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }) })
  }
  return opts
}

const MONTH_OPTS = getMonthOptions()

export default function Plans() {
  const { user } = useAuth()
  const toast = useToast()

  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('aktif')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', amount: '', targetMonth: getCurrentMonth(), notes: '' })
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => { fetchPlans() }, [])

  const fetchPlans = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('plans')
      .select('*')
      .eq('user_id', user.id)
      .order('target_month', { ascending: true })
      .order('created_at', { ascending: true })
    setPlans(data || [])
    setLoading(false)
  }

  const addPlan = async () => {
    if (!form.name.trim() || !form.amount || !form.targetMonth) return
    setSaving(true)
    const { error } = await supabase.from('plans').insert({
      user_id: user.id,
      name: form.name.trim(),
      amount: parseFloat(form.amount),
      target_month: form.targetMonth,
      notes: form.notes.trim(),
      done: false,
    })
    if (!error) {
      toast('Rencana ditambahkan', 'success')
      setForm({ name: '', amount: '', targetMonth: getCurrentMonth(), notes: '' })
      setShowForm(false)
      fetchPlans()
    } else {
      toast('Gagal menyimpan', 'error')
    }
    setSaving(false)
  }

  const toggleDone = async (plan) => {
    const { error } = await supabase
      .from('plans')
      .update({ done: !plan.done })
      .eq('id', plan.id)
    if (!error) {
      setPlans(ps => ps.map(p => p.id === plan.id ? { ...p, done: !p.done } : p))
      toast(plan.done ? 'Ditandai aktif' : 'Ditandai selesai', 'success')
    }
  }

  const deletePlan = async (id) => {
    setDeletingId(id)
    const { error } = await supabase.from('plans').delete().eq('id', id)
    if (!error) {
      setPlans(ps => ps.filter(p => p.id !== id))
      toast('Rencana dihapus', 'success')
    }
    setDeletingId(null)
  }

  const filtered = plans.filter(p => {
    if (filter === 'aktif') return !p.done
    if (filter === 'selesai') return p.done
    return true
  })

  // group by target_month, sorted ascending
  const grouped = {}
  filtered.forEach(p => {
    if (!grouped[p.target_month]) grouped[p.target_month] = []
    grouped[p.target_month].push(p)
  })
  const sortedMonths = Object.keys(grouped).sort()

  const totalAktif = plans.filter(p => !p.done).reduce((s, p) => s + Number(p.amount), 0)
  const totalSelesai = plans.filter(p => p.done).reduce((s, p) => s + Number(p.amount), 0)

  return (
    <div className="animate-in">
      {/* Header */}
      <div className="flex-between mb-20" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Rencana</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>Catat apa saja yang ingin dibeli, berapa, dan kapan</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(v => !v)}
        >
          {showForm ? '✕ Tutup' : '+ Tambah Rencana'}
        </button>
      </div>

      {/* Stats bar */}
      <div className="plans-stat-bar mb-20">
        <div className="plans-stat">
          <span className="plans-stat-label">Total Rencana</span>
          <span className="plans-stat-val tabular">{plans.length} item</span>
        </div>
        <div className="plans-stat-divider" />
        <div className="plans-stat">
          <span className="plans-stat-label">Belum terbeli</span>
          <span className="plans-stat-val tabular text-warning">{formatCurrency(totalAktif)}</span>
        </div>
        <div className="plans-stat-divider" />
        <div className="plans-stat">
          <span className="plans-stat-label">Sudah terbeli</span>
          <span className="plans-stat-val tabular text-success">{formatCurrency(totalSelesai)}</span>
        </div>
      </div>

      {/* Inline add form */}
      {showForm && (
        <div className="card plans-form-card mb-20 animate-in">
          <p className="plans-form-title">Tambah Rencana Baru</p>
          <div className="plans-form-grid">
            <div className="form-group" style={{ margin: 0, gridColumn: 'span 2' }}>
              <label className="form-label">Nama barang / kebutuhan</label>
              <input
                className="form-input"
                type="text"
                placeholder="contoh: Beli laptop, Kondangan Budi..."
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                autoFocus
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Estimasi harga</label>
              <CurrencyInput
                value={form.amount}
                onChange={raw => setForm(f => ({ ...f, amount: raw }))}
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Target bulan</label>
              <select
                className="form-select"
                value={form.targetMonth}
                onChange={e => setForm(f => ({ ...f, targetMonth: e.target.value }))}
              >
                {MONTH_OPTS.map(o => (
                  <option key={o.val} value={o.val}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ margin: 0, gridColumn: 'span 2' }}>
              <label className="form-label">Catatan <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(opsional)</span></label>
              <input
                className="form-input"
                type="text"
                placeholder="detail tambahan..."
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Batal</button>
            <button
              className="btn btn-primary"
              onClick={addPlan}
              disabled={!form.name.trim() || !form.amount || saving}
            >
              {saving ? 'Menyimpan...' : '+ Simpan Rencana'}
            </button>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div className="plans-filter-tabs mb-20">
        {['aktif', 'selesai', 'semua'].map(f => (
          <button
            key={f}
            className={`plans-filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'aktif' ? `Aktif (${plans.filter(p => !p.done).length})` :
             f === 'selesai' ? `Selesai (${plans.filter(p => p.done).length})` : 'Semua'}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 76, borderRadius: 'var(--radius)' }} />
          ))}
        </div>
      ) : sortedMonths.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <strong>
            {filter === 'aktif' ? 'Belum ada rencana aktif' :
             filter === 'selesai' ? 'Belum ada rencana selesai' :
             'Belum ada rencana'}
          </strong>
          <p>
            {filter === 'aktif'
              ? 'Tekan "+ Tambah Rencana" untuk mulai mencatat.'
              : 'Selesaikan rencana dengan menekan tombol ✓.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {sortedMonths.map(month => {
            const items = grouped[month]
            const monthTotal = items.reduce((s, p) => s + Number(p.amount), 0)
            return (
              <div key={month}>
                {/* Month header */}
                <div className="plans-month-header">
                  <span className="plans-month-label">{getMonthLabel(month)}</span>
                  <span className="plans-month-total tabular">{formatCurrency(monthTotal)}</span>
                </div>

                {/* Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {items.map(plan => (
                    <div key={plan.id} className={`plan-card ${plan.done ? 'plan-card-done' : ''}`}>
                      <div className="plan-card-icon">
                        {plan.done ? '✓' : '🛒'}
                      </div>
                      <div className="plan-card-body">
                        <div className="plan-card-name">{plan.name}</div>
                        {plan.notes && (
                          <div className="plan-card-notes">{plan.notes}</div>
                        )}
                      </div>
                      <div className="plan-card-right">
                        <span className="plan-card-amount tabular">{formatCurrency(plan.amount)}</span>
                        <div className="plan-card-actions">
                          <button
                            className={`plan-action-btn ${plan.done ? 'plan-action-undo' : 'plan-action-done'}`}
                            onClick={() => toggleDone(plan)}
                            title={plan.done ? 'Tandai aktif' : 'Tandai selesai'}
                          >
                            {plan.done ? '↩' : '✓'}
                          </button>
                          <button
                            className="plan-action-btn plan-action-del"
                            onClick={() => deletePlan(plan.id)}
                            disabled={deletingId === plan.id}
                            title="Hapus"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <style>{`
        .plans-stat-bar {
          display: flex;
          align-items: center;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 14px 20px;
          gap: 0;
          flex-wrap: wrap;
        }
        .plans-stat {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 0 20px;
          flex: 1;
          min-width: 100px;
        }
        .plans-stat:first-child { padding-left: 0; }
        .plans-stat:last-child { padding-right: 0; }
        .plans-stat-divider {
          width: 1px;
          height: 36px;
          background: var(--border);
          flex-shrink: 0;
        }
        .plans-stat-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          font-weight: 600;
        }
        .plans-stat-val {
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-primary);
        }

        .plans-form-card { border-color: var(--accent); }
        .plans-form-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 16px;
        }
        .plans-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .plans-filter-tabs {
          display: flex;
          gap: 6px;
        }
        .plans-filter-btn {
          background: none;
          border: 1px solid var(--border);
          border-radius: 99px;
          padding: 5px 14px;
          font-family: var(--font-sans);
          font-size: 0.775rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.15s;
        }
        .plans-filter-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-light);
        }
        .plans-filter-btn.active {
          background: var(--accent-dim);
          border-color: var(--accent);
          color: var(--accent);
        }

        .plans-month-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          padding: 0 2px;
        }
        .plans-month-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
        }
        .plans-month-total {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .plan-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 14px 16px;
          transition: border-color 0.15s, background 0.15s;
        }
        .plan-card:hover { border-color: var(--border-light); background: var(--bg-card-hover); }
        .plan-card-done {
          opacity: 0.55;
        }
        .plan-card-done .plan-card-name {
          text-decoration: line-through;
          color: var(--text-muted);
        }

        .plan-card-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: var(--bg-input);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
          color: var(--text-secondary);
        }
        .plan-card-done .plan-card-icon {
          background: var(--success-dim);
          border-color: var(--success);
          color: var(--success);
          font-size: 0.85rem;
          font-weight: 700;
        }

        .plan-card-body {
          flex: 1;
          min-width: 0;
        }
        .plan-card-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .plan-card-notes {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .plan-card-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .plan-card-amount {
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }
        .plan-card-actions {
          display: flex;
          gap: 4px;
        }
        .plan-action-btn {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background: none;
          cursor: pointer;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          color: var(--text-muted);
          font-family: var(--font-sans);
        }
        .plan-action-done:hover { background: var(--success-dim); border-color: var(--success); color: var(--success); }
        .plan-action-undo:hover { background: var(--warning-dim); border-color: var(--warning); color: var(--warning); }
        .plan-action-del:hover { background: var(--danger-dim); border-color: var(--danger); color: var(--danger); }
        .plan-action-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        @media (max-width: 640px) {
          .plans-stat-bar { gap: 8px; padding: 12px 14px; }
          .plans-stat { padding: 0 10px; }
          .plans-form-grid { grid-template-columns: 1fr; }
          .plans-form-grid .form-group[style*="span 2"] { grid-column: span 1; }
          .plan-card { padding: 12px 12px; gap: 10px; }
          .plan-card-amount { display: none; }
        }
      `}</style>
    </div>
  )
}
