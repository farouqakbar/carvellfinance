import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { formatCurrency } from '../utils/formatCurrency'
import TransactionForm from '../components/TransactionForm'
import { useToast } from '../components/Toast'

export default function Transactions() {
  const { user } = useAuth()
  const toast = useToast()
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [filter, setFilter] = useState({ category: '', type: '', search: '' })

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    setLoading(true)
    const [txRes, catRes] = await Promise.all([
      supabase.from('transactions').select('*, categories(name, color, icon)')
        .eq('user_id', user.id).order('date', { ascending: false }).order('created_at', { ascending: false }),
      supabase.from('categories').select('*').eq('user_id', user.id).order('name'),
    ])
    setTransactions(txRes.data || [])
    setCategories(catRes.data || [])
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus transaksi ini?')) return
    await supabase.from('transactions').delete().eq('id', id)
    toast('Transaksi dihapus', 'success')
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

  const totals = useMemo(() => filtered.reduce((acc, tx) => {
    if (tx.type === 'expense') acc.expense += Number(tx.amount)
    else acc.income += Number(tx.amount)
    return acc
  }, { expense: 0, income: 0 }), [filtered])

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
    <div className="animate-in">
      {/* Header */}
      <div className="flex-between mb-16" style={{ flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Transaksi</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>
            {filtered.length} transaksi
            {hasFilter && ' (filter aktif)'}
          </p>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-secondary btn-sm" onClick={handleExport}>↓ CSV</button>
          <button className="btn btn-primary btn-sm" onClick={() => { setEditData(null); setShowForm(true) }}>
            + Tambah
          </button>
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
          {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
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
            <span className="tss-label">Pemasukan</span>
            <span className="tss-val text-success tabular">+{formatCurrency(totals.income)}</span>
          </div>
          <div className="tss-divider" />
          <div className="tss-item">
            <span className="tss-label">Pengeluaran</span>
            <span className="tss-val text-danger tabular">-{formatCurrency(totals.expense)}</span>
          </div>
          <div className="tss-divider" />
          <div className="tss-item">
            <span className="tss-label">Selisih</span>
            <span className={`tss-val tabular ${totals.income - totals.expense >= 0 ? 'text-success' : 'text-danger'}`}>
              {totals.income - totals.expense >= 0 ? '+' : ''}{formatCurrency(totals.income - totals.expense)}
            </span>
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
            <div className="empty-state-icon">↕</div>
            <strong>{hasFilter ? 'Tidak ada yang cocok' : 'Belum ada transaksi'}</strong>
            <p>{hasFilter ? 'Coba ubah atau reset filter' : 'Tap "+ Tambah" untuk mulai mencatat'}</p>
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
                      <div className="tri-icon" style={{ background: tx.categories?.color ? `${tx.categories.color}18` : 'var(--bg-input)' }}>
                        {tx.categories?.icon || (tx.type === 'income' ? '↑' : '↓')}
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
                          {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                        </span>
                        <div className="tri-actions">
                          <button className="btn btn-ghost btn-sm" onClick={() => { setEditData(tx); setShowForm(true) }}>✎</button>
                          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(tx.id)}>✕</button>
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

      {/* Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editData?.id ? 'Edit Transaksi' : 'Tambah Transaksi'}</h2>
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <TransactionForm editData={editData} onSuccess={fetchAll} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      <style>{`
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
          .tx-summary-strip { display: none; }
          .tri-amount { font-size: 0.8rem; }
        }
      `}</style>
    </div>
  )
}
