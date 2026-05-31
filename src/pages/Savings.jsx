import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { formatCurrency, getCurrentMonth, getMonthLabel } from '../utils/formatCurrency'
import { useToast } from '../components/Toast'
import CurrencyInput from '../components/CurrencyInput'
import { isMandatory } from '../constants/mandatoryCategories'

// Bulan depan
function getNextMonth() {
  const now = new Date()
  const y = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear()
  const m = (now.getMonth() + 2) % 12 || 12
  return `${y}-${String(m).padStart(2, '0')}`
}

const PLANS_KEY = (userId, month) => `cashvell_plans_${userId}_${month}`

export default function Planning() {
  const { user } = useAuth()
  const toast = useToast()
  const nextMonth = getNextMonth()
  const [salary, setSalary] = useState(0)
  const [salaryInput, setSalaryInput] = useState('')
  const [categories, setCategories] = useState([])
  const [plans, setPlans] = useState([])       // rencana tambahan (localStorage)
  const [newPlan, setNewPlan] = useState({ name: '', amount: '' })
  const [loading, setLoading] = useState(true)
  const [editBudget, setEditBudget] = useState(null) // {id, value}

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    setLoading(true)
    const [catRes, salRes] = await Promise.all([
      supabase.from('categories').select('*').eq('user_id', user.id).order('name'),
      supabase.from('salaries').select('amount').eq('user_id', user.id).eq('month', nextMonth).maybeSingle(),
    ])
    setCategories(catRes.data || [])
    const sal = Number(salRes.data?.amount || 0)
    setSalary(sal)
    setSalaryInput(sal > 0 ? String(Math.round(sal)) : '')
    // Load rencana tambahan dari localStorage
    try {
      const stored = localStorage.getItem(PLANS_KEY(user.id, nextMonth))
      setPlans(stored ? JSON.parse(stored) : [])
    } catch { setPlans([]) }
    setLoading(false)
  }

  const saveSalary = async () => {
    const amount = parseFloat(salaryInput)
    if (!amount) return
    await supabase.from('salaries').upsert(
      { user_id: user.id, month: nextMonth, amount },
      { onConflict: 'user_id,month' }
    )
    setSalary(amount)
    toast('Gaji bulan depan disimpan', 'success')
  }

  const saveCategoryBudget = async () => {
    if (!editBudget) return
    await supabase.from('categories').update({ budget_limit: parseFloat(editBudget.value) || 0 }).eq('id', editBudget.id)
    toast('Budget diperbarui', 'success')
    setEditBudget(null)
    fetchData()
  }

  const addPlan = () => {
    if (!newPlan.name || !newPlan.amount) return
    const updated = [...plans, { id: Date.now(), name: newPlan.name, amount: parseFloat(newPlan.amount) }]
    setPlans(updated)
    localStorage.setItem(PLANS_KEY(user.id, nextMonth), JSON.stringify(updated))
    setNewPlan({ name: '', amount: '' })
  }

  const removePlan = (id) => {
    const updated = plans.filter(p => p.id !== id)
    setPlans(updated)
    localStorage.setItem(PLANS_KEY(user.id, nextMonth), JSON.stringify(updated))
  }

  const mandatoryCats = categories.filter(c => isMandatory(c))
  const regularCats = categories.filter(c => !isMandatory(c) && c.budget_limit > 0)
  const totalWajib = mandatoryCats.reduce((s, c) => s + Number(c.budget_limit || 0), 0)
  const totalKategori = regularCats.reduce((s, c) => s + Number(c.budget_limit || 0), 0)
  const totalRencana = plans.reduce((s, p) => s + Number(p.amount || 0), 0)
  const totalPengeluaran = totalWajib + totalKategori + totalRencana
  const sisa = salary - totalPengeluaran

  return (
    <div className="animate-in">
      <div className="mb-20">
        <h1 className="page-title">Rencana {getMonthLabel(nextMonth)}</h1>
        <p className="page-subtitle" style={{ margin: 0 }}>Rencanakan pengeluaran bulan depan secara rinci</p>
      </div>

      {/* ── Summary bar ──────────────────────── */}
      <div className="plan-summary mb-20">
        <div className="plan-sum-item">
          <span className="plan-sum-label">Gaji</span>
          <span className="plan-sum-val tabular">{salary > 0 ? formatCurrency(salary) : '—'}</span>
        </div>
        <div className="plan-sum-sep">−</div>
        <div className="plan-sum-item">
          <span className="plan-sum-label">Total Rencana</span>
          <span className="plan-sum-val tabular text-danger">{formatCurrency(totalPengeluaran)}</span>
        </div>
        <div className="plan-sum-sep">=</div>
        <div className="plan-sum-item">
          <span className="plan-sum-label">Sisa</span>
          <span className="plan-sum-val tabular" style={{ color: sisa >= 0 ? 'var(--success)' : 'var(--danger)' }}>
            {salary > 0 ? formatCurrency(sisa) : '—'}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* ── 1. Gaji bulan depan ─────────────── */}
        <div className="card">
          <div className="plan-sect-head">
            <span className="plan-sect-title">① Gaji {getMonthLabel(nextMonth)}</span>
          </div>
          <div className="flex gap-8" style={{ alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <CurrencyInput value={salaryInput} onChange={setSalaryInput} autoFocus={!salary} />
            </div>
            <button className="btn btn-primary" onClick={saveSalary} disabled={!salaryInput}>Simpan</button>
          </div>
        </div>

        {/* ── 2. Pengeluaran Wajib ─────────────── */}
        <div className="card">
          <div className="plan-sect-head">
            <span className="plan-sect-title">② Pengeluaran Wajib</span>
            <span className="plan-sect-total tabular">{formatCurrency(totalWajib)}</span>
          </div>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 40 }} />)}
            </div>
          ) : (
            <div className="plan-rows">
              {mandatoryCats.map(cat => (
                <div key={cat.id} className="plan-row">
                  <div className="plan-row-left">
                    <span className="plan-row-icon" style={{ background: `${cat.color}18`, color: cat.color }}>{cat.icon}</span>
                    <span className="plan-row-name">{cat.name}</span>
                    {salary > 0 && cat.budget_limit > 0 && (
                      <span className="plan-row-pct">
                        {((cat.budget_limit / salary) * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>
                  {editBudget?.id === cat.id ? (
                    <div className="plan-row-edit">
                      <CurrencyInput value={editBudget.value} onChange={v => setEditBudget(b => ({ ...b, value: v }))} style={{ width: 160 }} />
                      <button className="btn btn-primary btn-sm" onClick={saveCategoryBudget}>✓</button>
                      <button className="btn btn-ghost btn-sm" onClick={() => setEditBudget(null)}>✕</button>
                    </div>
                  ) : (
                    <div className="plan-row-right">
                      <span className="plan-row-amount tabular">
                        {cat.budget_limit > 0 ? formatCurrency(cat.budget_limit) : <span style={{ color: 'var(--text-muted)' }}>belum diset</span>}
                      </span>
                      <button className="btn btn-ghost btn-sm" onClick={() => setEditBudget({ id: cat.id, value: String(Math.round(cat.budget_limit || 0)) })}>✎</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── 3. Budget Kategori ───────────────── */}
        <div className="card">
          <div className="plan-sect-head">
            <span className="plan-sect-title">③ Budget Kategori</span>
            <span className="plan-sect-total tabular">{formatCurrency(totalKategori)}</span>
          </div>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[...Array(2)].map((_, i) => <div key={i} className="skeleton" style={{ height: 40 }} />)}
            </div>
          ) : regularCats.length === 0 ? (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', padding: '4px 0' }}>
              Belum ada kategori dengan budget. Set di halaman Kategori.
            </p>
          ) : (
            <div className="plan-rows">
              {regularCats.map(cat => (
                <div key={cat.id} className="plan-row">
                  <div className="plan-row-left">
                    <span className="plan-row-icon" style={{ background: `${cat.color}18`, color: cat.color }}>{cat.icon}</span>
                    <span className="plan-row-name">{cat.name}</span>
                  </div>
                  {editBudget?.id === cat.id ? (
                    <div className="plan-row-edit">
                      <CurrencyInput value={editBudget.value} onChange={v => setEditBudget(b => ({ ...b, value: v }))} style={{ width: 160 }} />
                      <button className="btn btn-primary btn-sm" onClick={saveCategoryBudget}>✓</button>
                      <button className="btn btn-ghost btn-sm" onClick={() => setEditBudget(null)}>✕</button>
                    </div>
                  ) : (
                    <div className="plan-row-right">
                      <span className="plan-row-amount tabular">{formatCurrency(cat.budget_limit)}</span>
                      <button className="btn btn-ghost btn-sm" onClick={() => setEditBudget({ id: cat.id, value: String(Math.round(cat.budget_limit)) })}>✎</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── 4. Rencana Tambahan ──────────────── */}
        <div className="card">
          <div className="plan-sect-head">
            <span className="plan-sect-title">④ Rencana Tambahan</span>
            {plans.length > 0 && <span className="plan-sect-total tabular">{formatCurrency(totalRencana)}</span>}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 14 }}>
            Pengeluaran tidak rutin yang direncanakan — bayar hutang, kondangan, servis, dll.
          </p>

          {plans.length > 0 && (
            <div className="plan-rows" style={{ marginBottom: 16 }}>
              {plans.map(p => (
                <div key={p.id} className="plan-row">
                  <div className="plan-row-left">
                    <span className="plan-row-icon" style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}>📋</span>
                    <span className="plan-row-name">{p.name}</span>
                  </div>
                  <div className="plan-row-right">
                    <span className="plan-row-amount tabular">{formatCurrency(p.amount)}</span>
                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={() => removePlan(p.id)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tambah rencana */}
          <div className="plan-add-row">
            <input
              className="form-input"
              type="text"
              placeholder="Nama pengeluaran..."
              value={newPlan.name}
              onChange={e => setNewPlan(p => ({ ...p, name: e.target.value }))}
              style={{ flex: 2 }}
            />
            <CurrencyInput
              value={newPlan.amount}
              onChange={raw => setNewPlan(p => ({ ...p, amount: raw }))}
              style={{ flex: 1 }}
            />
            <button
              className="btn btn-primary"
              onClick={addPlan}
              disabled={!newPlan.name || !newPlan.amount}
            >+ Tambah</button>
          </div>
        </div>

        {/* ── 5. Ringkasan ────────────────────── */}
        {salary > 0 && (
          <div className="card">
            <div className="plan-sect-head">
              <span className="plan-sect-title">⑤ Ringkasan</span>
            </div>
            <div className="plan-summary-detail">
              <div className="psd-row">
                <span>Gaji {getMonthLabel(nextMonth)}</span>
                <span className="tabular">{formatCurrency(salary)}</span>
              </div>
              <div className="psd-row">
                <span>Pengeluaran Wajib</span>
                <span className="tabular text-danger">− {formatCurrency(totalWajib)}</span>
              </div>
              <div className="psd-row">
                <span>Budget Kategori</span>
                <span className="tabular text-danger">− {formatCurrency(totalKategori)}</span>
              </div>
              {totalRencana > 0 && (
                <div className="psd-row">
                  <span>Rencana Tambahan</span>
                  <span className="tabular text-danger">− {formatCurrency(totalRencana)}</span>
                </div>
              )}
              <div className="psd-divider" />
              <div className="psd-row psd-total">
                <span>Sisa / Cadangan</span>
                <span className="tabular" style={{ color: sisa >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                  {formatCurrency(sisa)}
                </span>
              </div>
              {sisa < 0 && (
                <p style={{ fontSize: '0.75rem', color: 'var(--danger)', marginTop: 8 }}>
                  ⚠ Rencana melebihi gaji {formatCurrency(Math.abs(sisa))}. Kurangi budget atau rencana tambahan.
                </p>
              )}
              {sisa > 0 && (
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 8 }}>
                  Cadangan {((sisa / salary) * 100).toFixed(0)}% dari gaji — bisa untuk tabungan darurat atau investasi tambahan.
                </p>
              )}
            </div>
          </div>
        )}

      </div>

      <style>{`
        .plan-summary {
          display: flex; align-items: center; justify-content: center;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 16px 24px; gap: 20px; flex-wrap: wrap;
        }
        .plan-sum-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .plan-sum-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.07em; color: var(--text-muted); font-weight: 600; }
        .plan-sum-val { font-size: 1.1rem; font-weight: 800; letter-spacing: -0.03em; }
        .plan-sum-sep { font-size: 1.2rem; color: var(--border-light); font-weight: 300; align-self: center; }

        .plan-sect-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .plan-sect-title { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); }
        .plan-sect-total { font-size: 0.875rem; font-weight: 700; color: var(--text-secondary); }

        .plan-rows { display: flex; flex-direction: column; }
        .plan-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 0; border-bottom: 1px solid var(--border); gap: 12px;
        }
        .plan-row:last-child { border-bottom: none; }
        .plan-row-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
        .plan-row-icon {
          width: 30px; height: 30px; border-radius: 7px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; font-size: 0.9rem;
        }
        .plan-row-name { font-size: 0.8125rem; font-weight: 600; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .plan-row-pct {
          font-size: 0.65rem; background: var(--accent-dim); color: var(--accent);
          padding: 2px 7px; border-radius: 99px; font-weight: 700; flex-shrink: 0;
        }
        .plan-row-right { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
        .plan-row-amount { font-size: 0.875rem; font-weight: 700; letter-spacing: -0.02em; color: var(--text-primary); }
        .plan-row-edit { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }

        .plan-add-row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .plan-add-row .form-input { min-width: 140px; }

        .plan-summary-detail { display: flex; flex-direction: column; gap: 0; }
        .psd-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 9px 0; font-size: 0.8125rem; font-weight: 500; color: var(--text-secondary);
          border-bottom: 1px solid var(--border);
        }
        .psd-row:last-child { border-bottom: none; }
        .psd-divider { height: 1px; background: var(--border-light); margin: 4px 0; }
        .psd-total { font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); }
        .psd-total .tabular { font-size: 1rem; }

        @media (max-width: 640px) {
          .plan-summary { gap: 12px; padding: 14px 16px; }
          .plan-add-row { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </div>
  )
}
