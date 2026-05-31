import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { formatCurrency, getCurrentMonth } from '../utils/formatCurrency'
import CategoryForm from '../components/CategoryForm'
import { useToast } from '../components/Toast'

export default function Categories() {
  const { user } = useAuth()
  const toast = useToast()
  const [categories, setCategories] = useState([])
  const [spendMap, setSpendMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const month = getCurrentMonth()

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    const startDate = `${month}-01`
    const endDate = `${month}-31`

    const [catRes, txRes] = await Promise.all([
      supabase.from('categories').select('*').eq('user_id', user.id).order('name'),
      supabase.from('transactions').select('category_id, amount, type').eq('user_id', user.id).eq('type', 'expense').gte('date', startDate).lte('date', endDate)
    ])

    const spend = {}
    ;(txRes.data || []).forEach(tx => {
      if (tx.category_id) spend[tx.category_id] = (spend[tx.category_id] || 0) + Number(tx.amount)
    })

    setCategories(catRes.data || [])
    setSpendMap(spend)
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus kategori ini? Transaksi terkait tidak akan terhapus.')) return
    await supabase.from('categories').delete().eq('id', id)
    toast('Kategori dihapus', 'success')
    fetchAll()
  }

  return (
    <div className="animate-in">
      <div className="flex-between mb-16">
        <div>
          <h1 className="page-title">Kategori</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>{categories.length} kategori aktif</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => { setEditData(null); setShowForm(true) }}>
          + Tambah
        </button>
      </div>

      {loading ? (
        <div className="grid-3">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 120 }} />)}
        </div>
      ) : categories.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">◈</div>
            <strong>Belum ada kategori</strong>
            <p>Buat kategori untuk mulai tracking budget kamu</p>
            <button className="btn btn-primary mt-16" onClick={() => setShowForm(true)}>Buat Kategori</button>
          </div>
        </div>
      ) : (
        <div className="grid-3">
          {categories.map(cat => {
            const spent = spendMap[cat.id] || 0
            const pct = cat.budget_limit > 0 ? Math.min((spent / cat.budget_limit) * 100, 100) : 0
            const isOver = cat.budget_limit > 0 && spent > cat.budget_limit

            return (
              <div key={cat.id} className="cat-card">
                <div className="cat-card-header">
                  <div className="cat-icon-wrap" style={{ background: `${cat.color}22`, color: cat.color }}>
                    <span>{cat.icon}</span>
                  </div>
                  <div className="cat-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => { setEditData(cat); setShowForm(true) }}>✎</button>
                    <button className="btn btn-ghost btn-sm text-danger" onClick={() => handleDelete(cat.id)}>✕</button>
                  </div>
                </div>

                <div className="cat-name">{cat.name}</div>

                {cat.budget_limit > 0 ? (
                  <>
                    <div className="cat-amounts">
                      <span className={isOver ? 'text-danger' : 'text-primary'}>{formatCurrency(spent)}</span>
                      <span className="text-muted text-xs">/ {formatCurrency(cat.budget_limit)}</span>
                    </div>
                    <div className="progress-bar mt-8">
                      <div
                        className="progress-fill"
                        style={{ width: `${pct}%`, background: isOver ? 'var(--danger)' : cat.color }}
                      />
                    </div>
                    <div className="flex-between mt-8">
                      <span className="text-xs text-muted">{pct.toFixed(0)}% terpakai</span>
                      {isOver && <span className="badge badge-danger">Overbudget</span>}
                      {!isOver && pct >= 80 && <span className="badge badge-warning">Hampir habis</span>}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted mt-8">
                    Terpakai: {formatCurrency(spent)}
                    <div className="text-xs mt-4">Tidak ada batas budget</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editData?.id ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <CategoryForm
              editData={editData}
              onSuccess={fetchAll}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <style>{`
        .cat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 20px;
          transition: all 0.2s;
        }
        .cat-card:hover { border-color: var(--border-light); transform: translateY(-1px); }
        .cat-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .cat-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }
        .cat-actions { display: flex; gap: 4px; opacity: 0; transition: opacity 0.15s; }
        .cat-card:hover .cat-actions { opacity: 1; }
        .cat-name { font-weight: 500; font-size: 0.95rem; margin-bottom: 4px; }
        .cat-amounts { display: flex; align-items: baseline; gap: 6px; margin-top: 8px; }
      `}</style>
    </div>
  )
}
