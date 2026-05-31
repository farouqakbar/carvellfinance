import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { formatCurrency, formatDate } from '../utils/formatCurrency'
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
  const [filter, setFilter] = useState({ category: '', type: '', search: '', dateFrom: '', dateTo: '' })

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    const [txRes, catRes] = await Promise.all([
      supabase.from('transactions').select('*, categories(name, color, icon)').eq('user_id', user.id).order('date', { ascending: false }),
      supabase.from('categories').select('*').eq('user_id', user.id)
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
    const rows = [['Tanggal','Tipe','Kategori','Deskripsi','Nominal']]
    filtered.forEach(tx => {
      rows.push([tx.date, tx.type, tx.categories?.name || '', tx.description || '', tx.amount])
    })
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'transaksi-finora.csv'
    a.click()
    URL.revokeObjectURL(url)
    toast('File CSV diunduh', 'success')
  }

  const filtered = transactions.filter(tx => {
    if (filter.category && tx.category_id !== filter.category) return false
    if (filter.type && tx.type !== filter.type) return false
    if (filter.search && !tx.description?.toLowerCase().includes(filter.search.toLowerCase())) return false
    if (filter.dateFrom && tx.date < filter.dateFrom) return false
    if (filter.dateTo && tx.date > filter.dateTo) return false
    return true
  })

  const totalFiltered = filtered.reduce((acc, tx) => {
    if (tx.type === 'expense') acc.expense += Number(tx.amount)
    else acc.income += Number(tx.amount)
    return acc
  }, { expense: 0, income: 0 })

  return (
    <div className="animate-in">
      <div className="flex-between mb-16" style={{ flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Transaksi</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>{filtered.length} transaksi ditemukan</p>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-secondary btn-sm" onClick={handleExport}>↓ CSV</button>
          <button className="btn btn-primary btn-sm" onClick={() => { setEditData(null); setShowForm(true) }}>
            + Tambah
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-16">
        <div className="filter-grid">
          <input
            className="form-input"
            type="text"
            placeholder="Cari deskripsi..."
            value={filter.search}
            onChange={e => setFilter(f => ({ ...f, search: e.target.value }))}
          />
          <select
            className="form-select"
            value={filter.category}
            onChange={e => setFilter(f => ({ ...f, category: e.target.value }))}
          >
            <option value="">Semua Kategori</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
          </select>
          <select
            className="form-select"
            value={filter.type}
            onChange={e => setFilter(f => ({ ...f, type: e.target.value }))}
          >
            <option value="">Semua Tipe</option>
            <option value="expense">Pengeluaran</option>
            <option value="income">Pemasukan</option>
          </select>
          <input
            className="form-input"
            type="date"
            value={filter.dateFrom}
            onChange={e => setFilter(f => ({ ...f, dateFrom: e.target.value }))}
            title="Dari tanggal"
          />
          <input
            className="form-input"
            type="date"
            value={filter.dateTo}
            onChange={e => setFilter(f => ({ ...f, dateTo: e.target.value }))}
            title="Sampai tanggal"
          />
          <button className="btn btn-secondary btn-sm" onClick={() => setFilter({ category: '', type: '', search: '', dateFrom: '', dateTo: '' })}>
            Reset
          </button>
        </div>

        {/* Summary */}
        <div className="filter-summary">
          <span className="text-success">Pemasukan: {formatCurrency(totalFiltered.income)}</span>
          <span className="text-danger">Pengeluaran: {formatCurrency(totalFiltered.expense)}</span>
          <span className="font-medium">Selisih: {formatCurrency(totalFiltered.income - totalFiltered.expense)}</span>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 48 }} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">↕</div>
            <strong>Tidak ada transaksi</strong>
            <p>Coba ubah filter atau tambah transaksi baru</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Kategori</th>
                  <th>Deskripsi</th>
                  <th>Tipe</th>
                  <th style={{ textAlign: 'right' }}>Nominal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(tx => (
                  <tr key={tx.id}>
                    <td className="text-secondary text-sm">{tx.date}</td>
                    <td>
                      {tx.categories ? (
                        <span className="cat-chip" style={{ background: `${tx.categories.color}22`, color: tx.categories.color }}>
                          {tx.categories.icon} {tx.categories.name}
                        </span>
                      ) : <span className="text-muted text-xs">—</span>}
                    </td>
                    <td className="text-sm">{tx.description || <span className="text-muted">—</span>}</td>
                    <td>
                      <span className={`badge ${tx.type === 'income' ? 'badge-success' : 'badge-danger'}`}>
                        {tx.type === 'income' ? '↑ Masuk' : '↓ Keluar'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span className={`font-medium ${tx.type === 'income' ? 'text-success' : 'text-danger'}`}>
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-8" style={{ justifyContent: 'flex-end' }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => { setEditData(tx); setShowForm(true) }}>✎</button>
                        <button className="btn btn-ghost btn-sm text-danger" onClick={() => handleDelete(tx.id)}>✕</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editData?.id ? 'Edit Transaksi' : 'Tambah Transaksi'}</h2>
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <TransactionForm
              editData={editData}
              onSuccess={fetchAll}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <style>{`
        .filter-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr auto;
          gap: 8px;
          align-items: center;
          margin-bottom: 12px;
        }
        @media (max-width: 1024px) {
          .filter-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .filter-grid { grid-template-columns: 1fr; }
        }
        .filter-summary {
          display: flex;
          gap: 20px;
          font-size: 0.85rem;
          padding-top: 12px;
          border-top: 1px solid var(--border);
          flex-wrap: wrap;
        }
        .cat-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          border-radius: 99px;
          font-size: 0.75rem;
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}
