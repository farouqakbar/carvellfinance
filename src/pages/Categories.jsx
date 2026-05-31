import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { formatCurrency, getCurrentMonth } from '../utils/formatCurrency'
import CategoryForm from '../components/CategoryForm'
import CurrencyInput from '../components/CurrencyInput'
import { useToast } from '../components/Toast'
import { MANDATORY_NAMES, isMandatory } from '../constants/mandatoryCategories'

const DEFAULT_PCT = 15

export default function Categories() {
  const { user } = useAuth()
  const toast = useToast()
  const [categories, setCategories] = useState([])
  const [spendMap, setSpendMap] = useState({})
  const [salary, setSalary] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [budgetEdit, setBudgetEdit] = useState(null) // {id, nominal, pct}
  const month = getCurrentMonth()

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    setLoading(true)
    const startDate = `${month}-01`
    const endDate = `${month}-31`
    const [catRes, txRes, salRes] = await Promise.all([
      supabase.from('categories').select('*').eq('user_id', user.id).order('name'),
      supabase.from('transactions').select('category_id, amount').eq('user_id', user.id).eq('type', 'expense').gte('date', startDate).lte('date', endDate),
      supabase.from('salaries').select('amount').eq('user_id', user.id).eq('month', month).maybeSingle(),
    ])
    const spend = {}
    ;(txRes.data || []).forEach(tx => {
      if (tx.category_id) spend[tx.category_id] = (spend[tx.category_id] || 0) + Number(tx.amount)
    })
    setCategories(catRes.data || [])
    setSpendMap(spend)
    setSalary(Number(salRes.data?.amount || 0))
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus kategori ini?')) return
    await supabase.from('categories').delete().eq('id', id)
    toast('Kategori dihapus', 'success')
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
    await supabase.from('categories').update({ budget_limit: amount }).eq('id', budgetEdit.id)
    toast('Budget disimpan', 'success')
    setBudgetEdit(null)
    fetchAll()
  }

  const mandatory = categories.filter(c => isMandatory(c))
  const regular = categories.filter(c => !isMandatory(c))
  const totalBudget = categories.reduce((s, c) => s + Number(c.budget_limit || 0), 0)
  const totalSpent = Object.values(spendMap).reduce((s, v) => s + v, 0)

  const renderCatCard = (cat, isMand) => {
    const spent = spendMap[cat.id] || 0
    const budget = Number(cat.budget_limit || 0)
    const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0
    const rawPct = budget > 0 ? (spent / budget) * 100 : 0
    const over = rawPct > 100
    const full = !over && rawPct >= 100
    const near = !over && rawPct >= 80 && rawPct < 100
    const barColor = over ? 'var(--danger)' : full ? 'var(--success)' : near ? 'var(--warning)' : cat.color
    const salaryPct = salary > 0 && budget > 0 ? ((budget / salary) * 100).toFixed(0) : null

    if (isMand) {
      return (
        <div key={cat.id} className="cat-card cat-mandatory" style={{ '--cat-color': cat.color }}>
          <div className="cat-card-top">
            <div className="cat-card-left">
              <span className="cat-icon" style={{ background: `${cat.color}20`, color: cat.color }}>{cat.icon}</span>
              <div>
                <span className="cat-name">{cat.name}</span>
                <span className="cat-mandatory-badge">Wajib · langsung dipotong</span>
              </div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => openBudgetEdit(cat)} style={{ fontSize: '0.72rem' }}>
              Ubah
            </button>
          </div>

          <div className="mand-budget-row">
            <div>
              <span className="mand-label">Budget per bulan</span>
              <span className="mand-val tabular">{budget > 0 ? formatCurrency(budget) : '—'}</span>
            </div>
            {salaryPct && (
              <span className="mand-pct-chip">{salaryPct}% gaji</span>
            )}
          </div>

        </div>
      )
    }

    return (
      <div key={cat.id} className="cat-card" style={{ '--cat-color': cat.color }}>
        <div className="cat-card-top">
          <div className="cat-card-left">
            <span className="cat-icon" style={{ background: `${cat.color}20`, color: cat.color }}>{cat.icon}</span>
            <span className="cat-name">{cat.name}</span>
          </div>
          <div className="cat-card-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => { setEditData(cat); setShowForm(true) }}>✎</button>
            <button className="btn btn-ghost btn-sm" onClick={() => openBudgetEdit(cat)} style={{ fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
              {budget > 0 ? 'Set' : '+ Budget'}
            </button>
            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(cat.id)}>✕</button>
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

  return (
    <div className="animate-in">
      <div className="flex-between mb-24">
        <div>
          <h1 className="page-title">Kategori</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>
            {formatCurrency(totalSpent)} dari {formatCurrency(totalBudget)} budget bulan ini
          </p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => { setEditData(null); setShowForm(true) }}>
          + Kategori
        </button>
      </div>

      {/* Pengeluaran Wajib */}
      <div className="cat-section mb-24">
        <div className="cat-section-head">
          <div>
            <span className="cat-section-title">Pengeluaran Wajib</span>
            <span className="cat-section-sub">
              {salary > 0
                ? `${formatCurrency(mandatory.reduce((s, c) => s + Number(c.budget_limit || 0), 0))} dari gaji ${formatCurrency(salary)} — langsung dipotong`
                : 'Atur gaji di Dashboard untuk lihat persentase'}
            </span>
          </div>
        </div>
        {loading ? (
          <div className="cat-grid">
            {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 140 }} />)}
          </div>
        ) : (
          <div className="cat-grid">
            {mandatory.map(cat => renderCatCard(cat, true))}
          </div>
        )}
      </div>

      {/* Kategori Lainnya */}
      <div className="cat-section">
        <div className="cat-section-head">
          <span className="cat-section-title">Kategori Lainnya</span>
        </div>
        {loading ? (
          <div className="cat-grid">
            {[...Array(2)].map((_, i) => <div key={i} className="skeleton" style={{ height: 140 }} />)}
          </div>
        ) : regular.length === 0 ? (
          <div className="card">
            <div className="empty-state" style={{ padding: '20px 0' }}>
              <div className="empty-state-icon">◈</div>
              <strong>Belum ada kategori lain</strong>
              <p>Tambah kategori pengeluaran sesuai kebutuhanmu</p>
            </div>
          </div>
        ) : (
          <div className="cat-grid">
            {regular.map(cat => renderCatCard(cat, false))}
          </div>
        )}
      </div>

      {/* Form tambah/edit kategori */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editData?.id ? 'Edit Kategori' : 'Kategori Baru'}</h2>
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <CategoryForm
              editData={editData}
              onSuccess={() => { fetchAll(); setShowForm(false) }}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Budget edit modal */}
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
                      <input
                        className="form-input"
                        type="number"
                        placeholder={String(DEFAULT_PCT)}
                        value={budgetEdit.pct}
                        onChange={e => handlePctChange(e.target.value)}
                        min="0" max="100" step="0.5"
                        style={{ paddingRight: 36 }}
                      />
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
                        <button key={p} className="btn btn-secondary btn-sm" onClick={() => handlePctChange(String(p))}>
                          {p}%
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Atau nominal langsung</label>
                <CurrencyInput
                  value={budgetEdit.nominal}
                  onChange={handleNominalChange}
                  autoFocus={!salary}
                />
              </div>

              <div className="flex gap-8 mt-16">
                <button className="btn btn-secondary" onClick={() => setBudgetEdit(null)}>Batal</button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={saveBudget}>Simpan</button>
              </div>
            </div>
          </div>
        )
      })()}

      <style>{`
        .cat-section { }
        .cat-section-head { margin-bottom: 12px; }
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
        }
        .cat-mandatory { background: color-mix(in srgb, var(--cat-color) 5%, var(--bg-card)); }

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
        .cat-card-actions { display: flex; gap: 2px; flex-shrink: 0; }

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

        /* Mandatory card rows */
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
        .mand-spent-row { display: flex; justify-content: space-between; align-items: center; }
        .mand-spent { font-size: 0.875rem; font-weight: 700; letter-spacing: -0.02em; }

        @media (max-width: 640px) {
          .cat-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
