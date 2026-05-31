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

const TODAY = new Date().toISOString().split('T')[0]

export default function Plans() {
  const { user } = useAuth()
  const toast = useToast()

  const [plans, setPlans] = useState([])
  const [savings, setSavings] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('aktif')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', amount: '', targetMonth: getCurrentMonth(), notes: '' })
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  // Modal ceklist selesai
  const [doneModal, setDoneModal] = useState(null)   // plan object
  const [doneSource, setDoneSource] = useState('gaji') // 'tabungan' | 'gaji'
  const [doneSavingsId, setDoneSavingsId] = useState('')
  const [doneCatId, setDoneCatId] = useState('')
  const [doneDate, setDoneDate] = useState(TODAY)
  const [confirming, setConfirming] = useState(false)

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    setLoading(true)
    const [plansRes, savingsRes, catsRes] = await Promise.all([
      supabase.from('plans').select('*').eq('user_id', user.id)
        .order('target_month', { ascending: true })
        .order('created_at', { ascending: true }),
      supabase.from('savings').select('*').eq('user_id', user.id).order('name'),
      supabase.from('categories').select('*').eq('user_id', user.id).order('name'),
    ])
    setPlans(plansRes.data || [])
    setSavings(savingsRes.data || [])
    const cats = catsRes.data || []
    setCategories(cats)
    if (cats.length > 0) setDoneCatId(cats[0].id)
    if ((savingsRes.data || []).length > 0) setDoneSavingsId(savingsRes.data[0].id)
    setLoading(false)
  }

  const fetchPlans = async () => {
    const { data } = await supabase
      .from('plans').select('*').eq('user_id', user.id)
      .order('target_month', { ascending: true })
      .order('created_at', { ascending: true })
    setPlans(data || [])
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

  const toggleDone = (plan) => {
    if (plan.done) {
      // Undo langsung tanpa modal
      supabase.from('plans').update({ done: false }).eq('id', plan.id).then(({ error }) => {
        if (!error) {
          setPlans(ps => ps.map(p => p.id === plan.id ? { ...p, done: false } : p))
          toast('Ditandai aktif kembali', 'success')
        }
      })
      return
    }
    // Buka modal pilih sumber uang
    setDoneModal(plan)
    setDoneSource('gaji')
    setDoneDate(TODAY)
  }

  const confirmDone = async () => {
    if (!doneModal) return
    setConfirming(true)
    const plan = doneModal

    if (doneSource === 'tabungan') {
      const sv = savings.find(s => s.id === doneSavingsId)
      if (!sv) { toast('Pilih tabungan dulu', 'error'); setConfirming(false); return }
      const newAmount = Math.max(0, Number(sv.current_amount) - Number(plan.amount))
      const { error } = await supabase.from('savings').update({ current_amount: newAmount }).eq('id', doneSavingsId)
      if (error) { toast('Gagal update tabungan', 'error'); setConfirming(false); return }
      // Refresh savings list di state
      setSavings(ss => ss.map(s => s.id === doneSavingsId ? { ...s, current_amount: newAmount } : s))
    } else {
      // Potongan gaji → insert expense transaction
      const { error } = await supabase.from('transactions').insert({
        user_id: user.id,
        category_id: doneCatId || null,
        amount: Number(plan.amount),
        date: doneDate,
        description: `Beli: ${plan.name}`,
        type: 'expense',
      })
      if (error) { toast('Gagal catat transaksi', 'error'); setConfirming(false); return }
    }

    // Tandai plan selesai
    await supabase.from('plans').update({ done: true }).eq('id', plan.id)
    setPlans(ps => ps.map(p => p.id === plan.id ? { ...p, done: true } : p))
    toast('Rencana selesai dicatat ✓', 'success')
    setDoneModal(null)
    setConfirming(false)
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
      <div className="flex-between" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <h1 className="page-title">Rencana</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>Catat apa saja yang ingin dibeli, berapa, dan kapan</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(v => !v)}
        >
          {showForm ? '✕ Tutup' : '+ Tambah Rencana'}
        </button>
      </div>

      {/* Stats bar */}
      <div className="plans-stat-bar" style={{ marginBottom: 20 }}>
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
        <div className="card plans-form-card animate-in" style={{ marginBottom: 20 }}>
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
      <div className="plans-filter-tabs" style={{ marginBottom: 20 }}>
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

      {/* ── Modal: Sumber Uang ───────────────── */}
      {doneModal && (
        <div className="modal-overlay" onClick={() => !confirming && setDoneModal(null)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Tandai Selesai</h2>
              <button className="btn btn-ghost" onClick={() => setDoneModal(null)} disabled={confirming}>✕</button>
            </div>

            {/* Info plan */}
            <div className="done-plan-info">
              <div className="done-plan-icon">🛒</div>
              <div>
                <div className="done-plan-name">{doneModal.name}</div>
                <div className="done-plan-amount tabular">{formatCurrency(doneModal.amount)}</div>
              </div>
            </div>

            <p className="done-modal-q">Dari mana uangnya?</p>

            {/* Toggle source */}
            <div className="done-source-toggle">
              <button
                className={`done-src-btn ${doneSource === 'gaji' ? 'active' : ''}`}
                onClick={() => setDoneSource('gaji')}
              >
                <span className="done-src-icon">💳</span>
                <span className="done-src-label">Potongan Gaji</span>
                <span className="done-src-sub">Dicatat sebagai pengeluaran</span>
              </button>
              <button
                className={`done-src-btn ${doneSource === 'tabungan' ? 'active' : ''}`}
                onClick={() => setDoneSource('tabungan')}
              >
                <span className="done-src-icon">🏦</span>
                <span className="done-src-label">Dari Tabungan</span>
                <span className="done-src-sub">Kurangi saldo tabungan</span>
              </button>
            </div>

            {/* Detail form berdasarkan source */}
            {doneSource === 'gaji' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Kategori pengeluaran</label>
                  <select
                    className="form-select"
                    value={doneCatId}
                    onChange={e => setDoneCatId(e.target.value)}
                  >
                    <option value="">— Tanpa kategori —</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Tanggal transaksi</label>
                  <input
                    className="form-input"
                    type="date"
                    value={doneDate}
                    onChange={e => setDoneDate(e.target.value)}
                  />
                </div>
                <div className="done-preview-box">
                  <span>Pengeluaran dicatat sebesar</span>
                  <span className="tabular" style={{ color: 'var(--danger)', fontWeight: 700 }}>
                    {formatCurrency(doneModal.amount)}
                  </span>
                </div>
              </div>
            )}

            {doneSource === 'tabungan' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                {savings.length === 0 ? (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Belum ada tabungan. Buat dulu di menu lain.
                  </p>
                ) : (
                  <>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Pilih tabungan</label>
                      <select
                        className="form-select"
                        value={doneSavingsId}
                        onChange={e => setDoneSavingsId(e.target.value)}
                      >
                        {savings.map(sv => (
                          <option key={sv.id} value={sv.id}>
                            {sv.name} — {formatCurrency(sv.current_amount)}
                          </option>
                        ))}
                      </select>
                    </div>
                    {doneSavingsId && (() => {
                      const sv = savings.find(s => s.id === doneSavingsId)
                      const after = Math.max(0, Number(sv?.current_amount || 0) - Number(doneModal.amount))
                      const cukup = Number(sv?.current_amount || 0) >= Number(doneModal.amount)
                      return (
                        <div className={`done-preview-box ${!cukup ? 'done-preview-warn' : ''}`}>
                          <span>Saldo setelah dikurangi</span>
                          <span className="tabular" style={{ color: cukup ? 'var(--success)' : 'var(--danger)', fontWeight: 700 }}>
                            {formatCurrency(after)}
                          </span>
                        </div>
                      )
                    })()}
                  </>
                )}
              </div>
            )}

            <div className="flex gap-8 mt-16">
              <button className="btn btn-secondary" onClick={() => setDoneModal(null)} disabled={confirming}>
                Batal
              </button>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={confirmDone}
                disabled={confirming || (doneSource === 'tabungan' && savings.length === 0)}
              >
                {confirming ? 'Menyimpan...' : '✓ Tandai Selesai'}
              </button>
            </div>
          </div>
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

        /* ── Done modal ──────────────────────── */
        .done-plan-info {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          margin-bottom: 16px;
        }
        .done-plan-icon {
          width: 36px; height: 36px;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }
        .done-plan-name {
          font-size: 0.875rem; font-weight: 700; color: var(--text-primary);
          margin-bottom: 2px;
        }
        .done-plan-amount { font-size: 0.8rem; color: var(--text-secondary); }

        .done-modal-q {
          font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.07em; color: var(--text-muted); margin-bottom: 10px;
        }

        .done-source-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .done-src-btn {
          display: flex; flex-direction: column; align-items: flex-start;
          gap: 3px; padding: 12px 14px;
          background: var(--bg-input);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          cursor: pointer; text-align: left;
          transition: all 0.15s;
          font-family: var(--font-sans);
        }
        .done-src-btn:hover { border-color: var(--border-light); background: var(--bg-card-hover); }
        .done-src-btn.active {
          border-color: var(--accent);
          background: var(--accent-dim);
        }
        .done-src-icon { font-size: 1.1rem; margin-bottom: 2px; }
        .done-src-label {
          font-size: 0.8rem; font-weight: 700;
          color: var(--text-primary); line-height: 1.2;
        }
        .done-src-sub {
          font-size: 0.65rem; color: var(--text-muted);
          font-weight: 500; line-height: 1.3;
        }
        .done-src-btn.active .done-src-label { color: var(--accent); }

        .done-preview-box {
          display: flex; justify-content: space-between; align-items: center;
          background: var(--bg-input); border: 1px solid var(--border);
          border-radius: var(--radius-sm); padding: 10px 14px;
          font-size: 0.8rem; color: var(--text-secondary); font-weight: 500;
        }
        .done-preview-warn { border-color: rgba(248,113,113,0.4); background: var(--danger-dim); }
      `}</style>
    </div>
  )
}
