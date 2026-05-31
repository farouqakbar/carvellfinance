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

  useEffect(() => {
    fetchReport()
  }, [])

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
      <div className="flex-between mb-16">
        <div>
          <h1 className="page-title">Laporan</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>Rekap keuangan per bulan</p>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 80 }} />)}
        </div>
      ) : months.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <strong>Belum ada data</strong>
            <p>Mulai catat transaksi untuk melihat laporan bulanan</p>
          </div>
        </div>
      ) : (
        <>
          {/* Summary total */}
          <div className="grid-2 mb-24">
            <div className="card report-summary-card">
              <div className="text-xs text-muted mb-8" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Pemasukan ({months.length} bulan)
              </div>
              <div className="report-summary-value text-success">{formatCurrency(totalIncome)}</div>
            </div>
            <div className="card report-summary-card">
              <div className="text-xs text-muted mb-8" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Pengeluaran ({months.length} bulan)
              </div>
              <div className="report-summary-value text-danger">{formatCurrency(totalExpense)}</div>
            </div>
          </div>

          {/* Chart */}
          {chartData.length > 1 && (
            <div className="card mb-24">
              <h3 className="font-serif font-italic mb-16" style={{ fontSize: '1.1rem' }}>
                Tren 6 Bulan Terakhir
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="shortLabel"
                    tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                    tickFormatter={v => v >= 1e6 ? `${(v / 1e6).toFixed(1)}jt` : `${(v / 1e3).toFixed(0)}rb`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={v => formatCurrency(v)}
                    contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                  />
                  <Bar dataKey="income" name="Pemasukan" fill="var(--success)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" name="Pengeluaran" fill="var(--danger)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Month list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {months.map(m => (
              <div
                key={m.month}
                className="month-row"
                onClick={() => navigate(`/dashboard?month=${m.month}`)}
                title="Lihat detail di Dashboard"
              >
                <div className="month-header">
                  <span className="month-name">{m.label}</span>
                  {m.salary > 0 && (
                    <span className="text-xs text-muted">Gaji {formatCurrency(m.salary)}</span>
                  )}
                </div>

                <div className="month-stats">
                  <div className="month-stat">
                    <span className="text-xs text-muted">Pemasukan</span>
                    <span className="text-success font-medium text-sm">{formatCurrency(m.income)}</span>
                  </div>
                  <div className="month-stat">
                    <span className="text-xs text-muted">Pengeluaran</span>
                    <span className="text-danger font-medium text-sm">{formatCurrency(m.expense)}</span>
                  </div>
                  <div className="month-stat">
                    <span className="text-xs text-muted">Selisih</span>
                    <span className={`font-medium text-sm ${m.net >= 0 ? 'text-success' : 'text-danger'}`}>
                      {m.net >= 0 ? '+' : ''}{formatCurrency(m.net)}
                    </span>
                  </div>
                </div>

                <div className="month-net-bar">
                  <div
                    className="month-net-fill"
                    style={{
                      width: m.income > 0 ? `${Math.min((m.expense / m.income) * 100, 100)}%` : '0%',
                      background: m.net >= 0 ? 'var(--success)' : 'var(--danger)',
                    }}
                  />
                </div>

                <span className="text-xs text-accent month-arrow">→</span>
              </div>
            ))}
          </div>
        </>
      )}

      <style>{`
        .report-summary-card { padding: 20px 24px; }
        .report-summary-value {
          font-family: var(--font-serif);
          font-size: 1.6rem;
        }

        .month-row {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 18px 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          cursor: pointer;
          transition: border-color 0.2s, transform 0.15s;
          text-decoration: none;
        }
        .month-row:hover {
          border-color: var(--border-light);
          transform: translateX(2px);
        }

        .month-header {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 130px;
        }
        .month-name {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .month-stats {
          display: flex;
          gap: 28px;
          flex: 1;
          flex-wrap: wrap;
        }
        .month-stat { display: flex; flex-direction: column; gap: 2px; }

        .month-net-bar {
          width: 80px;
          height: 6px;
          background: var(--border);
          border-radius: 99px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .month-net-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.6s ease;
        }

        .month-arrow { flex-shrink: 0; }
      `}</style>
    </div>
  )
}
