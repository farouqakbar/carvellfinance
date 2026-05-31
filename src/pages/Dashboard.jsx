import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { formatCurrency, getCurrentMonth, getMonthLabel } from '../utils/formatCurrency'
import TransactionForm from '../components/TransactionForm'
import { useToast } from '../components/Toast'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

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

export default function Dashboard() {
  const { user } = useAuth()
  const toast = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const [month, setMonth] = useState(() => searchParams.get('month') || getCurrentMonth())
  const [data, setData] = useState({
    salary: 0, totalExpense: 0, totalIncome: 0,
    categories: [], transactions: [], savings: [], categorySpend: [],
  })
  const [loading, setLoading] = useState(true)
  const [showSalaryForm, setShowSalaryForm] = useState(false)
  const [salaryInput, setSalaryInput] = useState('')
  const [showTxForm, setShowTxForm] = useState(false)

  useEffect(() => { fetchDashboard() }, [month])

  const goToMonth = (m) => { setMonth(m); setSearchParams({ month: m }) }

  const fetchDashboard = async () => {
    setLoading(true)
    try {
      const startDate = `${month}-01`
      const endDate = `${month}-31`
      const [salaryRes, txRes, catRes, savingsRes] = await Promise.all([
        supabase.from('salaries').select('*').eq('user_id', user.id).eq('month', month).single(),
        supabase.from('transactions').select('*, categories(name, color, icon)').eq('user_id', user.id).gte('date', startDate).lte('date', endDate).order('date', { ascending: false }),
        supabase.from('categories').select('*').eq('user_id', user.id).order('name'),
        supabase.from('savings').select('*').eq('user_id', user.id),
      ])
      const txs = txRes.data || []
      const cats = catRes.data || []
      const totalExpense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
      const totalIncome = txs.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
      const catSpendMap = {}
      txs.filter(t => t.type === 'expense' && t.categories).forEach(t => {
        const n = t.categories.name
        if (!catSpendMap[n]) catSpendMap[n] = { name: n, amount: 0, color: t.categories.color, icon: t.categories.icon }
        catSpendMap[n].amount += Number(t.amount)
      })
      const catsWithStatus = cats.map(cat => {
        const spent = catSpendMap[cat.name]?.amount || 0
        const pct = cat.budget_limit > 0 ? (spent / cat.budget_limit) * 100 : null
        return { ...cat, spent, pct, overBudget: cat.budget_limit > 0 && spent > cat.budget_limit }
      }).sort((a, b) => {
        if (a.overBudget && !b.overBudget) return -1
        if (!a.overBudget && b.overBudget) return 1
        return (b.pct || 0) - (a.pct || 0)
      })
      setData({
        salary: salaryRes.data?.amount || 0,
        totalExpense, totalIncome,
        categories: catsWithStatus,
        transactions: txs.slice(0, 6),
        savings: savingsRes.data || [],
        categorySpend: Object.values(catSpendMap).sort((a, b) => b.amount - a.amount),
      })
    } finally { setLoading(false) }
  }

  const handleSaveSalary = async () => {
    const amount = parseFloat(salaryInput)
    if (!amount) return
    await supabase.from('salaries').upsert({ user_id: user.id, month, amount }, { onConflict: 'user_id,month' })
    toast('Gaji disimpan', 'success')
    setShowSalaryForm(false)
    setSalaryInput('')
    fetchDashboard()
  }

  const totalBudget = data.categories.filter(c => c.budget_limit > 0).reduce((s, c) => s + c.budget_limit, 0)
  const balance = data.salary + data.totalIncome - data.totalExpense
  const budgetUsed = data.salary > 0 ? (data.totalExpense / data.salary) * 100 : 0
  const potentialSave = data.salary + data.totalIncome - data.totalExpense
  const isCurrentMonth = month === getCurrentMonth()
  const overBudgetCats = data.categories.filter(c => c.overBudget)
  const name = user?.full_name?.split(' ')[0] || user?.username || 'Kamu'

  const heroBarColor = budgetUsed > 90 ? 'var(--danger)' : budgetUsed > 70 ? 'var(--warning)' : 'var(--accent)'

  return (
    <div className="animate-in">

      {/* ── Header ─────────────────────────────── */}
      <div className="dash-header">
        <div className="month-nav-group">
          <button className="btn btn-ghost btn-sm month-arrow" onClick={() => goToMonth(prevMonth(month))}>‹</button>
          <span className="month-label-text">{getMonthLabel(month)}</span>
          <button className="btn btn-ghost btn-sm month-arrow" onClick={() => goToMonth(nextMonth(month))} disabled={isCurrentMonth}>›</button>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-secondary btn-sm" onClick={() => setShowSalaryForm(true)}>Atur Gaji</button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowTxForm(true)}>+ Transaksi</button>
        </div>
      </div>

      {/* ── Overbudget alert ─────────────────── */}
      {overBudgetCats.length > 0 && (
        <div className="alert-banner">
          <span className="alert-icon">⚠</span>
          <span>
            <strong>Overbudget</strong> — {overBudgetCats.map(c => `${c.icon} ${c.name}`).join(', ')}
          </span>
        </div>
      )}

      {/* ── Hero Saldo ───────────────────────── */}
      <div className="hero-card">
        {loading ? (
          <div className="skeleton" style={{ height: 90, borderRadius: 10 }} />
        ) : (
          <>
            <div className="hero-top">
              <div>
                <div className="hero-eyebrow">Saldo bersih {getMonthLabel(month)}</div>
                <div className={`hero-balance ${balance < 0 ? 'negative' : ''}`}>
                  {balance < 0 ? '-' : ''}{formatCurrency(Math.abs(balance))}
                </div>
              </div>
              {data.salary > 0 && (
                <div className="hero-right">
                  <div className="hero-stat">
                    <span className="hero-stat-label">Gaji</span>
                    <span className="hero-stat-val">{formatCurrency(data.salary)}</span>
                  </div>
                </div>
              )}
            </div>

            {data.salary > 0 && (
              <div className="hero-track-wrap">
                <div className="hero-track">
                  <div className="hero-track-fill" style={{
                    width: `${Math.min(budgetUsed, 100)}%`,
                    background: heroBarColor,
                  }} />
                </div>
                <div className="hero-track-labels">
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 500 }}>
                    {formatCurrency(data.totalExpense)} pengeluaran
                  </span>
                  <span style={{ color: heroBarColor, fontSize: '0.72rem', fontWeight: 700 }}>
                    {budgetUsed.toFixed(0)}%
                  </span>
                </div>
              </div>
            )}

            {data.salary === 0 && (
              <button className="set-salary-cta" onClick={() => setShowSalaryForm(true)}>
                Belum ada gaji bulan ini — klik untuk atur →
              </button>
            )}
          </>
        )}
      </div>

      {/* ── Quick stats ──────────────────────── */}
      <div className="quick-stats mb-24">
        {[
          { label: 'Pemasukan', val: data.totalIncome, color: 'var(--success)', prefix: '+' },
          { label: 'Pengeluaran', val: data.totalExpense, color: 'var(--danger)', prefix: '-' },
          { label: potentialSave >= 0 ? 'Bisa ditabung' : 'Defisit', val: Math.abs(potentialSave), color: potentialSave >= 0 ? 'var(--accent)' : 'var(--danger)', prefix: potentialSave >= 0 ? '' : '-' },
        ].map(s => (
          <div key={s.label} className="qs-item">
            <span className="qs-label">{s.label}</span>
            <span className="qs-value tabular" style={{ color: s.color }}>
              {s.prefix}{formatCurrency(s.val)}
            </span>
          </div>
        ))}
      </div>

      {/* ── Budget per Kategori ──────────────── */}
      <div className="card mb-20">
        <div className="section-head">
          <div>
            <h3 className="section-title">Budget Kategori</h3>
            {totalBudget > 0 && (
              <p className="section-sub">
                {formatCurrency(data.totalExpense)} dari {formatCurrency(totalBudget)} total budget
              </p>
            )}
          </div>
          <a href="/categories" className="section-link">Kelola →</a>
        </div>

        {loading ? (
          <div className="flex" style={{ flexDirection: 'column', gap: 12, marginTop: 16 }}>
            {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 48 }} />)}
          </div>
        ) : data.categories.filter(c => c.budget_limit > 0).length === 0 ? (
          <div className="empty-state" style={{ padding: '28px 0' }}>
            <div className="empty-state-icon">◈</div>
            <strong>Belum ada budget kategori</strong>
            <p>Tambah kategori dan atur budget di halaman Kategori</p>
          </div>
        ) : (
          <div className="budget-rows">
            {data.categories.filter(c => c.budget_limit > 0).map(cat => {
              const pct = Math.min((cat.spent / cat.budget_limit) * 100, 100)
              const barColor = cat.overBudget ? 'var(--danger)' : pct >= 80 ? 'var(--warning)' : cat.color
              return (
                <div key={cat.id} className="budget-row-item">
                  <div className="bri-left">
                    <span className="bri-icon" style={{ background: `${cat.color}15`, color: cat.color }}>{cat.icon}</span>
                    <span className="bri-name">{cat.name}</span>
                    {cat.overBudget && <span className="badge badge-danger" style={{ fontSize: '0.6rem', padding: '2px 6px' }}>Over</span>}
                    {!cat.overBudget && pct >= 80 && <span className="badge badge-warning" style={{ fontSize: '0.6rem', padding: '2px 6px' }}>Hampir</span>}
                  </div>
                  <div className="bri-bar-wrap">
                    <div className="bri-bar">
                      <div className="bri-bar-fill" style={{ width: `${pct}%`, background: barColor }} />
                    </div>
                  </div>
                  <div className="bri-right">
                    <span className="bri-spent tabular" style={{ color: cat.overBudget ? 'var(--danger)' : 'var(--text-primary)' }}>
                      {formatCurrency(cat.spent)}
                    </span>
                    <span className="bri-limit tabular">/ {formatCurrency(cat.budget_limit)}</span>
                  </div>
                  <span className="bri-pct" style={{ color: barColor }}>{pct.toFixed(0)}%</span>
                </div>
              )
            })}
            {/* Kategori tanpa budget */}
            {data.categories.filter(c => c.budget_limit === 0 && c.spent > 0).map(cat => (
              <div key={cat.id} className="budget-row-item no-budget">
                <div className="bri-left">
                  <span className="bri-icon" style={{ background: `${cat.color}15`, color: cat.color }}>{cat.icon}</span>
                  <span className="bri-name">{cat.name}</span>
                  <span className="badge badge-info" style={{ fontSize: '0.6rem', padding: '2px 6px' }}>No limit</span>
                </div>
                <div className="bri-bar-wrap" />
                <div className="bri-right">
                  <span className="bri-spent tabular">{formatCurrency(cat.spent)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Tabungan ─────────────────────────── */}
      {(loading || data.savings.length > 0) && (
        <div className="card mb-20">
          <div className="section-head">
            <div>
              <h3 className="section-title">Tabungan</h3>
              {data.savings.length > 0 && (
                <p className="section-sub">
                  {formatCurrency(data.savings.reduce((s, sv) => s + Number(sv.current_amount), 0))} total tersimpan
                </p>
              )}
            </div>
            <a href="/savings" className="section-link">Kelola →</a>
          </div>

          {loading ? (
            <div className="grid-2" style={{ marginTop: 16 }}>
              {[...Array(2)].map((_, i) => <div key={i} className="skeleton" style={{ height: 70 }} />)}
            </div>
          ) : (
            <div className="savings-compact-grid">
              {data.savings.map(sv => {
                const pct = sv.target_amount > 0 ? Math.min((sv.current_amount / sv.target_amount) * 100, 100) : 0
                const done = pct >= 100
                const daysLeft = sv.deadline ? Math.ceil((new Date(sv.deadline) - new Date()) / 86400000) : null
                const urgent = daysLeft !== null && daysLeft < 30 && !done
                return (
                  <div key={sv.id} className={`saving-compact-card ${done ? 'done' : ''} ${urgent ? 'urgent' : ''}`}>
                    <div className="scc-top">
                      <span className="scc-name">{sv.name}</span>
                      <div className="flex gap-4" style={{ alignItems: 'center' }}>
                        {done && <span className="badge badge-success">✓</span>}
                        {urgent && !done && <span className="badge badge-warning">{daysLeft}h</span>}
                        <span className="scc-pct">{pct.toFixed(0)}%</span>
                      </div>
                    </div>
                    <div className="scc-amounts">
                      <span className="scc-current tabular">{formatCurrency(sv.current_amount)}</span>
                      <span className="scc-target tabular">/ {formatCurrency(sv.target_amount)}</span>
                    </div>
                    <div className="scc-bar">
                      <div className="scc-bar-fill" style={{
                        width: `${pct}%`,
                        background: done ? 'var(--success)' : urgent ? 'var(--warning)' : 'linear-gradient(90deg, var(--accent), var(--info))',
                      }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Transaksi terakhir ───────────────── */}
      <div className="card">
        <div className="section-head">
          <h3 className="section-title">Transaksi Terakhir</h3>
          <a href="/transactions" className="section-link">Semua →</a>
        </div>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 40 }} />)}
          </div>
        ) : data.transactions.length === 0 ? (
          <div className="empty-state" style={{ padding: '24px 0' }}>
            <div className="empty-state-icon">↕</div>
            <strong>Belum ada transaksi</strong>
            <p>Tap "+ Transaksi" di atas untuk mulai mencatat</p>
          </div>
        ) : (
          <div className="tx-list">
            {data.transactions.map(tx => (
              <div key={tx.id} className="tx-item">
                <div className="tx-icon-wrap" style={{ background: tx.categories?.color ? `${tx.categories.color}18` : 'var(--bg-input)' }}>
                  <span>{tx.categories?.icon || (tx.type === 'income' ? '↑' : '↓')}</span>
                </div>
                <div className="tx-info">
                  <span className="tx-desc">{tx.description || tx.categories?.name || 'Transaksi'}</span>
                  <span className="tx-date">{new Date(tx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                </div>
                <span className={`tx-amount tabular ${tx.type === 'income' ? 'income' : 'expense'}`}>
                  {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Modals ───────────────────────────── */}
      {showSalaryForm && (
        <div className="modal-overlay" onClick={() => setShowSalaryForm(false)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Gaji {getMonthLabel(month)}</h2>
              <button className="btn btn-ghost" onClick={() => setShowSalaryForm(false)}>✕</button>
            </div>
            <div className="form-group">
              <label className="form-label">Nominal (Rp)</label>
              <input className="form-input" type="number" placeholder="0" value={salaryInput}
                onChange={e => setSalaryInput(e.target.value)} autoFocus
                style={{ fontSize: '1.1rem', fontWeight: 600 }}
              />
            </div>
            <div className="flex gap-8">
              <button className="btn btn-secondary" onClick={() => setShowSalaryForm(false)}>Batal</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSaveSalary}>Simpan</button>
            </div>
          </div>
        </div>
      )}

      {showTxForm && (
        <div className="modal-overlay" onClick={() => setShowTxForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Tambah Transaksi</h2>
              <button className="btn btn-ghost" onClick={() => setShowTxForm(false)}>✕</button>
            </div>
            <TransactionForm
              onSuccess={() => { fetchDashboard(); setShowTxForm(false) }}
              onClose={() => setShowTxForm(false)}
            />
          </div>
        </div>
      )}

      <style>{`
        /* Header */
        .dash-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .month-nav-group {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .month-arrow {
          width: 32px;
          height: 32px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          border-radius: var(--radius-sm);
        }
        .month-label-text {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          padding: 0 10px;
          min-width: 140px;
          text-align: center;
        }

        /* Alert */
        .alert-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--danger-dim);
          border: 1px solid var(--danger);
          border-radius: var(--radius-sm);
          padding: 11px 16px;
          font-size: 0.8125rem;
          color: var(--danger);
          margin-bottom: 16px;
          font-weight: 500;
        }
        .alert-icon { font-size: 0.9rem; }

        /* Hero card */
        .hero-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          margin-bottom: 14px;
          position: relative;
          overflow: hidden;
        }
        .hero-card::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, var(--accent-dim) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        .hero-eyebrow {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          font-weight: 600;
          display: block;
          margin-bottom: 6px;
        }
        .hero-balance {
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          font-variant-numeric: tabular-nums;
          line-height: 1;
        }
        .hero-balance.negative { color: var(--danger); }
        .hero-right { text-align: right; }
        .hero-stat-label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          font-weight: 600;
          display: block;
          margin-bottom: 3px;
        }
        .hero-stat-val {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-secondary);
          font-variant-numeric: tabular-nums;
        }
        .hero-track-wrap { margin-top: 4px; }
        .hero-track {
          height: 6px;
          background: var(--border);
          border-radius: 99px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .hero-track-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hero-track-labels {
          display: flex;
          justify-content: space-between;
        }
        .set-salary-cta {
          background: none;
          border: 1px dashed var(--border-light);
          border-radius: var(--radius-sm);
          padding: 8px 14px;
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          font-family: var(--font-sans);
          margin-top: 8px;
          transition: all 0.15s;
          width: 100%;
          text-align: left;
        }
        .set-salary-cta:hover { color: var(--accent); border-color: var(--accent); }

        /* Quick stats */
        .quick-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .qs-item {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .qs-label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          font-weight: 600;
        }
        .qs-value {
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        /* Section head */
        .section-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .section-title {
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--text-primary);
        }
        .section-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 2px;
          font-weight: 500;
        }
        .section-link {
          font-size: 0.72rem;
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          white-space: nowrap;
          margin-top: 2px;
        }
        .section-link:hover { opacity: 0.75; }

        /* Budget rows */
        .budget-rows {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .budget-row-item {
          display: grid;
          grid-template-columns: minmax(140px, 1.5fr) 1fr 160px 44px;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
        }
        .budget-row-item:last-child { border-bottom: none; }
        .budget-row-item.no-budget { opacity: 0.7; }
        .bri-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        .bri-icon {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          flex-shrink: 0;
        }
        .bri-name {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .bri-bar-wrap { display: flex; align-items: center; }
        .bri-bar {
          height: 5px;
          background: var(--border);
          border-radius: 99px;
          overflow: hidden;
          width: 100%;
        }
        .bri-bar-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .bri-right {
          display: flex;
          align-items: baseline;
          gap: 3px;
          justify-content: flex-end;
        }
        .bri-spent {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .bri-limit {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .bri-pct {
          font-size: 0.72rem;
          font-weight: 700;
          text-align: right;
          min-width: 32px;
        }

        /* Savings compact */
        .savings-compact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
        }
        .saving-compact-card {
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 14px 16px;
          transition: border-color 0.2s;
        }
        .saving-compact-card:hover { border-color: var(--border-light); }
        .saving-compact-card.done { border-color: var(--success); background: var(--success-dim); }
        .saving-compact-card.urgent { border-color: var(--warning); }
        .scc-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .scc-name {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .scc-pct {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
        }
        .scc-amounts {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 8px;
        }
        .scc-current {
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          color: var(--text-primary);
        }
        .scc-target {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .scc-bar {
          height: 4px;
          background: var(--border);
          border-radius: 99px;
          overflow: hidden;
        }
        .scc-bar-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Transactions */
        .tx-list {
          display: flex;
          flex-direction: column;
          margin-top: 4px;
        }
        .tx-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 0;
          border-bottom: 1px solid var(--border);
        }
        .tx-item:last-child { border-bottom: none; }
        .tx-icon-wrap {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
        }
        .tx-info { flex: 1; min-width: 0; }
        .tx-desc {
          display: block;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .tx-date {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .tx-amount {
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          white-space: nowrap;
        }
        .tx-amount.income { color: var(--success); }
        .tx-amount.expense { color: var(--danger); }

        @media (max-width: 768px) {
          .budget-row-item {
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
          }
          .bri-bar-wrap {
            grid-column: 1 / -1;
          }
          .bri-right { grid-row: 1; }
          .bri-pct { display: none; }
          .quick-stats { grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
          .qs-value { font-size: 0.78rem; }
          .hero-balance { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  )
}
