import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { usePageHeader } from '../context/PageHeaderContext'
import { formatCurrency, getCurrentMonth, getMonthLabel, getMonthEndDate } from '../utils/formatCurrency'
import TransactionForm from '../components/TransactionForm'
import ConfirmModal from '../components/ConfirmModal'
import { useToast } from '../components/Toast'
import { IconList, IconArrowUp, IconArrowDown, IconEdit, IconTrash, IconDownload, IconPlus } from '../components/Icons'

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

  useEffect(() => {
    setHeader(
      <>
        <Link to={`/dashboard?month=${month}`} className="topbar-back-btn">‹ Dashboard</Link>
        <div className="month-nav-group">
          <button className="month-btn" onClick={() => goToMonth(prevMonth(month))} disabled={isAtStart}>‹</button>
          <span className="month-label-text">{getMonthLabel(month)}</span>
          <button className="month-btn" onClick={() => goToMonth(nextMonth(month))} disabled={isCurrentMonth}>›</button>
        </div>
        <div className="topbar-actions">
          <button className="btn btn-secondary btn-sm" style={{ height: 34, gap: 5 }} onClick={handleExport}><IconDownload size={13} /> CSV</button>
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

    let mandBudgetsQuery = supabase.from('category_budgets').select('budget_limit, category_id').eq('user_id', user.id).lte('month', month)
    if (recordStart) mandBudgetsQuery = mandBudgetsQuery.gte('month', recordStart)

    const [txRes, catRes, histRes, mandBudgetsRes] = await Promise.all([
      supabase.from('transactions').select('*, categories(name, color, icon)')
        .eq('user_id', user.id)
        .gte('date', startDate).lte('date', endDate)
        .order('date', { ascending: false }).order('created_at', { ascending: false }),
      supabase.from('categories').select('*').eq('user_id', user.id).order('name'),
      histQuery,
      mandBudgetsQuery,
    ])
    const cats = catRes.data || []
    const cumBalance = (histRes.data || []).reduce((s, t) => s + (t.type === 'income' ? Number(t.amount) : -Number(t.amount)), 0) + (user.saldo_awal || 0)
    const cumMandatory = (mandBudgetsRes.data || [])
      .filter(cb => cats.find(c => c.id === cb.category_id && c.is_mandatory))
      .reduce((s, cb) => s + Number(cb.budget_limit), 0)
    setTransactions(txRes.data || [])
    setCategories(cats)
    setTotalSaldo(cumBalance - cumMandatory)
    setLoading(false)
  }

  const doDelete = async () => {
    await supabase.from('transactions').delete().eq('id', confirmDel)
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
    const gajiCat = categories.find(c => c.name === 'Pemasukan Bulanan')
    const acc = filtered.reduce((a, tx) => {
      const isGaji = gajiCat && tx.category_id === gajiCat.id && tx.type === 'income'
      if (tx.type === 'expense') {
        a.expense += Number(tx.amount)
      } else if (isGaji) {
        a.gaji += Number(tx.amount)
      } else {
        a.nonGajiIncome += Number(tx.amount)
      }
      return a
    }, { gaji: 0, expense: 0, nonGajiIncome: 0 })
    acc.pengeluaran = Math.max(0, acc.expense - acc.nonGajiIncome)
    acc.saldo = acc.gaji - acc.pengeluaran
    return acc
  }, [filtered, categories])

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
      <div className="animate-in">
      <div className="page-header-banner">
        <div className="page-header-icon"><IconList size={18} /></div>
        <div>
          <h1 className="page-header-title">Transaksi</h1>
          <p className="page-header-sub">Riwayat pemasukan &amp; pengeluaran</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="tx-filter-bar mb-16">
        <input
          className="form-input"
          type="text"
          placeholder="Cari transaksi..."
          value={filter.search}
          onChange={e => setFilter(f => ({ ...f, search: e.target.value }))}
          style={{ flex: 2 }}
        />
        <select
          className="form-select"
          value={filter.category}
          onChange={e => setFilter(f => ({ ...f, category: e.target.value }))}
          style={{ flex: 1 }}
        >
          <option value="">Semua Kategori</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <div className="type-filter-btns">
          {[['', 'Semua'], ['expense', '↓ Keluar'], ['income', '↑ Masuk']].map(([val, label]) => (
            <button
              key={val}
              className={`type-filter-btn ${filter.type === val ? 'active' : ''}`}
              onClick={() => setFilter(f => ({ ...f, type: val }))}
            >
              {label}
            </button>
          ))}
        </div>
        {hasFilter && (
          <button className="btn btn-ghost btn-sm" onClick={() => setFilter({ category: '', type: '', search: '' })}>
            Reset
          </button>
        )}
      </div>

      {/* Summary strip */}
      {filtered.length > 0 && (
        <div className="tx-summary-strip mb-16">
          <div className="tss-item">
            <span className="tss-label">Total Saldo</span>
            <span className={`tss-val tabular ${totalSaldo >= 0 ? 'text-success' : 'text-danger'}`}>
              {totalSaldo >= 0 ? '+' : ''}{formatCurrency(Math.abs(totalSaldo))}
            </span>
          </div>
          <div className="tss-divider" />
          <div className="tss-item">
            <span className="tss-label">Pengeluaran</span>
            <span className="tss-val text-danger tabular">-{formatCurrency(totals.pengeluaran)}</span>
          </div>
        </div>
      )}

      {/* Transaction list */}
      {loading ? (
        <div className="card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 52 }} />)}
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon"><IconList size={22} /></div>
            <strong>{hasFilter ? 'Tidak ada yang cocok' : 'Belum ada transaksi'}</strong>
            <p>{hasFilter ? 'Coba ubah atau reset filter' : 'Tap "+ Transaksi" untuk mulai mencatat'}</p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {grouped.map(([date, txs]) => {
            const dayTotal = getDayTotal(txs)
            return (
              <div key={date} className="tx-group">
                <div className="tx-group-header">
                  <span className="tx-group-date">{formatDateGroup(date)}</span>
                  <span className={`tx-group-total tabular ${dayTotal >= 0 ? 'text-success' : 'text-danger'}`}>
                    {dayTotal >= 0 ? '+' : ''}{formatCurrency(dayTotal)}
                  </span>
                </div>
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  {txs.map((tx, i) => (
                    <div key={tx.id} className={`tx-row-item ${i < txs.length - 1 ? 'bordered' : ''}`}>
                      <div className="tri-icon" style={{
                        background: tx.type === 'income' ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)',
                        color: tx.type === 'income' ? 'var(--success)' : 'var(--danger)',
                      }}>
                        {tx.type === 'income' ? <IconArrowUp size={14} /> : <IconArrowDown size={14} />}
                      </div>
                      <div className="tri-info">
                        <span className="tri-desc">{tx.description || tx.categories?.name || 'Transaksi'}</span>
                        {tx.categories && (
                          <span className="tri-cat" style={{ color: tx.categories.color }}>
                            {tx.categories.name}
                          </span>
                        )}
                      </div>
                      <div className="tri-right">
                        <span className={`tri-amount tabular ${tx.type === 'income' ? 'text-success' : 'text-danger'}`}>
                          {tx.type === 'income' ? '+' : '−'}{formatCurrency(tx.amount)}
                        </span>
                        <div className="tri-actions">
                          <button className="btn btn-ghost btn-sm icon-btn" onClick={() => { setEditData(tx); setShowForm(true) }} title="Edit"><IconEdit size={13} /></button>
                          <button className="btn btn-ghost btn-sm icon-btn" style={{ color: 'var(--danger)' }} onClick={() => setConfirmDel(tx.id)} title="Hapus"><IconTrash size={13} /></button>
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
        .icon-btn { padding: 5px 6px !important; }

        .tx-filter-bar {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }
        .type-filter-btns {
          display: flex;
          gap: 3px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 3px;
          flex-shrink: 0;
        }
        .type-filter-btn {
          padding: 5px 11px;
          border: none;
          border-radius: 4px;
          background: transparent;
          color: var(--text-muted);
          font-family: var(--font-sans);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .type-filter-btn.active {
          background: var(--bg-card);
          color: var(--text-primary);
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }

        .tx-summary-strip {
          display: flex;
          align-items: center;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 20px;
          gap: 0;
        }
        .tss-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .tss-label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          font-weight: 600;
        }
        .tss-val {
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .tss-divider {
          width: 1px;
          height: 28px;
          background: var(--border);
          flex-shrink: 0;
        }

        .tx-group-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4px;
          margin-bottom: 6px;
        }
        .tx-group-date {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .tx-group-total {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .tx-row-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 18px;
          transition: background 0.1s;
        }
        .tx-row-item:hover { background: var(--bg-input); }
        .tx-row-item.bordered { border-bottom: 1px solid var(--border); }

        .tri-icon {
          width: 36px; height: 36px;
          border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.95rem;
          flex-shrink: 0;
        }
        .tri-info { flex: 1; min-width: 0; }
        .tri-desc {
          display: block;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          letter-spacing: -0.01em;
        }
        .tri-cat {
          font-size: 0.68rem;
          font-weight: 600;
          opacity: 0.8;
        }
        .tri-right {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }
        .tri-amount {
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .tri-actions {
          display: flex;
          gap: 0;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .tx-row-item:hover .tri-actions { opacity: 1; }

        @media (max-width: 768px) {
          .tx-filter-bar { flex-direction: column; align-items: stretch; }
          .tx-filter-bar .form-input,
          .tx-filter-bar .form-select { width: 100%; flex: none; }
          .type-filter-btns { width: 100%; justify-content: stretch; }
          .type-filter-btn { flex: 1; }
          .tri-actions { opacity: 1; }
          .tx-summary-strip { padding: 10px 14px; }
          .tss-val { font-size: 0.8rem; }
          .tx-row-item { padding: 12px 14px; }
          .tx-group-date { font-size: 0.68rem; }
        }

        @media (max-width: 400px) {
          .tx-summary-strip { padding: 8px 10px; }
          .tss-val { font-size: 0.75rem; }
          .tss-label { font-size: 0.6rem; }
          .tri-amount { font-size: 0.8rem; }
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
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <TransactionForm month={month} editData={editData} onSuccess={fetchAll} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </>
  )
}
