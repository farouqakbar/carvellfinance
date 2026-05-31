import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { formatCurrency, getMonthLabel } from '../utils/formatCurrency'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Report() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [months, setMonths] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchReport() }, [])

  const fetchReport = async () => {
    setLoading(true)
    const [txRes, salaryRes] = await Promise.all([
      supabase.from('transactions').select('amount, type, date').eq('user_id', user.id).order('date'),
      supabase.from('salaries').select('amount, month').eq('user_id', user.id),
    ])
    const salaryMap = {}
    ;(salaryRes.data || []).forEach(s => { salaryMap[s.month] = Number(s.amount) })
    const monthMap = {}
    ;(txRes.data || []).forEach(tx => {
      const m = tx.date.substring(0, 7)
      if (!monthMap[m]) monthMap[m] = { income: 0, expense: 0 }
      if (tx.type === 'income') monthMap[m].income += Number(tx.amount)
      else monthMap[m].expense += Number(tx.amount)
    })
    Object.keys(salaryMap).forEach(m => {
      if (!monthMap[m]) monthMap[m] = { income: 0, expense: 0 }
    })
    const result = Object.keys(monthMap).sort().reverse().map(m => ({
      month: m,
      label: getMonthLabel(m),
      shortLabel: new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(new Date(m + '-01')),
      income: monthMap[m].income,
      expense: monthMap[m].expense,
      salary: salaryMap[m] || 0,
      net: monthMap[m].income - monthMap[m].expense,
    }))
    setMonths(result)
    setLoading(false)
  }

  const chartData = [...months].reverse().slice(-6)
  const totalIncome = months.reduce((s, m) => s + m.income, 0)
  const totalExpense = months.reduce((s, m) => s + m.expense, 0)

  return (
    <div className="animate-in">
      <div className="mb-20">
        <h1 className="page-title">Laporan</h1>
        <p className="page-subtitle" style={{ margin: 0 }}>Rekap keuangan per bulan</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 76 }} />)}
        </div>
      ) : months.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">▤</div>
            <strong>Belum ada data</strong>
            <p>Mulai catat transaksi untuk melihat laporan bulanan</p>
          </div>
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="rpt-summary mb-20">
            <div className="card rpt-sum-card">
              <span className="rpt-sum-label">Total Pemasukan ({months.length} bln)</span>
              <span className="rpt-sum-val text-success tabular">{formatCurrency(totalIncome)}</span>
            </div>
            <div className="card rpt-sum-card">
              <span className="rpt-sum-label">Total Pengeluaran ({months.length} bln)</span>
              <span className="rpt-sum-val text-danger tabular">{formatCurrency(totalExpense)}</span>
            </div>
            <div className="card rpt-sum-card">
              <span className="rpt-sum-label">Selisih bersih</span>
              <span className={`rpt-sum-val tabular ${totalIncome - totalExpense >= 0 ? 'text-success' : 'text-danger'}`}>
                {totalIncome - totalExpense >= 0 ? '+' : ''}{formatCurrency(totalIncome - totalExpense)}
              </span>
            </div>
          </div>

          {/* Bar chart */}
          {chartData.length > 1 && (
            <div className="card mb-20">
              <h3 className="rpt-chart-title">Tren 6 Bulan Terakhir</h3>
              <div className="rpt-chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barCategoryGap="30%" margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis
                      dataKey="shortLabel"
                      tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}
                      axisLine={false} tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}
                      tickFormatter={v => v >= 1e6 ? `${(v/1e6).toFixed(0)}jt` : v >= 1e3 ? `${(v/1e3).toFixed(0)}rb` : v}
                      axisLine={false} tickLine={false} width={38}
                    />
                    <Tooltip
                      formatter={v => [formatCurrency(v)]}
                      contentStyle={{
                        background: 'var(--bg-card)', border: '1px solid var(--border)',
                        borderRadius: 8, fontSize: 12, fontFamily: 'var(--font-sans)',
                      }}
                      cursor={{ fill: 'var(--bg-input)' }}
                    />
                    <Bar dataKey="income" name="Pemasukan" fill="var(--success)" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="expense" name="Pengeluaran" fill="var(--danger)" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Month list */}
          <div className="rpt-month-list">
            {months.map(m => {
              const usedPct = m.salary > 0 ? Math.min((m.expense / m.salary) * 100, 100) : m.income > 0 ? Math.min((m.expense / m.income) * 100, 100) : 0
              return (
                <div key={m.month} className="rpt-month-row" onClick={() => navigate(`/dashboard?month=${m.month}`)}>
                  <div className="rpt-month-left">
                    <span className="rpt-month-name">{m.label}</span>
                    {m.salary > 0 && (
                      <span className="rpt-month-salary tabular">Gaji {formatCurrency(m.salary)}</span>
                    )}
                  </div>

                  <div className="rpt-month-stats">
                    <div className="rpt-stat">
                      <span className="rpt-stat-label">Keluar</span>
                      <span className="rpt-stat-val text-danger tabular">{formatCurrency(m.expense)}</span>
                    </div>
                    <div className="rpt-stat">
                      <span className="rpt-stat-label">Masuk</span>
                      <span className="rpt-stat-val text-success tabular">{formatCurrency(m.income)}</span>
                    </div>
                    <div className="rpt-stat rpt-stat-net">
                      <span className="rpt-stat-label">Selisih</span>
                      <span className={`rpt-stat-val tabular ${m.net >= 0 ? 'text-success' : 'text-danger'}`}>
                        {m.net >= 0 ? '+' : ''}{formatCurrency(m.net)}
                      </span>
                    </div>
                  </div>

                  <div className="rpt-month-bar">
                    <div className="rpt-month-bar-fill" style={{
                      width: `${usedPct}%`,
                      background: m.net >= 0 ? 'var(--success)' : 'var(--danger)',
                    }} />
                  </div>

                  <span className="rpt-arrow">→</span>
                </div>
              )
            })}
          </div>
        </>
      )}

      <style>{`
        /* Summary cards */
        .rpt-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .rpt-sum-card {
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .rpt-sum-label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          font-weight: 600;
        }
        .rpt-sum-val {
          font-size: 1.2rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        /* Chart */
        .rpt-chart-title {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          margin-bottom: 16px;
        }
        .rpt-chart-wrap {
          height: 200px;
        }

        /* Month list */
        .rpt-month-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .rpt-month-row {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 15px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.15s;
          user-select: none;
        }
        .rpt-month-row:hover {
          border-color: var(--border-light);
          background: var(--bg-card-hover);
        }
        .rpt-month-row:active { transform: scale(0.995); }

        .rpt-month-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 110px;
          flex-shrink: 0;
        }
        .rpt-month-name {
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }
        .rpt-month-salary {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .rpt-month-stats {
          display: flex;
          gap: 18px;
          flex: 1;
        }
        .rpt-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 72px;
        }
        .rpt-stat-net { min-width: 80px; }
        .rpt-stat-label {
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          font-weight: 600;
        }
        .rpt-stat-val {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .rpt-month-bar {
          width: 72px;
          height: 5px;
          background: var(--border);
          border-radius: 99px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .rpt-month-bar-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.6s ease;
        }
        .rpt-arrow {
          font-size: 0.8rem;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .rpt-summary { grid-template-columns: 1fr 1fr; }
          .rpt-sum-card { padding: 13px 14px; }
          .rpt-sum-val { font-size: 1rem; }
          .rpt-month-row { padding: 13px 14px; gap: 10px; flex-wrap: wrap; }
          .rpt-month-left { min-width: 0; flex: 1; }
          .rpt-month-stats { width: 100%; gap: 8px; }
          .rpt-stat { min-width: 60px; flex: 1; }
          .rpt-stat-net { min-width: 60px; }
          .rpt-month-bar { display: none; }
          .rpt-arrow { display: none; }
          .rpt-chart-wrap { height: 160px; }
        }
        @media (max-width: 480px) {
          .rpt-summary { grid-template-columns: 1fr; }
          .rpt-sum-val { font-size: 1.1rem; }
        }
      `}</style>
    </div>
  )
}
