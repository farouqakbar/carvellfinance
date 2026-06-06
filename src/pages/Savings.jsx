import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { formatCurrency, getCurrentMonth, getMonthLabel, getToday } from '../utils/formatCurrency'
import { useToast } from '../components/Toast'
import CurrencyInput from '../components/CurrencyInput'
import {
  IconBookmark, IconShoppingBag, IconCheck, IconPlus, IconTrash,
  IconUndo, IconCreditCard, IconX, IconPiggyBank, IconArrowUp, IconArrowDown,
} from '../components/Icons'

function getMonthOptions() {
  const opts = []
  const now = new Date()
  for (let i = 0; i < 60; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
    const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    opts.push({ val, label: d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }) })
  }
  return opts
}

const MONTH_OPTS = getMonthOptions()
const TODAY = getToday()

export default function Plans() {
  const { user } = useAuth()
  const toast = useToast()

  // ── Tab ──────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('wishlist')

  // ── Wishlist state ───────────────────────────────────────────────
  const [plans, setPlans] = useState([])
  const [savings, setSavings] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('aktif')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', amount: '', targetMonth: getCurrentMonth(), notes: '' })
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [doneModal, setDoneModal] = useState(null)
  const [doneSource, setDoneSource] = useState('gaji')
  const [doneSavingsId, setDoneSavingsId] = useState('')
  const [doneCatId, setDoneCatId] = useState('')
  const [doneDate, setDoneDate] = useState(TODAY)
  const [confirming, setConfirming] = useState(false)

  // ── Plan events state ────────────────────────────────────────────
  const [planEvents, setPlanEvents] = useState([])
  const [showPlanForm, setShowPlanForm] = useState(false)
  const [planForm, setPlanForm] = useState({ title: '', type: 'expense', amount: '', date: TODAY, notes: '' })
  const [savingPlan, setSavingPlan] = useState(false)
  const [deletingPlanId, setDeletingPlanId] = useState(null)

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    setLoading(true)
    const [plansRes, savingsRes, catsRes, planEventsRes] = await Promise.all([
      supabase.from('plans').select('*').eq('user_id', user.id)
        .order('target_month', { ascending: true })
        .order('created_at', { ascending: true }),
      supabase.from('savings').select('*').eq('user_id', user.id).order('name'),
      supabase.from('categories').select('*').eq('user_id', user.id).order('name'),
      supabase.from('plan_events').select('*').eq('user_id', user.id).order('date', { ascending: true }),
    ])
    setPlans(plansRes.data || [])
    setSavings(savingsRes.data || [])
    const cats = catsRes.data || []
    setCategories(cats)
    if (cats.length > 0) setDoneCatId(cats[0].id)
    if ((savingsRes.data || []).length > 0) setDoneSavingsId(savingsRes.data[0].id)
    setPlanEvents(planEventsRes.data || [])
    setLoading(false)
  }

  const fetchPlans = async () => {
    const { data } = await supabase
      .from('plans').select('*').eq('user_id', user.id)
      .order('target_month', { ascending: true })
      .order('created_at', { ascending: true })
    setPlans(data || [])
  }

  const fetchPlanEvents = async () => {
    const { data } = await supabase
      .from('plan_events').select('*').eq('user_id', user.id)
      .order('date', { ascending: true })
    setPlanEvents(data || [])
  }

  // ── Wishlist functions ───────────────────────────────────────────
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
      toast('Wishlist ditambahkan', 'success')
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
      supabase.from('plans').update({ done: false }).eq('id', plan.id).then(({ error }) => {
        if (error) { toast(error.message, 'error'); return }
        setPlans(ps => ps.map(p => p.id === plan.id ? { ...p, done: false } : p))
        toast('Ditandai aktif kembali', 'success')
      })
      return
    }
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
      setSavings(ss => ss.map(s => s.id === doneSavingsId ? { ...s, current_amount: newAmount } : s))
    } else {
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

    const { error: doneErr } = await supabase.from('plans').update({ done: true }).eq('id', plan.id)
    if (doneErr) { toast(doneErr.message, 'error'); setConfirming(false); return }
    setPlans(ps => ps.map(p => p.id === plan.id ? { ...p, done: true } : p))
    toast('Wishlist selesai dicatat ✓', 'success')
    setDoneModal(null)
    setConfirming(false)
  }

  const deletePlan = async (id) => {
    setDeletingId(id)
    const { error } = await supabase.from('plans').delete().eq('id', id)
    if (!error) {
      setPlans(ps => ps.filter(p => p.id !== id))
      toast('Wishlist dihapus', 'success')
    }
    setDeletingId(null)
  }

  // ── Plan events functions ────────────────────────────────────────
  const addPlanEvent = async () => {
    if (!planForm.title.trim() || !planForm.amount || !planForm.date) return
    setSavingPlan(true)
    const { error } = await supabase.from('plan_events').insert({
      user_id: user.id,
      title: planForm.title.trim(),
      type: planForm.type,
      amount: parseFloat(planForm.amount),
      date: planForm.date,
      notes: planForm.notes.trim(),
    })
    if (!error) {
      toast('Plan event ditambahkan', 'success')
      setPlanForm({ title: '', type: 'expense', amount: '', date: TODAY, notes: '' })
      setShowPlanForm(false)
      fetchPlanEvents()
    } else {
      toast('Gagal menyimpan', 'error')
    }
    setSavingPlan(false)
  }

  const deletePlanEvent = async (id) => {
    setDeletingPlanId(id)
    const { error } = await supabase.from('plan_events').delete().eq('id', id)
    if (!error) {
      setPlanEvents(pe => pe.filter(e => e.id !== id))
      toast('Event dihapus', 'success')
    }
    setDeletingPlanId(null)
  }

  // ── Computed: Wishlist ───────────────────────────────────────────
  const filtered = plans.filter(p => {
    if (filter === 'aktif') return !p.done
    if (filter === 'selesai') return p.done
    return true
  })

  const grouped = {}
  filtered.forEach(p => {
    if (!grouped[p.target_month]) grouped[p.target_month] = []
    grouped[p.target_month].push(p)
  })
  const sortedMonths = Object.keys(grouped).sort()

  const totalAktif = plans.filter(p => !p.done).reduce((s, p) => s + Number(p.amount), 0)
  const totalSelesai = plans.filter(p => p.done).reduce((s, p) => s + Number(p.amount), 0)
  const countAktif = plans.filter(p => !p.done).length
  const countSelesai = plans.filter(p => p.done).length

  // ── Computed: Plan events ────────────────────────────────────────
  const planGrouped = {}
  planEvents.forEach(e => {
    const mon = e.date.slice(0, 7)
    if (!planGrouped[mon]) planGrouped[mon] = []
    planGrouped[mon].push(e)
  })
  const planSortedMonths = Object.keys(planGrouped).sort()
  const planIncomeTotal = planEvents.filter(e => e.type === 'income').reduce((s, e) => s + Number(e.amount), 0)
  const planExpenseTotal = planEvents.filter(e => e.type === 'expense').reduce((s, e) => s + Number(e.amount), 0)
  const planNet = planIncomeTotal - planExpenseTotal

  return (
    <>
      <div className="animate-in pln-page">

        {/* ── Page header ────────────────────── */}
        <div className="pln-page-header">
          <div className="pln-page-icon"><IconBookmark size={16} /></div>
          <div>
            <h1 className="pln-page-title">Plan &amp; Wishlist</h1>
            <p className="pln-page-sub">Rencanakan cashflow dan catat keinginan pembelian</p>
          </div>
        </div>

        {/* ── Tab Toggle ─────────────────────── */}
        <div className="pln-tab-bar">
          <button
            className={`pln-tab-btn${activeTab === 'plan' ? ' active' : ''}`}
            onClick={() => setActiveTab('plan')}
          >
            Plan
            {planEvents.length > 0 && <span className="pln-tab-badge">{planEvents.length}</span>}
          </button>
          <button
            className={`pln-tab-btn${activeTab === 'wishlist' ? ' active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            Wishlist
            {countAktif > 0 && <span className="pln-tab-badge">{countAktif}</span>}
          </button>
        </div>

        {/* ══════════════════════════════════════
            PLAN TAB
        ══════════════════════════════════════ */}
        {activeTab === 'plan' && (
          <div className="pln-tab-content">

            {/* Plan stats strip */}
            {planEvents.length > 0 && (
              <div className="pln-stats-strip">
                <div className="pln-stat">
                  <span className="pln-stat-label">Pemasukan</span>
                  <span className="pln-stat-val tabular" style={{ color: 'var(--success)' }}>
                    +{formatCurrency(planIncomeTotal)}
                  </span>
                </div>
                <div className="pln-stat-divider" />
                <div className="pln-stat">
                  <span className="pln-stat-label">Pengeluaran</span>
                  <span className="pln-stat-val tabular" style={{ color: 'var(--danger)' }}>
                    −{formatCurrency(planExpenseTotal)}
                  </span>
                </div>
                <div className="pln-stat-divider" />
                <div className="pln-stat">
                  <span className="pln-stat-label">Net</span>
                  <span className="pln-stat-val tabular" style={{ color: planNet >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                    {planNet >= 0 ? '+' : '−'}{formatCurrency(Math.abs(planNet))}
                  </span>
                </div>
              </div>
            )}

            {/* Add button row */}
            <div className="pln-filter-row">
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {planEvents.length} event terjadwal
              </span>
              <button className="pln-add-btn" onClick={() => setShowPlanForm(true)} title="Tambah Plan Event">
                <IconPlus size={11} />
              </button>
            </div>

            {/* Plan list */}
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="skeleton" style={{ height: 50, borderRadius: 0, opacity: 1 - i * 0.18 }} />
                ))}
              </div>
            ) : planSortedMonths.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <IconArrowUp size={22} style={{ opacity: 0.4 }} />
                </div>
                <strong>Belum ada plan event</strong>
                <p>Tekan + untuk tambah pemasukan atau pengeluaran yang akan datang.</p>
              </div>
            ) : (
              <div className="pln-sections">
                {planSortedMonths.map(mon => {
                  const events = planGrouped[mon]
                  const monIncome = events.filter(e => e.type === 'income').reduce((s, e) => s + Number(e.amount), 0)
                  const monExpense = events.filter(e => e.type === 'expense').reduce((s, e) => s + Number(e.amount), 0)
                  return (
                    <div key={mon} className="pln-section">
                      <div className="pln-section-head">
                        <div>
                          <span className="pln-section-label">{getMonthLabel(mon)}</span>
                          <span className="pln-section-sub">
                            {events.length} event
                            {monIncome > 0 && <span style={{ color: 'var(--success)', marginLeft: 6 }}>+{formatCurrency(monIncome)}</span>}
                            {monExpense > 0 && <span style={{ color: 'var(--danger)', marginLeft: 6 }}>−{formatCurrency(monExpense)}</span>}
                          </span>
                        </div>
                      </div>
                      <div className="pln-table-body">
                        {events.map(ev => {
                          const isIncome = ev.type === 'income'
                          const dateObj = new Date(ev.date + 'T00:00:00')
                          const dayLabel = dateObj.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })
                          return (
                            <div key={ev.id} className="pln-event-row">
                              <div className={`pln-event-icon${isIncome ? ' income' : ' expense'}`}>
                                {isIncome ? <IconArrowUp size={11} /> : <IconArrowDown size={11} />}
                              </div>
                              <div className="pln-row-info">
                                <span className="pln-row-name">{ev.title}</span>
                                <span className="pln-row-notes">
                                  {dayLabel}{ev.notes ? ` · ${ev.notes}` : ''}
                                </span>
                              </div>
                              <span className={`pln-row-amount tabular${isIncome ? ' pln-income' : ' pln-expense'}`}>
                                {isIncome ? '+' : '−'}{formatCurrency(ev.amount)}
                              </span>
                              <div className="pln-row-actions">
                                <button
                                  className="pln-act pln-act-del"
                                  onClick={() => deletePlanEvent(ev.id)}
                                  disabled={deletingPlanId === ev.id}
                                  title="Hapus"
                                >
                                  <IconTrash size={12} />
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════
            WISHLIST TAB
        ══════════════════════════════════════ */}
        {activeTab === 'wishlist' && (
          <div className="pln-tab-content">

            {/* Wishlist stats strip */}
            <div className="pln-stats-strip">
              <div className="pln-stat">
                <span className="pln-stat-label">Belum Terbeli</span>
                <span className="pln-stat-val tabular" style={{ color: totalAktif > 0 ? 'var(--warning)' : 'var(--text-primary)' }}>
                  {formatCurrency(totalAktif)}
                </span>
              </div>
              <div className="pln-stat-divider" />
              <div className="pln-stat">
                <span className="pln-stat-label">Aktif</span>
                <span className="pln-stat-val">{countAktif} item</span>
              </div>
              <div className="pln-stat-divider" />
              <div className="pln-stat">
                <span className="pln-stat-label">Sudah Terbeli</span>
                <span className="pln-stat-val tabular" style={{ color: countSelesai > 0 ? 'var(--success)' : 'var(--text-primary)' }}>
                  {formatCurrency(totalSelesai)}
                </span>
              </div>
            </div>

            {/* Filter row + Add */}
            <div className="pln-filter-row">
              <div className="pln-filter-tabs">
                {['aktif', 'selesai', 'semua'].map(f => (
                  <button
                    key={f}
                    className={`pln-filter-btn ${filter === f ? 'active' : ''}`}
                    onClick={() => setFilter(f)}
                  >
                    {f === 'aktif' ? `Aktif (${countAktif})` :
                     f === 'selesai' ? `Selesai (${countSelesai})` : 'Semua'}
                  </button>
                ))}
              </div>
              <button className="pln-add-btn" onClick={() => setShowForm(true)} title="Tambah Wishlist">
                <IconPlus size={11} />
              </button>
            </div>

            {/* Wishlist content */}
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="skeleton" style={{ height: 50, borderRadius: 0, opacity: 1 - i * 0.18 }} />
                ))}
              </div>
            ) : sortedMonths.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon"><IconBookmark size={22} /></div>
                <strong>
                  {filter === 'aktif' ? 'Belum ada wishlist aktif' :
                   filter === 'selesai' ? 'Belum ada wishlist selesai' :
                   'Belum ada wishlist'}
                </strong>
                <p>
                  {filter === 'aktif'
                    ? 'Tekan + untuk mulai mencatat.'
                    : 'Tandai selesai dengan menekan tombol ✓.'}
                </p>
              </div>
            ) : (
              <div className="pln-sections">
                {sortedMonths.map(mon => {
                  const items = grouped[mon]
                  const monthTotal = items.reduce((s, p) => s + Number(p.amount), 0)
                  return (
                    <div key={mon} className="pln-section">
                      <div className="pln-section-head">
                        <div>
                          <span className="pln-section-label">{getMonthLabel(mon)}</span>
                          <span className="pln-section-sub">{items.length} item · {formatCurrency(monthTotal)}</span>
                        </div>
                      </div>
                      <div className="pln-table-body">
                        {items.map(plan => (
                          <div key={plan.id} className={`pln-row${plan.done ? ' pln-row-done' : ''}`}>
                            <div className="pln-row-info">
                              <span className="pln-row-name">{plan.name}</span>
                              {plan.notes && <span className="pln-row-notes">{plan.notes}</span>}
                            </div>
                            <span className="pln-row-amount tabular">{formatCurrency(plan.amount)}</span>
                            <div className="pln-row-actions">
                              <button
                                className={`pln-act ${plan.done ? 'pln-act-undo' : 'pln-act-done'}`}
                                onClick={() => toggleDone(plan)}
                                title={plan.done ? 'Tandai aktif' : 'Tandai selesai'}
                              >
                                {plan.done ? <IconUndo size={12} /> : <IconCheck size={12} />}
                              </button>
                              <button
                                className="pln-act pln-act-del"
                                onClick={() => deletePlan(plan.id)}
                                disabled={deletingId === plan.id}
                                title="Hapus"
                              >
                                <IconTrash size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════
            MODALS
        ══════════════════════════════════════ */}

        {/* Modal: Tambah Plan Event */}
        {showPlanForm && (
          <div className="modal-overlay" onClick={() => setShowPlanForm(false)}>
            <div className="modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Tambah Plan Event</h2>
                <button className="btn btn-ghost" onClick={() => setShowPlanForm(false)}><IconX size={16} /></button>
              </div>

              {/* Type toggle */}
              <div className="form-group">
                <label className="form-label">Tipe event</label>
                <div className="pln-src-toggle">
                  <button type="button"
                    className={`pln-src-btn${planForm.type === 'income' ? ' active' : ''}`}
                    onClick={() => setPlanForm(f => ({ ...f, type: 'income' }))}
                  >
                    <span className="pln-src-icon" style={{ color: 'var(--success)' }}><IconArrowUp size={15} /></span>
                    <span className="pln-src-label">Pemasukan</span>
                    <span className="pln-src-sub">Gaji, bonus, transfer masuk</span>
                  </button>
                  <button type="button"
                    className={`pln-src-btn${planForm.type === 'expense' ? ' active' : ''}`}
                    onClick={() => setPlanForm(f => ({ ...f, type: 'expense' }))}
                  >
                    <span className="pln-src-icon" style={{ color: 'var(--danger)' }}><IconArrowDown size={15} /></span>
                    <span className="pln-src-label">Pengeluaran</span>
                    <span className="pln-src-sub">Tagihan, cicilan, belanja</span>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Judul / Deskripsi</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="cth: Gaji masuk, Tagihan listrik, Cicilan HP..."
                  value={planForm.title}
                  onChange={e => setPlanForm(f => ({ ...f, title: e.target.value }))}
                  autoFocus
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Nominal</label>
                  <CurrencyInput
                    value={planForm.amount}
                    onChange={raw => setPlanForm(f => ({ ...f, amount: raw }))}
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Tanggal</label>
                  <input
                    className="form-input"
                    type="date"
                    value={planForm.date}
                    onChange={e => setPlanForm(f => ({ ...f, date: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Catatan{' '}
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(opsional)</span>
                </label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="detail tambahan..."
                  value={planForm.notes}
                  onChange={e => setPlanForm(f => ({ ...f, notes: e.target.value }))}
                />
              </div>

              <div className="flex gap-8 mt-16">
                <button className="btn btn-secondary" onClick={() => setShowPlanForm(false)}>Batal</button>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={addPlanEvent}
                  disabled={!planForm.title.trim() || !planForm.amount || !planForm.date || savingPlan}
                >
                  {savingPlan ? 'Menyimpan...' : <><IconPlus size={13} /> Simpan</>}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Tambah Wishlist */}
        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Tambah Wishlist</h2>
                <button className="btn btn-ghost" onClick={() => setShowForm(false)}><IconX size={16} /></button>
              </div>
              <div className="form-group">
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
              </div>
              <div className="form-group">
                <label className="form-label">
                  Catatan{' '}
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(opsional)</span>
                </label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="kegunaan, detail, dll..."
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                />
              </div>
              <div className="flex gap-8 mt-16">
                <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Batal</button>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={addPlan}
                  disabled={!form.name.trim() || !form.amount || saving}
                >
                  {saving ? 'Menyimpan...' : <><IconPlus size={13} /> Simpan</>}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Tandai Selesai */}
        {doneModal && (
          <div className="modal-overlay" onClick={() => !confirming && setDoneModal(null)}>
            <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Tandai Selesai</h2>
                <button type="button" className="btn btn-ghost" onClick={() => setDoneModal(null)} disabled={confirming}>
                  <IconX size={16} />
                </button>
              </div>

              <div className="pln-done-info">
                <div className="pln-done-icon"><IconShoppingBag size={16} /></div>
                <div>
                  <div className="pln-done-name">{doneModal.name}</div>
                  <div className="pln-done-amount tabular">{formatCurrency(doneModal.amount)}</div>
                </div>
              </div>

              <p className="pln-done-q">Dari mana uangnya?</p>

              <div className="pln-src-toggle">
                <button type="button"
                  className={`pln-src-btn${doneSource === 'gaji' ? ' active' : ''}`}
                  onClick={() => setDoneSource('gaji')}
                >
                  <span className="pln-src-icon"><IconCreditCard size={15} /></span>
                  <span className="pln-src-label">Potongan Gaji</span>
                  <span className="pln-src-sub">Dicatat sebagai pengeluaran</span>
                </button>
                <button type="button"
                  className={`pln-src-btn${doneSource === 'tabungan' ? ' active' : ''}`}
                  onClick={() => setDoneSource('tabungan')}
                >
                  <span className="pln-src-icon"><IconPiggyBank size={15} /></span>
                  <span className="pln-src-label">Dari Tabungan</span>
                  <span className="pln-src-sub">Kurangi saldo tabungan</span>
                </button>
              </div>

              {doneSource === 'gaji' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Kategori pengeluaran</label>
                    <select className="form-select" value={doneCatId} onChange={e => setDoneCatId(e.target.value)}>
                      <option value="">— Tanpa kategori —</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Tanggal transaksi</label>
                    <input className="form-input" type="date" value={doneDate} onChange={e => setDoneDate(e.target.value)} />
                  </div>
                  <div className="pln-preview">
                    <span>Pengeluaran dicatat sebesar</span>
                    <span className="tabular" style={{ color: 'var(--danger)', fontWeight: 700 }}>{formatCurrency(doneModal.amount)}</span>
                  </div>
                </div>
              )}

              {doneSource === 'tabungan' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                  {savings.length === 0 ? (
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Belum ada tabungan.</p>
                  ) : (
                    <>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Pilih tabungan</label>
                        <select className="form-select" value={doneSavingsId} onChange={e => setDoneSavingsId(e.target.value)}>
                          {savings.map(sv => (
                            <option key={sv.id} value={sv.id}>{sv.name} — {formatCurrency(sv.current_amount)}</option>
                          ))}
                        </select>
                      </div>
                      {doneSavingsId && (() => {
                        const sv = savings.find(s => s.id === doneSavingsId)
                        const after = Math.max(0, Number(sv?.current_amount || 0) - Number(doneModal.amount))
                        const cukup = Number(sv?.current_amount || 0) >= Number(doneModal.amount)
                        return (
                          <div className={`pln-preview${!cukup ? ' pln-preview-warn' : ''}`}>
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
                <button type="button" className="btn btn-secondary" onClick={() => setDoneModal(null)} disabled={confirming}>
                  Batal
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={confirmDone}
                  disabled={confirming || (doneSource === 'tabungan' && savings.length === 0)}
                >
                  {confirming ? 'Menyimpan...' : <><IconCheck size={13} /> Tandai Selesai</>}
                </button>
              </div>
            </div>
          </div>
        )}

        <style>{`
          .pln-page { padding-bottom: 56px; }

          /* ── Page Header ────────────────── */
          .pln-page-header {
            display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
          }
          .pln-page-icon {
            width: 36px; height: 36px; border-radius: 9px;
            background: rgba(251,191,36,0.08); border: 1px solid rgba(251,191,36,0.2);
            color: var(--warning); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          }
          .pln-page-title {
            font-size: 1.1rem; font-weight: 800; letter-spacing: -0.025em;
            color: var(--text-primary); margin: 0; line-height: 1.2;
          }
          .pln-page-sub { font-size: 0.72rem; color: var(--text-muted); margin: 2px 0 0; }

          /* ── Tab Bar ────────────────────── */
          .pln-tab-bar {
            display: flex; gap: 2px;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 10px; padding: 3px;
            margin-bottom: 20px;
          }
          [data-theme="light"] .pln-tab-bar {
            background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.08);
          }
          .pln-tab-btn {
            flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
            padding: 7px 12px; border-radius: 7px;
            border: none; background: transparent;
            color: var(--text-muted); font-size: 0.8125rem; font-weight: 700;
            font-family: var(--font-sans); letter-spacing: -0.01em;
            cursor: pointer; transition: all 0.15s;
          }
          .pln-tab-btn:hover { color: var(--text-secondary); }
          .pln-tab-btn.active {
            background: rgba(255,255,255,0.09); color: var(--text-primary);
          }
          [data-theme="light"] .pln-tab-btn.active {
            background: #fff; color: var(--accent);
            box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          }
          .pln-tab-badge {
            font-size: 0.6rem; font-weight: 800;
            background: var(--accent); color: #fff;
            border-radius: 99px; padding: 1px 6px; line-height: 1.4;
          }

          .pln-tab-content { display: flex; flex-direction: column; }

          /* ── Stats Strip ────────────────── */
          .pln-stats-strip {
            display: flex; background: var(--bg-card);
            border: 1px solid var(--border); border-radius: var(--radius-lg);
            overflow: hidden; margin-bottom: 20px;
          }
          .pln-stat {
            flex: 1; display: flex; flex-direction: column; gap: 5px; padding: 16px 20px;
          }
          .pln-stat-divider { width: 1px; background: var(--border); flex-shrink: 0; margin: 12px 0; }
          .pln-stat-label {
            font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.1em;
            color: var(--text-muted); font-weight: 700;
          }
          .pln-stat-val {
            font-size: 1.05rem; font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary);
          }

          /* ── Filter Row ─────────────────── */
          .pln-filter-row {
            display: flex; align-items: center; justify-content: space-between;
            gap: 8px; margin-bottom: 16px;
          }
          .pln-filter-tabs { display: flex; gap: 6px; }
          .pln-filter-btn {
            background: none; border: 1px solid var(--border); border-radius: 99px;
            padding: 5px 14px; font-family: var(--font-sans); font-size: 0.75rem;
            font-weight: 600; color: var(--text-muted); cursor: pointer; transition: all 0.15s;
          }
          .pln-filter-btn:hover { color: var(--text-primary); border-color: var(--border-light); }
          .pln-filter-btn.active { background: var(--accent-dim); border-color: var(--accent); color: var(--accent); }
          .pln-add-btn {
            width: 28px; height: 28px; border-radius: 7px;
            background: transparent; border: 1px solid var(--border);
            color: var(--text-muted); cursor: pointer;
            display: flex; align-items: center; justify-content: center; transition: all 0.15s; flex-shrink: 0;
          }
          .pln-add-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-dim); }

          /* ── Sections ───────────────────── */
          .pln-sections { display: flex; flex-direction: column; gap: 28px; }
          .pln-section-head {
            display: flex; justify-content: space-between; align-items: center;
            padding-bottom: 10px; border-bottom: 1px solid var(--border); margin-bottom: 2px;
          }
          .pln-section-label {
            display: block; font-size: 0.62rem; font-weight: 700;
            text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-secondary);
          }
          .pln-section-sub {
            display: block; font-size: 0.7rem; color: var(--text-muted);
            font-weight: 500; margin-top: 2px;
          }

          /* ── Wishlist rows ──────────────── */
          .pln-table-body { display: flex; flex-direction: column; }
          .pln-row {
            display: grid; grid-template-columns: 1fr 160px 60px;
            align-items: center; min-height: 50px; padding: 0 4px;
            border-bottom: 1px solid rgba(255,255,255,0.04);
            position: relative; transition: background 0.12s;
          }
          .pln-row::before {
            content: ''; position: absolute; left: 0; top: 0; bottom: 0;
            width: 2px; border-radius: 1px; background: var(--accent);
            opacity: 0; transition: opacity 0.12s;
          }
          .pln-row:hover { background: rgba(255,255,255,0.02); }
          .pln-row:hover::before { opacity: 1; }
          .pln-row:last-child { border-bottom: none; }
          .pln-row-done { opacity: 0.48; }
          .pln-row-done::before { background: var(--success); opacity: 1; }
          .pln-row-done .pln-row-name { text-decoration: line-through; color: var(--text-muted); }
          .pln-row-info {
            display: flex; flex-direction: column; gap: 1px; padding: 10px 0 10px 8px; min-width: 0;
          }
          .pln-row-name {
            font-size: 0.875rem; font-weight: 600; color: var(--text-primary);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          }
          .pln-row-notes {
            font-size: 0.65rem; color: var(--text-muted);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          }
          .pln-row-amount {
            font-size: 0.875rem; font-weight: 700; letter-spacing: -0.02em;
            color: var(--text-primary); text-align: right; padding-right: 8px;
          }
          .pln-row-actions {
            display: flex; gap: 4px; justify-content: flex-end;
            opacity: 0; transition: opacity 0.15s;
          }
          .pln-row:hover .pln-row-actions { opacity: 1; }

          /* ── Plan event rows ────────────── */
          .pln-event-row {
            display: grid; grid-template-columns: 28px 1fr 140px 44px;
            align-items: center; min-height: 50px; padding: 0 4px;
            border-bottom: 1px solid rgba(255,255,255,0.04);
            transition: background 0.12s;
          }
          .pln-event-row:hover { background: rgba(255,255,255,0.02); }
          .pln-event-row:last-child { border-bottom: none; }
          .pln-event-row:hover .pln-row-actions { opacity: 1; }
          .pln-event-icon {
            width: 22px; height: 22px; border-radius: 5px;
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          }
          .pln-event-icon.income { background: rgba(52,211,153,0.12); color: var(--success); }
          .pln-event-icon.expense { background: rgba(248,113,113,0.12); color: var(--danger); }
          .pln-income { color: var(--success) !important; }
          .pln-expense { color: var(--danger) !important; }

          /* ── Action buttons ─────────────── */
          .pln-act {
            width: 26px; height: 26px; border-radius: 5px; border: none;
            background: transparent; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            color: var(--text-muted); transition: all 0.12s;
          }
          .pln-act-done:hover { background: var(--success-dim); color: var(--success); }
          .pln-act-undo:hover { background: var(--warning-dim); color: var(--warning); }
          .pln-act-del:hover  { background: var(--danger-dim);  color: var(--danger);  }
          .pln-act:disabled { opacity: 0.3; cursor: not-allowed; }

          /* ── Done Modal ─────────────────── */
          .pln-done-info {
            display: flex; align-items: center; gap: 10px;
            background: var(--bg-input); border: 1px solid var(--border);
            border-radius: var(--radius-sm); padding: 12px 14px; margin-bottom: 16px;
          }
          .pln-done-icon {
            width: 32px; height: 32px; border-radius: var(--radius-sm);
            background: var(--bg-card); border: 1px solid var(--border);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0; color: var(--text-secondary);
          }
          .pln-done-name { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); }
          .pln-done-amount { font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px; }
          .pln-done-q {
            font-size: 0.62rem; font-weight: 700; text-transform: uppercase;
            letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 10px;
          }
          .pln-src-toggle { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
          .pln-src-btn {
            display: flex; flex-direction: column; align-items: flex-start;
            gap: 2px; padding: 12px 14px;
            background: var(--bg-input); border: 1.5px solid var(--border);
            border-radius: var(--radius-sm); cursor: pointer; text-align: left;
            transition: all 0.15s; font-family: var(--font-sans);
          }
          .pln-src-btn:hover { border-color: var(--border-light); }
          .pln-src-btn.active { border-color: var(--accent); background: var(--accent-dim); }
          .pln-src-icon { color: var(--text-secondary); margin-bottom: 2px; }
          .pln-src-label { font-size: 0.8rem; font-weight: 700; color: var(--text-primary); }
          .pln-src-btn.active .pln-src-label { color: var(--accent); }
          .pln-src-sub { font-size: 0.62rem; color: var(--text-muted); }
          .pln-preview {
            display: flex; justify-content: space-between; align-items: center;
            background: var(--bg-input); border: 1px solid var(--border);
            border-radius: var(--radius-sm); padding: 10px 14px;
            font-size: 0.8rem; color: var(--text-secondary); font-weight: 500;
          }
          .pln-preview-warn { border-color: rgba(248,113,113,0.4); background: var(--danger-dim); }

          /* ── Mobile ─────────────────────── */
          @media (max-width: 640px) {
            .pln-stat { padding: 12px; }
            .pln-stat-val { font-size: 0.82rem; }
            .pln-stat-label { font-size: 0.55rem; }
            .pln-row { grid-template-columns: 1fr auto auto; gap: 0 6px; }
            .pln-event-row { grid-template-columns: 22px 1fr auto auto; gap: 0 6px; }
            .pln-row-amount { font-size: 0.82rem; padding-right: 0; }
            .pln-row-actions { opacity: 1; }
          }
        `}</style>
      </div>
    </>
  )
}
