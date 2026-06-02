import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { usePageHeader } from '../context/PageHeaderContext'
import { formatCurrency, getCurrentMonth, getMonthLabel, getMonthEndDate } from '../utils/formatCurrency'
import CategoryForm from '../components/CategoryForm'
import ConfirmModal from '../components/ConfirmModal'
import CurrencyInput from '../components/CurrencyInput'
import { useToast } from '../components/Toast'
import { isMandatory, isMandatoryIncome, isProtected } from '../constants/mandatoryCategories'
import { IconSettings, IconArrowUp, IconArrowDown, IconArrowUpRight, IconArrowDownLeft, IconEdit, IconTrash, IconPlus, IconCheck } from '../components/Icons'

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

export default function Categories() {
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
  const [confirmDel, setConfirmDel] = useState(null)
  const [searchParams] = useSearchParams()
  const [month, setMonth] = useState(() => searchParams.get('month') || getCurrentMonth())
  const [copying, setCopying] = useState(false)
  const [gajiCatId, setGajiCatId] = useState(null)
  const [gajiTx, setGajiTx] = useState(null)
  const [showPemasukanModal, setShowPemasukanModal] = useState(false)
  const [pemasukanForm, setPemasukanForm] = useState({ amount: '', note: '' })
  const [pemasukanSaving, setPemasukanSaving] = useState(false)
  const [showIncomeModal, setShowIncomeModal] = useState(false)
  const [incomeForm, setIncomeForm] = useState({ description: '', amount: '' })
  const [incomeSaving, setIncomeSaving] = useState(false)
  const isCurrentMonth = month === getCurrentMonth()
  const isAtStart = !!user.recording_start_month && month <= user.recording_start_month

  const [hutangList, setHutangList] = useState([])
  const [savings, setSavings] = useState([])
  const [showHutangModal, setShowHutangModal] = useState(false)
  const [hutangForm, setHutangForm] = useState({ jenis: 'hutang', nama: '', amount: '', due_date: '', sumber: 'saldo' })
  const [hutangSaving, setHutangSaving] = useState(false)
  const [confirmDelHutang, setConfirmDelHutang] = useState(null)

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

    // Fetch categories untuk bulan ini
    let { data: rawCats } = await supabase.from('categories')
      .select('*').eq('user_id', user.id).eq('month', month).order('name')

    // Auto-copy dari bulan sebelumnya (atau null-month default) jika bulan ini kosong
    if (!rawCats || rawCats.length === 0) {
      const { data: allPrevCats } = await supabase.from('categories')
        .select('*').eq('user_id', user.id)
        .or(`month.is.null,month.neq.${month}`)
        .order('month', { ascending: false, nullsFirst: false })
      if (allPrevCats && allPrevCats.length > 0) {
        // Dedupe by nama, ambil yang paling recent
        const byName = {}
        allPrevCats.forEach(c => {
          if (!byName[c.name] || (c.month || '0000') > (byName[c.name].month || '0000')) {
            byName[c.name] = c
          }
        })
        const toCopy = Object.values(byName)
        const { data: inserted } = await supabase.from('categories').insert(
          toCopy.map(({ id: _id, created_at: _ca, ...rest }) => ({
            ...rest,
            month,
            budget_limit: 0, // budget tidak di-copy, harus di-set manual per bulan
          }))
        ).select()
        rawCats = inserted || []
      }
    }

    const [txRes, incomeTxRes, catBudgetsRes, savingsRes] = await Promise.all([
      supabase.from('transactions').select('category_id, amount').eq('user_id', user.id).eq('type', 'expense').gte('date', startDate).lte('date', endDate),
      supabase.from('transactions').select('id, category_id, amount, description').eq('user_id', user.id).eq('type', 'income').gte('date', startDate).lte('date', endDate),
      supabase.from('category_budgets').select('category_id, budget_limit').eq('user_id', user.id).eq('month', month),
      supabase.from('savings').select('id, name, current_amount').eq('user_id', user.id).order('name'),
    ])
    const catBudgetMap = {}
    ;(catBudgetsRes.data || []).forEach(cb => { catBudgetMap[cb.category_id] = Number(cb.budget_limit) })
    const spend = {}
    ;(txRes.data || []).forEach(tx => {
      if (tx.category_id) spend[tx.category_id] = (spend[tx.category_id] || 0) + Number(tx.amount)
    })
    const cats = (rawCats || []).map(cat => ({
      ...cat,
      budget_limit: catBudgetMap[cat.id] !== undefined ? catBudgetMap[cat.id] : (cat.budget_limit || 0),
    }))
    const gajiCat = (rawCats || []).find(c => c.name === 'Pemasukan Bulanan')
    const gajiTxList = gajiCat ? (incomeTxRes.data || []).filter(t => t.category_id === gajiCat.id) : []
    const derivedSalary = gajiTxList.reduce((s, t) => s + Number(t.amount), 0)
    setCategories(cats)
    setSpendMap(spend)
    setSalary(derivedSalary)
    setGajiCatId(gajiCat?.id || null)
    setGajiTx(gajiTxList[0] || null)
    setSavings(savingsRes.data || [])
    setLoading(false)
  }

  const saveIncome = async () => {
    const amount = parseFloat(incomeForm.amount) || 0
    if (!amount || !incomeForm.description.trim()) return
    setIncomeSaving(true)
    try {
      let catId = gajiCatId
      if (!catId) {
        const { data: newCat } = await supabase.from('categories')
          .insert({ user_id: user.id, name: 'Pemasukan Bulanan', color: '#10b981', icon: '', is_mandatory: false, budget_limit: 0 })
          .select().single()
        catId = newCat.id
      }
      await supabase.from('transactions').insert({
        user_id: user.id, category_id: catId, type: 'income',
        amount, description: incomeForm.description.trim(),
        date: `${month}-01`,
      })
      toast('Pemasukan dicatat', 'success')
      setShowIncomeModal(false)
      setIncomeForm({ description: '', amount: '' })
      fetchAll()
    } finally {
      setIncomeSaving(false)
    }
  }

  const doDelete = async () => {
    const cat = categories.find(c => c.id === confirmDel.id)
    if (cat && isProtected(cat)) { toast('Kategori ini tidak bisa dihapus', 'error'); setConfirmDel(null); return }
    await supabase.from('categories').delete().eq('id', confirmDel.id)
    toast('Kategori dihapus', 'success')
    setConfirmDel(null)
    fetchAll()
  }

  const openBudgetEdit = (cat) => {
    const nominal = String(Math.round(cat.budget_limit || 0))
    const pct = salary > 0 && cat.budget_limit > 0
      ? ((cat.budget_limit / salary) * 100).toFixed(1)
      : ''
    setBudgetEdit({ id: cat.id, nominal, pct })
  }

  const handleNominalChange = (raw) => {
    const nom = parseFloat(raw) || 0
    const pct = salary > 0 && nom > 0 ? ((nom / salary) * 100).toFixed(1) : ''
    setBudgetEdit(b => ({ ...b, nominal: raw, pct }))
  }

  const handlePctChange = (val) => {
    const p = parseFloat(val) || 0
    const nom = salary > 0 && p > 0 ? String(Math.round((p / 100) * salary)) : ''
    setBudgetEdit(b => ({ ...b, pct: val, nominal: nom }))
  }

  const saveBudget = async () => {
    const amount = parseFloat(budgetEdit.nominal) || 0
    await Promise.all([
      supabase.from('category_budgets').upsert(
        { user_id: user.id, category_id: budgetEdit.id, month, budget_limit: amount },
        { onConflict: 'category_id,month' }
      ),
      supabase.from('categories').update({ budget_limit: amount }).eq('id', budgetEdit.id),
    ])
    toast('Budget disimpan', 'success')
    setBudgetEdit(null)
    fetchAll()
  }

  const copyFromPrevMonth = async () => {
    setCopying(true)
    const pm = prevMonth(month)
    // Ambil kategori bulan lalu + budgetnya, match ke bulan ini by NAME
    const [{ data: prevCats }, { data: prevBudgets }] = await Promise.all([
      supabase.from('categories').select('id, name').eq('user_id', user.id).eq('month', pm),
      supabase.from('category_budgets').select('category_id, budget_limit').eq('user_id', user.id).eq('month', pm),
    ])
    if (!prevBudgets || prevBudgets.length === 0) {
      toast(`Tidak ada budget di ${getMonthLabel(pm)}`, 'error')
      setCopying(false)
      return
    }
    // Map name → budget dari bulan lalu
    const budgetByName = {}
    ;(prevBudgets || []).forEach(b => {
      const cat = (prevCats || []).find(c => c.id === b.category_id)
      if (cat) budgetByName[cat.name] = Number(b.budget_limit)
    })
    // Apply ke kategori bulan ini yang namanya cocok
    const toUpsert = categories.filter(c => budgetByName[c.name] !== undefined)
    if (toUpsert.length === 0) {
      toast(`Tidak ada kategori cocok dari ${getMonthLabel(pm)}`, 'error')
      setCopying(false)
      return
    }
    await Promise.all(toUpsert.map(c =>
      supabase.from('category_budgets').upsert(
        { user_id: user.id, category_id: c.id, month, budget_limit: budgetByName[c.name] },
        { onConflict: 'category_id,month' }
      )
    ))
    toast(`Budget disalin dari ${getMonthLabel(pm)}`, 'success')
    setCopying(false)
    fetchAll()
  }

  const fetchHutang = async () => {
    const { data, error } = await supabase.from('hutang').select('*').eq('user_id', user.id).eq('month', month).order('due_date', { ascending: true, nullsFirst: false })
    if (error) console.error('Hutang fetch:', error.message)
    setHutangList(data || [])
  }

  // Helper: apply finansial effect saat tambah/hapus hutang atau piutang
  const applyFinancial = async (jenis, sumber, savings_id, amount, nama) => {
    const today = new Date().toISOString().split('T')[0]
    // hutang: uang MASUK (income saldo / +tabungan)
    // piutang: uang KELUAR (expense saldo / -tabungan)
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
      const next = isIncoming
        ? Number(sav.current_amount) + amount
        : Math.max(0, Number(sav.current_amount) - amount)
      const { error } = await supabase.from('savings').update({ current_amount: next }).eq('id', savings_id)
      if (error) throw error
    }
    return linked_tx_id
  }

  // Helper: balikkan finansial (untuk lunas / hapus sebelum lunas)
  const reverseFinancial = async (jenis, sumber, savings_id, amount, nama, linked_tx_id) => {
    const today = new Date().toISOString().split('T')[0]
    // Kebalikan dari applyFinancial
    const wasIncoming = jenis === 'hutang'

    if (sumber === 'saldo') {
      if (linked_tx_id) {
        await supabase.from('transactions').delete().eq('id', linked_tx_id)
      } else {
        // Fallback: buat tx balik
        await supabase.from('transactions').insert({
          user_id: user.id, amount, category_id: null,
          type: wasIncoming ? 'expense' : 'income',
          description: wasIncoming ? `Bayar hutang ke ${nama}` : `Terima piutang dari ${nama}`,
          date: today,
        })
      }
    } else if (sumber === 'tabungan' && savings_id) {
      const { data: sav } = await supabase.from('savings').select('current_amount').eq('id', savings_id).single()
      if (sav) {
        const next = wasIncoming
          ? Math.max(0, Number(sav.current_amount) - amount)
          : Number(sav.current_amount) + amount
        await supabase.from('savings').update({ current_amount: next }).eq('id', savings_id)
      }
    }
  }

  const saveHutang = async () => {
    const amount = parseFloat(hutangForm.amount) || 0
    if (!hutangForm.nama.trim() || !amount) return
    setHutangSaving(true)
    try {
      const savings_id = hutangForm.sumber === 'tabungan' ? (savings[0]?.id || null) : null
      const linked_tx_id = await applyFinancial(hutangForm.jenis, hutangForm.sumber, savings_id, amount, hutangForm.nama.trim())

      const { error } = await supabase.from('hutang').insert({
        user_id: user.id,
        jenis: hutangForm.jenis,
        nama: hutangForm.nama.trim(),
        amount,
        due_date: hutangForm.due_date || null,
        sumber: hutangForm.sumber,
        savings_id,
        linked_tx_id,
        month,
      })
      if (error) throw error

      toast(hutangForm.jenis === 'hutang' ? 'Hutang dicatat' : 'Piutang dicatat', 'success')
      setShowHutangModal(false)
      setHutangForm({ jenis: 'hutang', nama: '', amount: '', due_date: '', sumber: 'saldo' })
      fetchHutang()
      fetchAll()
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setHutangSaving(false)
    }
  }

  const markLunas = async (id) => {
    const h = hutangList.find(x => x.id === id)
    if (!h) return
    try {
      // Lunas = balikkan finansial (bayar hutang / terima piutang)
      await reverseFinancial(h.jenis, h.sumber, h.savings_id, Number(h.amount), h.nama, null)
      await supabase.from('hutang').update({ lunas: true }).eq('id', id)
      toast(h.jenis === 'hutang' ? 'Hutang ditandai lunas' : 'Piutang diterima', 'success')
      fetchHutang()
      fetchAll()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  const deleteHutang = async () => {
    const h = hutangList.find(x => x.id === confirmDelHutang.id)
    if (!h) return
    try {
      if (!h.lunas) {
        await reverseFinancial(h.jenis, h.sumber, h.savings_id, Number(h.amount), h.nama, h.linked_tx_id)
      }
      await supabase.from('hutang').delete().eq('id', confirmDelHutang.id)
      toast('Dihapus', 'success')
      setConfirmDelHutang(null)
      fetchHutang()
      fetchAll()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  const getDueDateStatus = (dateStr, lunas) => {
    if (lunas) return { label: 'Lunas', color: 'var(--success)', bg: 'rgba(52,211,153,0.1)' }
    if (!dateStr) return null
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const due = new Date(dateStr)
    const diff = Math.round((due - today) / 86400000)
    if (diff < 0) return { label: `Terlambat ${Math.abs(diff)} hari`, color: 'var(--danger)', bg: 'rgba(248,113,113,0.1)' }
    if (diff === 0) return { label: 'Hari ini!', color: 'var(--danger)', bg: 'rgba(248,113,113,0.1)' }
    if (diff <= 7) return { label: `${diff} hari lagi`, color: 'var(--warning)', bg: 'rgba(251,191,36,0.1)' }
    return { label: `${diff} hari lagi`, color: 'var(--text-muted)', bg: null }
  }

  const savePemasukan = async () => {
    const amount = parseFloat(pemasukanForm.amount.replace(/\D/g, '')) || 0
    if (!gajiCatId) return
    setPemasukanSaving(true)
    const txDate = `${month}-01`
    if (gajiTx) {
      await supabase.from('transactions').update({ amount, description: pemasukanForm.note, date: txDate }).eq('id', gajiTx.id)
    } else {
      await supabase.from('transactions').insert({ user_id: user.id, category_id: gajiCatId, type: 'income', amount, description: pemasukanForm.note, date: txDate })
    }
    toast('Pemasukan disimpan', 'success')
    setPemasukanSaving(false)
    setShowPemasukanModal(false)
    fetchAll()
  }

  const togglePlanned = async (cat) => {
    await supabase.from('categories').update({ is_planned: !cat.is_planned }).eq('id', cat.id)
    toast(cat.is_planned ? 'Kategori diaktifkan' : 'Dipindah ke perencanaan', 'success')
    fetchAll()
  }

  const incomeCategories = categories.filter(c => isMandatoryIncome(c))
  const mandatory = categories.filter(c => isMandatory(c))
    .sort((a, b) => {
      if (isProtected(a) && !isProtected(b)) return -1
      if (!isProtected(a) && isProtected(b)) return 1
      return a.name.localeCompare(b.name)
    })
  const monthly = categories.filter(c => c.is_monthly && !isMandatory(c) && !isMandatoryIncome(c))
  const regular = categories.filter(c => !isMandatory(c) && !isMandatoryIncome(c) && !c.is_monthly)

  const renderPlanToggle = (cat) => {
    const isPlanned = !!cat.is_planned
    return (
      <button
        className={`btn btn-ghost btn-sm cat-plan-btn${isPlanned ? ' planned' : ''}`}
        onClick={() => togglePlanned(cat)}
        title={isPlanned ? 'Aktifkan kembali' : 'Tandai sebagai rencana'}
      >
        {isPlanned ? 'Direncanakan' : 'Aktif'}
      </button>
    )
  }

  const renderCatCard = (cat) => {
    const spent = spendMap[cat.id] || 0
    const budget = Number(cat.budget_limit || 0)
    const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0
    const rawPct = budget > 0 ? (spent / budget) * 100 : 0
    const over = rawPct > 100
    const full = !over && rawPct >= 100
    const near = !over && rawPct >= 80 && rawPct < 100
    const barColor = over ? 'var(--danger)' : full ? 'var(--success)' : near ? 'var(--warning)' : cat.color
    const salaryPct = salary > 0 && budget > 0 ? ((budget / salary) * 100).toFixed(0) : null
    const isPlanned = !!cat.is_planned

    return (
      <div key={cat.id} className={`cat-card${isPlanned ? ' cat-planned' : ''}`} style={{ '--cat-color': cat.color }}>
        <div className="cat-card-top">
          <div className="cat-card-left">
            <span className="cat-icon" style={{ background: `${cat.color || '#6366f1'}18`, color: cat.color || 'var(--accent)' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color || 'var(--accent)', display: 'block', flexShrink: 0 }} />
            </span>
            <span className="cat-name">{cat.name}</span>
          </div>
          <div className="cat-card-actions">
            {renderPlanToggle(cat)}
            <button className="btn btn-ghost btn-sm icon-btn" title="Edit" onClick={() => { setEditData(cat); setShowForm(true) }}><IconEdit size={13} /></button>
            <button className="btn btn-ghost btn-sm" onClick={() => openBudgetEdit(cat)} style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
              {budget > 0 ? 'Budget' : '+ Budget'}
            </button>
            <button className="btn btn-ghost btn-sm icon-btn" style={{ color: 'var(--danger)' }} title="Hapus" onClick={() => setConfirmDel({ id: cat.id, name: cat.name })}><IconTrash size={13} /></button>
          </div>
        </div>

        {budget > 0 ? (
          <>
            <div className="cat-amounts">
              <span className="cat-spent tabular" style={{ color: over ? 'var(--danger)' : 'var(--text-primary)' }}>{formatCurrency(spent)}</span>
              <div style={{ textAlign: 'right' }}>
                <span className="cat-budget tabular">/ {formatCurrency(budget)}</span>
                {salaryPct && <span className="cat-pct-label">{salaryPct}% gaji</span>}
              </div>
            </div>
            <div className="progress-bar" style={{ height: 6 }}>
              <div className="progress-fill" style={{ width: `${pct}%`, background: barColor }} />
            </div>
            <div className="cat-status-row">
              {over && <span className="badge badge-danger" style={{ fontSize: '0.6rem' }}>Over {formatCurrency(spent - budget)}</span>}
              {full && <span className="badge badge-success" style={{ fontSize: '0.6rem' }}>Penuh</span>}
              {near && <span className="badge badge-warning" style={{ fontSize: '0.6rem' }}>Hampir</span>}
              {!over && !full && !near && <span className="cat-sisa">Sisa {formatCurrency(budget - spent)}</span>}
            </div>
          </>
        ) : (
          <div className="cat-no-budget">
            <span>Belum ada budget</span>
            {salary > 0 && (
              <span className="cat-no-budget-hint">Default: {formatCurrency(Math.round(salary * DEFAULT_PCT / 100))} ({DEFAULT_PCT}%)</span>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderMandatoryCard = (cat) => {
    const budget = Number(cat.budget_limit || 0)
    const salaryPct = salary > 0 && budget > 0 ? ((budget / salary) * 100).toFixed(0) : null
    const isPlanned = !!cat.is_planned

    return (
      <div key={cat.id} className={`cat-card cat-mandatory${isPlanned ? ' cat-planned' : ''}`} style={{ '--cat-color': cat.color }}>
        <div className="cat-card-top">
          <div className="cat-card-left">
            <span className="cat-icon" style={{ background: `${cat.color || 'var(--danger)'}18`, color: cat.color || 'var(--danger)' }}>
              <IconArrowDown size={14} />
            </span>
            <div>
              <span className="cat-name">{cat.name}</span>
              <span className="cat-mandatory-badge">Wajib · langsung dipotong</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {renderPlanToggle(cat)}
            <button className="btn btn-ghost btn-sm" onClick={() => openBudgetEdit(cat)} style={{ fontSize: '0.72rem' }}>Ubah</button>
            {!isProtected(cat) && (
              <button
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.72rem', color: 'var(--danger)' }}
                onClick={() => setConfirmDel({ id: cat.id, name: cat.name })}
              >
                Hapus
              </button>
            )}
          </div>
        </div>
        <div className="mand-budget-row">
          <div>
            <span className="mand-label">Budget per bulan</span>
            <span className="mand-val tabular">{budget > 0 ? formatCurrency(budget) : '—'}</span>
          </div>
          {salaryPct && <span className="mand-pct-chip">{salaryPct}% gaji</span>}
        </div>
      </div>
    )
  }

  const renderIncomeCard = (cat) => {
    return (
      <div key={cat.id} className="cat-card cat-mandatory" style={{ '--cat-color': 'var(--success)' }}>
        <div className="cat-card-top">
          <div className="cat-card-left">
            <span className="cat-icon" style={{ background: 'rgba(52,211,153,0.12)', color: 'var(--success)' }}><IconArrowUp size={14} /></span>
            <div>
              <span className="cat-name">{cat.name}</span>
              <span className="cat-mandatory-badge" style={{ color: 'var(--success)' }}>Pemasukan · Permanen</span>
            </div>
          </div>
          <button
            className="btn btn-ghost btn-sm"
            style={{ fontSize: '0.72rem', color: 'var(--accent)' }}
            onClick={() => { setPemasukanForm({ amount: gajiTx ? String(gajiTx.amount) : '', note: gajiTx?.description || '' }); setShowPemasukanModal(true) }}
          >
            {salary > 0 ? '✎ Edit' : '+ Catat'}
          </button>
        </div>
        <div className="mand-budget-row">
          <div>
            <span className="mand-label">Bulan ini</span>
            <span className="mand-val tabular" style={{ color: salary > 0 ? 'var(--success)' : 'var(--text-muted)' }}>
              {salary > 0 ? `+${formatCurrency(salary)}` : '—'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="animate-in">
      <div className="page-header-banner">
        <div className="page-header-icon"><IconSettings size={18} /></div>
        <div>
          <h1 className="page-header-title">Setting Kategori</h1>
          <p className="page-header-sub">Kelola kategori &amp; budget bulanan</p>
        </div>
      </div>

      {/* Pemasukan */}
      <div className="cat-section mb-24">
        <div className="cat-section-head">
          <div>
            <span className="cat-section-title">Pemasukan</span>
            <span className="cat-section-sub">
              {salary > 0 ? `Total bulan ini: ${formatCurrency(salary)}` : 'Belum ada transaksi pemasukan bulan ini'}
            </span>
          </div>
          <button className="btn btn-ghost btn-sm cat-add-btn" onClick={() => setShowIncomeModal(true)}><IconPlus size={13} /></button>
        </div>
        <div className="cat-grid">
          {incomeCategories.map(cat => renderIncomeCard(cat))}
          {incomeCategories.length === 0 && !loading && (
            <div className="card">
              <div className="empty-state" style={{ padding: '16px 0' }}>
                <div className="empty-state-icon"><IconArrowUp size={20} /></div>
                <strong>Belum ada kategori pemasukan</strong>
                <p>Tambah pemasukan via tombol + di atas</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pengeluaran Wajib */}
      <div className="cat-section mb-24">
        <div className="cat-section-head">
          <div>
            <span className="cat-section-title">Pengeluaran Wajib</span>
            <span className="cat-section-sub">
              {salary > 0
                ? `${formatCurrency(mandatory.reduce((s, c) => s + Number(c.budget_limit || 0), 0))} dari gaji ${formatCurrency(salary)} — langsung dipotong`
                : 'Catat gaji untuk lihat persentase'}
            </span>
          </div>
          <button className="btn btn-ghost btn-sm cat-add-btn" onClick={() => { setEditData({ is_mandatory: true, color: getSuggestedColor() }); setShowForm(true) }}><IconPlus size={13} /></button>
        </div>
        {loading ? (
          <div className="cat-grid">
            {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 140 }} />)}
          </div>
        ) : (
          <div className="cat-grid">
            {mandatory.map(cat => renderMandatoryCard(cat))}
          </div>
        )}
      </div>

      {/* Hutang */}
      <div className="cat-section mb-24">
        <div className="cat-section-head">
          <div>
            <span className="cat-section-title">Hutang</span>
            <span className="cat-section-sub">
              {(() => {
                const aktifHutang = hutangList.filter(h => !h.lunas && h.jenis === 'hutang')
                const aktifPiutang = hutangList.filter(h => !h.lunas && h.jenis === 'piutang')
                const parts = []
                if (aktifHutang.length) parts.push(`Hutang ${formatCurrency(aktifHutang.reduce((s, h) => s + Number(h.amount), 0))}`)
                if (aktifPiutang.length) parts.push(`Piutang ${formatCurrency(aktifPiutang.reduce((s, h) => s + Number(h.amount), 0))}`)
                return parts.length ? parts.join(' · ') : 'Tidak ada hutang/piutang aktif'
              })()}
            </span>
          </div>
          <button className="btn btn-ghost btn-sm cat-add-btn" onClick={() => setShowHutangModal(true)}><IconPlus size={13} /></button>
        </div>
        {hutangList.length === 0 ? (
          <div className="card">
            <div className="empty-state" style={{ padding: '16px 0' }}>
              <div className="empty-state-icon"><IconArrowUpRight size={20} /></div>
              <strong>Tidak ada hutang</strong>
              <p>Catat hutang untuk tracking pembayaran</p>
            </div>
          </div>
        ) : (
          <div className="cat-grid">
            {hutangList.map(h => {
              const status = getDueDateStatus(h.due_date, h.lunas)
              const dueFormatted = h.due_date
                ? new Date(h.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                : null
              return (
                <div key={h.id} className={`cat-card hutang-card${h.lunas ? ' cat-planned' : ''}`} style={{ '--cat-color': h.lunas ? '#6b7280' : h.jenis === 'piutang' ? '#f59e0b' : '#f87171' }}>
                  <div className="cat-card-top">
                    <div className="cat-card-left">
                      <span className="cat-icon" style={{
                        background: h.jenis === 'piutang' ? 'rgba(245,158,11,0.12)' : 'rgba(248,113,113,0.12)',
                        color: h.jenis === 'piutang' ? 'var(--warning)' : 'var(--danger)',
                      }}>
                        {h.jenis === 'piutang' ? <IconArrowDownLeft size={14} /> : <IconArrowUpRight size={14} />}
                      </span>
                      <div>
                        <span className="cat-name">{h.nama}</span>
                        <span className="cat-mandatory-badge" style={{ color: h.jenis === 'piutang' ? 'var(--warning)' : 'var(--danger)' }}>
                          {h.jenis === 'piutang' ? 'Piutang' : 'Hutang'} · {h.sumber === 'tabungan' ? 'Tabungan' : 'Saldo'}
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ color: 'var(--danger)', fontSize: '0.72rem' }}
                      onClick={() => setConfirmDelHutang({ id: h.id, nama: h.nama })}
                    >
                      Hapus
                    </button>
                  </div>

                  <div className="mand-budget-row">
                    <div>
                      <span className="mand-label">Jumlah</span>
                      <span className="mand-val tabular" style={{ color: h.lunas ? 'var(--text-muted)' : h.jenis === 'piutang' ? 'var(--warning)' : 'var(--danger)' }}>
                        {formatCurrency(h.amount)}
                      </span>
                    </div>
                    {status && (
                      <span style={{
                        fontSize: '0.68rem', fontWeight: 700,
                        color: status.color,
                        background: status.bg || 'transparent',
                        padding: status.bg ? '3px 8px' : '0',
                        borderRadius: 99,
                        whiteSpace: 'nowrap',
                      }}>
                        {status.label}
                      </span>
                    )}
                  </div>

                  {dueFormatted && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      Bayar: {dueFormatted}
                    </div>
                  )}

                  {!h.lunas && (
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%', fontSize: '0.75rem', fontWeight: 700, gap: 6 }}
                      onClick={() => markLunas(h.id)}
                    >
                      <IconCheck size={13} />
                      {h.jenis === 'piutang' ? 'Tandai Sudah Dibayar' : 'Tandai Lunas'}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Pengeluaran Rutin */}
      <div className="cat-section mb-24">
        <div className="cat-section-head">
          <div>
            <span className="cat-section-title">Pengeluaran Rutin</span>
            <span className="cat-section-sub">Tagihan & pengeluaran tetap bulanan</span>
          </div>
          <button className="btn btn-ghost btn-sm cat-add-btn" onClick={() => { setEditData({ is_monthly: true, color: getSuggestedColor() }); setShowForm(true) }}><IconPlus size={13} /></button>
        </div>
        {loading ? (
          <div className="cat-grid">
            {[...Array(2)].map((_, i) => <div key={i} className="skeleton" style={{ height: 140 }} />)}
          </div>
        ) : monthly.length === 0 ? (
          <div className="card">
            <div className="empty-state" style={{ padding: '16px 0' }}>
              <div className="empty-state-icon"><IconArrowDown size={20} /></div>
              <strong>Belum ada pengeluaran rutin</strong>
              <p>Tambah tagihan bulanan, langganan, cicilan, dll.</p>
            </div>
          </div>
        ) : (
          <div className="cat-grid">
            {monthly.map(cat => renderCatCard(cat))}
          </div>
        )}
      </div>

      {/* Kategori Lainnya */}
      <div className="cat-section">
        <div className="cat-section-head">
          <span className="cat-section-title">Kategori Lainnya</span>
          <button className="btn btn-ghost btn-sm cat-add-btn" onClick={() => { setEditData({ color: getSuggestedColor() }); setShowForm(true) }}><IconPlus size={13} /></button>
        </div>
        {loading ? (
          <div className="cat-grid">
            {[...Array(2)].map((_, i) => <div key={i} className="skeleton" style={{ height: 140 }} />)}
          </div>
        ) : regular.length === 0 ? (
          <div className="card">
            <div className="empty-state" style={{ padding: '20px 0' }}>
              <div className="empty-state-icon"><IconSettings size={20} /></div>
              <strong>Belum ada kategori lain</strong>
              <p>Tambah kategori pengeluaran sesuai kebutuhanmu</p>
            </div>
          </div>
        ) : (
          <div className="cat-grid">
            {regular.map(cat => renderCatCard(cat))}
          </div>
        )}
      </div>

      <style>{`
        .icon-btn { padding: 5px 6px !important; }

        .cat-section { }
        .cat-section-head { margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-start; }
        .cat-add-btn {
          font-size: 1rem; font-weight: 500; line-height: 1;
          width: 28px; height: 28px; padding: 0;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px; flex-shrink: 0; margin-top: 1px;
          color: var(--text-muted);
          background: var(--bg-card);
          border: 1px solid var(--border);
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          transition: all 0.15s;
        }
        .cat-add-btn:hover {
          color: var(--accent);
          border-color: var(--accent);
          background: var(--accent-dim);
          box-shadow: none;
        }
        .cat-section-title {
          font-size: 0.8125rem; font-weight: 700; color: var(--text-primary);
          letter-spacing: -0.01em; display: block;
        }
        .cat-section-sub {
          font-size: 0.72rem; color: var(--text-muted); font-weight: 500; margin-top: 2px; display: block;
        }

        .cat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 12px;
        }

        .cat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 16px 18px;
          display: flex; flex-direction: column; gap: 10px;
          border-top: 3px solid var(--cat-color);
          transition: opacity 0.2s, filter 0.2s;
        }
        .cat-mandatory { background: color-mix(in srgb, var(--cat-color) 5%, var(--bg-card)); }
        .cat-planned { opacity: 0.5; filter: grayscale(0.55); }

        .cat-card-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .cat-card-left { display: flex; align-items: center; gap: 10px; }
        .cat-icon {
          width: 34px; height: 34px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }
        .cat-name { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.01em; display: block; }
        .cat-mandatory-badge {
          font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--text-muted); font-weight: 700; margin-top: 2px; display: block;
        }
        .cat-card-actions { display: flex; gap: 2px; flex-shrink: 0; align-items: center; }

        /* Planned toggle pill */
        .cat-plan-btn {
          font-size: 0.6rem !important;
          padding: 2px 7px !important;
          height: auto !important;
          border-radius: 99px !important;
          font-weight: 700 !important;
          letter-spacing: 0.02em !important;
          white-space: nowrap;
          transition: all 0.15s;
          color: var(--success) !important;
          border: 1px solid rgba(52,211,153,0.3) !important;
          background: rgba(52,211,153,0.08) !important;
        }
        .cat-plan-btn.planned {
          color: var(--text-muted) !important;
          border-color: var(--border) !important;
          background: var(--bg-input) !important;
        }

        .cat-amounts { display: flex; justify-content: space-between; align-items: baseline; }
        .cat-spent { font-size: 1.1rem; font-weight: 800; letter-spacing: -0.025em; }
        .cat-budget { font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }
        .cat-pct-label { font-size: 0.65rem; color: var(--accent); font-weight: 600; display: block; text-align: right; margin-top: 2px; }

        .cat-status-row { display: flex; align-items: center; gap: 6px; }
        .cat-sisa { font-size: 0.68rem; color: var(--text-muted); font-weight: 500; }

        .cat-no-budget {
          padding: 4px 0; display: flex; flex-direction: column; gap: 3px;
        }
        .cat-no-budget span:first-child { font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }
        .cat-no-budget-hint { font-size: 0.7rem; color: var(--accent); font-weight: 600; }

        .mand-budget-row {
          display: flex; justify-content: space-between; align-items: center;
          background: var(--bg-input); border-radius: var(--radius-sm);
          padding: 10px 12px;
        }
        .mand-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 3px; }
        .mand-val { font-size: 1rem; font-weight: 800; letter-spacing: -0.025em; color: var(--text-primary); display: block; }
        .mand-pct-chip {
          background: var(--accent-dim); color: var(--accent);
          font-size: 0.72rem; font-weight: 700;
          padding: 4px 10px; border-radius: 99px; white-space: nowrap;
        }

        @media (max-width: 640px) {
          .cat-grid { grid-template-columns: 1fr; }
          .cat-card { padding: 12px 14px; }
        }
        @media (max-width: 400px) {
          /* cat-card-actions wrap ke bawah kalau terlalu penuh */
          .cat-card-top { flex-wrap: wrap; gap: 6px; }
          .cat-card-actions { flex-wrap: wrap; gap: 4px; }
          .cat-plan-btn { font-size: 0.55rem !important; padding: 2px 5px !important; }
        }
      `}</style>
      </div>

      {confirmDel && (
        <ConfirmModal
          title="Hapus Kategori"
          message={`Hapus "${confirmDel.name}"? Kategori ini akan hilang dari semua bulan.`}
          confirmLabel="Hapus"
          onConfirm={doDelete}
          onCancel={() => setConfirmDel(null)}
        />
      )}

      {confirmDelHutang && (
        <ConfirmModal
          title="Hapus Hutang"
          message={`Hapus catatan hutang ke "${confirmDelHutang.nama}"?`}
          confirmLabel="Hapus"
          onConfirm={deleteHutang}
          onCancel={() => setConfirmDelHutang(null)}
        />
      )}

      {showHutangModal && (
        <div className="modal-overlay" onClick={() => setShowHutangModal(false)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Catat {hutangForm.jenis === 'hutang' ? 'Hutang' : 'Piutang'}</h2>
              <button className="btn btn-ghost" onClick={() => setShowHutangModal(false)}>✕</button>
            </div>

            <div className="form-group">
              <label className="form-label">Jenis</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { val: 'hutang', label: 'Hutang', sub: 'Saya pinjam dari orang' },
                  { val: 'piutang', label: 'Piutang', sub: 'Orang pinjam dari saya' },
                ].map(({ val, label, sub }) => (
                  <button
                    key={val}
                    type="button"
                    className={hutangForm.jenis === val ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
                    style={{ flex: 1, fontWeight: 700, display: 'flex', flexDirection: 'column', gap: 2, height: 'auto', padding: '8px 4px' }}
                    onClick={() => setHutangForm(f => ({ ...f, jenis: val }))}
                  >
                    <span>{label}</span>
                    <span style={{ fontSize: '0.6rem', fontWeight: 500, opacity: 0.75 }}>{sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{hutangForm.jenis === 'hutang' ? 'Dari siapa kamu meminjam' : 'Siapa yang meminjam darimu'}</label>
              <input
                className="form-input"
                type="text"
                placeholder={hutangForm.jenis === 'hutang' ? 'Misal: Budi, Bank BCA...' : 'Misal: Andi, Rudi...'}
                value={hutangForm.nama}
                onChange={e => setHutangForm(f => ({ ...f, nama: e.target.value }))}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">Berapa</label>
              <CurrencyInput
                value={hutangForm.amount}
                onChange={v => setHutangForm(f => ({ ...f, amount: v }))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kapan janji dibayar</label>
              <input
                className="form-input"
                type="date"
                value={hutangForm.due_date}
                onChange={e => setHutangForm(f => ({ ...f, due_date: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">{hutangForm.jenis === 'hutang' ? 'Uang masuk ke' : 'Uang keluar dari'}</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { val: 'saldo', label: 'Saldo' },
                  { val: 'tabungan', label: 'Tabungan' },
                ].map(({ val, label }) => (
                  <button
                    key={val}
                    type="button"
                    className={hutangForm.sumber === val ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
                    style={{ flex: 1, fontWeight: 700 }}
                    onClick={() => setHutangForm(f => ({ ...f, sumber: val }))}
                  >
                    {label}
                    {val === 'tabungan' && savings[0] && (
                      <span style={{ fontSize: '0.6rem', fontWeight: 500, display: 'block', marginTop: 1, opacity: 0.8 }}>
                        {savings[0].name}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-8 mt-16">
              <button className="btn btn-secondary" onClick={() => setShowHutangModal(false)}>Batal</button>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={saveHutang}
                disabled={hutangSaving || !hutangForm.nama.trim() || !hutangForm.amount}
              >
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
              <button className="btn btn-ghost" onClick={() => setShowPemasukanModal(false)}>✕</button>
            </div>
            <div className="form-group">
              <label className="form-label">Jumlah Pemasukan</label>
              <CurrencyInput
                value={pemasukanForm.amount}
                onChange={v => setPemasukanForm(f => ({ ...f, amount: v }))}
                autoFocus
              />
            </div>
            <div className="form-group">
              <label className="form-label">Catatan <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(opsional)</span></label>
              <textarea
                className="form-input"
                rows={2}
                placeholder="Misal: Gaji pokok + tunjangan..."
                value={pemasukanForm.note}
                onChange={e => setPemasukanForm(f => ({ ...f, note: e.target.value }))}
                style={{ resize: 'vertical', fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
              />
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
              <button className="btn btn-ghost" onClick={() => setShowIncomeModal(false)}>✕</button>
            </div>
            <div className="form-group">
              <label className="form-label">Nama Pemasukan</label>
              <input
                className="form-input"
                type="text"
                placeholder="Misal: Gaji Pokok, Bonus, Freelance..."
                value={incomeForm.description}
                onChange={e => setIncomeForm(f => ({ ...f, description: e.target.value }))}
                autoFocus
              />
            </div>
            <div className="form-group">
              <label className="form-label">Jumlah</label>
              <CurrencyInput
                value={incomeForm.amount}
                onChange={v => setIncomeForm(f => ({ ...f, amount: v }))}
              />
            </div>
            <div className="flex gap-8 mt-16">
              <button className="btn btn-secondary" onClick={() => setShowIncomeModal(false)}>Batal</button>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={saveIncome}
                disabled={incomeSaving || !incomeForm.description.trim() || !incomeForm.amount}
              >
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
                  : editData?.is_mandatory
                    ? 'Pengeluaran Wajib Baru'
                    : editData?.is_monthly
                      ? 'Pengeluaran Rutin Baru'
                      : 'Kategori Baru'}
              </h2>
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <CategoryForm
              editData={editData}
              salary={salary}
              month={month}
              onSuccess={() => { fetchAll(); setShowForm(false) }}
              onClose={() => setShowForm(false)}
            />
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
                <button className="btn btn-ghost" onClick={() => setBudgetEdit(null)}>✕</button>
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
    </>
  )
}
