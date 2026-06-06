import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { formatCurrency, getMonthLabel } from '../utils/formatCurrency'
import {
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { IconBarChart } from '../components/Icons'

const fmt = v =>
  v >= 1e9 ? `${(v / 1e9).toFixed(1)}M` :
  v >= 1e6 ? `${(v / 1e6).toFixed(1)}jt` :
  v >= 1e3 ? `${(v / 1e3).toFixed(0)}rb` : String(v)

function getHealth(m) {
  if (m.income === 0) return { label: 'Tidak ada data', color: 'var(--text-muted)', bg: 'var(--bg-input)' }
  const ratio = m.expense / m.income
  if (ratio < 0.8) return { label: 'Hemat', color: 'var(--success)', bg: 'var(--success-dim)' }
  if (ratio <= 1)  return { label: 'Aman',  color: 'var(--warning)', bg: 'var(--warning-dim)' }
  return               { label: 'Berlebih', color: 'var(--danger)',  bg: 'var(--danger-dim)' }
}

export default function Report() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [months, setMonths] = useState([])
  const [categories, setCategories] = useState([])
  const [trendData, setTrendData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(0)

  useEffect(() => { fetchReport() }, [])

  const fetchReport = async () => {
    setLoading(true)
    const [txRes, budgetRes] = await Promise.all([
      supabase.from('transactions')
        .select('amount, type, date, category_id, categories(name, color, icon)')
        .eq('user_id', user.id)
        .order('date'),
      supabase.from('category_budgets')
        .select('budget_limit, category_id, month, categories(is_mandatory)')
        .eq('user_id', user.id),
    ])

    // mandatory budget per month + which cat_ids are mandatory
    const catIdIsMandatory = {}
    const monthMandatoryBudget = {}
    ;(budgetRes.data || []).forEach(cb => {
      if (cb.categories?.is_mandatory) {
        catIdIsMandatory[cb.category_id] = true
        monthMandatoryBudget[cb.month] = (monthMandatoryBudget[cb.month] || 0) + Number(cb.budget_limit)
      }
    })

    const salaryMap = {}
    const monthMap = {}
    const monthCatMap = {}
    const monthMandatorySpend = {}
    const catTotals = {}

    ;(txRes.data || []).forEach(tx => {
      const m = tx.date.substring(0, 7)
      if (!monthMap[m]) monthMap[m] = { income: 0, expense: 0 }
      if (!monthCatMap[m]) monthCatMap[m] = {}

      if (tx.type === 'income') {
        if (tx.categories?.name === 'Pemasukan Bulanan') {
          salaryMap[m] = (salaryMap[m] || 0) + Number(tx.amount)
        } else {
          monthMap[m].income += Number(tx.amount)
        }
      } else {
        monthMap[m].expense += Number(tx.amount)
        if (catIdIsMandatory[tx.category_id]) {
          monthMandatorySpend[m] = (monthMandatorySpend[m] || 0) + Number(tx.amount)
        }
        const name = tx.categories?.name || 'Lainnya'
        const color = tx.categories?.color || '#6e6e98'
        monthCatMap[m][name] = (monthCatMap[m][name] || 0) + Number(tx.amount)
        if (!catTotals[name]) catTotals[name] = { total: 0, color }
        catTotals[name].total += Number(tx.amount)
      }
    })

    const sortedMonths = Object.keys(monthMap).sort().reverse().map(m => {
      const salary = salaryMap[m] || 0
      const txIncome = monthMap[m].income
      const rawExpense = monthMap[m].expense
      const mandatoryBudget = monthMandatoryBudget[m] || 0
      const mandatorySpent = monthMandatorySpend[m] || 0
      const mandatoryAutoDeduct = Math.max(0, mandatoryBudget - mandatorySpent)
      const effectiveExpense = rawExpense + mandatoryAutoDeduct
      const income = salary + txIncome
      return {
        month: m,
        label: getMonthLabel(m),
        shortLabel: new Intl.DateTimeFormat('id-ID', { month: 'short', year: '2-digit' }).format(new Date(m + '-01')),
        income,
        salary,
        txIncome,
        expense: effectiveExpense,
        rawExpense,
        net: income - effectiveExpense,
        catBreakdown: monthCatMap[m] || {},
      }
    })

    const cats = Object.entries(catTotals)
      .sort((a, b) => b[1].total - a[1].total)
      .map(([name, info]) => ({ name, ...info }))

    const trendRows = [...sortedMonths].reverse().map(m => ({
      label: m.shortLabel,
      Pemasukan: m.income,
      Pengeluaran: m.expense,
    }))

    setMonths(sortedMonths)
    setCategories(cats)
    setTrendData(trendRows)
    setLoading(false)
  }


  return (
    <div className="animate-in rpt-page">

      {/* Page header */}
      <div className="rpt-page-header">
        <div className="rpt-page-icon"><IconBarChart size={16} /></div>
        <div>
          <h1 className="rpt-page-title">Laporan</h1>
          <p className="rpt-page-sub">Ringkasan dan tren keuangan kamu</p>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 80, borderRadius: 'var(--radius-lg)', opacity: 1 - i * 0.2 }} />
          ))}
        </div>
      ) : months.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><IconBarChart size={22} /></div>
          <strong>Belum ada data</strong>
          <p>Mulai catat transaksi untuk melihat laporan keuangan kamu</p>
        </div>
      ) : (
        <>
          {/* ── Tren ─────────────────────────────── */}
          {trendData.length > 1 && (
            <div className="rpt-section">
              <div className="rpt-section-head">
                <span className="rpt-section-label">Tren Keuangan</span>
                <span className="rpt-section-sub">masuk vs keluar per bulan</span>
              </div>
              <div className="card rpt-chart-card">
                <div className="rpt-chart-wrap">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gInc" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#34d399" stopOpacity={0.18} />
                          <stop offset="95%" stopColor="#34d399" stopOpacity={0}    />
                        </linearGradient>
                        <linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#f87171" stopOpacity={0.18} />
                          <stop offset="95%" stopColor="#f87171" stopOpacity={0}    />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="label"
                        tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}
                        axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={fmt}
                        tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}
                        axisLine={false} tickLine={false} width={38} />
                      <Tooltip
                        formatter={(v, name) => [formatCurrency(v), name]}
                        contentStyle={{
                          background: 'var(--bg-card)', border: '1px solid var(--border)',
                          borderRadius: 8, fontSize: 12, fontFamily: 'var(--font-sans)',
                        }} />
                      <Area type="monotone" dataKey="Pemasukan"   stroke="#34d399" strokeWidth={1.5} fill="url(#gInc)" dot={{ r: 2.5, fill: '#34d399' }} />
                      <Area type="monotone" dataKey="Pengeluaran" stroke="#f87171" strokeWidth={1.5} fill="url(#gExp)" dot={{ r: 2.5, fill: '#f87171' }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="rpt-legend">
                  <div className="rpt-legend-item">
                    <span className="rpt-legend-dot" style={{ background: '#34d399' }} />
                    <span className="rpt-legend-name">Pemasukan</span>
                  </div>
                  <div className="rpt-legend-item">
                    <span className="rpt-legend-dot" style={{ background: '#f87171' }} />
                    <span className="rpt-legend-name">Pengeluaran</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Detail Bulan ──────────────────────── */}
          {(() => {
            const m = months[selectedMonthIdx]
            if (!m) return null
            const health   = getHealth(m)
            const expRatio = m.income > 0 ? Math.min((m.expense / m.income) * 100, 100) : 0
            const expPct   = m.income > 0 ? Math.round((m.expense / m.income) * 100) : 0
            const catList  = Object.entries(m.catBreakdown).sort((a, b) => b[1] - a[1])
            return (
              <div className="rpt-section">
                <div className="rpt-section-head">
                  <span className="rpt-section-label">Detail per Bulan</span>
                  <span className="rpt-section-sub">{months.length} bulan tercatat</span>
                </div>
                <div className="card rpt-pick-card">
                  {/* Month nav */}
                  <div className="rpt-pick-nav">
                    <button className="rpt-pick-btn"
                      onClick={() => setSelectedMonthIdx(i => i + 1)}
                      disabled={selectedMonthIdx >= months.length - 1}>‹</button>
                    <div className="rpt-pick-center">
                      <span className="rpt-pick-name">{m.label}</span>
                      <span className="rpt-health-badge" style={{ color: health.color, background: health.bg }}>
                        {health.label}
                      </span>
                    </div>
                    <button className="rpt-pick-btn"
                      onClick={() => setSelectedMonthIdx(i => i - 1)}
                      disabled={selectedMonthIdx <= 0}>›</button>
                  </div>
                  {m.salary > 0 && (
                    <p className="rpt-pick-salary">Gaji {formatCurrency(m.salary)}</p>
                  )}

                  {/* Stats */}
                  <div className="rpt-month-stats">
                    <div className="rpt-stat">
                      <span className="rpt-stat-label">Pengeluaran</span>
                      <span className="rpt-stat-val text-danger tabular">{formatCurrency(m.expense)}</span>
                      {m.income > 0 && <span className="rpt-stat-sub">{expPct}% dari gaji</span>}
                    </div>
                    <div className="rpt-stat">
                      <span className="rpt-stat-label">Pemasukan</span>
                      <span className="rpt-stat-val text-success tabular">{formatCurrency(m.income)}</span>
                    </div>
                    <div className="rpt-stat">
                      <span className="rpt-stat-label">Sisa / Tersimpan</span>
                      <span className={`rpt-stat-val tabular ${m.net >= 0 ? 'text-success' : 'text-danger'}`}>
                        {m.net >= 0 ? '+' : ''}{formatCurrency(m.net)}
                      </span>
                      {m.income > 0 && m.net > 0 && (
                        <span className="rpt-stat-sub" style={{ color: 'var(--success)' }}>
                          {Math.round(m.net / m.income * 100)}% disimpan
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expense bar */}
                  <div className="rpt-exp-bar-row">
                    <div className="rpt-exp-bar">
                      <div className="rpt-exp-fill" style={{ width: `${expRatio}%`, background: health.color }} />
                    </div>
                    <span className="rpt-exp-label">{expPct}%</span>
                  </div>

                  {/* Category breakdown */}
                  {catList.length > 0 && (
                    <div className="rpt-month-detail">
                      {catList.map(([name, amount]) => {
                        const c = categories.find(c => c.name === name)
                        const color = c?.color || '#6366f1'
                        const pct = m.rawExpense > 0 ? (amount / m.rawExpense) * 100 : 0
                        return (
                          <div key={name} className="rpt-detail-row">
                            <span className="rpt-detail-dot" style={{ background: color }} />
                            <span className="rpt-detail-name">{name}</span>
                            <div className="rpt-detail-bar">
                              <div className="rpt-detail-fill" style={{ width: `${pct}%`, background: color }} />
                            </div>
                            <span className="rpt-detail-pct tabular">{pct.toFixed(0)}%</span>
                            <span className="rpt-detail-amount tabular">{formatCurrency(amount)}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* CTA */}
                  <button className="rpt-cta" onClick={() => navigate(`/transactions?month=${m.month}`)}>
                    Lihat transaksi bulan ini →
                  </button>
                </div>
              </div>
            )
          })()}
        </>
      )}

      <style>{`
        .rpt-page { padding-bottom: 56px; }

        /* ── Page Header ─────────────────────── */
        .rpt-page-header {
          display: flex; align-items: center; gap: 12px; margin-bottom: 28px;
        }
        .rpt-page-icon {
          width: 36px; height: 36px; border-radius: 9px;
          background: rgba(96,165,250,0.08); border: 1px solid rgba(96,165,250,0.2);
          color: var(--info);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .rpt-page-title {
          font-size: 1.1rem; font-weight: 800; letter-spacing: -0.025em;
          color: var(--text-primary); margin: 0; line-height: 1.2;
        }
        .rpt-page-sub { font-size: 0.72rem; color: var(--text-muted); margin: 2px 0 0; }

        /* ── Section ─────────────────────────── */
        .rpt-section { margin-bottom: 32px; }
        .rpt-section-head {
          display: flex; flex-direction: column; gap: 2px;
          padding-bottom: 10px; border-bottom: 1px solid var(--border); margin-bottom: 12px;
        }
        .rpt-section-label {
          font-size: 0.62rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: var(--text-secondary);
        }
        .rpt-section-sub { font-size: 0.7rem; color: var(--text-muted); font-weight: 500; }

        /* ── Chart ────────────────────────────── */
        .rpt-chart-card { padding: 16px 18px; }
        .rpt-chart-wrap { height: 220px; }
        .rpt-legend {
          display: flex; gap: 16px; margin-top: 12px;
          padding-top: 10px; border-top: 1px solid var(--border);
        }
        .rpt-legend-item { display: flex; align-items: center; gap: 6px; }
        .rpt-legend-dot { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }
        .rpt-legend-name { font-size: 0.68rem; color: var(--text-secondary); font-weight: 600; }

        /* ── Month Picker ─────────────────────── */
        .rpt-pick-card { display: flex; flex-direction: column; gap: 14px; }
        .rpt-pick-nav { display: flex; align-items: center; gap: 10px; }
        .rpt-pick-btn {
          width: 28px; height: 28px; border-radius: 6px;
          border: 1px solid var(--border); background: none;
          color: var(--text-muted); font-size: 1rem; font-weight: 700;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.15s; flex-shrink: 0; font-family: var(--font-sans);
        }
        .rpt-pick-btn:hover:not(:disabled) {
          border-color: var(--accent); color: var(--accent); background: var(--accent-dim);
        }
        .rpt-pick-btn:disabled { opacity: 0.2; cursor: default; }
        .rpt-pick-center {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .rpt-pick-name {
          font-size: 1rem; font-weight: 800; letter-spacing: -0.025em; color: var(--text-primary);
        }
        .rpt-health-badge {
          font-size: 0.58rem; font-weight: 700; padding: 2px 8px;
          border-radius: 99px; flex-shrink: 0; letter-spacing: 0.05em; text-transform: uppercase;
        }
        .rpt-pick-salary {
          font-size: 0.68rem; color: var(--text-muted); font-weight: 500;
          margin: -6px 0 0; text-align: center;
        }

        /* Stats */
        .rpt-month-stats {
          display: grid; grid-template-columns: repeat(3, 1fr);
          padding: 12px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .rpt-stat { display: flex; flex-direction: column; gap: 3px; padding: 0 10px; }
        .rpt-stat:first-child { padding-left: 0; border-right: 1px solid var(--border); }
        .rpt-stat:last-child  { padding-right: 0; padding-left: 12px; }
        .rpt-stat:nth-child(2) { padding: 0 12px; border-right: 1px solid var(--border); }
        .rpt-stat-label {
          font-size: 0.58rem; text-transform: uppercase;
          letter-spacing: 0.1em; color: var(--text-muted); font-weight: 700;
        }
        .rpt-stat-val { font-size: 0.9rem; font-weight: 800; letter-spacing: -0.025em; }
        .rpt-stat-sub { font-size: 0.6rem; font-weight: 600; color: var(--text-muted); }

        /* Expense bar */
        .rpt-exp-bar-row { display: flex; align-items: center; gap: 8px; }
        .rpt-exp-bar {
          flex: 1; height: 3px; background: rgba(255,255,255,0.07);
          border-radius: 99px; overflow: hidden;
        }
        .rpt-exp-fill { height: 100%; border-radius: 99px; transition: width 0.5s ease; }
        .rpt-exp-label { font-size: 0.6rem; color: var(--text-muted); font-weight: 600; flex-shrink: 0; }

        /* CTA */
        .rpt-cta {
          font-size: 0.68rem; color: var(--accent); font-weight: 700;
          align-self: flex-end; background: none; border: none;
          cursor: pointer; font-family: var(--font-sans); padding: 0;
        }
        .rpt-cta:hover { opacity: 0.75; }

        /* Category detail rows */
        .rpt-month-detail {
          border-top: 1px solid var(--border); padding-top: 8px;
          display: flex; flex-direction: column;
        }
        .rpt-detail-row {
          display: grid;
          grid-template-columns: 7px 1fr 80px 28px 90px;
          align-items: center; gap: 8px;
          min-height: 36px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .rpt-detail-row:last-child { border-bottom: none; }
        .rpt-detail-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .rpt-detail-name {
          font-size: 0.8rem; font-weight: 600; color: var(--text-primary);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .rpt-detail-bar {
          height: 3px; background: rgba(255,255,255,0.07); border-radius: 99px; overflow: hidden;
        }
        .rpt-detail-fill { height: 100%; border-radius: 99px; }
        .rpt-detail-pct { font-size: 0.6rem; color: var(--text-muted); font-weight: 600; text-align: right; }
        .rpt-detail-amount {
          font-size: 0.8rem; font-weight: 700; letter-spacing: -0.02em;
          color: var(--text-primary); text-align: right;
        }

        /* ── Mobile ───────────────────────────── */
        @media (max-width: 640px) {
          .rpt-chart-wrap { height: 180px; }
          .rpt-detail-row { grid-template-columns: 7px 1fr 56px; }
          .rpt-detail-bar, .rpt-detail-pct { display: none; }
          .rpt-detail-amount { font-size: 0.72rem; }
          .rpt-stat-val { font-size: 0.8rem; }
        }
        @media (max-width: 400px) {
          .rpt-stat { padding: 0 6px !important; border: none !important; }
          .rpt-stat:first-child { padding-left: 0 !important; }
        }
      `}</style>
    </div>
  )
}
