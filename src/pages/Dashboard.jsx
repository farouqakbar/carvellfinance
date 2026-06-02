import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { usePageHeader } from '../context/PageHeaderContext'
import { formatCurrency, getCurrentMonth, getMonthLabel, getToday, getMonthEndDate } from '../utils/formatCurrency'
import TransactionForm from '../components/TransactionForm'
import CategoryForm from '../components/CategoryForm'
import ConfirmModal from '../components/ConfirmModal'
import { useToast } from '../components/Toast'
import CurrencyInput from '../components/CurrencyInput'
import { isMandatory, isMandatoryIncome } from '../constants/mandatoryCategories'
import { IconAlertTriangle, IconArrowUp, IconArrowDown, IconArrowUpRight, IconArrowDownLeft, IconSettings, IconPlus } from '../components/Icons'

const DEFAULT_PCT = 15

function prevMonth(m) {
  const [y, mo] = m.split('-').map(Number)
  const d = new Date(y, mo - 2, 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}
function nextMonth(m) {
  const [y, mo] = m.split('-').map(Number)
  const d = new Date(y, mo, 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export default function Dashboard() {
  const { user } = useAuth()
  const { setHeader } = usePageHeader()
  const toast = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const [month, setMonth] = useState(() => searchParams.get('month') || getCurrentMonth())
  const [data, setData] = useState({
    salary: 0, totalExpense: 0, totalIncome: 0,
    categories: [], transactions: [], savings: [], savingsLogs: [], categorySpend: [], hutangList: [], hutangTabunganList: [],
    todayExpense: 0, totalTabungan: 0, tabunganPerMonth: [], nextMonthPlans: [], cumulativeBalance: 0, cumulativeMandatoryBudget: 0,
    gajiTx: null, gajiCatId: null,
  })
  const [loading, setLoading] = useState(true)
  const [showTxForm, setShowTxForm] = useState(false)
  const [showCatManager, setShowCatManager] = useState(false)
  const [budgetEdit, setBudgetEdit] = useState(null)
  const [showCatForm, setShowCatForm] = useState(false)
  const [editCatData, setEditCatData] = useState(null)
  const [confirmDel, setConfirmDel] = useState(null) // { id, name }
  const [showWajibModal, setShowWajibModal] = useState(false)
  const [showTabunganModal, setShowTabunganModal] = useState(false)
  const [showRencanaModal, setShowRencanaModal] = useState(false)
  const [showGajiModal, setShowGajiModal] = useState(false)
  const [gajiForm, setGajiForm] = useState({ amount: '', note: '' })
  const [gajiSaving, setGajiSaving] = useState(false)
  const [showMonthPicker, setShowMonthPicker] = useState(false)
  const [pickerYear, setPickerYear] = useState(() => Number(getCurrentMonth().split('-')[0]))

  useEffect(() => {
    if (user.recording_start_month && month < user.recording_start_month) {
      goToMonth(user.recording_start_month)
      return
    }
    fetchDashboard()
  }, [month, user?.recording_start_month])

  useEffect(() => {
    const isCurrent = month === getCurrentMonth()
    const isAtStart = !!user.recording_start_month && month <= user.recording_start_month
    const [rsY, rsM] = user.recording_start_month ? user.recording_start_month.split('-').map(Number) : [0, 0]
    const nowStr = getCurrentMonth()
    const [nowY, nowM] = nowStr.split('-').map(Number)
    const MONTHS = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des']
    setHeader(
      <>
        {showMonthPicker && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 299 }} onClick={() => setShowMonthPicker(false)} />
        )}
        <div className="month-nav-group">
          <button className="month-btn" onClick={() => goToMonth(prevMonth(month))} disabled={isAtStart}>‹</button>
          <span
            className="month-label-text month-label-clickable"
            onClick={() => { setPickerYear(Number(month.split('-')[0])); setShowMonthPicker(v => !v) }}
          >
            {getMonthLabel(month)}
          </span>
          <button className="month-btn" onClick={() => goToMonth(nextMonth(month))} disabled={isCurrent}>›</button>
          {showMonthPicker && (
            <div className="month-picker-popup" onMouseDown={e => e.preventDefault()}>
              <div className="mp-year-row">
                <button className="mp-year-btn" onClick={() => setPickerYear(y => y - 1)} disabled={!!user.recording_start_month && pickerYear <= rsY}>‹</button>
                <span className="mp-year-label">{pickerYear}</span>
                <button className="mp-year-btn" onClick={() => setPickerYear(y => y + 1)} disabled={pickerYear >= nowY}>›</button>
              </div>
              <div className="mp-grid">
                {MONTHS.map((name, i) => {
                  const m = i + 1
                  const val = `${pickerYear}-${String(m).padStart(2, '0')}`
                  const isFuture = pickerYear > nowY || (pickerYear === nowY && m > nowM)
                  const isPast = !!user.recording_start_month && (pickerYear < rsY || (pickerYear === rsY && m < rsM))
                  return (
                    <button
                      key={val}
                      className={`mp-month-btn${val === month ? ' mp-active' : ''}`}
                      disabled={isFuture || isPast}
                      onClick={() => { goToMonth(val); setShowMonthPicker(false) }}
                    >
                      {name}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
        <div className="topbar-actions">
          <button className="btn btn-primary btn-sm" style={{ fontSize: '0.78rem', height: 34 }} onClick={() => setShowTxForm(true)}>+ Transaksi</button>
        </div>
      </>
    )
    return () => setHeader(null)
  }, [month, showMonthPicker, pickerYear, user?.recording_start_month])

  const goToMonth = (m) => { setMonth(m); setSearchParams({ month: m }) }

  const fetchDashboard = async () => {
    setLoading(true)
    try {
      const startDate = `${month}-01`
      const [ey, em] = month.split('-').map(Number)
      const endDate = getMonthEndDate(month)
      const today = getToday()
      const nmStr = nextMonth(month)
      const recordStart = user.recording_start_month
      // Transaksi dari recording_start_month s/d sebelum bulan ini — lt(startDate) hindari invalid endDate
      let histQuery = supabase.from('transactions').select('amount, type').eq('user_id', user.id).lt('date', startDate)
      if (recordStart) histQuery = histQuery.gte('date', `${recordStart}-01`)

      let allLogsQuery = supabase.from('category_budgets').select('budget_limit, category_id, month').eq('user_id', user.id).lte('month', month)
      if (recordStart) allLogsQuery = allLogsQuery.gte('month', recordStart)

      const [txRes, catRes, savingsRes, logsRes, todayRes, catBudgetsRes, allLogsRes, plansRes, histRes, hutangRes, hutangTabunganRes] = await Promise.all([
        supabase.from('transactions').select('*, categories(name, color, icon)').eq('user_id', user.id).gte('date', startDate).lte('date', endDate).order('date', { ascending: false }),
        supabase.from('categories').select('*').eq('user_id', user.id).order('name'),
        supabase.from('savings').select('*').eq('user_id', user.id),
        supabase.from('savings_log').select('*').eq('user_id', user.id).eq('month', month),
        supabase.from('transactions').select('amount').eq('user_id', user.id).eq('date', today).eq('type', 'expense'),
        supabase.from('category_budgets').select('category_id, budget_limit').eq('user_id', user.id).eq('month', month),
        allLogsQuery,
        supabase.from('plans').select('*').eq('user_id', user.id).eq('target_month', nmStr).eq('done', false).order('created_at', { ascending: true }),
        histQuery,
        supabase.from('hutang').select('id, nama, amount, due_date, sumber, jenis, lunas').eq('user_id', user.id).eq('month', month).eq('lunas', false).order('due_date', { ascending: true, nullsFirst: false }),
        supabase.from('hutang').select('id, nama, amount, jenis, lunas, created_at').eq('user_id', user.id).eq('month', month).eq('sumber', 'tabungan').order('created_at', { ascending: false }),
      ])
      const txs = txRes.data || []
      const catBudgetMap = {}
      ;(catBudgetsRes.data || []).forEach(cb => { catBudgetMap[cb.category_id] = Number(cb.budget_limit) })
      // Semua kategori (untuk cross-month calcs)
      const cats = (catRes.data || []).map(cat => ({
        ...cat,
        budget_limit: catBudgetMap[cat.id] !== undefined ? catBudgetMap[cat.id] : (cat.budget_limit || 0),
        budget_set: catBudgetMap[cat.id] !== undefined || (cat.budget_limit || 0) > 0,
      }))
      // Kategori bulan ini saja (untuk display budget section)
      const currentMonthCats = cats.filter(c => c.month === month)
      // Gaji: cari dari kategori bulan ini
      const gajiCat = currentMonthCats.find(c => c.name === 'Pemasukan Bulanan')
      const gajiTxs = gajiCat ? txs.filter(t => t.type === 'income' && t.category_id === gajiCat.id) : []
      const salary = gajiTxs.reduce((s, t) => s + Number(t.amount), 0)
      const totalExpense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
      const totalIncome = txs.filter(t => t.type === 'income' && t.category_id !== gajiCat?.id).reduce((s, t) => s + Number(t.amount), 0)
      const catSpendMap = {}
      txs.filter(t => t.type === 'expense' && t.categories).forEach(t => {
        const n = t.categories.name
        if (!catSpendMap[n]) catSpendMap[n] = { name: n, amount: 0, color: t.categories.color, icon: t.categories.icon }
        catSpendMap[n].amount += Number(t.amount)
      })
      const catsWithStatus = currentMonthCats.map(cat => {
        const spent = catSpendMap[cat.name]?.amount || 0
        const pct = cat.budget_limit > 0 ? (spent / cat.budget_limit) * 100 : null
        return { ...cat, spent, pct, overBudget: cat.budget_limit > 0 && spent > cat.budget_limit }
      }).sort((a, b) => {
        if (a.overBudget && !b.overBudget) return -1
        if (!a.overBudget && b.overBudget) return 1
        return (b.pct || 0) - (a.pct || 0)
      })
      setData({
        salary,
        totalExpense, totalIncome,
        categories: catsWithStatus,
        transactions: txs.slice(0, 5),
        savings: savingsRes.data || [],
        savingsLogs: logsRes.data || [],
        todayExpense: (todayRes.data || []).reduce((s, t) => s + Number(t.amount), 0),
        tabunganPerMonth: (allLogsRes.data || [])
          .filter(cb => { const c = cats.find(cat => cat.id === cb.category_id); return c && c.name === 'Tabungan Bulanan' })
          .sort((a, b) => a.month.localeCompare(b.month)),
        totalTabungan: (allLogsRes.data || [])
          .filter(cb => { const c = cats.find(cat => cat.id === cb.category_id); return c && c.name === 'Tabungan Bulanan' })
          .reduce((s, cb) => s + Number(cb.budget_limit), 0)
          + (user.tabungan_awal || 0)
          - (hutangTabunganRes.data || []).filter(h => !h.lunas).reduce((s, h) => s + Number(h.amount), 0),
        categorySpend: Object.values(catSpendMap).sort((a, b) => b.amount - a.amount),
        nextMonthPlans: plansRes.data || [],
        gajiTx: gajiTxs[0] || null,
        gajiCatId: gajiCat?.id || null,
        hutangList: hutangRes.data || [],
        hutangTabunganList: hutangTabunganRes.data || [],
        // histNet (bulan lalu) + bulan ini + saldo_awal = total kumulatif semua transaksi
        cumulativeBalance: (histRes.data || []).reduce((s, t) => s + (t.type === 'income' ? Number(t.amount) : -Number(t.amount)), 0)
          + salary + totalIncome - totalExpense
          + (user.saldo_awal || 0),
        cumulativeMandatoryBudget: (allLogsRes.data || [])
          .filter(cb => { const c = cats.find(cat => cat.id === cb.category_id); return c && isMandatory(c) })
          .reduce((s, cb) => s + Number(cb.budget_limit), 0),
      })
      // Auto-set 15% untuk mandatory categories yang belum pernah punya record (bukan yang di-set 0)
      const sal = salary
      if (sal > 0) {
        const unset = cats.filter(c => isMandatory(c) && catBudgetMap[c.id] === undefined)
        if (unset.length > 0) {
          const def = Math.round(Number(sal) * 0.15)
          await Promise.all(unset.map(c =>
            supabase.from('category_budgets').upsert(
              { user_id: user.id, category_id: c.id, month, budget_limit: def },
              { onConflict: 'category_id,month' }
            )
          ))
          // Reload categories dengan budget yang sudah diupdate
          const { data: catRefresh } = await supabase.from('categories').select('*').eq('user_id', user.id).order('name')
          catRes.data = catRefresh
        }
      }
    } finally { setLoading(false) }
  }

  const openBudgetEdit = (cat) => {
    const nominal = String(Math.round(cat.budget_limit || 0))
    const pct = data.salary > 0 && cat.budget_limit > 0
      ? ((cat.budget_limit / data.salary) * 100).toFixed(1)
      : ''
    setBudgetEdit({ id: cat.id, nominal, pct })
  }

  const handleBudgetNominalChange = (raw) => {
    const nom = parseFloat(raw) || 0
    const pct = data.salary > 0 && nom > 0 ? ((nom / data.salary) * 100).toFixed(1) : ''
    setBudgetEdit(b => ({ ...b, nominal: raw, pct }))
  }

  const handleBudgetPctChange = (val) => {
    const p = parseFloat(val) || 0
    const nom = data.salary > 0 && p > 0 ? String(Math.round((p / 100) * data.salary)) : ''
    setBudgetEdit(b => ({ ...b, pct: val, nominal: nom }))
  }

  const saveBudget = async () => {
    const amount = parseFloat(budgetEdit.nominal) || 0
    await supabase.from('category_budgets').upsert(
      { user_id: user.id, category_id: budgetEdit.id, month, budget_limit: amount },
      { onConflict: 'category_id,month' }
    )
    toast('Budget disimpan', 'success')
    setBudgetEdit(null)
    fetchDashboard()
  }

  const doDeleteCat = async () => {
    await supabase.from('categories').delete().eq('id', confirmDel.id)
    toast('Kategori dihapus', 'success')
    setConfirmDel(null)
    fetchDashboard()
  }

  const totalBudget = data.categories.filter(c => c.budget_limit > 0).reduce((s, c) => s + c.budget_limit, 0)
  const isCurrentMonth = month === getCurrentMonth()
  const overBudgetCats = data.categories.filter(c => c.overBudget)

  // Mandatory: hanya pakai budget yang sudah di-set secara eksplisit
  const mandatoryBudgetTotal = data.categories
    .filter(c => isMandatory(c))
    .reduce((s, c) => s + Number(c.budget_limit || 0), 0)
  const mandatoryTransactionSpent = data.categories
    .filter(c => isMandatory(c))
    .reduce((s, c) => s + (c.spent || 0), 0)
  const mandatoryAutoDeduct = Math.max(0, mandatoryBudgetTotal - mandatoryTransactionSpent)

  const effectiveExpense = data.totalExpense + mandatoryAutoDeduct
  const balance = data.salary + data.totalIncome - effectiveExpense
  const budgetUsed = data.salary > 0 ? (effectiveExpense / data.salary) * 100 : 0

  // Alokasi tabungan dari kategori mandatory "Tabungan Bulanan"
  const monthlyTabungan = data.categories
    .filter(c => c.name === 'Tabungan Bulanan' && c.budget_limit > 0)
    .reduce((s, c) => s + Number(c.budget_limit), 0)

  // cumulativeBalance sudah include semua transaksi + saldo_awal
  // cumulativeMandatoryBudget = total mandatory budget dari recording_start s/d bulan ini
  const totalSaldo = data.cumulativeBalance - data.cumulativeMandatoryBudget
  // Sisa belanja bulan ini
  const freeBalance = data.salary - data.totalExpense - monthlyTabungan
  const spendingPct = data.salary > 0 ? (data.totalExpense / data.salary) * 100 : 0
  const heroBarColor = spendingPct > 90 ? 'var(--danger)' : spendingPct > 70 ? 'var(--warning)' : 'var(--accent)'

  const batasBelanja = data.salary > 0 ? data.salary - monthlyTabungan : 0
  const sisaBelanja = batasBelanja - data.totalExpense
  const overBatasBelanja = data.salary > 0 && monthlyTabungan > 0 && data.totalExpense > batasBelanja

  return (
    <div className="animate-in">

      {/* ── Overbudget alert ─────────────────── */}
      {overBudgetCats.length > 0 && (
        <div className="alert-banner">
          <IconAlertTriangle size={15} />
          <span><strong>Overbudget</strong> — {overBudgetCats.map(c => c.name).join(', ')}</span>
        </div>
      )}

      {/* ── Sections ─────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* ── Hero Saldo ───────────────────────── */}
      <div className="hero-card">
        {loading ? (
          <div className="skeleton" style={{ height: 88, borderRadius: 8 }} />
        ) : (
          <>
            <div className="hero-top">
              <div className="hero-left">
        <span className="hero-eyebrow">Total Saldo</span>
                <div className={`hero-balance ${totalSaldo < 0 ? 'neg' : ''}`}>
                  {totalSaldo < 0 && <span className="hero-neg-sign">-</span>}
                  {formatCurrency(Math.abs(totalSaldo))}
                </div>
              </div>
              <div className="hero-right">
                <div className="hero-chip hero-chip-btn" onClick={() => {
                  setGajiForm({ amount: data.gajiTx ? String(data.gajiTx.amount) : '', note: data.gajiTx?.description || '' })
                  setShowGajiModal(true)
                }}>
                  <span className="hero-chip-label">Pemasukan Bulanan</span>
                  <span className="hero-chip-val tabular" style={{ color: data.salary > 0 ? 'var(--success)' : 'var(--text-muted)' }}>
                    {formatCurrency(data.salary)}
                  </span>
                  <span className="hero-chip-cta">
                    {data.salary > 0 ? 'Lihat detail →' : '+ Catat sekarang'}
                  </span>
                </div>
                <div className="hero-chip hero-chip-btn" onClick={() => setShowWajibModal(true)}>
                  <span className="hero-chip-label">Pengeluaran Wajib</span>
                  <span className="hero-chip-val tabular" style={{ color: mandatoryBudgetTotal > 0 ? 'var(--danger)' : 'var(--text-muted)' }}>
                    {mandatoryBudgetTotal > 0 ? `−${formatCurrency(mandatoryBudgetTotal)}` : '—'}
                  </span>
                  <span className="hero-chip-cta">Lihat detail →</span>
                </div>
                <div className="hero-chip hero-chip-btn" onClick={() => setShowTabunganModal(true)}>
                  <span className="hero-chip-label">Total Tabungan</span>
                  <span className="hero-chip-val tabular" style={{ color: data.totalTabungan > 0 ? 'var(--success)' : 'var(--text-muted)' }}>
                    {formatCurrency(data.totalTabungan)}
                  </span>
                  <span className="hero-chip-cta">Lihat detail →</span>
                </div>
              </div>
            </div>


            {/* ── 3 section bawah ── */}
            <div className="hero-stats-row">
              {(() => {
                const nonMandatoryExp = data.totalExpense - mandatoryTransactionSpent
                return (
                  <div className="hero-stat">
                    <span className="hero-stat-label">Total Pengeluaran</span>
                    <span className="hero-stat-val" style={{ color: nonMandatoryExp > 0 ? 'var(--danger)' : 'var(--text-muted)' }}>
                      {nonMandatoryExp > 0 ? `−${formatCurrency(nonMandatoryExp)}` : '—'}
                    </span>
                    <span className="hero-stat-sub">diluar wajib & tabungan</span>
                  </div>
                )
              })()}
              <div className="hero-stat-divider" />
              {(() => {
                const budget = user.budget_harian || 0
                const spent = data.todayExpense
                const pct = budget > 0 ? spent / budget : 0
                const over = budget > 0 && spent >= budget
                const near = budget > 0 && pct >= 0.8 && !over
                const ok = budget > 0 && spent > 0 && pct < 0.8
                const dayColor = over ? 'var(--danger)' : near ? 'var(--warning)' : spent > 0 ? 'var(--danger)' : 'var(--text-muted)'
                return (
                  <div className="hero-stat">
                    <span className="hero-stat-label">Hari Ini</span>
                    <span className="hero-stat-val" style={{ color: dayColor }}>
                      {spent > 0 ? `−${formatCurrency(spent)}` : '—'}
                    </span>
                    {over
                      ? <span className="hero-stat-sub" style={{ color: 'var(--danger)', fontWeight: 600 }}>melebihi budget harian</span>
                      : near
                        ? <span className="hero-stat-sub" style={{ color: 'var(--warning)', fontWeight: 600 }}>mendekati budget harian</span>
                        : ok
                          ? <span className="hero-stat-sub" style={{ color: 'var(--success)', fontWeight: 600 }}>dalam budget harian</span>
                          : <span className="hero-stat-sub">pengeluaran</span>
                    }
                  </div>
                )
              })()}
              <div className="hero-stat-divider" />
              <div className="hero-stat hero-stat-btn" onClick={() => setShowRencanaModal(true)}>
                <span className="hero-stat-label">Rencana Bulan Depan</span>
                <span className="hero-stat-val" style={{ color: data.nextMonthPlans.length > 0 ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {data.nextMonthPlans.length > 0 ? formatCurrency(data.nextMonthPlans.reduce((s, p) => s + Number(p.amount), 0)) : '—'}
                </span>
                <span className="hero-stat-sub" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                  {data.nextMonthPlans.length > 0 ? `${data.nextMonthPlans.length} item · See Detail` : 'Belum ada'}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="dash-two-col">
      {/* ── Budget Bulan Ini ─────────────────── */}
      {(() => {
        const rutinCats = data.categories.filter(c => !isMandatory(c) && !isMandatoryIncome(c) && c.is_monthly && c.budget_limit > 0)
        const regularCats = data.categories.filter(c => !isMandatory(c) && !isMandatoryIncome(c) && !c.is_monthly && c.budget_limit > 0)
        const hutangAktif = (data.hutangList || []).filter(h => h.jenis === 'hutang')
        const piutangAktif = (data.hutangList || []).filter(h => h.jenis === 'piutang')
        const isEmpty = !loading && rutinCats.length === 0 && regularCats.length === 0 && hutangAktif.length === 0 && piutangAktif.length === 0
        const allCats = [...rutinCats, ...regularCats]
        const totalBudget = allCats.reduce((s, c) => s + Number(c.budget_limit), 0)
        const totalSpent = allCats.reduce((s, c) => s + Number(c.spent || 0), 0)
        const totalSisa = totalBudget - totalSpent
        const totalPct = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0
        const totalColor = totalPct >= 100 ? 'var(--danger)' : totalPct >= 80 ? 'var(--warning)' : 'var(--accent)'

        const BudgetRow = ({ cat }) => {
          const rawPct = cat.budget_limit > 0 ? (cat.spent / cat.budget_limit) * 100 : 0
          const pct = Math.min(rawPct, 100)
          const isOver = rawPct > 100
          const isFull = !isOver && rawPct >= 100
          const isNear = !isOver && rawPct >= 80 && rawPct < 100
          const barColor = isOver ? 'var(--danger)' : isFull ? 'var(--success)' : isNear ? 'var(--warning)' : cat.color || 'var(--accent)'
          const sisa = cat.budget_limit - (cat.spent || 0)
          return (
            <div className="brow">
              <div className="brow-left">
                <span className="brow-icon" style={{ background: `${cat.color || '#6366f1'}18` }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color || 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
                </span>
                <div style={{ minWidth: 0 }}>
                  <span className="brow-name">{cat.name}</span>
                  {isOver && <span className="badge badge-danger" style={{ fontSize: '0.6rem', padding: '2px 6px', marginLeft: 6 }}>Over</span>}
                  {isFull && <span className="badge badge-success" style={{ fontSize: '0.6rem', padding: '2px 6px', marginLeft: 6 }}>Penuh</span>}
                  {isNear && <span className="badge badge-warning" style={{ fontSize: '0.6rem', padding: '2px 6px', marginLeft: 6 }}>Hampir</span>}
                  {cat.budget_limit === 0 && <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginLeft: 6 }}>belum diset</span>}
                </div>
              </div>
              {cat.budget_limit > 0 ? (
                <>
                  <div className="brow-bar-wrap">
                    <div className="brow-bar">
                      <div className="brow-bar-fill" style={{ width: `${pct}%`, background: barColor }} />
                    </div>
                  </div>
                  <div className="brow-right">
                    <span className="brow-spent tabular" style={{ color: isOver ? 'var(--danger)' : 'var(--text-primary)' }}>{formatCurrency(cat.spent || 0)}</span>
                    <span className="brow-limit tabular" style={{ color: sisa < 0 ? 'var(--danger)' : sisa === 0 ? 'var(--text-muted)' : 'var(--success)' }}>
                      {sisa < 0 ? `Over ${formatCurrency(Math.abs(sisa))}` : `Sisa ${formatCurrency(sisa)}`}
                    </span>
                  </div>
                  <span className="brow-pct" style={{ color: barColor }}>{rawPct.toFixed(0)}%</span>
                </>
              ) : (
                <div style={{ flex: 1 }} />
              )}
            </div>
          )
        }

        return (
          <div className="card">
            <div className="sect-head" style={{ marginBottom: 14 }}>
              <div>
                <h3 className="sect-title">Budget Bulan Ini</h3>
              </div>
              <Link to={`/categories?month=${month}`} className="pill-link">⚙ Atur</Link>
            </div>

            <div className="card-scroll-body">
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 44 }} />)}
              </div>
            ) : isEmpty ? (
              <div className="empty-hint">
                <span className="empty-hint-icon"><IconSettings size={14} /></span>
                <span>Tambahkan kategori dan budget</span>
                <Link to={`/categories?month=${month}`} className="empty-hint-link" style={{ color: 'var(--accent)' }}>Atur →</Link>
              </div>
            ) : (
              <>
                {/* Hutang & Piutang */}
                {(hutangAktif.length > 0 || piutangAktif.length > 0) && (
                  <>
                    <div className="budget-section-label">Hutang & Piutang</div>
                    <div className="budget-rows">
                      {[...hutangAktif, ...piutangAktif].map(h => {
                        const isPiutang = h.jenis === 'piutang'
                        const color = isPiutang ? '#f59e0b' : '#f87171'
                        const today2 = new Date(); today2.setHours(0,0,0,0)
                        const due = h.due_date ? new Date(h.due_date) : null
                        const diff = due ? Math.round((due - today2) / 86400000) : null
                        const overdue = diff !== null && diff < 0
                        return (
                          <div key={h.id} className="brow">
                            <div className="brow-left">
                              <span className="brow-icon" style={{ background: `${color}18`, color }}>
                                {isPiutang ? <IconArrowDownLeft size={13} /> : <IconArrowUpRight size={13} />}
                              </span>
                              <div style={{ minWidth: 0 }}>
                                <span className="brow-name">{h.nama}</span>
                                <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginLeft: 6 }}>
                                  {isPiutang ? 'piutang' : 'hutang'}
                                </span>
                                {overdue && <span className="badge badge-danger" style={{ fontSize: '0.6rem', padding: '2px 6px', marginLeft: 6 }}>Terlambat</span>}
                              </div>
                            </div>
                            <div style={{ flex: 1 }} />
                            <div className="brow-right">
                              <span className="brow-spent tabular" style={{ color }}>{formatCurrency(h.amount)}</span>
                              {h.due_date && (
                                <span className="brow-limit tabular" style={{ color: overdue ? 'var(--danger)' : diff <= 7 ? 'var(--warning)' : 'var(--text-muted)' }}>
                                  {diff === 0 ? 'Hari ini' : diff > 0 ? `${diff}h lagi` : `${Math.abs(diff)}h lalu`}
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}

                {/* Pengeluaran Rutin */}
                {(hutangAktif.length > 0 || piutangAktif.length > 0) && rutinCats.length > 0 && (
                  <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
                )}
                {rutinCats.length > 0 && (
                  <>
                    <div className="budget-section-label">Pengeluaran Rutin</div>
                    <div className="budget-rows">
                      {rutinCats.map(cat => <BudgetRow key={cat.id} cat={cat} />)}
                    </div>
                  </>
                )}

                {/* Kategori Lainnya */}
                {(rutinCats.length > 0 || hutangAktif.length > 0 || piutangAktif.length > 0) && regularCats.length > 0 && (
                  <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
                )}
                {regularCats.length > 0 ? (
                  <>
                    <div className="budget-section-label">Kategori Lainnya</div>
                    <div className="budget-rows">
                      {regularCats.map(cat => <BudgetRow key={cat.id} cat={cat} />)}
                    </div>
                  </>
                ) : (hutangAktif.length === 0 && piutangAktif.length === 0 && rutinCats.length === 0) && (
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Belum ada kategori dengan budget. <Link to={`/categories?month=${month}`} style={{ color: 'var(--accent)' }}>Atur →</Link>
                  </div>
                )}
              </>
            )}
            </div>{/* end card-scroll-body budget */}
          </div>
        )
      })()}


      {/* ── Transaksi terakhir ───────────────── */}
      <div className="card">
        <div className="sect-head">
          <h3 className="sect-title">Transaksi Terakhir</h3>
          <Link to={`/transactions?month=${month}`} className="pill-link">Lihat semua</Link>
        </div>
        <div className="card-scroll-body">
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 42 }} />)}
          </div>
        ) : data.transactions.length === 0 ? (
          <div className="empty-hint">
            <span className="empty-hint-icon"><IconArrowUp size={13} /></span>
            <span>Belum ada transaksi bulan ini. </span>
            <button className="empty-hint-link" onClick={() => setShowTxForm(true)}>Tambah sekarang →</button>
          </div>
        ) : (
          <div className="tx-list">
            {data.transactions.map(tx => (
              <div key={tx.id} className="tx-row">
                <div className="tx-icon" style={{ background: tx.type === 'income' ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)', color: tx.type === 'income' ? 'var(--success)' : 'var(--danger)' }}>
                  {tx.type === 'income' ? <IconArrowUp size={14} /> : <IconArrowDown size={14} />}
                </div>
                <div className="tx-meta">
                  <span className="tx-desc">{tx.description || tx.categories?.name || 'Transaksi'}</span>
                  <span className="tx-date">{new Date(tx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                </div>
                <span className={`tx-amount tabular ${tx.type === 'income' ? 'inc' : 'exp'}`}>
                  {tx.type === 'income' ? '+' : '−'}{formatCurrency(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
        </div>{/* end card-scroll-body tx */}
      </div>
      </div>{/* end dash-two-col */}

      </div>{/* end sections gap wrapper */}

      {/* ── Modals ───────────────────────────── */}
      {/* ── Gaji Modal ──────────────────────── */}
      {showGajiModal && (() => {
        const hasGaji = data.salary > 0

        const saveGaji = async () => {
          const amount = parseFloat(gajiForm.amount.replace(/\D/g, '')) || 0
          if (!amount) return
          setGajiSaving(true)
          const txDate = `${month}-01`
          if (data.gajiTx) {
            await supabase.from('transactions').update({ amount, description: gajiForm.note, date: txDate }).eq('id', data.gajiTx.id)
          } else {
            await supabase.from('transactions').insert({ user_id: user.id, category_id: data.gajiCatId, type: 'income', amount, description: gajiForm.note, date: txDate })
          }
          toast('Pemasukan disimpan', 'success')
          setGajiSaving(false)
          setShowGajiModal(false)
          fetchDashboard()
        }

        return (
          <div className="modal-overlay" onClick={() => setShowGajiModal(false)}>
            <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h2 className="modal-title">Pemasukan Bulanan {getMonthLabel(month)}</h2>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    {hasGaji ? 'Edit jumlah atau catatan' : 'Catat pemasukan bulan ini'}
                  </p>
                </div>
                <button className="btn btn-ghost" onClick={() => setShowGajiModal(false)}>✕</button>
              </div>

              <div className="form-group">
                <label className="form-label">Jumlah Pemasukan</label>
                <CurrencyInput
                  value={gajiForm.amount}
                  onChange={v => setGajiForm(f => ({ ...f, amount: v }))}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label">Catatan {!hasGaji && <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(opsional)</span>}</label>
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Misal: gaji pokok + bonus, tunjangan, dll..."
                  value={gajiForm.note}
                  onChange={e => setGajiForm(f => ({ ...f, note: e.target.value }))}
                  style={{ resize: 'vertical', fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                />
              </div>

              <div className="flex gap-8 mt-16">
                <button className="btn btn-secondary" onClick={() => setShowGajiModal(false)}>Batal</button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={saveGaji} disabled={gajiSaving || !gajiForm.amount}>
                  {gajiSaving ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </div>
          </div>
        )
      })()}

      {/* ── Tabungan Modal ──────────────────── */}
      {showTabunganModal && (
        <div className="modal-overlay" onClick={() => setShowTabunganModal(false)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Total Tabungan</h2>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>Akumulasi s/d {getMonthLabel(month)}</p>
              </div>
              <button className="btn btn-ghost" onClick={() => setShowTabunganModal(false)}>✕</button>
            </div>

            <div className="wajib-rows">
              {/* Saldo awal */}
              {(user.tabungan_awal || 0) > 0 && (
                <div className="wajib-row">
                  <div className="wajib-left">
                    <span className="brow-icon" style={{ background: 'rgba(52,211,153,0.12)', color: 'var(--success)', fontSize: '0.55rem', fontWeight: 800 }}>AWAL</span>
                    <div>
                      <div className="brow-name">Saldo Awal Tabungan</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>sebelum mulai record</div>
                    </div>
                  </div>
                  <span className="wajib-amount tabular" style={{ color: 'var(--success)' }}>{formatCurrency(user.tabungan_awal)}</span>
                </div>
              )}

              {/* Per-bulan Tabungan Bulanan */}
              {data.tabunganPerMonth.length === 0 && !(user.tabungan_awal > 0) ? (
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '8px 0' }}>
                  Belum ada alokasi tabungan. Set budget kategori "Tabungan Bulanan".
                </div>
              ) : data.tabunganPerMonth.map(cb => (
                <div key={cb.month} className="wajib-row">
                  <div className="wajib-left">
                    <span className="brow-icon" style={{ background: 'rgba(52,211,153,0.12)', color: 'var(--success)' }}><IconArrowDown size={13} /></span>
                    <div>
                      <div className="brow-name">{getMonthLabel(cb.month)}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Tabungan Bulanan</div>
                    </div>
                  </div>
                  <span className="wajib-amount tabular" style={{ color: Number(cb.budget_limit) > 0 ? 'var(--success)' : 'var(--text-muted)' }}>
                    +{formatCurrency(cb.budget_limit)}
                  </span>
                </div>
              ))}

              {/* Hutang & piutang tabungan aktif bulan ini */}
              {data.hutangTabunganList.filter(h => !h.lunas).length > 0 && (
                <>
                  <div className="wajib-divider" style={{ margin: '8px 0' }} />
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 4 }}>
                    Outstanding bulan ini
                  </div>
                  {data.hutangTabunganList.filter(h => !h.lunas).map(h => (
                    <div key={h.id} className="wajib-row">
                      <div className="wajib-left">
                        <span className="brow-icon" style={{
                          background: h.jenis === 'piutang' ? 'rgba(245,158,11,0.1)' : 'rgba(248,113,113,0.1)',
                          color: h.jenis === 'piutang' ? 'var(--warning)' : 'var(--danger)',
                          fontSize: '0.9rem'
                        }}>
                          {h.jenis === 'piutang' ? <IconArrowDownLeft size={13} /> : <IconArrowUpRight size={13} />}
                        </span>
                        <div>
                          <div className="brow-name">{h.nama}</div>
                          <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>{h.jenis === 'hutang' ? 'Hutang' : 'Piutang'}</div>
                        </div>
                      </div>
                      <span className="wajib-amount tabular" style={{ color: 'var(--danger)' }}>−{formatCurrency(h.amount)}</span>
                    </div>
                  ))}
                </>
              )}

              {/* Total */}
              <div className="wajib-divider" style={{ margin: '10px 0' }} />
              <div className="wajib-row" style={{ paddingTop: 4 }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>Total Tabungan</span>
                <span className="wajib-amount tabular" style={{ color: data.totalTabungan > 0 ? 'var(--success)' : 'var(--text-muted)', fontWeight: 800 }}>
                  {formatCurrency(data.totalTabungan)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Rencana Bulan Depan Modal ──────────── */}
      {showRencanaModal && (
        <div className="modal-overlay" onClick={() => setShowRencanaModal(false)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Rencana Bulan Depan</h2>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{getMonthLabel(nextMonth(month))}</p>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Link to="/savings" className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem' }} onClick={() => setShowRencanaModal(false)}>Kelola →</Link>
                <button className="btn btn-ghost" onClick={() => setShowRencanaModal(false)}>✕</button>
              </div>
            </div>
            {data.nextMonthPlans.length === 0 ? (
              <div className="empty-hint">
                <span className="empty-hint-icon"><IconArrowUpRight size={13} /></span>
                <span>Belum ada rencana untuk {getMonthLabel(nextMonth(month))}.</span>
                <Link to="/savings" className="empty-hint-link" onClick={() => setShowRencanaModal(false)}>Tambah →</Link>
              </div>
            ) : (
              <div className="wajib-rows">
                {data.nextMonthPlans.map(plan => (
                  <div key={plan.id} className="wajib-row">
                    <span className="brow-name">{plan.name}</span>
                    <span className="wajib-amount tabular">{formatCurrency(plan.amount)}</span>
                  </div>
                ))}
                <div className="wajib-divider" />
                <div className="wajib-row" style={{ paddingTop: 10 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>Total</span>
                  <span className="wajib-amount tabular">
                    {formatCurrency(data.nextMonthPlans.reduce((s, p) => s + Number(p.amount), 0))}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Keuangan Wajib Modal ────────────── */}
      {showWajibModal && (
        <div className="modal-overlay" onClick={() => setShowWajibModal(false)}>
          <div className="modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Pengeluaran Tetap</h2>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{getMonthLabel(month)}</p>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem' }} onClick={() => { setShowWajibModal(false); setShowCatManager(true) }}>Kelola</button>
                <button className="btn btn-ghost" onClick={() => setShowWajibModal(false)}>✕</button>
              </div>
            </div>

            <div className="wajib-rows">
              {data.categories.filter(c => isMandatory(c)).map(cat => {
                const budget = cat.budget_set ? Number(cat.budget_limit) : (data.salary > 0 ? Math.round(data.salary * 0.15) : 0)
                const salPct = data.salary > 0 && budget > 0 ? Math.round((budget / data.salary) * 100) : null
                return (
                  <div key={cat.id} className="wajib-row">
                    <div className="wajib-left">
                      <span className="brow-icon" style={{ background: 'rgba(248,113,113,0.12)', color: 'var(--danger)' }}><IconArrowDown size={13} /></span>
                      <span className="brow-name">{cat.name}</span>
                    </div>
                    <div className="wajib-right">
                      {salPct && <span className="wajib-pct">{salPct}%</span>}
                      <span className="wajib-amount tabular">{budget > 0 ? formatCurrency(budget) : '—'}</span>
                    </div>
                  </div>
                )
              })}

              <div className="wajib-divider" />
              <div className="wajib-row" style={{ paddingTop: 10 }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>Total Potongan</span>
                <span className="wajib-amount tabular" style={{ color: 'var(--danger)' }}>−{formatCurrency(mandatoryBudgetTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTxForm && (
        <div className="modal-overlay" onClick={() => setShowTxForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Tambah Transaksi</h2>
              <button className="btn btn-ghost" onClick={() => setShowTxForm(false)}>✕</button>
            </div>
            <TransactionForm month={month} onSuccess={() => { fetchDashboard(); setShowTxForm(false) }} onClose={() => setShowTxForm(false)} />
          </div>
        </div>
      )}

      {/* ── Category Manager Modal ───────────── */}
      {showCatManager && !budgetEdit && !showCatForm && (
        <div className="modal-overlay" onClick={() => setShowCatManager(false)}>
          <div className="modal cat-manager-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Kelola Kategori</h2>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{getMonthLabel(month)}</p>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button className="btn btn-primary btn-sm" onClick={() => { setEditCatData({ is_mandatory: true }); setShowCatForm(true) }}>+ Kategori</button>
                <button className="btn btn-ghost" onClick={() => setShowCatManager(false)}>✕</button>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <p className="cat-mgr-section-title">Pengeluaran Wajib</p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {data.categories.filter(c => isMandatory(c)).map(cat => {
                  const budget = Number(cat.budget_limit) || 0
                  const salPct = data.salary > 0 && budget > 0 ? Math.round((budget / data.salary) * 100) : null
                  return (
                    <div key={cat.id} className="cat-mgr-row">
                      <div className="cat-mgr-left">
                        <span className="cat-mgr-icon" style={{ background: 'rgba(248,113,113,0.12)', color: 'var(--danger)' }}><IconArrowDown size={14} /></span>
                        <div>
                          <span className="cat-mgr-name">{cat.name}</span>
                          <span className="cat-mgr-sub">Wajib · langsung dipotong</span>
                        </div>
                      </div>
                      <div className="cat-mgr-right">
                        {salPct && <span className="cat-mgr-pct">{salPct}%</span>}
                        <span className="cat-mgr-amount tabular">{budget > 0 ? formatCurrency(budget) : '—'}</span>
                        <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.7rem' }} onClick={() => openBudgetEdit(cat)}>Ubah</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── Budget Edit Modal ────────────────── */}
      {budgetEdit && (() => {
        const cat = data.categories.find(c => c.id === budgetEdit.id)
        return (
          <div className="modal-overlay" onClick={() => setBudgetEdit(null)}>
            <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h2 className="modal-title">Pengeluaran Wajib — {cat?.name}</h2>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    {getMonthLabel(month)}{data.salary > 0 ? ` · ${formatCurrency(data.salary)}` : ''}
                  </p>
                </div>
                <button className="btn btn-ghost" onClick={() => setBudgetEdit(null)}>✕</button>
              </div>

              {data.salary > 0 && (
                <div className="form-group">
                  <label className="form-label">Persentase dari gaji</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <input
                        className="form-input"
                        type="number"
                        placeholder={String(DEFAULT_PCT)}
                        value={budgetEdit.pct}
                        onChange={e => handleBudgetPctChange(e.target.value)}
                        min="0" max="100" step="0.5"
                        style={{ paddingRight: 36 }}
                      />
                      <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.85rem' }}>%</span>
                    </div>
                    {budgetEdit.pct && data.salary > 0 && (
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        = {formatCurrency(Math.round((parseFloat(budgetEdit.pct) / 100) * data.salary))}
                      </span>
                    )}
                  </div>
                  {!budgetEdit.pct && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                      {[10, 15, 20, 25].map(p => (
                        <button key={p} className="btn btn-secondary btn-sm" onClick={() => handleBudgetPctChange(String(p))}>{p}%</button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Atau nominal langsung</label>
                <CurrencyInput
                  value={budgetEdit.nominal}
                  onChange={handleBudgetNominalChange}
                  autoFocus={!data.salary}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ color: 'var(--danger)', fontSize: '0.78rem' }}
                  onClick={() => { setBudgetEdit(null); setConfirmDel({ id: cat.id, name: cat.name }) }}
                >
                  Hapus Kategori
                </button>
                <div className="flex gap-8">
                  <button className="btn btn-secondary" onClick={() => setBudgetEdit(null)}>Batal</button>
                  <button className="btn btn-primary" onClick={saveBudget}>Simpan</button>
                </div>
              </div>
            </div>
          </div>
        )
      })()}

      {/* ── Confirm Delete Category ─────────── */}
      {confirmDel && (
        <ConfirmModal
          title="Hapus Kategori"
          message={`Hapus kategori "${confirmDel.name}"? Transaksi yang terhubung tidak akan ikut terhapus.`}
          confirmLabel="Hapus"
          onConfirm={doDeleteCat}
          onCancel={() => setConfirmDel(null)}
        />
      )}

      {/* ── Category Add/Edit Form Modal ─────── */}
      {showCatForm && (
        <div className="modal-overlay" onClick={() => setShowCatForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editCatData?.id ? 'Edit Kategori' : 'Kategori Baru'}</h2>
              <button className="btn btn-ghost" onClick={() => setShowCatForm(false)}>✕</button>
            </div>
            <CategoryForm
              editData={editCatData}
              salary={data.salary}
              month={month}
              onSuccess={() => { fetchDashboard(); setShowCatForm(false) }}
              onClose={() => setShowCatForm(false)}
            />
          </div>
        </div>
      )}

      <style>{`
        /* ── Month Picker Popup ───────────────── */

        /* ── Month Picker Popup ───────────────── */
        .month-picker-popup {
          position: absolute; top: calc(100% + 8px); left: 0;
          z-index: 300; width: 224px;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          padding: 12px;
        }
        .mp-year-row {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 10px;
        }
        .mp-year-btn {
          width: 28px; height: 28px; border: none; background: transparent;
          color: var(--text-secondary); font-size: 1rem; cursor: pointer;
          border-radius: var(--radius-sm); display: flex; align-items: center;
          justify-content: center; transition: all 0.15s; font-family: var(--font-sans);
        }
        .mp-year-btn:hover:not(:disabled) { background: var(--bg-input); color: var(--text-primary); }
        .mp-year-btn:disabled { opacity: 0.2; cursor: not-allowed; }
        .mp-year-label {
          font-size: 0.875rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em;
        }
        .mp-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px;
        }
        .mp-month-btn {
          padding: 7px 0; border: 1px solid transparent; background: transparent;
          color: var(--text-secondary); font-size: 0.75rem; font-weight: 600;
          border-radius: var(--radius-sm); cursor: pointer; transition: all 0.12s;
          font-family: var(--font-sans);
        }
        .mp-month-btn:hover:not(:disabled) {
          background: var(--bg-input); color: var(--text-primary); border-color: var(--border);
        }
        .mp-month-btn:disabled { opacity: 0.2; cursor: not-allowed; }
        .mp-month-btn.mp-active {
          background: var(--accent); color: #fff; border-color: var(--accent); font-weight: 700;
        }

        /* ── Alert ────────────────────────────── */
        .alert-banner {
          display: flex; align-items: center; gap: 9px;
          background: var(--danger-dim); border: 1px solid rgba(248,113,113,0.3);
          border-radius: var(--radius-sm); padding: 10px 14px;
          font-size: 0.78rem; color: var(--danger); margin-bottom: 14px; font-weight: 500;
        }

        /* ── Hero ─────────────────────────────── */
        .hero-card {
          background: var(--hero-bg);
          border: 1px solid var(--hero-border);
          border-radius: var(--radius-lg);
          padding: 22px 24px;
          position: relative; overflow: hidden;
        }
        .hero-card::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 100% 0%, rgba(99,102,241,0.07) 0%, transparent 55%);
          pointer-events: none;
        }
        .hero-top {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 14px;
        }
        .hero-left {}
        .hero-date {
          font-size: 0.72rem; font-weight: 600; color: var(--hero-muted);
          display: block; margin-bottom: 10px; letter-spacing: 0.01em;
          text-transform: capitalize;
        }
        .hero-eyebrow {
          font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.09em;
          color: var(--hero-muted); font-weight: 600; display: block; margin-bottom: 5px;
        }
        .hero-balance {
          font-size: clamp(1.75rem, 5vw, 2.5rem);
          font-weight: 800; letter-spacing: -0.04em;
          color: var(--hero-text); font-variant-numeric: tabular-nums; line-height: 1;
        }
        .hero-balance.neg { color: var(--danger); }
        .hero-neg-sign { font-size: 0.7em; vertical-align: 0.05em; margin-right: 1px; }
        .hero-month-delta {
          display: block; font-size: 0.72rem; font-weight: 600;
          margin-top: 4px; letter-spacing: -0.01em;
        }

        .hero-right {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: auto;
          grid-auto-flow: column;
          gap: 8px;
          align-items: start;
        }
        .hero-chip {
          display: flex; flex-direction: column; align-items: flex-end; gap: 2px;
          background: var(--hero-chip-bg); border: 1px solid var(--hero-chip-border);
          border-radius: var(--radius-sm); padding: 8px 12px; min-width: 130px;
        }
        .hero-chip-btn {
          cursor: pointer; transition: border-color 0.15s, background 0.15s;
        }
        .hero-chip-btn:hover { border-color: var(--accent); background: var(--accent-dim); }
        .hero-chip-label {
          font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.07em;
          color: var(--hero-muted); font-weight: 600;
        }
        .hero-chip-val {
          font-size: 0.9rem; font-weight: 700;
          color: var(--hero-chip-val); letter-spacing: -0.02em;
        }
        .hero-chip-cta {
          font-size: 0.6rem; color: var(--accent); font-weight: 600; margin-top: 1px;
          opacity: 0.85;
        }
        .hero-chip-btn:hover .hero-chip-cta { opacity: 1; }

        .hero-bar-section {}
        .hero-stats-row {
          display: flex;
          align-items: stretch;
          gap: 0;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }
        .hero-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 0 12px;
        }
        .hero-stat:first-child { padding-left: 0; }
        .hero-stat:last-child { padding-right: 0; }
        .hero-stat-btn { cursor: pointer; }
        .hero-stat-btn:hover .hero-stat-label { color: var(--accent); }
        .hero-stat-label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .hero-stat-val {
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
          color: var(--text-primary);
        }
        .hero-stat-sub {
          font-size: 0.6rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .hero-stat-divider {
          width: 1px;
          background: var(--border);
          flex-shrink: 0;
          align-self: stretch;
        }
        .hero-bar-track {
          height: 5px; background: var(--hero-track); border-radius: 99px; overflow: hidden; margin-bottom: 7px;
        }
        .hero-bar-fill { height: 100%; border-radius: 99px; transition: width 0.8s cubic-bezier(0.4,0,0.2,1); }
        .hero-bar-labels {
          display: flex; justify-content: space-between;
          font-size: 0.68rem; color: var(--hero-bar-label); font-weight: 500;
        }

        .hero-no-salary {
          display: flex; align-items: center; gap: 10px; margin-top: 10px;
        }
        .salary-cta {
          display: inline-flex; align-items: center; gap: 5px;
          background: var(--accent-dim);
          border: 1px solid rgba(99,102,241,0.35);
          border-radius: var(--radius-sm);
          padding: 7px 13px;
          color: var(--accent); font-size: 0.78rem; font-weight: 700;
          cursor: pointer; font-family: var(--font-sans);
          transition: all 0.15s; letter-spacing: -0.01em; white-space: nowrap;
        }
        .salary-cta:hover { background: rgba(99,102,241,0.2); transform: translateY(-1px); }
        .salary-cta-hint {
          font-size: 0.72rem; color: var(--hero-muted); font-weight: 500;
        }

        /* ── Stats strip ──────────────────────── */
        .stats-strip {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .stat-col {
          padding: 16px 20px; display: flex; flex-direction: column; gap: 6px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }
        .stat-col-label {
          font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--text-muted); font-weight: 700;
        }
        .stat-col-val {
          font-size: 1.1rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;
        }
        .stat-col-sub {
          font-size: 0.68rem; color: var(--text-muted); font-weight: 500; margin-top: 2px;
        }

        /* ── Section head ─────────────────────── */
        .sect-head {
          display: flex; align-items: flex-start;
          justify-content: space-between; margin-bottom: 14px; gap: 8px;
        }
        .sect-title {
          font-size: 0.8125rem; font-weight: 700;
          letter-spacing: -0.01em; color: var(--text-primary);
        }
        .sect-sub {
          font-size: 0.68rem; color: var(--text-muted); margin-top: 2px; font-weight: 500;
        }
        .pill-link {
          display: inline-flex; align-items: center; gap: 3px;
          font-size: 0.7rem; color: var(--text-secondary);
          text-decoration: none; font-weight: 600;
          padding: 3px 10px; border: 1px solid var(--border);
          border-radius: 99px; background: transparent; transition: all 0.15s;
          white-space: nowrap; flex-shrink: 0; margin-top: 1px;
          cursor: pointer; font-family: var(--font-sans);
        }
        .pill-link:hover { color: var(--accent); border-color: var(--accent); background: var(--accent-dim); }

        /* ── Empty hint ───────────────────────── */
        .empty-hint {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 0; color: var(--text-muted); font-size: 0.8rem; font-weight: 500;
        }
        .empty-hint-icon {
          width: 28px; height: 28px; border-radius: 6px;
          background: var(--bg-input); display: flex; align-items: center;
          justify-content: center; font-size: 0.85rem; flex-shrink: 0;
        }
        .empty-hint-link {
          color: var(--accent); font-weight: 600; text-decoration: none;
          background: none; border: none; cursor: pointer; font-family: var(--font-sans);
          font-size: 0.8rem; padding: 0; transition: opacity 0.15s;
        }
        .empty-hint-link:hover { opacity: 0.75; }

        /* ── Wajib rows (no bar) ─────────────── */
        .wajib-rows { display: flex; flex-direction: column; }
        .wajib-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 9px 0; border-bottom: 1px solid var(--border); gap: 12px;
        }
        .wajib-row:last-child { border-bottom: none; }
        .wajib-left { display: flex; align-items: center; gap: 8px; }
        .wajib-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .wajib-type-badge {
          font-size: 0.55rem; text-transform: uppercase; letter-spacing: 0.06em;
          font-weight: 700; padding: 2px 7px; border-radius: 99px; flex-shrink: 0;
        }
        .wajib-type-badge.income {
          background: rgba(34,197,94,0.12); color: var(--success);
        }
        .wajib-divider {
          height: 1px; background: var(--border); margin: 4px 0;
        }
        .wajib-pct {
          font-size: 0.68rem; font-weight: 700; color: var(--accent);
          background: var(--accent-dim); padding: 2px 8px; border-radius: 99px;
        }
        .wajib-amount { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; }

        /* ── Two-col layout ──────────────────── */
        .dash-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          align-items: stretch;
        }
        .dash-two-col > .card,
        .dash-two-col > * > .card {
          display: flex;
          flex-direction: column;
          height: 420px;
          overflow: hidden;
        }
        .card-scroll-body {
          flex: 1;
          overflow-y: auto;
          min-height: 0;
        }
        .card-scroll-body::-webkit-scrollbar { width: 3px; }
        .card-scroll-body::-webkit-scrollbar-track { background: transparent; }
        .card-scroll-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }
        @media (max-width: 700px) {
          .dash-two-col { grid-template-columns: 1fr; }
          .dash-two-col > .card, .dash-two-col > * > .card { height: 380px; }
        }

        /* ── Budget rows ──────────────────────── */
        .budget-rows { display: flex; flex-direction: column; }
        .budget-section-label {
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 8px;
          padding-bottom: 0;
        }
        .brow {
          display: grid;
          grid-template-columns: minmax(140px, 1.6fr) 1fr 110px 36px;
          align-items: center; gap: 14px; padding: 12px 0;
          border-bottom: 1px solid var(--border);
        }
        .brow:last-child { border-bottom: none; }
        .brow.no-limit { grid-template-columns: 1fr auto; }
        .brow-left { display: flex; align-items: center; gap: 8px; min-width: 0; }
        .brow-icon {
          width: 28px; height: 28px; border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; flex-shrink: 0;
        }
        .brow-name {
          font-size: 0.8125rem; font-weight: 600; color: var(--text-primary);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .brow-no-limit-tag {
          font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.04em;
          color: var(--text-muted); font-weight: 700;
          background: var(--bg-input); padding: 2px 6px; border-radius: 99px;
          flex-shrink: 0;
        }
        .brow-bar-wrap { display: flex; align-items: center; }
        .brow-bar { height: 7px; background: var(--border); border-radius: 99px; overflow: hidden; width: 100%; }
        .brow-bar-fill { height: 100%; border-radius: 99px; transition: width 0.7s cubic-bezier(0.4,0,0.2,1); }
        .brow-right { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; justify-content: center; }
        .brow-spent { font-size: 0.8rem; font-weight: 700; letter-spacing: -0.01em; }
        .brow-limit { font-size: 0.65rem; color: var(--text-muted); font-weight: 500; }
        .brow-pct { font-size: 0.72rem; font-weight: 700; text-align: right; min-width: 30px; }

        /* ── Savings grid ─────────────────────── */
        .savings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 10px;
        }
        .sv-chip {
          background: var(--bg-input); border: 1px solid var(--border);
          border-radius: var(--radius-sm); padding: 13px 14px; transition: border-color 0.2s;
        }
        .sv-chip:hover { border-color: var(--border-light); }
        .sv-chip.sv-done { border-color: rgba(52,211,153,0.4); background: var(--success-dim); }
        .sv-chip.sv-urgent { border-color: rgba(251,191,36,0.4); }
        .sv-chip-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .sv-chip-name { font-size: 0.78rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.01em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .sv-chip-pct { font-size: 0.72rem; font-weight: 700; flex-shrink: 0; }
        .sv-chip-amounts { display: flex; align-items: baseline; gap: 3px; margin-bottom: 8px; }
        .sv-chip-cur { font-size: 0.9375rem; font-weight: 800; letter-spacing: -0.025em; color: var(--text-primary); }
        .sv-chip-tgt { font-size: 0.68rem; color: var(--text-muted); font-weight: 500; }
        .sv-chip-bar { height: 4px; background: var(--border); border-radius: 99px; overflow: hidden; }
        .sv-chip-fill { height: 100%; border-radius: 99px; transition: width 0.7s cubic-bezier(0.4,0,0.2,1); }
        .sv-chip-deadline { font-size: 0.65rem; color: var(--warning); font-weight: 600; margin-top: 5px; display: block; }

        /* ── Plan preview ────────────────────── */
        .plan-preview-list { display: flex; flex-direction: column; }
        .plan-preview-row {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 0; border-bottom: 1px solid var(--border);
        }
        .plan-preview-row:last-child { border-bottom: none; }
        .plan-preview-icon { font-size: 0.85rem; flex-shrink: 0; opacity: 0.7; }
        .plan-preview-name {
          flex: 1; font-size: 0.8rem; font-weight: 600;
          color: var(--text-primary);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .plan-preview-amount {
          font-size: 0.8rem; font-weight: 700;
          color: var(--text-secondary); letter-spacing: -0.01em; flex-shrink: 0;
        }

        /* ── Transactions ─────────────────────── */
        .tx-list { display: flex; flex-direction: column; margin-top: 4px; }
        .tx-row {
          display: flex; align-items: center; gap: 11px;
          padding: 10px 0; border-bottom: 1px solid var(--border);
        }
        .tx-row:last-child { border-bottom: none; }
        .tx-icon {
          width: 32px; height: 32px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; flex-shrink: 0;
        }
        .tx-meta { flex: 1; min-width: 0; }
        .tx-desc { display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .tx-date { font-size: 0.65rem; color: var(--text-muted); font-weight: 500; }
        .tx-amount { font-size: 0.8125rem; font-weight: 700; letter-spacing: -0.02em; white-space: nowrap; }
        .tx-amount.inc { color: var(--success); }
        .tx-amount.exp { color: var(--danger); }

        /* ── Category Manager ───────────────── */
        .cat-manager-modal { max-width: 520px; max-height: 85vh; overflow-y: auto; }
        .cat-mgr-section-title {
          font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--text-muted); font-weight: 700; margin: 0 0 6px;
        }
        .cat-mgr-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 8px 10px; border-radius: var(--radius-sm); gap: 8px;
        }
        .cat-mgr-row:hover { background: var(--bg-input); }
        .cat-mgr-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
        .cat-mgr-icon {
          width: 30px; height: 30px; border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; flex-shrink: 0;
        }
        .cat-mgr-name { font-size: 0.8125rem; font-weight: 600; color: var(--text-primary); display: block; }
        .cat-mgr-sub {
          font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em;
          color: var(--text-muted); font-weight: 600; margin-top: 1px; display: block;
        }
        .cat-mgr-right { display: flex; align-items: center; gap: 5px; flex-shrink: 0; }
        .cat-mgr-pct {
          font-size: 0.65rem; font-weight: 700; color: var(--accent);
          background: var(--accent-dim); padding: 2px 7px; border-radius: 99px;
        }
        .cat-mgr-amount {
          font-size: 0.8125rem; font-weight: 700; color: var(--text-primary);
          min-width: 90px; text-align: right;
        }

        /* ── Mobile ───────────────────────────── */
        @media (max-width: 768px) {
          .month-label-text { font-size: 0.875rem; }
          .hero-card { padding: 14px 16px; }
          .hero-top { flex-direction: column; gap: 0; margin-bottom: 10px; }
          /* Chips tampil sebagai row horizontal di bawah balance */
          .hero-right {
            display: flex; flex-direction: row; gap: 8px;
            align-items: stretch; margin-top: 10px;
          }
          .hero-chip {
            flex: 1; min-width: 0; align-items: flex-start;
            padding: 7px 10px;
          }
          .hero-chip-val { font-size: 0.8rem; }
          .hero-balance { font-size: 1.6rem; }
          .stats-strip { border-radius: var(--radius-sm); }
          .stat-col { padding: 12px 14px; }
          .stat-col-val { font-size: 0.875rem; }
          .brow {
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto auto;
            grid-template-areas: "left right" "bar bar" "meta meta";
          }
          .brow-left { grid-area: left; }
          .brow-bar-wrap { grid-area: bar; margin-top: 5px; }
          .brow-right { grid-area: right; align-self: start; }
          .brow-pct { display: block; font-size: 0.68rem; grid-area: meta; }
          .brow-limit { display: block; font-size: 0.65rem; }
          .savings-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 400px) {
          .stats-strip { grid-template-columns: 1fr; }
          .stat-col { border-right: none; border-bottom: 1px solid var(--border); flex-direction: row; justify-content: space-between; align-items: center; padding: 10px 14px; }
          .stat-col:last-child { border-bottom: none; }
          .hero-balance { font-size: 1.4rem; }
        }
      `}</style>
    </div>
  )
}
