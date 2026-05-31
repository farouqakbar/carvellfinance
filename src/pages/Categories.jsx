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

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    setLoading(true)
    const startDate = `${month}-01`
    const endDate = `${month}-31`
    const [catRes, txRes] = await Promise.all([
      supabase.from('categories').select('*').eq('user_id', user.id).order('name'),
      supabase.from('transactions').select('category_id, amount, type').eq('user_id', user.id).eq('type', 'expense').gte('date', startDate).lte('date', endDate),
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

  const totalBudget = categories.reduce((s, c) => s + Number(c.budget_limit || 0), 0)
  const totalSpent = categories.reduce((s, c) => s + (spendMap[c.id] || 0), 0)

  return (
    <div className="animate-in">
      <div className="flex-between mb-16">
        <div>
          <h1 className="page-title">Kategori</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>
            {categories.length} kategori
            {totalBudget > 0 && ` · Budget ${formatCurrency(totalBudget)}/bulan`}
          </p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => { setEditData(null); setShowForm(true) }}>
          + Tambah
        </button>
      </div>

      {/* Summary bar */}
      {totalBudget > 0 && (
        <div className="card mb-20">
          <div className="flex-between mb-10">
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Total pengeluaran bulan ini
            </span>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: totalSpent > totalBudget ? 'var(--danger)' : 'var(--text-secondary)' }}>
              {formatCurrency(totalSpent)} / {formatCurrency(totalBudget)}
            </span>
          </div>
          <div className="progress-bar" style={{ height: 7 }}>
            <div className="progress-fill" style={{
              width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%`,
              background: totalSpent > totalBudget ? 'var(--danger)' : totalSpent / totalBudget > 0.8 ? 'var(--warning)' : 'var(--accent)',
            }} />
          </div>
        </div>
      )}

      {loading ? (
        <div className="cat-grid">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 130 }} />)}
        </div>
      ) : categories.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">◈</div>
            <strong>Belum ada kategori</strong>
            <p>Buat kategori untuk mulai tracking pengeluaran per pos</p>
            <button className="btn btn-primary mt-16" onClick={() => setShowForm(true)}>Buat Kategori Pertama</button>
          </div>
        </div>
      ) : (
        <div className="cat-grid">
          {categories.map(cat => {
            const spent = spendMap[cat.id] || 0
            const pct = cat.budget_limit > 0 ? (spent / cat.budget_limit) * 100 : null
            const isOver = pct !== null && pct > 100
            const isWarn = pct !== null && pct >= 80 && !isOver
            const barColor = isOver ? 'var(--danger)' : isWarn ? 'var(--warning)' : cat.color
            return (
              <div key={cat.id} className="cat-card" style={{ '--cat-color': cat.color }}>
                <div className="cat-card-top">
                  <div className="cat-icon-wrap" style={{ background: `${cat.color}18`, color: cat.color }}>
                    {cat.icon}
                  </div>
                  <div className="cat-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => { setEditData(cat); setShowForm(true) }}>✎</button>
                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(cat.id)}>✕</button>
                  </div>
                </div>

                <div className="cat-name">{cat.name}</div>

                {cat.budget_limit > 0 ? (
                  <>
                    <div className="cat-amounts">
                      <span className="cat-spent tabular" style={{ color: isOver ? 'var(--danger)' : 'var(--text-primary)' }}>
                        {formatCurrency(spent)}
                      </span>
                      <span className="cat-limit tabular">/ {formatCurrency(cat.budget_limit)}</span>
                    </div>
                    <div className="progress-bar mt-10" style={{ height: 5 }}>
                      <div className="progress-fill" style={{ width: `${Math.min(pct, 100)}%`, background: barColor }} />
                    </div>
                    <div className="flex-between mt-8">
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {pct?.toFixed(0)}%
                      </span>
                      {isOver && <span className="badge badge-danger">Overbudget</span>}
                      {isWarn && <span className="badge badge-warning">Hampir habis</span>}
                    </div>
                  </>
                ) : (
                  <div style={{ marginTop: 10 }}>
                    <span className="cat-spent tabular">{formatCurrency(spent)}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 6 }}>bulan ini</span>
                    <div style={{ marginTop: 6 }}>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                        Tanpa limit
                      </span>
                    </div>
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
            <CategoryForm editData={editData} onSuccess={fetchAll} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      <style>{`
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }
        .cat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 18px;
          transition: border-color 0.2s, transform 0.15s;
          position: relative;
        }
        .cat-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--cat-color);
          border-radius: var(--radius-lg) 0 0 var(--radius-lg);
          opacity: 0.8;
        }
        .cat-card:hover { border-color: var(--border-light); transform: translateY(-1px); }
        .cat-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .cat-icon-wrap {
          width: 36px; height: 36px;
          border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
        }
        .cat-actions { display: flex; gap: 2px; opacity: 0; transition: opacity 0.15s; }
        .cat-card:hover .cat-actions { opacity: 1; }
        .cat-name {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          margin-bottom: 2px;
        }
        .cat-amounts { display: flex; align-items: baseline; gap: 4px; margin-top: 8px; }
        .cat-spent { font-size: 1rem; font-weight: 800; letter-spacing: -0.02em; }
        .cat-limit { font-size: 0.72rem; color: var(--text-muted); font-weight: 500; }

        @media (max-width: 768px) {
          .cat-actions { opacity: 1; }
          .cat-card { padding: 14px; }
        }
        @media (max-width: 640px) {
          .cat-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
        }
        @media (max-width: 380px) {
          .cat-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
