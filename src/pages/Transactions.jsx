import { useState, useEffect, useMemo, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { usePageHeader } from '../context/PageHeaderContext'
import { formatCurrency, getCurrentMonth, getMonthLabel, getMonthEndDate } from '../utils/formatCurrency'
import TransactionForm from '../components/TransactionForm'
import ConfirmModal from '../components/ConfirmModal'
import { useToast } from '../components/Toast'
import { IconList, IconArrowUp, IconArrowDown, IconEdit, IconTrash, IconDownload, IconPlus, IconX } from '../components/Icons'
import { isMandatoryIncome } from '../constants/mandatoryCategories'

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

export default function Transactions() {
  const { user } = useAuth()
  const { setHeader } = usePageHeader()
  const toast = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const [month, setMonth] = useState(() => searchParams.get('month') || getCurrentMonth())
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [totalSaldo, setTotalSaldo] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [confirmDel, setConfirmDel] = useState(null) // tx id
  const [filter, setFilter] = useState({ category: '', type: '', search: '' })

  const isCurrentMonth = month === getCurrentMonth()
  const isAtStart = !!user.recording_start_month && month <= user.recording_start_month

  const goToMonth = (m) => { setMonth(m); setSearchParams({ month: m }) }

  useEffect(() => { fetchAll() }, [month])

  // Realtime: auto-refresh saat transaksi berubah
  const fetchAllRef = useRef(null)
  useEffect(() => { fetchAllRef.current = fetchAll })
  useEffect(() => {
    const channel = supabase
      .channel(`tx-realtime-${user.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions', filter: `user_id=eq.${user.id}` },
        () => { fetchAllRef.current?.() })
      .subscribe()
    const onFocus = () => fetchAllRef.current?.()
    window.addEventListener('focus', onFocus)
    return () => {
      supabase.removeChannel(channel)
      window.removeEventListener('focus', onFocus)
    }
  }, [user.id])

  useEffect(() => {
    setHeader(
      <>
        <Link to={`/dashboard?month=${month}`} className="topbar-back-btn">‹ <span className="back-label">Dashboard</span></Link>
        <div className="month-nav-group">
          <button className="month-btn" onClick={() => goToMonth(prevMonth(month))} disabled={isAtStart}>‹</button>
          <span className="month-label-text">{getMonthLabel(month)}</span>
          <button className="month-btn" onClick={() => goToMonth(nextMonth(month))} disabled={isCurrentMonth}>›</button>
        </div>
        <div className="topbar-actions">
<button className="btn btn-primary btn-sm" style={{ height: 34, gap: 5 }} onClick={() => { setEditData(null); setShowForm(true) }}><IconPlus size={13} /> Transaksi</button>
        </div>
      </>
    )
    return () => setHeader(null)
  }, [month, isCurrentMonth, isAtStart])

  const fetchAll = async () => {
    setLoading(true)
    const startDate = `${month}-01`
    const endDate = getMonthEndDate(month)
    const recordStart = user.recording_start_month

    let histQuery = supabase.from('transactions').select('amount, type').eq('user_id', user.id).lte('date', endDate)
    if (recordStart) histQuery = histQuery.gte('date', `${recordStart}-01`)

    // mandBudgets pakai join categories agar bisa filter is_mandatory dengan benar lintas bulan
    let mandBudgetsQuery = supabase.from('category_budgets')
      .select('budget_limit, category_id, categories(is_mandatory)')
      .eq('user_id', user.id).lte('month', month)
    if (recordStart) mandBudgetsQuery = mandBudgetsQuery.gte('month', recordStart)

    const [txRes, catRes, histRes, mandBudgetsRes, curMonthBudgetsRes] = await Promise.all([
      supabase.from('transactions').select('*, categories(name, color, icon)')
        .eq('user_id', user.id)
        .gte('date', startDate).lte('date', endDate)
        .order('date', { ascending: false }).order('created_at', { ascending: false }),
      supabase.from('categories').select('*').eq('user_id', user.id).is('month', null).order('name'),
      histQuery,
      mandBudgetsQuery,
      supabase.from('category_budgets').select('budget_limit, category_id').eq('user_id', user.id).eq('month', month),
    ])
    const cats = catRes.data || []
    const curBudgetMap = {}
    ;(curMonthBudgetsRes.data || []).forEach(cb => { curBudgetMap[cb.category_id] = Number(cb.budget_limit) })
    const catsWithBudget = cats.map(cat => ({
      ...cat,
      budget_limit: curBudgetMap[cat.id] !== undefined ? curBudgetMap[cat.id] : (cat.budget_limit || 0),
    }))
    const cumBalance = (histRes.data || []).reduce((s, t) => s + (t.type === 'income' ? Number(t.amount) : -Number(t.amount)), 0) + (user.saldo_awal || 0)
    // Pakai joined categories dari mandBudgetsRes agar mandatory dari bulan lain juga ikut
    const cumMandatory = (mandBudgetsRes.data || [])
      .filter(cb => cb.categories?.is_mandatory === true)
      .reduce((s, cb) => s + Number(cb.budget_limit), 0)
    setTransactions(txRes.data || [])
    setCategories(catsWithBudget)
    setTotalSaldo(cumBalance - cumMandatory)
    setLoading(false)
  }

  const doDelete = async () => {
    const { error } = await supabase.from('transactions').delete().eq('id', confirmDel)
    if (error) { toast(error.message, 'error'); return }
    toast('Transaksi dihapus', 'success')
    setConfirmDel(null)
    fetchAll()
  }

  const handleExport = () => {
    const rows = [['Tanggal', 'Tipe', 'Kategori', 'Deskripsi', 'Nominal']]
    filtered.forEach(tx => {
      rows.push([tx.date, tx.type, tx.categories?.name || '', tx.description || '', tx.amount])
    })
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'transaksi-cashvell.csv'; a.click()
    URL.revokeObjectURL(url)
    toast('CSV diunduh', 'success')
  }

  const filtered = useMemo(() => transactions.filter(tx => {
    if (filter.category && tx.category_id !== filter.category) return false
    if (filter.type && tx.type !== filter.type) return false
    if (filter.search) {
      const q = filter.search.toLowerCase()
      const inDesc = tx.description?.toLowerCase().includes(q)
      const inCat = tx.categories?.name?.toLowerCase().includes(q)
      if (!inDesc && !inCat) return false
    }
    return true
  }), [transactions, filter])

  // Group by date
  const grouped = useMemo(() => {
    const map = {}
    filtered.forEach(tx => {
      if (!map[tx.date]) map[tx.date] = []
      map[tx.date].push(tx)
    })
    return Object.entries(map).sort(([a], [b]) => b.localeCompare(a))
  }, [filtered])

  const totals = useMemo(() => {
    return filtered.reduce((a, tx) => {
      if (tx.type === 'expense') a.expense += Number(tx.amount)
      else a.income += Number(tx.amount)
      return a
    }, { expense: 0, income: 0 })
  }, [filtered])

  const allTotals = useMemo(() => {
    return transactions.reduce((a, tx) => {
      if (tx.type === 'expense') a.expense += Number(tx.amount)
      else a.income += Number(tx.amount)
      return a
    }, { expense: 0, income: 0 })
  }, [transactions])

  const salary = useMemo(() => {
    const gajiCat = categories.find(c => isMandatoryIncome(c))
    return transactions.filter(tx => tx.type === 'income' && tx.category_id === gajiCat?.id)
      .reduce((s, tx) => s + Number(tx.amount), 0)
  }, [transactions, categories])

  const hasFilter = filter.category || filter.type || filter.search

  const formatDateGroup = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00')
    const today = new Date()
    const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1)
    if (d.toDateString() === today.toDateString()) return 'Hari ini'
    if (d.toDateString() === yesterday.toDateString()) return 'Kemarin'
    return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  }

  const getDayTotal = (txs) => {
    return txs.reduce((s, tx) => tx.type === 'expense' ? s - Number(tx.amount) : s + Number(tx.amount), 0)
  }

  return (
    <>
      <div className="animate-in tx-page">

      {/* Stats strip */}
      {transactions.length > 0 && (() => {
        const totalPengeluaran = salary - totalSaldo
        return (
          <div className="tx-stats">
            <div className="tx-stat">
              <span className="tx-stat-label">TOTAL SALDO</span>
              <span className="tx-stat-val tabular" style={{ color: totalSaldo >= 0 ? '#34d399' : '#f87171' }}>
                {totalSaldo >= 0 ? '+' : '−'}{formatCurrency(Math.abs(totalSaldo))}
              </span>
            </div>
            <div className="tx-stat-sep" />
            <div className="tx-stat">
              <span className="tx-stat-label">PENGELUARAN</span>
              <span className="tx-stat-val tabular" style={{ color: '#f87171' }}>
                −{formatCurrency(Math.max(0, totalPengeluaran))}
              </span>
            </div>
          </div>
        )
      })()}

      {/* Filter bar */}
      <div className="tx-filter">
        <input
          className="form-input tx-search"
          type="text"
          placeholder="Cari transaksi..."
          value={filter.search}
          onChange={e => setFilter(f => ({ ...f, search: e.target.value }))}
        />
        <select
          className="form-select tx-cat-select"
          value={filter.category}
          onChange={e => setFilter(f => ({ ...f, category: e.target.value }))}
        >
          <option value="">Semua Kategori</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <div className="tx-type-toggle">
          {[['', 'Semua'], ['expense', 'Keluar'], ['income', 'Masuk']].map(([val, label]) => (
            <button
              key={val}
              className={`tx-type-btn${filter.type === val ? ' active' : ''}`}
              onClick={() => setFilter(f => ({ ...f, type: val }))}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 52 }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="tx-empty">
          <IconList size={20} />
          <span>{hasFilter ? 'Tidak ada yang cocok' : 'Belum ada transaksi'}</span>
          <p>{hasFilter ? 'Coba ubah atau reset filter' : 'Tambah transaksi pertamamu'}</p>
        </div>
      ) : (
        <div className="tx-list">
          {grouped.map(([date, txs]) => {
            const dayTotal = getDayTotal(txs)
            return (
              <div key={date} className="tx-group">
                <div className="tx-group-head">
                  <span className="tx-group-date">{formatDateGroup(date)}</span>
                  <span className={`tx-group-total tabular${dayTotal >= 0 ? '' : ' neg'}`}>
                    {dayTotal >= 0 ? '+' : ''}{formatCurrency(dayTotal)}
                  </span>
                </div>
                <div className="tx-group-rows">
                  {txs.map(tx => (
                    <div key={tx.id} className="tx-row" style={{ '--tc': tx.type === 'income' ? '#34d399' : '#f87171' }}>
                      <div className="tx-icon" style={{
                        background: tx.type === 'income' ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)',
                        color: tx.type === 'income' ? '#34d399' : '#f87171',
                      }}>
                        {tx.type === 'income' ? <IconArrowUp size={13} /> : <IconArrowDown size={13} />}
                      </div>
                      <div className="tx-info">
                        <span className="tx-desc">{tx.description || tx.categories?.name || 'Transaksi'}</span>
                        {tx.categories && (
                          <span className="tx-cat" style={{ color: tx.categories.color || 'var(--text-muted)' }}>
                            {tx.categories.name}
                          </span>
                        )}
                      </div>
                      <span className={`tx-amount tabular${tx.type === 'income' ? ' inc' : ' exp'}`}>
                        {tx.type === 'income' ? '+' : '−'}{formatCurrency(tx.amount)}
                      </span>
                      <div className="tx-actions">
                        <button className="tx-act-btn" onClick={() => { setEditData(tx); setShowForm(true) }} title="Edit"><IconEdit size={11} /></button>
                        <button className="tx-act-btn danger" onClick={() => setConfirmDel(tx.id)} title="Hapus"><IconTrash size={11} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Pengeluaran wajib */}
          {(!filter.type || filter.type === 'expense') && (() => {
            const mandCats = categories.filter(c => c.is_mandatory && Number(c.budget_limit) > 0)
            if (!mandCats.length) return null
            return (
              <div className="tx-group">
                <div className="tx-group-head">
                  <span className="tx-group-date">Pengeluaran Wajib</span>
                  <span className="tx-group-total tabular neg">
                    −{formatCurrency(mandCats.reduce((s, c) => s + Number(c.budget_limit), 0))}
                  </span>
                </div>
                <div className="tx-group-rows">
                  {mandCats.map(cat => (
                    <div key={cat.id} className="tx-row" style={{ '--tc': '#f87171' }}>
                      <div className="tx-icon" style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171' }}>
                        <IconArrowDown size={13} />
                      </div>
                      <div className="tx-info">
                        <span className="tx-desc">{cat.name}</span>
                        <span className="tx-cat" style={{ color: '#f87171' }}>Wajib · langsung dipotong</span>
                      </div>
                      <span className="tx-amount tabular exp">−{formatCurrency(cat.budget_limit)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}
        </div>
      )}

      <style>{`
        .tx-page { display: flex; flex-direction: column; gap: 16px; padding-bottom: 48px; }

        /* Stats */
        .tx-stats {
          display: flex;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .tx-stat {
          flex: 1; padding: 12px 18px;
          display: flex; flex-direction: column; gap: 3px;
        }
        .tx-stat-sep { width: 1px; background: var(--border); flex-shrink: 0; margin: 8px 0; }
        .tx-stat-label {
          font-size: 0.55rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-muted);
        }
        .tx-stat-val {
          font-size: 0.95rem; font-weight: 800; letter-spacing: -0.03em;
        }

        /* Filter — satu baris di desktop, 2 baris di mobile */
        .tx-filter {
          display: flex; gap: 8px; align-items: center; flex-wrap: nowrap;
        }
        .tx-search { flex: 2; min-width: 0; }
        .tx-cat-select { flex: 1; min-width: 0; }

        .tx-type-toggle {
          display: flex; gap: 2px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px; padding: 3px; flex-shrink: 0;
        }
        [data-theme="light"] .tx-type-toggle { background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.08); }
        .tx-type-btn {
          padding: 5px 12px; border-radius: 5px; border: none;
          background: transparent; color: var(--text-muted);
          font-family: var(--font-sans); font-size: 0.72rem; font-weight: 700;
          cursor: pointer; transition: all 0.15s; white-space: nowrap;
        }
        .tx-type-btn:hover { color: var(--text-secondary); }
        .tx-type-btn.active { background: rgba(255,255,255,0.09); color: var(--text-primary); }
        [data-theme="light"] .tx-type-btn.active { background: #fff; color: var(--accent); box-shadow: 0 1px 4px rgba(0,0,0,0.08); }

        /* Groups */
        .tx-list { display: flex; flex-direction: column; gap: 24px; }
        .tx-group { display: flex; flex-direction: column; }

        .tx-group-head {
          display: flex; justify-content: space-between; align-items: center;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border);
        }
        .tx-group-date {
          font-size: 0.6rem; font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-muted);
        }
        .tx-group-total { font-size: 0.78rem; font-weight: 700; letter-spacing: -0.01em; color: #34d399; }
        .tx-group-total.neg { color: #f87171; }

        /* Rows */
        .tx-group-rows { }
        .tx-row {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 4px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          position: relative; transition: background 0.12s;
        }
        .tx-row:last-child { border-bottom: none; }
        .tx-row::before {
          content: ''; position: absolute;
          left: 0; top: 8px; bottom: 8px; width: 2px;
          background: var(--tc); border-radius: 2px;
          opacity: 0; transition: opacity 0.15s;
        }
        .tx-row:hover { background: rgba(255,255,255,0.02); }
        .tx-row:hover::before { opacity: 0.8; }

        .tx-icon {
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .tx-info { flex: 1; min-width: 0; }
        .tx-desc {
          display: block; font-size: 0.8125rem; font-weight: 600;
          color: var(--text-primary); letter-spacing: -0.01em;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .tx-cat { font-size: 0.6rem; font-weight: 600; display: block; margin-top: 1px; opacity: 0.85; }
        .tx-amount { font-size: 0.875rem; font-weight: 700; letter-spacing: -0.02em; flex-shrink: 0; }
        .tx-amount.inc { color: #34d399; }
        .tx-amount.exp { color: #f87171; }

        .tx-actions { display: flex; gap: 1px; opacity: 0; transition: opacity 0.15s; flex-shrink: 0; }
        .tx-row:hover .tx-actions { opacity: 1; }
        .tx-act-btn {
          width: 26px; height: 26px; border-radius: 5px;
          background: transparent; border: none; color: var(--text-muted);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.12s;
        }
        .tx-act-btn:hover { background: rgba(255,255,255,0.07); color: var(--text-primary); }
        .tx-act-btn.danger:hover { background: rgba(248,113,113,0.1); color: #f87171; }

        /* Empty */
        .tx-empty {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          padding: 48px 0; color: var(--text-muted);
          font-size: 0.82rem; font-weight: 600;
        }
        .tx-empty p { font-size: 0.72rem; font-weight: 400; margin: 0; }

        /* Mobile */
        @media (max-width: 640px) {
          .tx-stat { padding: 10px 14px; }
          .tx-stat-val { font-size: 0.88rem; }
          .tx-actions { opacity: 1; }
          .tx-row { padding: 11px 2px; gap: 10px; }
          .tx-amount { font-size: 0.82rem; }
          .tx-type-btn { padding: 5px 8px; font-size: 0.68rem; }
          /* Mobile: filter jadi 2 baris */
          .tx-filter { flex-wrap: wrap; }
          .tx-search { flex: 1 1 100%; }
          .tx-cat-select { flex: 1; }
          .tx-type-toggle { flex-shrink: 0; }
        }
        @media (max-width: 380px) {
          .tx-stat-val { font-size: 0.82rem; }
          .tx-stat-label { font-size: 0.52rem; }
          .tx-icon { width: 28px; height: 28px; }
        }
      `}</style>
      </div>

      {/* Confirm delete */}
      {confirmDel && (
        <ConfirmModal
          title="Hapus Transaksi"
          message="Transaksi ini akan dihapus permanen dan tidak bisa dikembalikan."
          confirmLabel="Hapus"
          onConfirm={doDelete}
          onCancel={() => setConfirmDel(null)}
        />
      )}

      {/* Modal tambah/edit */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editData?.id ? 'Edit Transaksi' : 'Tambah Transaksi'}</h2>
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}><IconX size={16} /></button>
            </div>
            <TransactionForm month={month} editData={editData} onSuccess={fetchAll} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </>
  )
}
