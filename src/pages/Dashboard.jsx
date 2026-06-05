import { useState, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { usePageHeader } from '../context/PageHeaderContext'
import { formatCurrency, getCurrentMonth, getMonthLabel, getToday, getMonthEndDate } from '../utils/formatCurrency'
import TransactionForm from '../components/TransactionForm'
import CategoryForm from '../components/CategoryForm'
import ConfirmModal from '../components/ConfirmModal'
import { useToast } from '../components/Toast'
import CurrencyInput from '../components/CurrencyInput'
import { isMandatory, isMandatoryIncome, isProtected } from '../constants/mandatoryCategories'
import { IconAlertTriangle, IconArrowUp, IconArrowDown, IconArrowUpRight, IconArrowDownLeft, IconSettings, IconPlus, IconX } from '../components/Icons'
import SpotlightCard from '../components/ui/SpotlightCard'

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
  const [gajiForm, setGajiForm] = useState({ amount: '', note: '', date: '' })
  const [gajiSaving, setGajiSaving] = useState(false)
  const [showMonthPicker, setShowMonthPicker] = useState(false)
  const [pickerYear, setPickerYear] = useState(() => Number(getCurrentMonth().split('-')[0]))
  const [showPct, setShowPct] = useState(false)
  const [dashTab, setDashTab] = useState('transaction')
  const [alertIdx, setAlertIdx] = useState(0)

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
      </>
    )
    return () => setHeader(null)
  }, [month, showMonthPicker, pickerYear, user?.recording_start_month])

  const navigate = useNavigate()
  const goToMonth = (m) => { setMonth(m); setSearchParams({ month: m }) }

  const fetchDashboard = async () => {
    setLoading(true)
    try {
      const startDate = `${month}-01`
      const endDate = getMonthEndDate(month)
      const today = getToday()
      const nmStr = nextMonth(month)
      const recordStart = user.recording_start_month
      // Transaksi dari recording_start_month s/d sebelum bulan ini — lt(startDate) hindari invalid endDate
      let histQuery = supabase.from('transactions').select('amount, type').eq('user_id', user.id).lt('date', startDate)
      if (recordStart) histQuery = histQuery.gte('date', `${recordStart}-01`)

      let allLogsQuery = supabase.from('category_budgets').select('budget_limit, category_id, month, categories(is_mandatory, name)').eq('user_id', user.id).lte('month', month)
      if (recordStart) allLogsQuery = allLogsQuery.gte('month', recordStart)

      const [txRes, catRes, savingsRes, logsRes, todayRes, catBudgetsRes, allLogsRes, plansRes, histRes, hutangRes, hutangTabunganRes] = await Promise.all([
        supabase.from('transactions').select('*, categories(name, color, icon)').eq('user_id', user.id).gte('date', startDate).lte('date', endDate).order('date', { ascending: false }),
        Promise.all([
          supabase.from('categories').select('*').eq('user_id', user.id).is('month', null),
          supabase.from('categories').select('*').eq('user_id', user.id).eq('month', month),
        ]).then(([g, m]) => {
          const merged = [
            ...(g.data || []).filter(c => isProtected(c)),
            ...(m.data || []),
          ].sort((a, b) => a.name.localeCompare(b.name))
          const seen = new Set()
          return { data: merged.filter(c => { if (seen.has(c.name)) return false; seen.add(c.name); return true }) }
        }),
        supabase.from('savings').select('*').eq('user_id', user.id),
        supabase.from('savings_log').select('*').eq('user_id', user.id).eq('month', month),
        supabase.from('transactions').select('amount').eq('user_id', user.id).eq('date', today).eq('type', 'expense'),
        supabase.from('category_budgets').select('category_id, budget_limit').eq('user_id', user.id).eq('month', month),
        allLogsQuery,
        supabase.from('plans').select('*').eq('user_id', user.id).eq('target_month', nmStr).eq('done', false).order('created_at', { ascending: true }),
        histQuery,
        supabase.from('hutang').select('id, nama, amount, due_date, sumber, jenis, lunas').eq('user_id', user.id).lte('month', month).eq('lunas', false).order('due_date', { ascending: true, nullsFirst: false }),
        supabase.from('hutang').select('id, nama, amount, jenis, lunas, created_at').eq('user_id', user.id).lte('month', month).eq('sumber', 'tabungan').order('created_at', { ascending: false }),
      ])
      const txs = txRes.data || []
      const catBudgetMap = {}
      ;(catBudgetsRes.data || []).forEach(cb => { catBudgetMap[cb.category_id] = Number(cb.budget_limit) })

      let cats = (catRes.data || []).map(cat => {
        // Hanya pakai budget yang eksplisit di-set untuk bulan ini — tidak fallback ke categories.budget_limit
        const budget_limit = catBudgetMap[cat.id] !== undefined ? catBudgetMap[cat.id] : 0
        return { ...cat, budget_limit, budget_set: budget_limit > 0 }
      })

      const gajiCat = cats.find(c => isMandatoryIncome(c))
      const gajiTxs = gajiCat ? txs.filter(t => t.type === 'income' && t.category_id === gajiCat.id) : []
      const salary = gajiTxs.reduce((s, t) => s + Number(t.amount), 0)

      const currentMonthCats = cats

      const totalExpense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
      const totalIncome = txs.filter(t => t.type === 'income' && t.category_id !== gajiCat?.id).reduce((s, t) => s + Number(t.amount), 0)
      const catIdSpendMap = {}
      txs.filter(t => t.type === 'expense' && t.category_id).forEach(t => {
        catIdSpendMap[t.category_id] = (catIdSpendMap[t.category_id] || 0) + Number(t.amount)
      })
      const catSpendMap = {}
      txs.filter(t => t.type === 'expense' && t.categories).forEach(t => {
        const n = t.categories.name
        if (!catSpendMap[n]) catSpendMap[n] = { name: n, amount: 0, color: t.categories.color, icon: t.categories.icon }
        catSpendMap[n].amount += Number(t.amount)
      })
      const catsWithStatus = currentMonthCats.map(cat => {
        const spent = catIdSpendMap[cat.id] || 0
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
          .filter(cb => cb.categories?.name === 'Tabungan Bulanan' && Number(cb.budget_limit) > 0)
          .sort((a, b) => a.month.localeCompare(b.month)),
        totalTabungan: (allLogsRes.data || [])
          .filter(cb => cb.categories?.name === 'Tabungan Bulanan')
          .reduce((s, cb) => s + Number(cb.budget_limit), 0)
          + (user.tabungan_awal || 0)
          - (hutangTabunganRes.data || []).filter(h => !h.lunas).reduce((s, h) => s + Number(h.amount), 0),
        categorySpend: Object.values(catSpendMap).sort((a, b) => b.amount - a.amount),
        nextMonthPlans: plansRes.data || [],
        gajiTx: gajiTxs[0] || null,
        gajiCatId: gajiCat?.id || null,
        hutangList: hutangRes.data || [],
        hutangTabunganList: hutangTabunganRes.data || [],
        cumulativeBalance: (histRes.data || []).reduce((s, t) => s + (t.type === 'income' ? Number(t.amount) : -Number(t.amount)), 0)
          + salary + totalIncome - totalExpense
          + (user.saldo_awal || 0),
        cumulativeMandatoryBudget: (allLogsRes.data || [])
          .filter(cb => cb.categories?.is_mandatory === true)
          .reduce((s, cb) => s + Number(cb.budget_limit), 0),
      })
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
    const [r1, r2] = await Promise.all([
      supabase.from('category_budgets').upsert(
        { user_id: user.id, category_id: budgetEdit.id, month, budget_limit: amount },
        { onConflict: 'category_id,month' }
      ),
      supabase.from('categories').update({ budget_limit: amount }).eq('id', budgetEdit.id),
    ])
    const err = r1.error || r2.error
    if (err) { toast(err.message, 'error'); return }
    toast('Budget disimpan', 'success')
    setBudgetEdit(null)
    fetchDashboard()
  }

  const doDeleteCat = async () => {
    const startDate = `${month}-01`
    const endDate = getMonthEndDate(month)
    const [r1, r2] = await Promise.all([
      supabase.from('transactions').delete().eq('category_id', confirmDel.id).gte('date', startDate).lte('date', endDate),
      supabase.from('category_budgets').delete().eq('category_id', confirmDel.id).eq('month', month),
    ])
    if (r1.error || r2.error) { toast((r1.error || r2.error).message, 'error'); return }
    const { error } = await supabase.from('categories').delete().eq('id', confirmDel.id)
    if (error) { toast(error.message, 'error'); return }
    toast('Kategori dihapus', 'success')
    setConfirmDel(null)
    fetchDashboard()
  }

  const totalBudget = data.categories.filter(c => c.budget_limit > 0).reduce((s, c) => s + c.budget_limit, 0)
  const isCurrentMonth = month === getCurrentMonth()
  const overBudgetCats = data.categories.filter(c => c.overBudget)

  useEffect(() => {
    if (overBudgetCats.length <= 1) { setAlertIdx(0); return }
    const t = setInterval(() => setAlertIdx(i => (i + 1) % overBudgetCats.length), 2000)
    return () => clearInterval(t)
  }, [overBudgetCats.length])

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
    <div className="db-page">

      {/* ── Saldo Hero ── */}
      <div className="db-hero">
        <span className="db-eyebrow">TOTAL SALDO</span>
        {loading ? (
          <div className="skeleton" style={{ height: 56, width: 220, borderRadius: 8, marginTop: 6 }} />
        ) : (
          <div className={`db-balance${totalSaldo < 0 ? ' neg' : ''}`}>
            {totalSaldo < 0 && <span className="db-neg-sign">−</span>}
            {formatCurrency(Math.abs(totalSaldo))}
          </div>
        )}
        {!loading && data.todayExpense > 0 && (
          <div className="db-daily">
            {(() => {
              const budget = user.budget_harian || 0
              const spent = data.todayExpense
              const over = budget > 0 && spent >= budget
              const near = budget > 0 && spent / budget >= 0.8 && !over
              const color = over ? '#f87171' : near ? '#fbbf24' : 'var(--text-muted)'
              return (
                <>
                  <span style={{ color }}>Hari ini −{formatCurrency(spent)}</span>
                  {over && <span className="db-daily-badge" style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171' }}>melebihi limit</span>}
                  {near && <span className="db-daily-badge" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}>hampir limit</span>}
                </>
              )
            })()}
          </div>
        )}
      </div>

      {/* ── Stats 2×2 ── */}
      {!loading && (
        <div className="db-stats-grid">
          <button className="db-stat db-stat-btn" onClick={() => {
            setGajiForm({ amount: data.gajiTx ? String(data.gajiTx.amount) : '', note: data.gajiTx?.description || '', date: data.gajiTx?.date || `${month}-01` })
            setShowGajiModal(true)
          }}>
            <span className="db-stat-label">PEMASUKAN</span>
            <span className="db-stat-val tabular" style={{ color: data.salary > 0 ? '#34d399' : 'var(--text-muted)' }}>
              {data.salary > 0 ? `+${formatCurrency(data.salary)}` : '—'}
            </span>
            <span className="db-stat-sub">{data.salary > 0 ? 'bulan ini' : 'belum dicatat'}</span>
          </button>

          <button className="db-stat db-stat-btn" onClick={() => setShowWajibModal(true)}>
            <span className="db-stat-label">WAJIB</span>
            <span className="db-stat-val tabular" style={{ color: mandatoryBudgetTotal > 0 ? '#f87171' : 'var(--text-muted)' }}>
              {mandatoryBudgetTotal > 0 ? `−${formatCurrency(mandatoryBudgetTotal)}` : '—'}
            </span>
            <span className="db-stat-sub">{mandatoryBudgetTotal > 0 ? 'auto-deduct' : 'belum diatur'}</span>
          </button>

          <div className="db-stat">
            <span className="db-stat-label">PENGELUARAN</span>
            <span className="db-stat-val tabular" style={{ color: effectiveExpense > data.totalIncome ? '#f87171' : effectiveExpense > 0 ? 'var(--text-primary)' : 'var(--text-muted)' }}>
              {effectiveExpense > 0 ? `−${formatCurrency(effectiveExpense - data.totalIncome)}` : '—'}
            </span>
            <span className="db-stat-sub">{data.salary > 0 && effectiveExpense > 0 ? `${Math.round((effectiveExpense / data.salary) * 100)}% gaji` : 'bulan ini'}</span>
          </div>

          <button className="db-stat db-stat-btn" onClick={() => setShowTabunganModal(true)}>
            <span className="db-stat-label">TABUNGAN</span>
            <span className="db-stat-val tabular" style={{ color: data.totalTabungan > 0 ? '#34d399' : 'var(--text-muted)' }}>
              {formatCurrency(data.totalTabungan)}
            </span>
            <span className="db-stat-sub">{data.savings?.length > 0 ? `${data.savings.length} kantong` : 'semua kantong'}</span>
          </button>
        </div>
      )}
      {loading && <div className="skeleton" style={{ height: 120, borderRadius: 'var(--radius-lg)' }} />}

      {/* ── My Transaction / My Budget tab ──── */}
      {(() => {
        const rutinCats = data.categories.filter(c => !isMandatory(c) && !isMandatoryIncome(c) && c.is_monthly && (c.budget_limit > 0 || (c.spent || 0) > 0))
        const regularCats = data.categories.filter(c => !isMandatory(c) && !isMandatoryIncome(c) && !c.is_monthly && (c.budget_limit > 0 || (c.spent || 0) > 0))
        const hutangAktif = (data.hutangList || []).filter(h => h.jenis === 'hutang')
        const piutangAktif = (data.hutangList || []).filter(h => h.jenis === 'piutang')
        const isEmpty = !loading && rutinCats.length === 0 && regularCats.length === 0 && hutangAktif.length === 0 && piutangAktif.length === 0

        const BudgetRow = ({ cat }) => {
          const rawPct = cat.budget_limit > 0 ? (cat.spent / cat.budget_limit) * 100 : 0
          const pct = Math.min(rawPct, 100)
          const isOver = rawPct > 100
          const isFull = !isOver && rawPct >= 100
          const isNear = !isOver && rawPct >= 80 && rawPct < 100
          const barColor = isOver ? 'var(--danger)' : isFull ? 'var(--success)' : isNear ? 'var(--warning)' : cat.color || 'var(--accent)'
          const sisa = cat.budget_limit - (cat.spent || 0)
          const salPct = data.salary > 0 && cat.budget_limit > 0 ? Math.round((cat.budget_limit / data.salary) * 100) : null
          const hasBar = cat.budget_limit > 0
          return (
            <div className={`brow${!hasBar && cat.spent > 0 ? ' brow-no-budget' : ''}`}>
              <div className="brow-left">
                <span className="brow-icon" style={{ background: `${cat.color || '#6366f1'}18` }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color || 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
                </span>
                <div style={{ minWidth: 0 }}>
                  <span className="brow-name">{cat.name}</span>
                  {isOver && <span className="badge badge-danger" style={{ fontSize: '0.6rem', padding: '2px 6px', marginLeft: 6 }}>Over</span>}
                  {isFull && <span className="badge badge-success" style={{ fontSize: '0.6rem', padding: '2px 6px', marginLeft: 6 }}>Penuh</span>}
                  {isNear && <span className="badge badge-warning" style={{ fontSize: '0.6rem', padding: '2px 6px', marginLeft: 6 }}>Hampir</span>}
                </div>
              </div>
              {cat.budget_limit > 0 ? (
                <>
                  <div className="brow-bar-wrap">
                    <div className="brow-bar">
                      <div className="brow-bar-fill" style={{ width: `${pct}%`, background: barColor }} />
                    </div>
                  </div>
                  <div className="brow-right" onClick={() => salPct && setShowPct(v => !v)} style={{ cursor: salPct ? 'pointer' : 'default' }}>
                    <span className="brow-spent tabular" style={{ color: isOver ? 'var(--danger)' : 'var(--text-primary)' }}>{formatCurrency(cat.spent || 0)}</span>
                    {showPct && salPct ? (
                      <span className="brow-limit tabular" style={{ color: 'var(--accent)' }}>{salPct}% gaji</span>
                    ) : (
                      <span className="brow-limit tabular" style={{ color: sisa < 0 ? 'var(--danger)' : sisa === 0 ? 'var(--text-muted)' : 'var(--success)' }}>
                        {sisa < 0 ? `Over ${formatCurrency(Math.abs(sisa))}` : `Sisa ${formatCurrency(sisa)}`}
                      </span>
                    )}
                  </div>
                  <span className="brow-pct" style={{ color: barColor }}>{rawPct.toFixed(0)}%</span>
                </>
              ) : cat.spent > 0 ? (
                <span className="brow-only-spent tabular" style={{ color: 'var(--danger)' }}>−{formatCurrency(cat.spent)}</span>
              ) : null}
            </div>
          )
        }

        return (
          <>
          {!loading && overBudgetCats.length > 0 && (
            <div key={alertIdx} className="db-alert">
              <IconAlertTriangle size={11} />
              <span>Overbudget — <strong>{overBudgetCats[alertIdx]?.name}</strong></span>
              {overBudgetCats.length > 1 && (
                <span className="db-alert-count">{alertIdx + 1}/{overBudgetCats.length}</span>
              )}
            </div>
          )}
          <div className="card dash-tab-card">
            {/* ── Tab header ── */}
            <div className="sect-head" style={{ marginBottom: 16 }}>
              <div className="dash-tab-toggle">
                <button
                  className={`dash-tab-btn${dashTab === 'transaction' ? ' active' : ''}`}
                  onClick={() => setDashTab('transaction')}
                >
                  My Transaction
                </button>
                <button
                  className={`dash-tab-btn${dashTab === 'budget' ? ' active' : ''}`}
                  onClick={() => setDashTab('budget')}
                >
                  My Budget
                </button>
              </div>

              <div className="tab-actions">
                <Link to={`/transactions?month=${month}`} className="tab-act">
                  <IconArrowUpRight size={13} />
                  <span className="tab-act-label">Lihat semua</span>
                </Link>
                <Link to={`/categories?month=${month}`} className="tab-act">
                  <IconSettings size={13} />
                  <span className="tab-act-label">Atur</span>
                </Link>
                <button className="tab-act tab-act-accent" onClick={() => setShowTxForm(true)}>
                  <IconPlus size={13} />
                  <span className="tab-act-label">Transaksi</span>
                </button>
              </div>
            </div>

            {/* ── Tab content ── */}
            <div className="card-scroll-body">

              {/* MY TRANSACTION */}
              {dashTab === 'transaction' && (
                loading ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 42 }} />)}
                  </div>
                ) : data.transactions.length === 0 ? (
                  <div className="empty-hint">
                    <span className="empty-hint-icon"><IconArrowUp size={13} /></span>
                    <span>Belum ada transaksi bulan ini.</span>
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
                )
              )}

              {/* MY BUDGET */}
              {dashTab === 'budget' && (
                loading ? (
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
                    {(hutangAktif.length > 0 || piutangAktif.length > 0) && (
                      <>
                        <div className="budget-section-label">Hutang &amp; Piutang</div>
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
                                    <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginLeft: 6 }}>{isPiutang ? 'piutang' : 'hutang'}</span>
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
                    {(hutangAktif.length > 0 || piutangAktif.length > 0) && rutinCats.length > 0 && <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />}
                    {rutinCats.length > 0 && (
                      <>
                        <div className="budget-section-label">Pengeluaran Rutin</div>
                        <div className="budget-rows">{rutinCats.map(cat => <BudgetRow key={cat.id} cat={cat} />)}</div>
                      </>
                    )}
                    {(rutinCats.length > 0 || hutangAktif.length > 0 || piutangAktif.length > 0) && regularCats.length > 0 && <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />}
                    {regularCats.length > 0 ? (
                      <>
                        <div className="budget-section-label">Kategori Lainnya</div>
                        <div className="budget-rows">{regularCats.map(cat => <BudgetRow key={cat.id} cat={cat} />)}</div>
                      </>
                    ) : (hutangAktif.length === 0 && piutangAktif.length === 0 && rutinCats.length === 0) && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Belum ada kategori dengan budget. <Link to={`/categories?month=${month}`} style={{ color: 'var(--accent)' }}>Atur →</Link>
                      </div>
                    )}
                  </>
                )
              )}

            </div>
          </div>
          </>
        )
      })()}

    </div>{/* end db-page */}

      {/* ── Modals ───────────────────────────── */}
      {/* ── Gaji Modal ──────────────────────── */}
      {showGajiModal && (() => {
        const hasGaji = data.salary > 0

        const saveGaji = async () => {
          const amount = parseFloat(gajiForm.amount.replace(/\D/g, '')) || 0
          if (!amount) return
          setGajiSaving(true)
          try {
            const txDate = gajiForm.date || `${month}-01`
            if (data.gajiTx) {
              const { error } = await supabase.from('transactions').update({ amount, description: gajiForm.note, date: txDate }).eq('id', data.gajiTx.id)
              if (error) throw error
            } else {
              const { error } = await supabase.from('transactions').insert({ user_id: user.id, category_id: data.gajiCatId, type: 'income', amount, description: gajiForm.note, date: txDate })
              if (error) throw error
            }
            toast('Pemasukan disimpan', 'success')
            setShowGajiModal(false)
            fetchDashboard()
          } catch (err) {
            toast(err.message, 'error')
          } finally {
            setGajiSaving(false)
          }
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
                <button className="btn btn-ghost" onClick={() => setShowGajiModal(false)}><IconX size={16} /></button>
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
                <label className="form-label">Tanggal Diterima</label>
                <input
                  className="form-input"
                  type="date"
                  value={gajiForm.date}
                  min={`${month}-01`}
                  max={(() => { const [y, m] = month.split('-').map(Number); return new Date(y, m, 0).toISOString().split('T')[0] })()}
                  onChange={e => setGajiForm(f => ({ ...f, date: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Catatan {!hasGaji && <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(opsional)</span>}</label>
                <textarea
                  className="form-input"
                  rows={2}
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
              <button className="btn btn-ghost" onClick={() => setShowTabunganModal(false)}><IconX size={16} /></button>
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
                <button className="btn btn-ghost" onClick={() => setShowRencanaModal(false)}><IconX size={16} /></button>
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
                <button className="btn btn-ghost" onClick={() => setShowWajibModal(false)}><IconX size={16} /></button>
              </div>
            </div>

            <div className="wajib-rows">
              {data.categories.filter(c => isMandatory(c)).map(cat => {
                const budget = Number(cat.budget_limit || 0)
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
              <button className="btn btn-ghost" onClick={() => setShowTxForm(false)}><IconX size={16} /></button>
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
                <button className="btn btn-primary btn-sm" onClick={() => { setEditCatData({ is_mandatory: true }); setShowCatForm(true) }}><IconPlus size={13} /> Kategori</button>
                <button className="btn btn-ghost" onClick={() => setShowCatManager(false)}><IconX size={16} /></button>
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
                <button className="btn btn-ghost" onClick={() => setBudgetEdit(null)}><IconX size={16} /></button>
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
          message={`Hapus kategori "${confirmDel.name}"? Semua transaksi kategori ini juga akan terhapus.`}
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
              <button className="btn btn-ghost" onClick={() => setShowCatForm(false)}><IconX size={16} /></button>
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
        .db-alert {
          display: flex; align-items: center; gap: 7px;
          background: rgba(248,113,113,0.08);
          border: 1px solid rgba(248,113,113,0.2);
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 0.72rem; color: #f87171; font-weight: 600;
          animation: heroAlertIn 0.3s ease both;
        }
        [data-theme="light"] .db-alert { background: rgba(239,68,68,0.07); border-color: rgba(239,68,68,0.2); }
        .db-alert-count {
          margin-left: auto; font-size: 0.6rem; font-weight: 700;
          background: rgba(248,113,113,0.12); padding: 1px 6px; border-radius: 99px;
        }
        @keyframes heroAlertIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Dashboard page ───────────────────── */
        .db-page { display: flex; flex-direction: column; gap: 16px; padding-bottom: 48px; }

        /* ── Saldo hero ───────────────────────── */
        .db-hero { padding: 8px 0 4px; }

        .db-eyebrow {
          font-size: 0.58rem; font-weight: 700; letter-spacing: 0.12em;
          color: var(--text-muted); text-transform: uppercase;
          display: block; margin-bottom: 8px;
        }
        .db-balance {
          font-size: clamp(2.2rem, 8vw, 3.4rem);
          font-weight: 800; letter-spacing: -0.045em;
          font-variant-numeric: tabular-nums; line-height: 1;
          background: linear-gradient(135deg, #fff 20%, rgba(167,139,250,0.9) 65%, rgba(99,102,241,0.85) 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        .db-balance.neg {
          background: linear-gradient(135deg, #fca5a5 0%, #f87171 60%, #ef4444 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        [data-theme="light"] .db-balance {
          background: linear-gradient(135deg, #1e1b4b 0%, #3730a3 45%, #4f46e5 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        [data-theme="light"] .db-balance.neg {
          background: linear-gradient(135deg, #7f1d1d 0%, #b91c1c 60%, #dc2626 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .db-neg-sign { font-size: 0.7em; vertical-align: 0.05em; margin-right: 1px; }

        .db-daily {
          display: flex; align-items: center; gap: 8px;
          margin-top: 8px;
          font-size: 0.72rem; font-weight: 600; color: var(--text-muted);
        }
        .db-daily-badge {
          font-size: 0.6rem; font-weight: 700; padding: 2px 7px; border-radius: 99px;
        }

        /* ── Stats 2×2 ────────────────────────── */
        .db-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .db-stat {
          display: flex; flex-direction: column; gap: 4px;
          padding: 14px 16px;
          background: var(--bg-card);
          text-align: left; border: none;
          font-family: var(--font-sans); cursor: default;
          transition: background 0.12s;
        }
        .db-stat-btn { cursor: pointer; }
        .db-stat-btn:hover { background: rgba(255,255,255,0.025); }
        [data-theme="light"] .db-stat-btn:hover { background: rgba(0,0,0,0.02); }
        .db-stat-label {
          font-size: 0.55rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-muted);
        }
        .db-stat-val {
          font-size: 0.9rem; font-weight: 800;
          letter-spacing: -0.025em; font-variant-numeric: tabular-nums;
          color: var(--text-primary);
        }
        .db-stat-sub {
          font-size: 0.58rem; font-weight: 500;
          color: var(--text-muted); opacity: 0.8;
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
          font-size: 0.68rem; color: var(--text-muted);
          text-decoration: none; font-weight: 700;
          padding: 4px 12px; border: 1px solid var(--border-glass);
          border-radius: 99px; background: var(--bg-glass);
          backdrop-filter: var(--glass-blur);
          transition: all 0.18s;
          white-space: nowrap; flex-shrink: 0; margin-top: 1px;
          cursor: pointer; font-family: var(--font-sans); letter-spacing: 0.01em;
        }
        .pill-link:hover {
          color: var(--accent); border-color: rgba(99,102,241,0.3);
          background: var(--accent-dim); box-shadow: var(--glow-sm);
        }

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

        /* ── Tab toggle ──────────────────────── */
        .dash-tab-card { display: flex; flex-direction: column; }
        .dash-tab-card .sect-head { flex-wrap: wrap; gap: 8px; }
        .dash-tab-toggle {
          display: flex;
          gap: 2px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 3px;
        }
        [data-theme="light"] .dash-tab-toggle {
          background: rgba(0,0,0,0.04);
          border-color: rgba(0,0,0,0.08);
        }
        .dash-tab-btn {
          padding: 5px 12px;
          border-radius: 5px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 700;
          font-family: var(--font-sans);
          letter-spacing: -0.01em;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .dash-tab-btn:hover { color: var(--text-secondary); }
        .dash-tab-btn.active {
          background: rgba(255,255,255,0.09);
          color: var(--text-primary);
        }
        [data-theme="light"] .dash-tab-btn.active {
          background: #fff;
          color: var(--accent);
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }

        /* ── Tab actions ──────────────────────── */
        .tab-actions { display: flex; gap: 4px; align-items: center; flex-shrink: 0; }
        .tab-act {
          display: flex; align-items: center; gap: 5px;
          padding: 6px 10px; border-radius: 7px;
          font-size: 0.72rem; font-weight: 600; letter-spacing: -0.01em;
          color: var(--text-muted);
          border: 1px solid rgba(255,255,255,0.07);
          background: transparent; text-decoration: none;
          transition: all 0.12s; cursor: pointer;
          font-family: var(--font-sans); white-space: nowrap;
        }
        .tab-act:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.12);
        }
        .tab-act-accent {
          color: var(--accent);
          border-color: rgba(99,102,241,0.2);
          background: rgba(99,102,241,0.06);
        }
        .tab-act-accent:hover {
          background: rgba(99,102,241,0.12);
          border-color: rgba(99,102,241,0.35);
          color: var(--accent);
        }
        [data-theme="light"] .tab-act { border-color: rgba(0,0,0,0.09); }
        [data-theme="light"] .tab-act:hover { background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.14); }
        [data-theme="light"] .tab-act-accent { background: var(--accent-dim); border-color: rgba(99,102,241,0.25); }

        @media (max-width: 600px) {
          .dash-tab-card .sect-head { flex-wrap: wrap; gap: 8px; align-items: center; }
          .dash-tab-toggle { flex: 1; }
          .dash-tab-toggle .dash-tab-btn { flex: 1; text-align: center; }
          .tab-act-label { display: none; }
          .tab-act { padding: 7px 9px; border-radius: 8px; }
        }

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
          grid-template-columns: minmax(140px, 1.6fr) 1fr 36px 110px;
          grid-template-areas: "left bar pct right";
          align-items: center; gap: 14px; padding: 12px 0;
          border-bottom: 1px solid var(--border);
        }
        .brow-left { grid-area: left; }
        .brow-bar-wrap { grid-area: bar; }
        .brow-pct { grid-area: pct; }
        .brow-right { grid-area: right; }
        .brow:last-child { border-bottom: none; }
        .brow.no-limit { grid-template-columns: 1fr auto; grid-template-areas: none; }
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
        .brow-no-budget {
          grid-template-columns: 1fr auto;
          grid-template-areas: none;
        }
        .brow-no-budget .brow-left { grid-column: 1; grid-area: unset; }
        .brow-only-spent { grid-column: 2; align-self: center; text-align: right; }

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
          padding: 10px 6px; border-bottom: 1px solid rgba(99,102,241,0.07);
          border-radius: 8px; transition: background 0.15s;
        }
        .tx-row:last-child { border-bottom: none; }
        .tx-row:hover { background: rgba(99,102,241,0.04); }
        .tx-icon {
          width: 34px; height: 34px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; position: relative;
        }
        .tx-icon::after {
          content: ''; position: absolute; inset: 0;
          border-radius: inherit; opacity: 0.3;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
        }
        .tx-meta { flex: 1; min-width: 0; }
        .tx-desc { display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .tx-date { font-size: 0.64rem; color: var(--text-muted); font-weight: 500; }
        .tx-amount { font-size: 0.85rem; font-weight: 700; letter-spacing: -0.025em; white-space: nowrap; }
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
            display: flex; flex-direction: row; gap: 6px;
            align-items: stretch; margin-top: 10px;
          }
          .hero-chip {
            flex: 1; min-width: 0; align-items: flex-start;
            padding: 7px 8px;
          }
          .hero-chip-val { font-size: 0.78rem; }
          .hero-chip-label { font-size: 0.55rem; letter-spacing: 0.04em; }
          .hero-chip-cta { font-size: 0.55rem; }
          .hero-balance { font-size: 1.55rem; }
          .hero-stats-row { gap: 0; }
          .hero-stat { padding: 0 8px; }
          .hero-stat-val { font-size: 0.78rem; }
          .hero-stat-sub { font-size: 0.56rem; }
          .stats-strip { border-radius: var(--radius-sm); }
          .stat-col { padding: 12px 14px; }
          .stat-col-val { font-size: 0.875rem; }
          .brow {
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
            grid-template-areas: none;
            gap: 0 8px;
          }
          .brow-left   { grid-column: 1; grid-row: 1; padding-bottom: 5px; }
          .brow-right  { grid-column: 2; grid-row: 1; align-self: start; flex-direction: column; align-items: flex-end; gap: 1px; }
          .brow-bar-wrap { grid-column: 1; grid-row: 2; align-self: center; }
          .brow-pct    { grid-column: 2; grid-row: 2; align-self: center; padding-left: 6px; font-size: 0.65rem; }
          .brow-no-budget { grid-template-rows: auto; }
          .brow-no-budget .brow-left { grid-row: 1; padding-bottom: 0; }
          .brow-only-spent { grid-column: 2; grid-row: 1; align-self: center; }
          .brow-limit  { font-size: 0.62rem; }
          .savings-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 400px) {
          .stats-strip { grid-template-columns: 1fr; }
          .stat-col { border-right: none; border-bottom: 1px solid var(--border); flex-direction: row; justify-content: space-between; align-items: center; padding: 10px 14px; }
          .stat-col:last-child { border-bottom: none; }
          .hero-balance { font-size: 1.35rem; }
          .hero-right { gap: 4px; }
          .hero-chip { padding: 6px 7px; }
          .hero-chip-val { font-size: 0.72rem; }
        }
      `}</style>
    </div>
  )
}
