import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { usePageHeader } from '../context/PageHeaderContext'
import { formatCurrency, getCurrentMonth, getMonthLabel, getMonthEndDate, getToday } from '../utils/formatCurrency'
import CategoryForm from '../components/CategoryForm'
import ConfirmModal from '../components/ConfirmModal'
import CurrencyInput from '../components/CurrencyInput'
import { useToast } from '../components/Toast'
import { isMandatory, isMandatoryIncome, isSavings, isWajib, isRutin, isTambahan, isProtected } from '../constants/mandatoryCategories'
import { IconArrowUp, IconArrowDown, IconArrowUpRight, IconArrowDownLeft, IconEdit, IconTrash, IconPlus, IconCheck, IconX } from '../components/Icons'

const DEFAULT_PCT = 15
const PALETTE = ['#6366f1','#3b82f6','#06b6d4','#10b981','#f59e0b','#f97316','#ef4444','#ec4899','#a855f7']

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

export default function CategoriesV2() {
  const { user } = useAuth()
  const { setHeader } = usePageHeader()
  const toast = useToast()
  const [categories, setCategories] = useState([])
  const [spendMap, setSpendMap] = useState({})
  const [salary, setSalary] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [budgetEdit, setBudgetEdit] = useState(null)
  const [savingsExpense, setSavingsExpense] = useState({ amount: '', date: getToday(), kantongId: '' })
  const [savingExpense, setSavingExpense] = useState(false)
  const [savingsWithdrawCat, setSavingsWithdrawCat] = useState(null)
  const [savingsCumulative, setSavingsCumulative] = useState({}) // category_id → cumulative budget
  const [hutangTabunganTotal, setHutangTabunganTotal] = useState(0)
  const [confirmDel, setConfirmDel] = useState(null)
  const [searchParams] = useSearchParams()
  const [month, setMonth] = useState(() => searchParams.get('month') || getCurrentMonth())
  const [gajiCatId, setGajiCatId] = useState(null)
  const [gajiTx, setGajiTx] = useState(null)
  const [showPemasukanModal, setShowPemasukanModal] = useState(false)
  const [pemasukanForm, setPemasukanForm] = useState({ amount: '', note: '', date: '' })
  const [pemasukanSaving, setPemasukanSaving] = useState(false)
  const [showIncomeModal, setShowIncomeModal] = useState(false)
  const [incomeForm, setIncomeForm] = useState({ description: '', amount: '', date: '' })
  const [incomeSaving, setIncomeSaving] = useState(false)
  const isCurrentMonth = month === getCurrentMonth()
  const isAtStart = !!user.recording_start_month && month <= user.recording_start_month
  const [hutangList, setHutangList] = useState([])
  const [savings, setSavings] = useState([])
  const [showHutangModal, setShowHutangModal] = useState(false)
  const [hutangForm, setHutangForm] = useState({ jenis: 'hutang', nama: '', amount: '', due_date: '', sumber: 'saldo' })
  const [hutangSaving, setHutangSaving] = useState(false)
  const [confirmDelHutang, setConfirmDelHutang] = useState(null)
  const [payingHutang, setPayingHutang] = useState(null)
  const [paySource, setPaySource] = useState(null)
  const [payingSavingsId, setPayingSavingsId] = useState(null)
  const [payingLoading, setPayingLoading] = useState(false)
  const [quickAddCatId, setQuickAddCatId] = useState(null)
  const [quickAddForm, setQuickAddForm] = useState({ date: '', amount: '' })

  useEffect(() => { fetchAll() }, [month])
  useEffect(() => { fetchHutang() }, [month])

  useEffect(() => {
    setHeader(
      <>
        <Link to={`/dashboard?month=${month}`} className="topbar-back-btn">‹ <span className="back-label">Dashboard</span></Link>
        <div className="month-nav-group">
          <button className="month-btn" onClick={() => setMonth(prevMonth(month))} disabled={isAtStart}>‹</button>
          <span className="month-label-text">{getMonthLabel(month)}</span>
          <button className="month-btn" onClick={() => setMonth(nextMonth(month))} disabled={isCurrentMonth}>›</button>
        </div>
      </>
    )
    return () => setHeader(null)
  }, [month, isCurrentMonth, isAtStart])

  const getSuggestedColor = () => PALETTE[categories.length % PALETTE.length]

  const fetchAll = async () => {
    setLoading(true)
    const startDate = `${month}-01`
    const endDate = getMonthEndDate(month)
    const [globalRes, monthRes] = await Promise.all([
      supabase.from('categories').select('*').eq('user_id', user.id).is('month', null),
      supabase.from('categories').select('*').eq('user_id', user.id).eq('month', month),
    ])
    const merged = [
      ...(globalRes.data || []),
      ...(monthRes.data || []),
    ].sort((a, b) => a.name.localeCompare(b.name))
    const seen = new Set()
    const rawCats = merged.filter(c => { if (seen.has(c.name)) return false; seen.add(c.name); return true })
    const [txRes, incomeTxRes, catBudgetsRes, savingsRes, allSavingsBudgetsRes, hutangTabunganRes, ledgerRes] = await Promise.all([
      supabase.from('transactions').select('category_id, amount').eq('user_id', user.id).eq('type', 'expense').gte('date', startDate).lte('date', endDate),
      supabase.from('transactions').select('id, category_id, amount, description, date').eq('user_id', user.id).eq('type', 'income').gte('date', startDate).lte('date', endDate),
      supabase.from('category_budgets').select('category_id, budget_limit').eq('user_id', user.id).eq('month', month),
      supabase.from('savings').select('id, name, current_amount').eq('user_id', user.id).order('name'),
      supabase.from('category_budgets').select('category_id, budget_limit, categories(category_type, name)').eq('user_id', user.id).lte('month', month),
      supabase.from('hutang').select('amount').eq('user_id', user.id).eq('sumber', 'tabungan').eq('lunas', false),
      supabase.from('savings_ledger').select('savings_id, amount').eq('user_id', user.id).lte('month', month),
    ])
    const catBudgetMap = {}
    ;(catBudgetsRes.data || []).forEach(cb => { catBudgetMap[cb.category_id] = Number(cb.budget_limit) })
    const spend = {}
    ;(txRes.data || []).forEach(tx => { if (tx.category_id) spend[tx.category_id] = (spend[tx.category_id] || 0) + Number(tx.amount) })
    const cats = (rawCats || []).map(cat => ({ ...cat, budget_limit: catBudgetMap[cat.id] !== undefined ? catBudgetMap[cat.id] : 0 }))
    const gajiCat = (rawCats || []).find(c => isMandatoryIncome(c))
    const gajiTxList = gajiCat ? (incomeTxRes.data || []).filter(t => t.category_id === gajiCat.id) : []
    setCategories(cats)
    setSpendMap(spend)
    setSalary(gajiTxList.reduce((s, t) => s + Number(t.amount), 0))
    setGajiCatId(gajiCat?.id || null)
    setGajiTx(gajiTxList[0] || null)
    // future ledger changes per kantong — untuk isolasi bulan (current_amount - future = balance at month)
    const ledgerByKantong = {}
    ;(ledgerRes.data || []).forEach(l => { ledgerByKantong[l.savings_id] = (ledgerByKantong[l.savings_id] || 0) + Number(l.amount) })
    const savingsWithLedger = (savingsRes.data || []).map(sv => ({
      ...sv,
      ledger_amount: ledgerByKantong[sv.id] ?? null,
    }))
    setSavings(savingsWithLedger)
    const cumul = {}
    ;(allSavingsBudgetsRes.data || [])
      .filter(cb => cb.categories?.category_type === 'savings' || cb.categories?.name === 'Tabungan Bulanan')
      .forEach(cb => { cumul[cb.category_id] = (cumul[cb.category_id] || 0) + Number(cb.budget_limit) })
    setSavingsCumulative(cumul)
    const hutangTotal = (hutangTabunganRes.data || []).reduce((s, h) => s + Number(h.amount), 0)
    setHutangTabunganTotal(hutangTotal)
    setLoading(false)
  }

  const fetchHutang = async () => {
    const [currRes, prevRes] = await Promise.all([
      supabase.from('hutang').select('*').eq('user_id', user.id).eq('month', month).order('due_date', { ascending: true, nullsFirst: false }),
      supabase.from('hutang').select('*').eq('user_id', user.id).lt('month', month).eq('lunas', false).order('due_date', { ascending: true, nullsFirst: false }),
    ])
    setHutangList([...(prevRes.data || []), ...(currRes.data || [])])
  }

  const saveIncome = async () => {
    const amount = parseFloat(incomeForm.amount) || 0
    if (!amount || !incomeForm.description.trim()) return
    setIncomeSaving(true)
    try {
      let catId = gajiCatId
      if (!catId) {
        const { data: newCat, error: catErr } = await supabase.from('categories')
          .insert({ user_id: user.id, name: 'Pemasukan Bulanan', color: '#22c55e', icon: '', is_mandatory: false, budget_limit: 0, category_type: 'income' })
          .select().single()
        if (catErr) throw catErr
        catId = newCat.id
      }
      const { error } = await supabase.from('transactions').insert({
        user_id: user.id, category_id: catId, type: 'income',
        amount, description: incomeForm.description.trim(), date: incomeForm.date || `${month}-01`,
      })
      if (error) throw error
      toast('Pemasukan dicatat', 'success')
      setShowIncomeModal(false)
      setIncomeForm({ description: '', amount: '', date: `${month}-01` })
      fetchAll()
    } catch (err) { toast(err.message, 'error') } finally { setIncomeSaving(false) }
  }

  const doDelete = async () => {
    const cat = categories.find(c => c.id === confirmDel.id)
    if (cat && isProtected(cat)) { toast('Kategori ini tidak bisa dihapus', 'error'); setConfirmDel(null); return }
    const startDate = `${month}-01`; const endDate = getMonthEndDate(month)
    const [r1, r2] = await Promise.all([
      supabase.from('transactions').delete().eq('category_id', confirmDel.id).gte('date', startDate).lte('date', endDate),
      supabase.from('category_budgets').delete().eq('category_id', confirmDel.id).eq('month', month),
    ])
    if (r1.error || r2.error) { toast((r1.error || r2.error).message, 'error'); return }
    const { error } = await supabase.from('categories').delete().eq('id', confirmDel.id)
    if (error) { toast(error.message, 'error'); return }
    toast('Kategori dihapus', 'success'); setConfirmDel(null); fetchAll()
  }

  const openBudgetEdit = (cat) => {
    const nominal = String(Math.round(cat.budget_limit || 0))
    const pct = salary > 0 && cat.budget_limit > 0 ? ((cat.budget_limit / salary) * 100).toFixed(1) : ''
    setBudgetEdit({ id: cat.id, nominal, pct })
  }

  const openSavingsWithdraw = (cat) => {
    const matched = savings.find(s => s.name.toLowerCase() === cat.name.toLowerCase())
    setSavingsExpense({ amount: '', date: getToday(), kantongId: matched?.id || (savings[0]?.id || '') })
    setSavingsWithdrawCat(cat)
  }

  const ledgerInsert = async (savings_id, amount, date) => {
    const m = date.substring(0, 7)
    await supabase.from('savings_ledger').insert({ user_id: user.id, savings_id, amount, month: m, date })
  }

  const recordSavingsExpense = async () => {
    if (!savingsWithdrawCat) return
    if (!savingsExpense.amount || parseFloat(savingsExpense.amount) <= 0) {
      toast('Masukkan jumlah pengeluaran', 'error')
      return
    }
    setSavingExpense(true)
    let kantongId = savingsExpense.kantongId || savings[0]?.id
    let sv = savings.find(s => s.id === kantongId) || savings[0]
    if (!sv) {
      const initBalance = savingsCumulative[savingsWithdrawCat.id] || 0
      const { data: newK, error: kErr } = await supabase
        .from('savings')
        .insert({ user_id: user.id, name: savingsWithdrawCat.name, current_amount: initBalance, target_amount: 0 })
        .select('id, name, current_amount').single()
      if (kErr) { toast('Gagal buat kantong: ' + kErr.message, 'error'); setSavingExpense(false); return }
      sv = newK
    }
    const amt = parseFloat(savingsExpense.amount)
    const newAmount = Math.max(0, Number(sv.current_amount) - amt)
    const { error } = await supabase.from('savings').update({ current_amount: newAmount }).eq('id', sv.id)
    if (error) { toast(error.message, 'error'); setSavingExpense(false); return }
    await ledgerInsert(sv.id, -amt, savingsExpense.date || getToday())
    toast('Pengeluaran tabungan dicatat ✓', 'success')
    setSavingsExpense(f => ({ amount: '', date: getToday(), kantongId: f.kantongId }))
    setSavingExpense(false)
    setSavingsWithdrawCat(null)
    fetchAll()
  }
  const handleNominalChange = (raw) => {
    const nom = parseFloat(raw) || 0
    setBudgetEdit(b => ({ ...b, nominal: raw, pct: salary > 0 && nom > 0 ? ((nom / salary) * 100).toFixed(1) : '' }))
  }
  const handlePctChange = (val) => {
    const p = parseFloat(val) || 0
    setBudgetEdit(b => ({ ...b, pct: val, nominal: salary > 0 && p > 0 ? String(Math.round((p / 100) * salary)) : '' }))
  }
  const saveBudget = async () => {
    const amount = parseFloat(budgetEdit.nominal) || 0
    const r2 = await supabase.from('categories').update({ budget_limit: amount }).eq('id', budgetEdit.id)
    if (r2.error) { toast(r2.error.message, 'error'); return }
    let r1err = null
    if (amount > 0) {
      const { error } = await supabase.from('category_budgets').upsert(
        { user_id: user.id, category_id: budgetEdit.id, month, budget_limit: amount },
        { onConflict: 'category_id,month' }
      )
      r1err = error
    } else {
      const { error } = await supabase.from('category_budgets').delete().eq('user_id', user.id).eq('category_id', budgetEdit.id).eq('month', month)
      r1err = error
    }
    if (r1err) { toast(r1err.message, 'error'); return }
    toast('Budget disimpan', 'success'); setBudgetEdit(null); fetchAll()
  }

  const applyFinancial = async (jenis, sumber, savings_id, amount, nama) => {
    const today = new Date().toISOString().split('T')[0]
    const isIncoming = jenis === 'hutang'
    let linked_tx_id = null
    if (sumber === 'saldo') {
      const { data: tx, error } = await supabase.from('transactions').insert({
        user_id: user.id, amount, category_id: null,
        type: isIncoming ? 'income' : 'expense',
        description: isIncoming ? `Hutang dari ${nama}` : `Piutang ke ${nama}`,
        date: today,
      }).select('id').single()
      if (error) throw error
      linked_tx_id = tx?.id || null
    } else if (sumber === 'tabungan' && savings_id) {
      const { data: sav, error: savErr } = await supabase.from('savings').select('current_amount').eq('id', savings_id).single()
      if (savErr) throw savErr
      const delta = isIncoming ? amount : -amount
      const next = Math.max(0, Number(sav.current_amount) + delta)
      const { error } = await supabase.from('savings').update({ current_amount: next }).eq('id', savings_id)
      if (error) throw error
      await ledgerInsert(savings_id, delta, today)
    }
    return linked_tx_id
  }

  const reverseFinancial = async (jenis, sumber, savings_id, amount, nama, linked_tx_id) => {
    const today = new Date().toISOString().split('T')[0]
    const wasIncoming = jenis === 'hutang'
    if (sumber === 'saldo') {
      if (linked_tx_id) {
        const { error } = await supabase.from('transactions').delete().eq('id', linked_tx_id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('transactions').insert({
          user_id: user.id, amount, category_id: null,
          type: wasIncoming ? 'expense' : 'income',
          description: wasIncoming ? `Bayar hutang ke ${nama}` : `Terima piutang dari ${nama}`,
          date: today,
        })
        if (error) throw error
      }
    } else if (sumber === 'tabungan' && savings_id) {
      const { data: sav, error: savErr } = await supabase.from('savings').select('current_amount').eq('id', savings_id).single()
      if (savErr) throw savErr
      if (sav) {
        const delta = wasIncoming ? -amount : amount
        const next = Math.max(0, Number(sav.current_amount) + delta)
        const { error } = await supabase.from('savings').update({ current_amount: next }).eq('id', savings_id)
        if (error) throw error
        await ledgerInsert(savings_id, delta, today)
      }
    }
  }

  const saveHutang = async () => {
    const amount = parseFloat(hutangForm.amount) || 0
    if (!hutangForm.nama.trim() || !amount) return
    setHutangSaving(true)
    try {
      let savings_id = hutangForm.sumber === 'tabungan' ? (savings[0]?.id || null) : null
      if (hutangForm.sumber === 'tabungan' && !savings_id) {
        const initBalance = hutangForm.jenis === 'hutang' ? 0 : (user.tabungan_awal || 0)
        const { data: newK } = await supabase
          .from('savings').insert({ user_id: user.id, name: 'Tabungan', current_amount: initBalance, target_amount: 0 })
          .select('id').single()
        if (newK) {
          savings_id = newK.id
          await fetchAll()
        }
      }
      const linked_tx_id = await applyFinancial(hutangForm.jenis, hutangForm.sumber, savings_id, amount, hutangForm.nama.trim())
      const { error } = await supabase.from('hutang').insert({
        user_id: user.id, jenis: hutangForm.jenis, nama: hutangForm.nama.trim(),
        amount, due_date: hutangForm.due_date || null, sumber: hutangForm.sumber,
        savings_id, linked_tx_id, month,
      })
      if (error) throw error
      toast(hutangForm.jenis === 'hutang' ? 'Hutang dicatat' : 'Piutang dicatat', 'success')
      setShowHutangModal(false)
      setHutangForm({ jenis: 'hutang', nama: '', amount: '', due_date: '', sumber: 'saldo' })
      fetchHutang(); fetchAll()
    } catch (err) { toast(err.message, 'error') } finally { setHutangSaving(false) }
  }

  const markLunas = async (id) => {
    const h = hutangList.find(x => x.id === id)
    if (!h) return
    try {
      await reverseFinancial(h.jenis, h.sumber, h.savings_id, Number(h.amount), h.nama, null)
      const { error } = await supabase.from('hutang').update({ lunas: true }).eq('id', id)
      if (error) throw error
      toast(h.jenis === 'hutang' ? 'Hutang ditandai lunas' : 'Piutang diterima', 'success')
      fetchHutang(); fetchAll()
    } catch (err) { toast(err.message, 'error') }
  }

  const markLunasWithSource = async (h, sumber, savingsId) => {
    setPayingLoading(true)
    try {
      await reverseFinancial(h.jenis, sumber, savingsId, Number(h.amount), h.nama, null)
      const { error } = await supabase.from('hutang').update({ lunas: true }).eq('id', h.id)
      if (error) throw error
      toast(h.jenis === 'hutang' ? 'Hutang ditandai lunas' : 'Piutang diterima', 'success')
      setPayingHutang(null); setPaySource(null); setPayingSavingsId(null)
      fetchHutang(); fetchAll()
    } catch (err) { toast(err.message, 'error') } finally { setPayingLoading(false) }
  }

  const deleteHutang = async () => {
    const h = hutangList.find(x => x.id === confirmDelHutang.id)
    if (!h) return
    try {
      if (!h.lunas) await reverseFinancial(h.jenis, h.sumber, h.savings_id, Number(h.amount), h.nama, h.linked_tx_id)
      const { error } = await supabase.from('hutang').delete().eq('id', confirmDelHutang.id)
      if (error) throw error
      toast('Dihapus', 'success'); setConfirmDelHutang(null); fetchHutang(); fetchAll()
    } catch (err) { toast(err.message, 'error') }
  }

  const getDueDateStatus = (dateStr, lunas) => {
    if (lunas) return { label: 'Lunas', color: '#34d399', bg: 'rgba(52,211,153,0.1)' }
    if (!dateStr) return null
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const due = new Date(dateStr)
    const diff = Math.round((due - today) / 86400000)
    if (diff < 0) return { label: `Terlambat ${Math.abs(diff)}h`, color: '#f87171', bg: 'rgba(248,113,113,0.1)' }
    if (diff === 0) return { label: 'Hari ini!', color: '#f87171', bg: 'rgba(248,113,113,0.1)' }
    if (diff <= 7) return { label: `${diff} hari lagi`, color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' }
    return { label: `${diff} hari lagi`, color: 'var(--text-muted)', bg: null }
  }

  const savePemasukan = async () => {
    const amount = parseFloat(pemasukanForm.amount.replace(/\D/g, '')) || 0
    if (!gajiCatId) return
    setPemasukanSaving(true)
    try {
      const txDate = pemasukanForm.date || `${month}-01`
      if (gajiTx) {
        const { error } = await supabase.from('transactions').update({ amount, description: pemasukanForm.note, date: txDate }).eq('id', gajiTx.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('transactions').insert({ user_id: user.id, category_id: gajiCatId, type: 'income', amount, description: pemasukanForm.note, date: txDate })
        if (error) throw error
      }
      toast('Pemasukan disimpan', 'success'); setShowPemasukanModal(false); fetchAll()
    } catch (err) { toast(err.message, 'error') } finally { setPemasukanSaving(false) }
  }

  const togglePlanned = async (cat) => {
    const { error } = await supabase.from('categories').update({ is_planned: !cat.is_planned }).eq('id', cat.id)
    if (error) { toast(error.message, 'error'); return }
    toast(cat.is_planned ? 'Kategori diaktifkan' : 'Dipindah ke perencanaan', 'success'); fetchAll()
  }

  const saveQuickAdd = async (catId, catName) => {
    const amount = parseFloat(quickAddForm.amount) || 0
    if (!amount) return
    const { error } = await supabase.from('transactions').insert({
      user_id: user.id, category_id: catId, type: 'expense',
      amount, description: catName, date: quickAddForm.date || `${month}-01`,
    })
    if (error) { toast(error.message, 'error'); return }
    toast('Transaksi dicatat', 'success'); setQuickAddCatId(null); setQuickAddForm({ date: '', amount: '' }); fetchAll()
  }

  // ─── DERIVED ────────────────────────────────────────────────────────────────
  const incomeCategories = categories.filter(c => isMandatoryIncome(c))
  const savingsCategories = categories.filter(c => isSavings(c))
  const wajibCategories = categories.filter(c => isWajib(c))
  const rutinCategories = categories.filter(c => isRutin(c))
  const tambahanCategories = categories.filter(c => isTambahan(c))
  const savingsTotal = savingsCategories.reduce((s, c) => s + Number(c.budget_limit || 0), 0)
  const wajibTotal = wajibCategories.reduce((s, c) => s + Number(c.budget_limit || 0), 0)
  const sisaGaji = salary - savingsTotal - wajibTotal

  // ─── ROW RENDERS ────────────────────────────────────────────────────────────

  const renderCatRow = (cat) => {
    const spent = spendMap[cat.id] || 0
    const budget = Number(cat.budget_limit || 0)
    const rawPct = budget > 0 ? (spent / budget) * 100 : 0
    const pct = Math.min(rawPct, 100)
    const over = rawPct > 100
    const near = !over && rawPct >= 80
    const full = !over && rawPct >= 100
    const barColor = over ? '#f87171' : full ? '#34d399' : near ? '#fbbf24' : (cat.color || 'var(--accent)')
    const pctColor = over ? '#f87171' : near ? '#fbbf24' : full ? '#34d399' : 'var(--text-muted)'
    const isPlanned = !!cat.is_planned
    const isQuickAdd = quickAddCatId === cat.id

    return (
      <div key={cat.id}>
        <div className={`cv2-row${isPlanned ? ' cv2-row-dim' : ''}`} style={{ '--rc': cat.color || 'var(--accent)' }}>
          <div className="cv2-cell-name">
            <span className="cv2-dot" style={{ background: cat.color || 'var(--accent)' }} />
            <span className="cv2-name">{cat.name}</span>
            {isPlanned && <span className="cv2-tag" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>plan</span>}
          </div>

          <div className="cv2-cell-bar">
            {budget > 0 ? (
              <>
                <div className="cv2-bar-track">
                  <div className="cv2-bar-fill" style={{ width: `${pct}%`, background: barColor }} />
                </div>
                <span className="cv2-bar-pct" style={{ color: pctColor }}>
                  {over ? `+${Math.round(rawPct - 100)}%` : `${Math.round(rawPct)}%`}
                </span>
              </>
            ) : spent > 0 ? (
              <span className="cv2-bar-label">no budget</span>
            ) : (
              <span
                className="cv2-bar-cta"
                onClick={() => { setQuickAddCatId(cat.id); setQuickAddForm({ date: getToday(), amount: '' }) }}
              >
                + catat
              </span>
            )}
            {budget > 0 && !spent && (
              <span
                className="cv2-bar-cta"
                style={{ marginLeft: 8 }}
                onClick={() => { setQuickAddCatId(cat.id); setQuickAddForm({ date: getToday(), amount: '' }) }}
              >
                + catat
              </span>
            )}
          </div>

          <div className="cv2-cell-amount">
            <span className="cv2-amount-main tabular" style={{ color: over ? '#f87171' : 'var(--text-primary)' }}>
              {spent > 0 ? formatCurrency(spent) : '—'}
            </span>
            {budget > 0 && (
              <span className="cv2-amount-sub tabular">/ {formatCurrency(budget)}</span>
            )}
          </div>

          <div className="cv2-cell-actions">
            <button
              className="cv2-icon-btn"
              style={{ color: isPlanned ? '#34d399' : 'var(--text-muted)' }}
              onClick={() => togglePlanned(cat)}
              title={isPlanned ? 'Aktifkan' : 'Rencanakan'}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'block' }} />
            </button>
            <button className="cv2-icon-btn" onClick={() => { setEditData(cat); setShowForm(true) }} title="Edit">
              <IconEdit size={11} />
            </button>
            {!isProtected(cat) && (
              <button className="cv2-icon-btn cv2-icon-danger" onClick={() => setConfirmDel({ id: cat.id, name: cat.name })} title="Hapus">
                <IconTrash size={11} />
              </button>
            )}
          </div>

          {budget > 0 && (
            <div className="cv2-mobile-prog">
              <div className="cv2-bar-track">
                <div className="cv2-bar-fill" style={{ width: `${pct}%`, background: barColor }} />
              </div>
            </div>
          )}
        </div>

        {isQuickAdd && (
          <div className="cv2-quick-row">
            <input className="form-input" type="date" value={quickAddForm.date}
              min={`${month}-01`} max={getMonthEndDate(month)}
              onChange={e => setQuickAddForm(f => ({ ...f, date: e.target.value }))} />
            <CurrencyInput value={quickAddForm.amount} onChange={v => setQuickAddForm(f => ({ ...f, amount: v }))} />
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setQuickAddCatId(null)}>Batal</button>
              <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => saveQuickAdd(cat.id, cat.name)} disabled={!quickAddForm.amount}>Catat</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderMandatoryRow = (cat, type = 'wajib') => {
    const budget = Number(cat.budget_limit || 0)
    const salaryPct = salary > 0 && budget > 0 ? Math.round((budget / salary) * 100) : null
    const isPlanned = !!cat.is_planned
    const isSav = type === 'savings'
    const kantong = isSav ? savings.find(s => s.name.toLowerCase() === cat.name.toLowerCase()) : null
    const cumulative = isSav ? (savingsCumulative[cat.id] || 0) + (kantong?.ledger_amount || 0) : 0
    const accentColor = isSav ? (cat.color || '#6366f1') : (cat.color || '#f87171')
    const tagBg = isSav ? 'rgba(99,102,241,0.1)' : 'rgba(248,113,113,0.1)'
    const tagColor = isSav ? '#818cf8' : '#f87171'
    const tagLabel = isSav ? 'tabungan' : 'wajib'

    return (
      <div key={cat.id} className={`cv2-row${isPlanned ? ' cv2-row-dim' : ''}`} style={{ '--rc': accentColor }}>
        <div className="cv2-cell-name">
          <span className="cv2-dot" style={{ background: accentColor }} />
          <span className="cv2-name">{cat.name}</span>
          <span className="cv2-tag" style={{ background: tagBg, color: tagColor }}>{tagLabel}</span>
        </div>

        <div className="cv2-cell-bar">
          {salaryPct ? (
            <>
              <div className="cv2-bar-track">
                <div className="cv2-bar-fill" style={{ width: `${Math.min(salaryPct, 100)}%`, background: accentColor }} />
              </div>
              <span className="cv2-bar-pct" style={{ color: 'var(--text-muted)' }}>{salaryPct}%</span>
            </>
          ) : (
            <span className="cv2-bar-label">dari gaji</span>
          )}
        </div>

        <div className="cv2-cell-amount">
          {isSav ? (
            <>
              <span className="cv2-amount-main tabular" style={{ color: '#818cf8' }}>{cumulative > 0 ? formatCurrency(cumulative) : '—'}</span>
              <span className="cv2-amount-sub tabular">{budget > 0 ? `+${formatCurrency(budget)}/bln` : 'belum diatur'}</span>
            </>
          ) : (
            <>
              <span className="cv2-amount-main tabular">{budget > 0 ? formatCurrency(budget) : '—'}</span>
              <span className="cv2-amount-sub">per bulan</span>
            </>
          )}
        </div>

        <div className="cv2-cell-actions">
          {isSav && (
            <button className="cv2-icon-btn cv2-icon-danger cv2-sav-withdraw-btn" onClick={() => openSavingsWithdraw(cat)} title="Catat pengeluaran tabungan">
              <IconArrowDown size={11} />
            </button>
          )}
          <button className="cv2-icon-btn" onClick={() => openBudgetEdit(cat)} title="Ubah Budget"><IconEdit size={11} /></button>
          {!isProtected(cat) && (
            <button className="cv2-icon-btn cv2-icon-danger" onClick={() => setConfirmDel({ id: cat.id, name: cat.name })} title="Hapus"><IconTrash size={11} /></button>
          )}
        </div>

        {salaryPct && (
          <div className="cv2-mobile-prog">
            <div className="cv2-bar-track">
              <div className="cv2-bar-fill" style={{ width: `${Math.min(salaryPct, 100)}%`, background: accentColor }} />
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderIncomeRow = (cat) => (
    <div key={cat.id} className="cv2-row" style={{ '--rc': '#34d399' }}>
      <div className="cv2-cell-name">
        <span className="cv2-dot" style={{ background: '#34d399' }} />
        <span className="cv2-name">{cat.name}</span>
        <span className="cv2-tag" style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399' }}>pemasukan</span>
      </div>
      <div className="cv2-cell-bar" />
      <div className="cv2-cell-amount">
        <span className="cv2-amount-main tabular" style={{ color: salary > 0 ? '#34d399' : 'var(--text-muted)' }}>
          {salary > 0 ? `+${formatCurrency(salary)}` : '—'}
        </span>
        <span className="cv2-amount-sub">bulan ini</span>
      </div>
      <div className="cv2-cell-actions">
        <button
          className="cv2-icon-btn"
          onClick={() => {
            setPemasukanForm({ amount: gajiTx ? String(gajiTx.amount) : '', note: gajiTx?.description || '', date: gajiTx?.date || `${month}-01` })
            setShowPemasukanModal(true)
          }}
          title={salary > 0 ? 'Edit' : 'Catat'}
        >
          {salary > 0 ? <IconEdit size={11} /> : <IconPlus size={11} />}
        </button>
      </div>
    </div>
  )

  const renderHutangRow = (h) => {
    const status = getDueDateStatus(h.due_date, h.lunas)
    const accentColor = h.jenis === 'piutang' ? '#f59e0b' : '#f87171'
    return (
      <div key={h.id} className={`cv2-row${h.lunas ? ' cv2-row-dim' : ''}`} style={{ '--rc': accentColor }}>
        <div className="cv2-cell-name">
          <span className="cv2-dot" style={{ background: accentColor }} />
          <span className="cv2-name">{h.nama}</span>
          <span className="cv2-tag" style={{ background: h.jenis === 'piutang' ? 'rgba(245,158,11,0.1)' : 'rgba(248,113,113,0.1)', color: accentColor }}>
            {h.jenis}
          </span>
          {h.lunas && <span className="cv2-tag" style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399' }}>lunas</span>}
        </div>

        <div className="cv2-cell-bar">
          {status && !h.lunas && (
            <span style={{
              fontSize: '0.62rem', fontWeight: 700, color: status.color,
              background: status.bg || 'transparent', padding: status.bg ? '2px 7px' : '0', borderRadius: 99,
            }}>
              {status.label}
            </span>
          )}
        </div>

        <div className="cv2-cell-amount">
          <span className="cv2-amount-main tabular" style={{ color: h.lunas ? 'var(--text-muted)' : accentColor }}>
            {formatCurrency(h.amount)}
          </span>
          <span className="cv2-amount-sub">{h.sumber}</span>
        </div>

        <div className="cv2-cell-actions">
          {!h.lunas && (
            <button className="cv2-icon-btn" style={{ color: '#34d399' }} onClick={() => { setPayingHutang(h); setPaySource(null); setPayingSavingsId(null) }} title="Tandai Lunas">
              <IconCheck size={11} />
            </button>
          )}
          <button className="cv2-icon-btn cv2-icon-danger" onClick={() => setConfirmDelHutang({ id: h.id, nama: h.nama })} title="Hapus">
            <IconTrash size={11} />
          </button>
        </div>
      </div>
    )
  }

  // ─── SECTION COMPONENT ──────────────────────────────────────────────────────
  const Section = ({ label, sub, children, onAdd }) => (
    <div className="cv2-section">
      <div className="cv2-section-head">
        <div>
          <span className="cv2-section-label">{label}</span>
          {sub && <span className="cv2-section-sub">{sub}</span>}
        </div>
        {onAdd && (
          <button className="cv2-add-btn" onClick={onAdd}>
            <IconPlus size={11} />
          </button>
        )}
      </div>
      <div className="cv2-table-body">{children}</div>
    </div>
  )

  // ─── RETURN ──────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="cv2-page animate-in">

        {/* Stats strip */}
        {salary > 0 && (
          <div className="cv2-stats-strip">
            <div className="cv2-stat">
              <span className="cv2-stat-label">Pemasukan</span>
              <span className="cv2-stat-val" style={{ color: '#34d399' }}>+{formatCurrency(salary)}</span>
            </div>
            <div className="cv2-stat-divider" />
            <div className="cv2-stat">
              <span className="cv2-stat-label">Tabungan</span>
              <span className="cv2-stat-val" style={{ color: savingsTotal > 0 ? '#6366f1' : 'var(--text-muted)' }}>
                {savingsTotal > 0 ? `−${formatCurrency(savingsTotal)}` : '—'}
              </span>
            </div>
            <div className="cv2-stat-divider" />
            <div className="cv2-stat">
              <span className="cv2-stat-label">Wajib</span>
              <span className="cv2-stat-val" style={{ color: wajibTotal > 0 ? '#f87171' : 'var(--text-muted)' }}>
                {wajibTotal > 0 ? `−${formatCurrency(wajibTotal)}` : '—'}
              </span>
            </div>
            <div className="cv2-stat-divider" />
            <div className="cv2-stat">
              <span className="cv2-stat-label">Sisa Bebas</span>
              <span className="cv2-stat-val" style={{ color: sisaGaji >= 0 ? '#34d399' : '#f87171' }}>
                {formatCurrency(Math.abs(sisaGaji))}
              </span>
            </div>
          </div>
        )}

        {/* Pemasukan */}
        <Section
          label="PEMASUKAN"
          sub={salary > 0 ? `Bulan ini: +${formatCurrency(salary)}` : 'Belum ada pemasukan'}
          onAdd={() => { setIncomeForm({ description: '', amount: '', date: `${month}-01` }); setShowIncomeModal(true) }}
        >
          {incomeCategories.map(renderIncomeRow)}
          {incomeCategories.length === 0 && !loading && (
            <div className="cv2-empty">Belum ada kategori pemasukan</div>
          )}
        </Section>

        {/* Tabungan */}
        <Section
          label="TABUNGAN"
          sub={savingsTotal > 0
            ? `${formatCurrency(savingsTotal)} · ${salary > 0 ? `${Math.round((savingsTotal / salary) * 100)}% gaji · ` : ''}auto-deduct`
            : 'Alokasi tabungan bulanan'}
          onAdd={() => { setEditData({ is_mandatory: true, category_type: 'savings', color: getSuggestedColor() }); setShowForm(true) }}
        >
          {loading
            ? [...Array(2)].map((_, i) => <div key={i} className="skeleton" style={{ height: 50, marginBottom: 1 }} />)
            : savingsCategories.map(cat => renderMandatoryRow(cat, 'savings'))
          }
        </Section>

        {/* Hutang */}
        <Section
          label="HUTANG & PIUTANG"
          sub={(() => {
            const aktif = hutangList.filter(h => !h.lunas)
            return aktif.length ? `${aktif.length} aktif` : 'Tidak ada hutang/piutang aktif'
          })()}
          onAdd={() => setShowHutangModal(true)}
        >
          {hutangList.length === 0
            ? <div className="cv2-empty">Tidak ada hutang tercatat</div>
            : hutangList.map(renderHutangRow)
          }
        </Section>

        {/* Pengeluaran Wajib */}
        <Section
          label="PENGELUARAN WAJIB"
          sub={salary > 0 && wajibTotal > 0
            ? `${formatCurrency(wajibTotal)} · ${Math.round((wajibTotal / salary) * 100)}% gaji · langsung dipotong`
            : 'Langsung dipotong dari gaji'}
          onAdd={() => { setEditData({ is_mandatory: true, category_type: 'wajib', color: getSuggestedColor() }); setShowForm(true) }}
        >
          {loading
            ? [...Array(2)].map((_, i) => <div key={i} className="skeleton" style={{ height: 50, marginBottom: 1 }} />)
            : wajibCategories.map(cat => renderMandatoryRow(cat, 'wajib'))
          }
        </Section>

        {/* Pengeluaran Rutin */}
        <Section
          label="PENGELUARAN RUTIN"
          sub="Tagihan & langganan bulanan"
          onAdd={() => { setEditData({ is_monthly: true, category_type: 'rutin', color: getSuggestedColor() }); setShowForm(true) }}
        >
          {loading
            ? [...Array(2)].map((_, i) => <div key={i} className="skeleton" style={{ height: 50, marginBottom: 1 }} />)
            : rutinCategories.length === 0
              ? <div className="cv2-empty">Belum ada pengeluaran rutin</div>
              : rutinCategories.map(renderCatRow)
          }
        </Section>

        {/* Pengeluaran Tambahan */}
        <Section
          label="PENGELUARAN TAMBAHAN"
          onAdd={() => { setEditData({ category_type: 'tambahan', color: getSuggestedColor() }); setShowForm(true) }}
        >
          {loading
            ? [...Array(2)].map((_, i) => <div key={i} className="skeleton" style={{ height: 50, marginBottom: 1 }} />)
            : tambahanCategories.length === 0
              ? <div className="cv2-empty">Belum ada pengeluaran tambahan</div>
              : tambahanCategories.map(renderCatRow)
          }
        </Section>

      </div>

      {/* ─── MODALS ──────────────────────────────────────────────────────────── */}

      {confirmDel && (
        <ConfirmModal title="Hapus Kategori"
          message={`Hapus "${confirmDel.name}"? Transaksi bulan ini untuk kategori ini juga akan terhapus.`}
          confirmLabel="Hapus" onConfirm={doDelete} onCancel={() => setConfirmDel(null)} />
      )}
      {/* ── Bayar Hutang Modal ─────────────── */}
      {payingHutang && (
        <div className="modal-overlay" onClick={() => { setPayingHutang(null); setPaySource(null); setPayingSavingsId(null) }}>
          <div className="modal" style={{ maxWidth: 360 }} onClick={e => e.stopPropagation()}>

            {/* Step 1 — pilih sumber */}
            {!paySource && (
              <>
                <div className="modal-header">
                  <div>
                    <h2 className="modal-title">{payingHutang.jenis === 'hutang' ? 'Hutang Terbayar' : 'Piutang Diterima'}</h2>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{payingHutang.nama} · {formatCurrency(payingHutang.amount)}</p>
                  </div>
                  <button className="btn btn-ghost" onClick={() => setPayingHutang(null)}><IconX size={16} /></button>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 14 }}>
                  {payingHutang.jenis === 'hutang' ? 'Bayar dari mana?' : 'Uang masuk ke mana?'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', gap: 10 }} onClick={() => setPaySource('tabungan')}>
                    <span style={{ fontSize: '1rem' }}>🏦</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>Tabungan</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                        {payingHutang.jenis === 'hutang' ? 'Kurangi dari kantong tabungan' : 'Tambah ke kantong tabungan'}
                      </div>
                    </div>
                  </button>
                  <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', gap: 10 }} onClick={() => setPaySource('saldo')}>
                    <span style={{ fontSize: '1rem' }}>💳</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>Saldo</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                        {payingHutang.jenis === 'hutang' ? 'Bayar langsung dari saldo' : 'Terima ke saldo'}
                      </div>
                    </div>
                  </button>
                </div>
              </>
            )}

            {/* Step 2 — pilih kantong tabungan */}
            {paySource === 'tabungan' && !payingSavingsId && (
              <>
                <div className="modal-header">
                  <div>
                    <h2 className="modal-title">Pilih Tabungan</h2>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{formatCurrency(payingHutang.amount)}</p>
                  </div>
                  <button className="btn btn-ghost" onClick={() => setPaySource(null)}><IconX size={16} /></button>
                </div>
                <div className="wajib-rows">
                  {savings.map(s => (
                    <div key={s.id} className="wajib-row" style={{ cursor: 'pointer' }} onClick={() => setPayingSavingsId(s.id)}>
                      <span className="brow-name">{s.name}</span>
                      <span className="wajib-amount tabular" style={{ color: Number(s.current_amount) >= Number(payingHutang.amount) ? '#34d399' : '#f87171' }}>
                        {formatCurrency(Number(s.current_amount))}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 3 — konfirmasi */}
            {paySource && (paySource === 'saldo' || payingSavingsId) && (
              <>
                <div className="modal-header">
                  <h2 className="modal-title">Konfirmasi</h2>
                  <button className="btn btn-ghost" onClick={() => { paySource === 'saldo' ? setPaySource(null) : setPayingSavingsId(null) }}><IconX size={16} /></button>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
                  Tandai {payingHutang.jenis} ke <strong style={{ color: 'var(--text-primary)' }}>{payingHutang.nama}</strong> sebesar{' '}
                  <strong style={{ color: payingHutang.jenis === 'hutang' ? '#f87171' : '#f59e0b' }}>{formatCurrency(payingHutang.amount)}</strong> sebagai <strong style={{ color: '#34d399' }}>lunas</strong>
                  {paySource === 'tabungan' && (
                    <> dari tabungan <strong style={{ color: 'var(--text-primary)' }}>{savings.find(s => s.id === payingSavingsId)?.name}</strong></>
                  )}?
                </div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <button className="btn btn-secondary" onClick={() => { setPayingHutang(null); setPaySource(null); setPayingSavingsId(null) }}>Batal</button>
                  <button className="btn btn-primary" disabled={payingLoading}
                    onClick={() => markLunasWithSource(payingHutang, paySource, payingSavingsId)}>
                    {payingLoading ? 'Menyimpan...' : 'Konfirmasi Lunas'}
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

      {confirmDelHutang && (
        <ConfirmModal title="Hapus Hutang"
          message={`Hapus catatan hutang ke "${confirmDelHutang.nama}"?`}
          confirmLabel="Hapus" onConfirm={deleteHutang} onCancel={() => setConfirmDelHutang(null)} />
      )}

      {showHutangModal && (
        <div className="modal-overlay" onClick={() => setShowHutangModal(false)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Catat {hutangForm.jenis === 'hutang' ? 'Hutang' : 'Piutang'}</h2>
              <button className="btn btn-ghost" onClick={() => setShowHutangModal(false)}><IconX size={16} /></button>
            </div>
            <div className="form-group">
              <label className="form-label">Jenis</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[{ val: 'hutang', label: 'Hutang', sub: 'Saya pinjam dari orang' }, { val: 'piutang', label: 'Piutang', sub: 'Orang pinjam dari saya' }].map(({ val, label, sub }) => (
                  <button key={val} type="button"
                    className={hutangForm.jenis === val ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
                    style={{ flex: 1, fontWeight: 700, display: 'flex', flexDirection: 'column', gap: 2, height: 'auto', padding: '8px 4px' }}
                    onClick={() => setHutangForm(f => ({ ...f, jenis: val }))}>
                    <span>{label}</span>
                    <span style={{ fontSize: '0.6rem', fontWeight: 500, opacity: 0.75 }}>{sub}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">{hutangForm.jenis === 'hutang' ? 'Dari siapa kamu meminjam' : 'Siapa yang meminjam darimu'}</label>
              <input className="form-input" type="text"
                placeholder={hutangForm.jenis === 'hutang' ? 'Misal: Budi, Bank BCA...' : 'Misal: Andi, Rudi...'}
                value={hutangForm.nama} onChange={e => setHutangForm(f => ({ ...f, nama: e.target.value }))} autoFocus />
            </div>
            <div className="form-group">
              <label className="form-label">Berapa</label>
              <CurrencyInput value={hutangForm.amount} onChange={v => setHutangForm(f => ({ ...f, amount: v }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Kapan janji dibayar</label>
              <input className="form-input" type="date" value={hutangForm.due_date} onChange={e => setHutangForm(f => ({ ...f, due_date: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">{hutangForm.jenis === 'hutang' ? 'Uang masuk ke' : 'Uang keluar dari'}</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[{ val: 'saldo', label: 'Saldo' }, { val: 'tabungan', label: 'Tabungan' }].map(({ val, label }) => (
                  <button key={val} type="button"
                    className={hutangForm.sumber === val ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
                    style={{ flex: 1, fontWeight: 700 }}
                    onClick={() => setHutangForm(f => ({ ...f, sumber: val }))}>
                    {label}
                    {val === 'tabungan' && savings[0] && (
                      <span style={{ fontSize: '0.6rem', fontWeight: 500, display: 'block', marginTop: 1, opacity: 0.8 }}>{savings[0].name}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-8 mt-16">
              <button className="btn btn-secondary" onClick={() => setShowHutangModal(false)}>Batal</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={saveHutang}
                disabled={hutangSaving || !hutangForm.nama.trim() || !hutangForm.amount}>
                {hutangSaving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showPemasukanModal && (
        <div className="modal-overlay" onClick={() => setShowPemasukanModal(false)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Pemasukan Bulanan</h2>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  {gajiTx ? 'Edit jumlah atau catatan' : 'Catat pemasukan bulan ini'}
                </p>
              </div>
              <button className="btn btn-ghost" onClick={() => setShowPemasukanModal(false)}><IconX size={16} /></button>
            </div>
            <div className="form-group">
              <label className="form-label">Jumlah Pemasukan</label>
              <CurrencyInput value={pemasukanForm.amount} onChange={v => setPemasukanForm(f => ({ ...f, amount: v }))} autoFocus />
            </div>
            <div className="form-group">
              <label className="form-label">Tanggal Diterima</label>
              <input className="form-input" type="date" value={pemasukanForm.date}
                min={`${month}-01`} max={(() => { const [y, m] = month.split('-').map(Number); return new Date(y, m, 0).toISOString().split('T')[0] })()}
                onChange={e => setPemasukanForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Catatan <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(opsional)</span></label>
              <textarea className="form-input" rows={2} placeholder="Misal: Gaji pokok + tunjangan..."
                value={pemasukanForm.note} onChange={e => setPemasukanForm(f => ({ ...f, note: e.target.value }))}
                style={{ resize: 'vertical', fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }} />
            </div>
            <div className="flex gap-8 mt-16">
              <button className="btn btn-secondary" onClick={() => setShowPemasukanModal(false)}>Batal</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={savePemasukan} disabled={pemasukanSaving}>
                {pemasukanSaving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showIncomeModal && (
        <div className="modal-overlay" onClick={() => setShowIncomeModal(false)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Tambah Pemasukan</h2>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>Dicatat ke bulan {month}</p>
              </div>
              <button className="btn btn-ghost" onClick={() => setShowIncomeModal(false)}><IconX size={16} /></button>
            </div>
            <div className="form-group">
              <label className="form-label">Nama Pemasukan</label>
              <input className="form-input" type="text" placeholder="Misal: Gaji Pokok, Bonus, Freelance..."
                value={incomeForm.description} onChange={e => setIncomeForm(f => ({ ...f, description: e.target.value }))} autoFocus />
            </div>
            <div className="form-group">
              <label className="form-label">Jumlah</label>
              <CurrencyInput value={incomeForm.amount} onChange={v => setIncomeForm(f => ({ ...f, amount: v }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Tanggal</label>
              <input className="form-input" type="date" value={incomeForm.date || `${month}-01`}
                min={`${month}-01`} max={(() => { const [y, m] = month.split('-').map(Number); return new Date(y, m, 0).toISOString().split('T')[0] })()}
                onChange={e => setIncomeForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div className="flex gap-8 mt-16">
              <button className="btn btn-secondary" onClick={() => setShowIncomeModal(false)}>Batal</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={saveIncome}
                disabled={incomeSaving || !incomeForm.description.trim() || !incomeForm.amount}>
                {incomeSaving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && !budgetEdit && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editData?.id
                  ? 'Edit Kategori'
                  : editData?.category_type === 'savings' ? 'Tabungan Baru'
                  : editData?.category_type === 'wajib' || editData?.is_mandatory ? 'Pengeluaran Wajib Baru'
                  : editData?.category_type === 'rutin' || editData?.is_monthly ? 'Pengeluaran Rutin Baru'
                  : editData?.category_type === 'income' ? 'Pemasukan Baru'
                  : 'Kategori Baru'}
              </h2>
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}><IconX size={16} /></button>
            </div>
            <CategoryForm editData={editData} salary={salary} month={month}
              onSuccess={() => { fetchAll(); setShowForm(false) }} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      {budgetEdit && (() => {
        const cat = categories.find(c => c.id === budgetEdit.id)
        return (
          <div className="modal-overlay" onClick={() => setBudgetEdit(null)}>
            <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h2 className="modal-title">Budget — {cat?.name}</h2>
                  {salary > 0 && <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>Gaji: {formatCurrency(salary)}</p>}
                </div>
                <button className="btn btn-ghost" onClick={() => setBudgetEdit(null)}><IconX size={16} /></button>
              </div>
              {salary > 0 && (
                <div className="form-group">
                  <label className="form-label">Persentase dari gaji</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <input className="form-input" type="number" placeholder={String(DEFAULT_PCT)}
                        value={budgetEdit.pct} onChange={e => handlePctChange(e.target.value)}
                        min="0" max="100" step="0.5" style={{ paddingRight: 36 }} />
                      <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.85rem' }}>%</span>
                    </div>
                    {budgetEdit.pct && salary > 0 && (
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        = {formatCurrency(Math.round((parseFloat(budgetEdit.pct) / 100) * salary))}
                      </span>
                    )}
                  </div>
                  {!budgetEdit.pct && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                      {[10, 15, 20, 25].map(p => (
                        <button key={p} className="btn btn-secondary btn-sm" onClick={() => handlePctChange(String(p))}>{p}%</button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Atau nominal langsung</label>
                <CurrencyInput value={budgetEdit.nominal} onChange={handleNominalChange} autoFocus={!salary} />
              </div>
              <div className="flex gap-8 mt-16">
                <button className="btn btn-secondary" onClick={() => setBudgetEdit(null)}>Batal</button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={saveBudget}>Simpan</button>
              </div>

            </div>
          </div>
        )
      })()}

      {/* Modal: Pengeluaran Tabungan */}
      {savingsWithdrawCat && (
        <div className="modal-overlay" onClick={() => !savingExpense && setSavingsWithdrawCat(null)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Pengeluaran — {savingsWithdrawCat.name}</h2>
              <button className="btn btn-ghost" onClick={() => setSavingsWithdrawCat(null)} disabled={savingExpense}><IconX size={16} /></button>
            </div>
            {savings.length === 0 && (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                Kantong tabungan akan dibuat otomatis dari kategori ini.
              </p>
            )}
            {savings.length > 0 && (
              <div className="form-group">
                <label className="form-label">Dari kantong</label>
                <select
                  className="form-select"
                  value={savingsExpense.kantongId}
                  onChange={e => setSavingsExpense(f => ({ ...f, kantongId: e.target.value }))}
                >
                  {savings.map(s => (
                    <option key={s.id} value={s.id}>{s.name} — {formatCurrency(s.current_amount)}</option>
                  ))}
                </select>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Jumlah</label>
                <CurrencyInput
                  value={savingsExpense.amount}
                  onChange={raw => setSavingsExpense(f => ({ ...f, amount: raw }))}
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Tanggal</label>
                <input
                  className="form-input"
                  type="date"
                  value={savingsExpense.date}
                  onChange={e => setSavingsExpense(f => ({ ...f, date: e.target.value }))}
                />
              </div>
            </div>
            {savingsExpense.amount > 0 && savingsExpense.kantongId && (() => {
              const sv = savings.find(s => s.id === savingsExpense.kantongId)
              const after = Math.max(0, Number(sv?.current_amount || 0) - parseFloat(savingsExpense.amount))
              const cukup = Number(sv?.current_amount || 0) >= parseFloat(savingsExpense.amount)
              return (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-input)', border: `1px solid ${cukup ? 'var(--border)' : 'rgba(248,113,113,0.4)'}`, borderRadius: 'var(--radius-sm)', padding: '10px 14px', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: 12 }}>
                  <span>Sisa kantong</span>
                  <span className="tabular" style={{ color: cukup ? 'var(--success)' : 'var(--danger)', fontWeight: 700 }}>{formatCurrency(after)}</span>
                </div>
              )
            })()}
            <div className="flex gap-8 mt-16">
              <button className="btn btn-secondary" onClick={() => setSavingsWithdrawCat(null)} disabled={savingExpense}>Batal</button>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={recordSavingsExpense}
                disabled={savingExpense}
              >
                {savingExpense ? 'Menyimpan...' : <><IconArrowDown size={13} /> Catat Pengeluaran</>}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .cv2-page { padding: 0 0 56px; }

        /* ── Stats Strip ─────────────────────────────────────── */
        .cv2-stats-strip {
          display: flex;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: 32px;
        }
        .cv2-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 16px 20px;
        }
        .cv2-stat-divider {
          width: 1px;
          background: var(--border);
          flex-shrink: 0;
          margin: 12px 0;
        }
        .cv2-stat-label {
          font-size: 0.58rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          font-weight: 700;
        }
        .cv2-stat-val {
          font-size: 1.05rem;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        /* ── Section ─────────────────────────────────────────── */
        .cv2-section { margin-bottom: 36px; }
        .cv2-section-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 0;
        }
        .cv2-section-label {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: var(--text-muted);
          text-transform: uppercase;
          display: block;
        }
        .cv2-section-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
          margin-top: 3px;
          display: block;
        }
        .cv2-add-btn {
          width: 22px; height: 22px;
          border-radius: 6px;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-muted);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.12s;
          flex-shrink: 0;
        }
        .cv2-add-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: var(--accent-dim);
        }

        /* ── Row ─────────────────────────────────────────────── */
        .cv2-table-body { }
        .cv2-row {
          display: grid;
          grid-template-columns: 1fr 180px 148px 72px;
          grid-template-rows: auto;
          align-items: center;
          min-height: 50px;
          padding: 0 4px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          position: relative;
          transition: background 0.12s;
        }
        .cv2-row:last-child { border-bottom: none; }
        .cv2-row::before {
          content: '';
          position: absolute;
          left: 0; top: 10px; bottom: 10px;
          width: 2px;
          background: var(--rc, var(--accent));
          border-radius: 2px;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .cv2-row:hover { background: rgba(255,255,255,0.02); }
        .cv2-row:hover::before { opacity: 0.8; }
        .cv2-row-dim { opacity: 0.38; }

        /* ── Cells ───────────────────────────────────────────── */
        .cv2-cell-name {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 13px 0 13px 8px;
          min-width: 0;
        }
        .cv2-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .cv2-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cv2-tag {
          font-size: 0.52rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 2px 5px;
          border-radius: 3px;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .cv2-cell-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-right: 16px;
        }
        .cv2-bar-track {
          flex: 1;
          height: 3px;
          background: rgba(255,255,255,0.07);
          border-radius: 2px;
          overflow: hidden;
        }
        [data-theme="light"] .cv2-bar-track {
          background: rgba(0,0,0,0.09);
        }
        .cv2-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cv2-bar-pct {
          font-size: 0.6rem;
          font-weight: 700;
          min-width: 30px;
          text-align: right;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.02em;
        }
        .cv2-bar-label {
          font-size: 0.58rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .cv2-bar-cta {
          font-size: 0.62rem;
          font-weight: 700;
          color: var(--accent);
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.15s;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }
        .cv2-row:hover .cv2-bar-cta { opacity: 1; }

        .cv2-cell-amount {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          padding-right: 4px;
        }
        .cv2-amount-main {
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }
        .cv2-amount-sub {
          font-size: 0.62rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .cv2-cell-actions {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1px;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .cv2-row:hover .cv2-cell-actions { opacity: 1; }
        .cv2-sav-withdraw-btn { opacity: 1 !important; }
        .cv2-icon-btn {
          width: 26px; height: 26px;
          border-radius: 5px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.12s;
        }
        .cv2-icon-btn:hover { background: rgba(255,255,255,0.07); color: var(--text-primary); }
        .cv2-icon-danger:hover { background: rgba(248,113,113,0.1); color: #f87171; }

        /* Mobile progress row */
        .cv2-mobile-prog {
          display: none;
          grid-column: 1 / -1;
          padding: 0 8px 10px;
        }

        /* ── Quick Add ───────────────────────────────────────── */
        .cv2-quick-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 10px 12px 14px;
          background: var(--bg-input);
          border-bottom: 1px solid var(--border);
          margin: 0;
        }
        .cv2-quick-row .form-input { font-size: 0.8rem; padding: 7px 10px; height: auto; }

        /* ── Empty ───────────────────────────────────────────── */
        .cv2-empty {
          padding: 18px 8px;
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* ── Mobile ──────────────────────────────────────────── */
        @media (max-width: 640px) {
          .cv2-stats-strip { }
          .cv2-stat { padding: 12px 14px; }
          .cv2-stat-val { font-size: 0.9rem; }

          .cv2-row {
            grid-template-columns: 1fr auto auto;
            grid-template-rows: auto auto;
            align-items: start;
            min-height: auto;
            padding: 0;
          }
          .cv2-cell-name {
            grid-column: 1; grid-row: 1;
            padding: 12px 0 4px 8px;
          }
          .cv2-cell-bar { display: none; }
          .cv2-cell-amount {
            grid-column: 2; grid-row: 1;
            padding: 12px 4px 4px 0;
            align-items: flex-end;
          }
          .cv2-cell-actions {
            grid-column: 3; grid-row: 1;
            opacity: 1;
            padding: 10px 4px 4px 0;
            align-items: flex-start;
          }
          .cv2-mobile-prog {
            display: block;
            grid-column: 1 / -1; grid-row: 2;
            padding: 2px 8px 10px;
          }
          .cv2-row::before { display: none; }
          .cv2-name { font-size: 0.82rem; }
          .cv2-amount-main { font-size: 0.82rem; }
        }

        @media (max-width: 380px) {
          .cv2-stat { padding: 10px 10px; }
          .cv2-stat-val { font-size: 0.82rem; }
          .cv2-stat-label { font-size: 0.52rem; }
          .cv2-tag { display: none; }
        }
      `}</style>
    </>
  )
}
