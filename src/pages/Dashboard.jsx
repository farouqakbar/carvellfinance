import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { formatCurrency, getCurrentMonth, getMonthLabel } from '../utils/formatCurrency'
import TransactionForm from '../components/TransactionForm'
import { useToast } from '../components/Toast'
import CurrencyInput from '../components/CurrencyInput'
import { isMandatory } from '../constants/mandatoryCategories'

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
    categories: [], transactions: [], savings: [], savingsLogs: [], categorySpend: [],
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
      const [salaryRes, txRes, catRes, savingsRes, logsRes] = await Promise.all([
        supabase.from('salaries').select('*').eq('user_id', user.id).eq('month', month).maybeSingle(),
        supabase.from('transactions').select('*, categories(name, color, icon)').eq('user_id', user.id).gte('date', startDate).lte('date', endDate).order('date', { ascending: false }),
        supabase.from('categories').select('*').eq('user_id', user.id).order('name'),
        supabase.from('savings').select('*').eq('user_id', user.id),
        supabase.from('savings_log').select('*').eq('user_id', user.id).eq('month', month),
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
        transactions: txs.slice(0, 5),
        savings: savingsRes.data || [],
        savingsLogs: logsRes.data || [],
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
  const isCurrentMonth = month === getCurrentMonth()
  const overBudgetCats = data.categories.filter(c => c.overBudget)

  // Mandatory categories langsung potong gaji tanpa nunggu transaksi
  const mandatoryBudgetTotal = data.categories
    .filter(c => isMandatory(c) && c.budget_limit > 0)
    .reduce((s, c) => s + Number(c.budget_limit), 0)
  const mandatoryTransactionSpent = data.categories
    .filter(c => isMandatory(c))
    .reduce((s, c) => s + (c.spent || 0), 0)
  // Deduction tambahan di luar transaksi yang sudah dicatat
  const mandatoryAutoDeduct = Math.max(0, mandatoryBudgetTotal - mandatoryTransactionSpent)

  const effectiveExpense = data.totalExpense + mandatoryAutoDeduct
  const balance = data.salary + data.totalIncome - effectiveExpense
  const budgetUsed = data.salary > 0 ? (effectiveExpense / data.salary) * 100 : 0
  const heroBarColor = budgetUsed > 90 ? 'var(--danger)' : budgetUsed > 70 ? 'var(--warning)' : 'var(--accent)'

  // Alokasi tabungan dari kategori mandatory "Tabungan Bulanan"
  const monthlyTabungan = data.categories
    .filter(c => c.name === 'Tabungan Bulanan' && c.budget_limit > 0)
    .reduce((s, c) => s + Number(c.budget_limit), 0)

  const batasBelanja = data.salary > 0 ? data.salary - monthlyTabungan : 0
  const sisaBelanja = batasBelanja - data.totalExpense
  const overBatasBelanja = data.salary > 0 && monthlyTabungan > 0 && data.totalExpense > batasBelanja

  return (
    <div className="animate-in">

      {/* ── Header ─────────────────────────────── */}
      <div className="dash-header">
        <div className="month-nav-group">
          <button className="month-btn" onClick={() => goToMonth(prevMonth(month))}>‹</button>
          <span className="month-label-text">{getMonthLabel(month)}</span>
          <button className="month-btn" onClick={() => goToMonth(nextMonth(month))} disabled={isCurrentMonth}>›</button>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-secondary btn-sm" onClick={() => setShowSalaryForm(true)}>
            Atur Gaji
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowTxForm(true)}>
            + Transaksi
          </button>
        </div>
      </div>

      {/* ── Overbudget alert ─────────────────── */}
      {overBudgetCats.length > 0 && (
        <div className="alert-banner">
          <span>⚠</span>
          <span><strong>Overbudget</strong> — {overBudgetCats.map(c => `${c.icon} ${c.name}`).join(', ')}</span>
        </div>
      )}

      {/* ── Sections ─────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* ── Hero Saldo ───────────────────────── */}
      <div className="hero-card">
        {loading ? (
          <div className="skeleton" style={{ height: 88, borderRadius: 8 }} />
        ) : (
          <>
            <div className="hero-top">
              <div className="hero-left">
                <span className="hero-eyebrow">Saldo Bersih {getMonthLabel(month)}</span>
                <div className={`hero-balance ${balance < 0 ? 'neg' : ''}`}>
                  {balance < 0 && <span className="hero-neg-sign">-</span>}
                  {formatCurrency(Math.abs(balance))}
                </div>
              </div>
              <div className="hero-right">
                {data.salary > 0 && (
                  <div className="hero-chip">
                    <span className="hero-chip-label">Gaji</span>
                    <span className="hero-chip-val tabular">{formatCurrency(data.salary)}</span>
                  </div>
                )}
                {data.savings.length > 0 && (
                  <div className="hero-chip">
                    <span className="hero-chip-label">Ditabung {getMonthLabel(month).split(' ')[0]}</span>
                    <span className="hero-chip-val tabular" style={{ color: 'var(--success)' }}>
                      {formatCurrency(data.savingsLogs.reduce((s, l) => s + Number(l.amount), 0))}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {data.salary > 0 ? (
              <div className="hero-bar-section">
                <div className="hero-bar-track">
                  <div className="hero-bar-fill" style={{ width: `${Math.min(budgetUsed, 100)}%`, background: heroBarColor }} />
                </div>
                <div className="hero-bar-labels">
                  <span>{formatCurrency(data.totalExpense)} dipakai</span>
                  <span style={{ color: heroBarColor, fontWeight: 700 }}>{budgetUsed.toFixed(0)}%</span>
                </div>
              </div>
            ) : (
              <div className="hero-no-salary">
                <button className="salary-cta" onClick={() => setShowSalaryForm(true)}>
                  + Atur gaji bulan ini
                </button>
                <span className="salary-cta-hint">untuk menghitung saldo bersih</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Stats strip ──────────────────────── */}
      <div className="stats-strip">
        <div className="stat-col">
          <span className="stat-col-label">Pemasukan</span>
          <span className="stat-col-val tabular" style={{ color: 'var(--success)' }}>+{formatCurrency(data.totalIncome)}</span>
        </div>
        <div className="stat-col">
          <span className="stat-col-label">Pengeluaran</span>
          <span className="stat-col-val tabular" style={{ color: overBatasBelanja ? 'var(--danger)' : 'var(--text-primary)' }}>
            -{formatCurrency(effectiveExpense)}
          </span>
          {mandatoryAutoDeduct > 0 && (
            <span className="stat-col-sub">+{formatCurrency(mandatoryAutoDeduct)} wajib</span>
          )}
        </div>
        <div className="stat-col">
          <span className="stat-col-label">
            {data.salary > 0 && monthlyTabungan > 0 ? 'Sisa belanja' : 'Bisa ditabung'}
          </span>
          <span className="stat-col-val tabular" style={{ color: sisaBelanja >= 0 ? 'var(--accent)' : 'var(--danger)' }}>
            {data.salary > 0 && monthlyTabungan > 0
              ? formatCurrency(Math.max(0, sisaBelanja))
              : formatCurrency(Math.max(0, balance))
            }
          </span>
          {data.salary > 0 && monthlyTabungan > 0 && (
            <span className="stat-col-sub">Tabungan {formatCurrency(monthlyTabungan)}/bln</span>
          )}
        </div>
      </div>

      {/* ── Budget per Kategori ──────────────── */}
      <div className="card">
        <div className="sect-head">
          <div>
            <h3 className="sect-title">Budget Kategori</h3>
            {totalBudget > 0 && (
              <p className="sect-sub">{formatCurrency(data.totalExpense)} dari {formatCurrency(totalBudget)}</p>
            )}
          </div>
          <Link to="/categories" className="pill-link">Kelola</Link>
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 44 }} />)}
          </div>
        ) : data.categories.filter(c => c.budget_limit > 0 || isMandatory(c)).length === 0 ? (
          <div className="empty-hint">
            <span className="empty-hint-icon">◈</span>
            <span>Belum ada budget kategori. </span>
            <Link to="/categories" className="empty-hint-link">Buat sekarang →</Link>
          </div>
        ) : (
          <div className="budget-rows">
            {data.categories.filter(c => c.budget_limit > 0 || isMandatory(c)).map(cat => {
              const rawPct = cat.budget_limit > 0 ? (cat.spent / cat.budget_limit) * 100 : 0
              const pct = Math.min(rawPct, 100)
              const isFull = !cat.overBudget && rawPct >= 100
              const isNear = !cat.overBudget && rawPct >= 80 && rawPct < 100
              const barColor = cat.overBudget ? 'var(--danger)' : isFull ? 'var(--success)' : isNear ? 'var(--warning)' : cat.color
              return (
                <div key={cat.id} className="brow">
                  <div className="brow-left">
                    <span className="brow-icon" style={{ background: `${cat.color}18`, color: cat.color }}>{cat.icon}</span>
                    <span className="brow-name">{cat.name}</span>
                    {cat.overBudget && <span className="badge badge-danger" style={{ fontSize: '0.6rem', padding: '2px 7px' }}>Over</span>}
                    {isFull && <span className="badge badge-success" style={{ fontSize: '0.6rem', padding: '2px 7px' }}>Penuh</span>}
                    {isNear && <span className="badge badge-warning" style={{ fontSize: '0.6rem', padding: '2px 7px' }}>Hampir</span>}
                  </div>
                  <div className="brow-bar-wrap">
                    <div className="brow-bar">
                      <div className="brow-bar-fill" style={{ width: `${pct}%`, background: barColor }} />
                    </div>
                  </div>
                  <div className="brow-right">
                    <span className="brow-spent tabular" style={{ color: cat.overBudget ? 'var(--danger)' : 'var(--text-primary)' }}>
                      {formatCurrency(cat.spent)}
                    </span>
                    <span className="brow-limit tabular">/{formatCurrency(cat.budget_limit)}</span>
                  </div>
                  <span className="brow-pct" style={{ color: barColor }}>{pct.toFixed(0)}%</span>
                </div>
              )
            })}
            {data.categories.filter(c => c.budget_limit === 0 && c.spent > 0).map(cat => (
              <div key={cat.id} className="brow no-limit">
                <div className="brow-left">
                  <span className="brow-icon" style={{ background: `${cat.color}18`, color: cat.color }}>{cat.icon}</span>
                  <span className="brow-name">{cat.name}</span>
                  <span className="brow-no-limit-tag">no limit</span>
                </div>
                <div className="brow-bar-wrap" />
                <span className="brow-spent tabular">{formatCurrency(cat.spent)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Rencana bulan depan preview ─────── */}
      <div className="card" style={{ borderStyle: 'dashed' }}>
        <div className="sect-head">
          <h3 className="sect-title">Rencana Bulan Depan</h3>
          <Link to="/savings" className="pill-link">Atur →</Link>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
          Rencanakan pengeluaran bulan depan secara rinci di halaman Rencana.
        </p>
      </div>

      {/* ── Transaksi terakhir ───────────────── */}
      <div className="card">
        <div className="sect-head">
          <h3 className="sect-title">Transaksi Terakhir</h3>
          <Link to={`/transactions?month=${month}`} className="pill-link">Lihat semua</Link>
        </div>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 42 }} />)}
          </div>
        ) : data.transactions.length === 0 ? (
          <div className="empty-hint">
            <span className="empty-hint-icon">↕</span>
            <span>Belum ada transaksi bulan ini. </span>
            <button className="empty-hint-link" onClick={() => setShowTxForm(true)}>Tambah sekarang →</button>
          </div>
        ) : (
          <div className="tx-list">
            {data.transactions.map(tx => (
              <div key={tx.id} className="tx-row">
                <div className="tx-icon" style={{ background: tx.categories?.color ? `${tx.categories.color}18` : 'var(--bg-input)' }}>
                  {tx.categories?.icon || (tx.type === 'income' ? '↑' : '↓')}
                </div>
                <div className="tx-meta">
                  <span className="tx-desc">{tx.description || tx.categories?.name || 'Transaksi'}</span>
                  <span className="tx-date">{new Date(tx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                </div>
                <span className={`tx-amount tabular ${tx.type === 'income' ? 'inc' : 'exp'}`}>
                  {tx.type === 'income' ? '+' : '−'}{formatCurrency(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      </div>{/* end sections gap wrapper */}

      {/* ── Modals ───────────────────────────── */}
      {showSalaryForm && (
        <div className="modal-overlay" onClick={() => setShowSalaryForm(false)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Gaji {getMonthLabel(month)}</h2>
              <button className="btn btn-ghost" onClick={() => setShowSalaryForm(false)}>✕</button>
            </div>
            <div className="form-group">
              <label className="form-label">Gaji Bulan Ini</label>
              <CurrencyInput
                value={salaryInput}
                onChange={raw => setSalaryInput(raw)}
                autoFocus
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
            <TransactionForm onSuccess={() => { fetchDashboard(); setShowTxForm(false) }} onClose={() => setShowTxForm(false)} />
          </div>
        </div>
      )}

      <style>{`
        /* ── Header ───────────────────────────── */
        .dash-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 20px; gap: 12px; flex-wrap: wrap;
        }
        .month-nav-group { display: flex; align-items: center; gap: 2px; }
        .month-btn {
          width: 30px; height: 30px; border: none; background: none;
          color: var(--text-muted); font-size: 1.2rem; cursor: pointer;
          border-radius: var(--radius-sm); display: flex; align-items: center;
          justify-content: center; transition: all 0.15s; font-family: var(--font-sans);
        }
        .month-btn:hover { background: var(--bg-input); color: var(--text-primary); }
        .month-btn:disabled { opacity: 0.25; cursor: not-allowed; }
        .month-label-text {
          font-size: 0.9375rem; font-weight: 700; letter-spacing: -0.025em;
          color: var(--text-primary); padding: 0 8px; min-width: 130px; text-align: center;
        }

        /* ── Alert ────────────────────────────── */
        .alert-banner {
          display: flex; align-items: center; gap: 9px;
          background: var(--danger-dim); border: 1px solid rgba(248,113,113,0.3);
          border-radius: var(--radius-sm); padding: 10px 14px;
          font-size: 0.78rem; color: var(--danger); margin-bottom: 14px; font-weight: 500;
        }

        /* ── Hero ─────────────────────────────── */
        .hero-card {
          background: linear-gradient(135deg, #12122a 0%, #0f0f17 60%);
          border: 1px solid #252540;
          border-radius: var(--radius-lg);
          padding: 22px 24px;
          position: relative; overflow: hidden;
        }
        .hero-card::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 100% 0%, rgba(99,102,241,0.07) 0%, transparent 55%);
          pointer-events: none;
        }
        .hero-top {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 14px;
        }
        .hero-left {}
        .hero-eyebrow {
          font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.09em;
          color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 5px;
        }
        .hero-balance {
          font-size: clamp(1.75rem, 5vw, 2.5rem);
          font-weight: 800; letter-spacing: -0.04em;
          color: var(--text-primary); font-variant-numeric: tabular-nums; line-height: 1;
        }
        .hero-balance.neg { color: var(--danger); }
        .hero-neg-sign { font-size: 0.7em; vertical-align: 0.05em; margin-right: 1px; }

        .hero-right { display: flex; flex-direction: column; gap: 8px; align-items: flex-end; }
        .hero-chip {
          display: flex; flex-direction: column; align-items: flex-end; gap: 2px;
          background: var(--bg-input); border: 1px solid var(--border);
          border-radius: var(--radius-sm); padding: 8px 12px; min-width: 130px;
        }
        .hero-chip-label {
          font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.07em;
          color: var(--text-muted); font-weight: 600;
        }
        .hero-chip-val {
          font-size: 0.9rem; font-weight: 700;
          color: var(--text-secondary); letter-spacing: -0.02em;
        }

        .hero-bar-section {}
        .hero-bar-track {
          height: 5px; background: var(--border); border-radius: 99px; overflow: hidden; margin-bottom: 7px;
        }
        .hero-bar-fill { height: 100%; border-radius: 99px; transition: width 0.8s cubic-bezier(0.4,0,0.2,1); }
        .hero-bar-labels {
          display: flex; justify-content: space-between;
          font-size: 0.68rem; color: var(--text-muted); font-weight: 500;
        }

        .hero-no-salary {
          display: flex; align-items: center; gap: 10px; margin-top: 10px;
        }
        .salary-cta {
          display: inline-flex; align-items: center; gap: 5px;
          background: var(--accent-dim);
          border: 1px solid rgba(99,102,241,0.35);
          border-radius: var(--radius-sm);
          padding: 7px 13px;
          color: var(--accent); font-size: 0.78rem; font-weight: 700;
          cursor: pointer; font-family: var(--font-sans);
          transition: all 0.15s; letter-spacing: -0.01em; white-space: nowrap;
        }
        .salary-cta:hover { background: rgba(99,102,241,0.2); transform: translateY(-1px); }
        .salary-cta-hint {
          font-size: 0.72rem; color: var(--text-muted); font-weight: 500;
        }

        /* ── Stats strip ──────────────────────── */
        .stats-strip {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .stat-col {
          padding: 16px 20px; display: flex; flex-direction: column; gap: 6px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }
        .stat-col-label {
          font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--text-muted); font-weight: 700;
        }
        .stat-col-val {
          font-size: 1.1rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;
        }
        .stat-col-sub {
          font-size: 0.68rem; color: var(--text-muted); font-weight: 500; margin-top: 2px;
        }

        /* ── Section head ─────────────────────── */
        .sect-head {
          display: flex; align-items: flex-start;
          justify-content: space-between; margin-bottom: 14px; gap: 8px;
        }
        .sect-title {
          font-size: 0.8125rem; font-weight: 700;
          letter-spacing: -0.01em; color: var(--text-primary);
        }
        .sect-sub {
          font-size: 0.68rem; color: var(--text-muted); margin-top: 2px; font-weight: 500;
        }
        .pill-link {
          display: inline-flex; align-items: center; gap: 3px;
          font-size: 0.7rem; color: var(--text-secondary);
          text-decoration: none; font-weight: 600;
          padding: 3px 10px; border: 1px solid var(--border);
          border-radius: 99px; background: transparent; transition: all 0.15s;
          white-space: nowrap; flex-shrink: 0; margin-top: 1px;
        }
        .pill-link:hover { color: var(--accent); border-color: var(--accent); background: var(--accent-dim); }

        /* ── Empty hint ───────────────────────── */
        .empty-hint {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 0; color: var(--text-muted); font-size: 0.8rem; font-weight: 500;
        }
        .empty-hint-icon {
          width: 28px; height: 28px; border-radius: 6px;
          background: var(--bg-input); display: flex; align-items: center;
          justify-content: center; font-size: 0.85rem; flex-shrink: 0;
        }
        .empty-hint-link {
          color: var(--accent); font-weight: 600; text-decoration: none;
          background: none; border: none; cursor: pointer; font-family: var(--font-sans);
          font-size: 0.8rem; padding: 0; transition: opacity 0.15s;
        }
        .empty-hint-link:hover { opacity: 0.75; }

        /* ── Budget rows ──────────────────────── */
        .budget-rows { display: flex; flex-direction: column; }
        .brow {
          display: grid;
          grid-template-columns: minmax(140px, 1.6fr) 1fr 110px 36px;
          align-items: center; gap: 14px; padding: 12px 0;
          border-bottom: 1px solid var(--border);
        }
        .brow:last-child { border-bottom: none; }
        .brow.no-limit { grid-template-columns: 1fr auto; }
        .brow-left { display: flex; align-items: center; gap: 8px; min-width: 0; }
        .brow-icon {
          width: 28px; height: 28px; border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; flex-shrink: 0;
        }
        .brow-name {
          font-size: 0.8125rem; font-weight: 600; color: var(--text-primary);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .brow-no-limit-tag {
          font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.04em;
          color: var(--text-muted); font-weight: 700;
          background: var(--bg-input); padding: 2px 6px; border-radius: 99px;
          flex-shrink: 0;
        }
        .brow-bar-wrap { display: flex; align-items: center; }
        .brow-bar { height: 7px; background: var(--border); border-radius: 99px; overflow: hidden; width: 100%; }
        .brow-bar-fill { height: 100%; border-radius: 99px; transition: width 0.7s cubic-bezier(0.4,0,0.2,1); }
        .brow-right { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; justify-content: center; }
        .brow-spent { font-size: 0.8rem; font-weight: 700; letter-spacing: -0.01em; }
        .brow-limit { font-size: 0.65rem; color: var(--text-muted); font-weight: 500; }
        .brow-pct { font-size: 0.72rem; font-weight: 700; text-align: right; min-width: 30px; }

        /* ── Savings grid ─────────────────────── */
        .savings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 10px;
        }
        .sv-chip {
          background: var(--bg-input); border: 1px solid var(--border);
          border-radius: var(--radius-sm); padding: 13px 14px; transition: border-color 0.2s;
        }
        .sv-chip:hover { border-color: var(--border-light); }
        .sv-chip.sv-done { border-color: rgba(52,211,153,0.4); background: var(--success-dim); }
        .sv-chip.sv-urgent { border-color: rgba(251,191,36,0.4); }
        .sv-chip-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .sv-chip-name { font-size: 0.78rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.01em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .sv-chip-pct { font-size: 0.72rem; font-weight: 700; flex-shrink: 0; }
        .sv-chip-amounts { display: flex; align-items: baseline; gap: 3px; margin-bottom: 8px; }
        .sv-chip-cur { font-size: 0.9375rem; font-weight: 800; letter-spacing: -0.025em; color: var(--text-primary); }
        .sv-chip-tgt { font-size: 0.68rem; color: var(--text-muted); font-weight: 500; }
        .sv-chip-bar { height: 4px; background: var(--border); border-radius: 99px; overflow: hidden; }
        .sv-chip-fill { height: 100%; border-radius: 99px; transition: width 0.7s cubic-bezier(0.4,0,0.2,1); }
        .sv-chip-deadline { font-size: 0.65rem; color: var(--warning); font-weight: 600; margin-top: 5px; display: block; }

        /* ── Transactions ─────────────────────── */
        .tx-list { display: flex; flex-direction: column; margin-top: 4px; }
        .tx-row {
          display: flex; align-items: center; gap: 11px;
          padding: 10px 0; border-bottom: 1px solid var(--border);
        }
        .tx-row:last-child { border-bottom: none; }
        .tx-icon {
          width: 32px; height: 32px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; flex-shrink: 0;
        }
        .tx-meta { flex: 1; min-width: 0; }
        .tx-desc { display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .tx-date { font-size: 0.65rem; color: var(--text-muted); font-weight: 500; }
        .tx-amount { font-size: 0.8125rem; font-weight: 700; letter-spacing: -0.02em; white-space: nowrap; }
        .tx-amount.inc { color: var(--success); }
        .tx-amount.exp { color: var(--danger); }

        /* ── Mobile ───────────────────────────── */
        @media (max-width: 768px) {
          .dash-header { flex-wrap: wrap; row-gap: 8px; }
          .month-label-text { font-size: 0.875rem; min-width: 110px; }
          .hero-card { padding: 16px; }
          .hero-top { flex-direction: column; gap: 8px; margin-bottom: 12px; }
          .hero-right { display: none; }
          .hero-balance { font-size: 1.75rem; }
          .stats-strip { border-radius: var(--radius-sm); }
          .stat-col { padding: 12px 14px; }
          .stat-col-val { font-size: 0.875rem; }
          .brow {
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
            grid-template-areas: "left right" "bar bar";
          }
          .brow-left { grid-area: left; }
          .brow-bar-wrap { grid-area: bar; margin-top: 4px; }
          .brow-right { grid-area: right; align-self: start; }
          .brow-pct { display: none; }
          .brow-limit { display: none; }
          .savings-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 400px) {
          .stats-strip { grid-template-columns: 1fr; }
          .stat-col { border-right: none; border-bottom: 1px solid var(--border); flex-direction: row; justify-content: space-between; align-items: center; padding: 10px 14px; }
          .stat-col:last-child { border-bottom: none; }
          .hero-balance { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  )
}
