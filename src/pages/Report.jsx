import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { formatCurrency, getMonthLabel } from '../utils/formatCurrency'
import {
  BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { IconBarChart, IconTrendingUp, IconArrowUp, IconArrowDown, IconActivity } from '../components/Icons'

const fmt = v =>
  v >= 1e9 ? `${(v / 1e9).toFixed(1)}M` :
  v >= 1e6 ? `${(v / 1e6).toFixed(0)}jt` :
  v >= 1e3 ? `${(v / 1e3).toFixed(0)}rb` : String(v)

export default function Report() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [months, setMonths] = useState([])
  const [categories, setCategories] = useState([])   // [{ name, color, icon, total }]
  const [chartData, setChartData] = useState([])     // stacked bar data
  const [trendData, setTrendData] = useState([])     // area chart data
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('kategori')         // 'kategori' | 'tren'

  useEffect(() => { fetchReport() }, [])

  const fetchReport = async () => {
    setLoading(true)
    const txRes = await supabase.from('transactions')
      .select('amount, type, date, category_id, categories(name, color, icon)')
      .eq('user_id', user.id)
      .order('date')

    const salaryMap = {}
    const monthMap = {}
    const monthCatMap = {}
    const catTotals = {}

    ;(txRes.data || []).forEach(tx => {
      const m = tx.date.substring(0, 7)
      if (!monthMap[m]) monthMap[m] = { income: 0, expense: 0 }
      if (!monthCatMap[m]) monthCatMap[m] = {}

      if (tx.type === 'income') {
        if (tx.categories?.name === 'Pemasukan Bulanan') {
          // Pemasukan Bulanan masuk ke salaryMap per bulan
          salaryMap[m] = (salaryMap[m] || 0) + Number(tx.amount)
        } else {
          monthMap[m].income += Number(tx.amount)
        }
      } else {
        monthMap[m].expense += Number(tx.amount)
        const name = tx.categories?.name || 'Lainnya'
        const color = tx.categories?.color || '#6e6e98'
        const icon = tx.categories?.icon || '💰'
        monthCatMap[m][name] = (monthCatMap[m][name] || 0) + Number(tx.amount)
        if (!catTotals[name]) catTotals[name] = { total: 0, color, icon }
        catTotals[name].total += Number(tx.amount)
      }
    })

    const sortedMonths = Object.keys(monthMap).sort().reverse().map(m => {
      const salary = salaryMap[m] || 0
      const txIncome = monthMap[m].income
      const expense = monthMap[m].expense
      return {
        month: m,
        label: getMonthLabel(m),
        shortLabel: new Intl.DateTimeFormat('id-ID', { month: 'short', year: '2-digit' }).format(new Date(m + '-01')),
        income: salary + txIncome,   // gaji + income transaksi
        salary,
        txIncome,
        expense,
        net: salary + txIncome - expense,
        catBreakdown: monthCatMap[m] || {},
      }
    })

    const cats = Object.entries(catTotals)
      .sort((a, b) => b[1].total - a[1].total)
      .map(([name, info]) => ({ name, ...info }))

    // Chart: last 6 months ascending
    const chart6 = [...sortedMonths].reverse().slice(-6)
    const chartRows = chart6.map(m => {
      const row = { label: m.shortLabel }
      cats.forEach(c => { row[c.name] = m.catBreakdown[c.name] || 0 })
      return row
    })

    // Trend: all months ascending (income sudah include salary)
    const trendRows = [...sortedMonths].reverse().map(m => ({
      label: m.shortLabel,
      Pemasukan: m.income,
      Pengeluaran: m.expense,
    }))

    // Chart: last 6 months ascending — income per bulan (gaji+tx)
    // Tambahkan kolom income ke chartData untuk referensi tooltip
    chartRows.forEach((row, i) => {
      row._income = chart6[i]?.income || 0
    })

    setMonths(sortedMonths)
    setCategories(cats)
    setChartData(chartRows)
    setTrendData(trendRows)
    setLoading(false)
  }

  const totalIncome = months.reduce((s, m) => s + m.income, 0)
  const totalExpense = months.reduce((s, m) => s + m.expense, 0)
  const net = totalIncome - totalExpense
  const avgExpense = months.length ? Math.round(totalExpense / months.length) : 0

  // top category for overview
  const topCat = categories[0]

  return (
    <div className="animate-in">
      <div className="page-header-banner" style={{ marginBottom: 20 }}>
        <div className="page-header-icon" style={{ background: 'rgba(96,165,250,0.1)', color: 'var(--info)' }}><IconBarChart size={18} /></div>
        <div>
          <h1 className="page-header-title">Laporan</h1>
          <p className="page-header-sub">Statistik keuangan lengkap</p>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 72, borderRadius: 10 }} />)}
        </div>
      ) : months.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon"><IconBarChart size={22} /></div>
            <strong>Belum ada data</strong>
            <p>Mulai catat transaksi untuk melihat statistik keuangan</p>
          </div>
        </div>
      ) : (
        <>
          {/* ── Summary ──────────────────────────── */}
          <div className="rpt-summary">
            <div className="rpt-sum-card rpt-sum-income">
              <div className="rpt-sum-icon"><IconArrowUp size={14} /></div>
              <span className="rpt-sum-label">Total Pemasukan</span>
              <span className="rpt-sum-val text-success tabular">{formatCurrency(totalIncome)}</span>
              <span className="rpt-sum-sub">{months.length} bulan tercatat</span>
            </div>
            <div className="rpt-sum-card rpt-sum-expense">
              <div className="rpt-sum-icon"><IconArrowDown size={14} /></div>
              <span className="rpt-sum-label">Total Pengeluaran</span>
              <span className="rpt-sum-val text-danger tabular">{formatCurrency(totalExpense)}</span>
              <span className="rpt-sum-sub">rata-rata {formatCurrency(avgExpense)}/bln</span>
            </div>
            <div className="rpt-sum-card rpt-sum-net">
              <div className="rpt-sum-icon"><IconActivity size={14} /></div>
              <span className="rpt-sum-label">Selisih Bersih</span>
              <span className={`rpt-sum-val tabular ${net >= 0 ? 'text-success' : 'text-danger'}`}>
                {net >= 0 ? '+' : ''}{formatCurrency(net)}
              </span>
              {topCat && <span className="rpt-sum-sub">terbesar: {topCat.name}</span>}
            </div>
          </div>

          {/* ── Chart ───────────────────────────── */}
          <div className="card rpt-chart-card">
            <div className="rpt-chart-head">
              <div>
                <h3 className="rpt-chart-title">
                  {tab === 'kategori' ? 'Pengeluaran per Bulan per Kategori' : 'Tren Pemasukan vs Pengeluaran'}
                </h3>
                <p className="rpt-chart-sub">6 bulan terakhir</p>
              </div>
              <div className="rpt-tabs">
                <button className={`rpt-tab ${tab === 'kategori' ? 'active' : ''}`} onClick={() => setTab('kategori')}>
                  Kategori
                </button>
                <button className={`rpt-tab ${tab === 'tren' ? 'active' : ''}`} onClick={() => setTab('tren')}>
                  Tren
                </button>
              </div>
            </div>

            <div className="rpt-chart-wrap">
              {tab === 'kategori' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barCategoryGap="28%" margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="label"
                      tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}
                      axisLine={false} tickLine={false}
                    />
                    <YAxis
                      tickFormatter={fmt}
                      tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}
                      axisLine={false} tickLine={false} width={40}
                    />
                    <Tooltip
                      formatter={(v, name) => [formatCurrency(v), name]}
                      contentStyle={{
                        background: 'var(--bg-card)', border: '1px solid var(--border)',
                        borderRadius: 8, fontSize: 12, fontFamily: 'var(--font-sans)',
                      }}
                      cursor={{ fill: 'var(--bg-input)' }}
                    />
                    {categories.slice(0, 8).map((cat, i) => (
                      <Bar
                        key={cat.name}
                        dataKey={cat.name}
                        stackId="a"
                        fill={cat.color}
                        radius={i === Math.min(categories.length, 8) - 1 ? [3, 3, 0, 0] : [0, 0, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gInc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f87171" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="label"
                      tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}
                      axisLine={false} tickLine={false}
                    />
                    <YAxis
                      tickFormatter={fmt}
                      tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}
                      axisLine={false} tickLine={false} width={40}
                    />
                    <Tooltip
                      formatter={(v, name) => [formatCurrency(v), name]}
                      contentStyle={{
                        background: 'var(--bg-card)', border: '1px solid var(--border)',
                        borderRadius: 8, fontSize: 12, fontFamily: 'var(--font-sans)',
                      }}
                    />
                    <Area type="monotone" dataKey="Pemasukan" stroke="#34d399" strokeWidth={2} fill="url(#gInc)" dot={{ r: 3, fill: '#34d399' }} />
                    <Area type="monotone" dataKey="Pengeluaran" stroke="#f87171" strokeWidth={2} fill="url(#gExp)" dot={{ r: 3, fill: '#f87171' }} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Legend kategori */}
            {tab === 'kategori' && categories.length > 0 && (
              <div className="rpt-legend">
                {categories.slice(0, 8).map(cat => (
                  <div key={cat.name} className="rpt-legend-item">
                    <span className="rpt-legend-dot" style={{ background: cat.color }} />
                    <span className="rpt-legend-name">{cat.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Kategori Breakdown ───────────────── */}
          {categories.length > 0 && (
            <div className="card rpt-cat-card">
              <h3 className="rpt-chart-title">Pengeluaran per Kategori</h3>
              <div className="rpt-cat-list">
                {categories.slice(0, 10).map((cat, i) => {
                  const pct = totalExpense > 0 ? (cat.total / totalExpense) * 100 : 0
                  return (
                    <div key={cat.name} className="rpt-cat-row">
                      <div className="rpt-cat-left">
                        <span className="rpt-cat-rank">{i + 1}</span>
                        <span className="rpt-cat-icon" style={{ background: `${cat.color}18` }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color, display: 'block' }} />
                        </span>
                        <span className="rpt-cat-name">{cat.name}</span>
                      </div>
                      <div className="rpt-cat-mid">
                        <div className="rpt-cat-bar">
                          <div className="rpt-cat-fill" style={{ width: `${pct}%`, background: cat.color }} />
                        </div>
                        <span className="rpt-cat-pct">{pct.toFixed(1)}%</span>
                      </div>
                      <span className="rpt-cat-amount tabular">{formatCurrency(cat.total)}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── Monthly list ─────────────────────── */}
          <div className="rpt-month-list">
            {months.map(m => {
              const usedPct = m.salary > 0
                ? Math.min((m.expense / m.salary) * 100, 100)
                : m.income > 0 ? Math.min((m.expense / m.income) * 100, 100) : 0
              const topCats = Object.entries(m.catBreakdown)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
              return (
                <div key={m.month} className="rpt-month-row" onClick={() => navigate(`/dashboard?month=${m.month}`)}>
                  <div className="rpt-month-left">
                    <span className="rpt-month-name">{m.label}</span>
                    {m.salary > 0 && (
                      <span className="rpt-month-salary tabular">Pemasukan {formatCurrency(m.salary)}</span>
                    )}
                    {topCats.length > 0 && (
                      <div className="rpt-month-cats">
                        {topCats.map(([name, amt]) => {
                          const c = categories.find(c => c.name === name)
                          return (
                            <span key={name} className="rpt-month-cat-chip" style={{ background: `${c?.color || '#6366f1'}18`, color: c?.color || '#6366f1' }}>
                              {name}: {formatCurrency(amt)}
                            </span>
                          )
                        })}
                      </div>
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
                      {m.salary > 0 && m.txIncome === 0 && (
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>dari gaji</span>
                      )}
                    </div>
                    <div className="rpt-stat">
                      <span className="rpt-stat-label">Selisih</span>
                      <span className={`rpt-stat-val tabular ${m.net >= 0 ? 'text-success' : 'text-danger'}`}>
                        {m.net >= 0 ? '+' : ''}{formatCurrency(m.net)}
                      </span>
                    </div>
                  </div>

                  <div className="rpt-month-right">
                    <div className="rpt-month-bar">
                      <div className="rpt-month-fill" style={{
                        width: `${usedPct}%`,
                        background: m.net >= 0 ? 'var(--success)' : 'var(--danger)',
                      }} />
                    </div>
                    <span className="rpt-arrow" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>›</span>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      <style>{`
        /* Summary */
        .rpt-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        .rpt-sum-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          position: relative;
          overflow: hidden;
        }
        .rpt-sum-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          border-radius: 0 2px 2px 0;
        }
        .rpt-sum-income::before { background: var(--success); }
        .rpt-sum-expense::before { background: var(--danger); }
        .rpt-sum-net::before { background: var(--accent); }
        .rpt-sum-icon {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
          flex-shrink: 0;
        }
        .rpt-sum-income .rpt-sum-icon { background: var(--success-dim); color: var(--success); }
        .rpt-sum-expense .rpt-sum-icon { background: var(--danger-dim); color: var(--danger); }
        .rpt-sum-net .rpt-sum-icon { background: var(--accent-dim); color: var(--accent); }
        .rpt-sum-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          font-weight: 700;
        }
        .rpt-sum-val {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.1;
          margin: 2px 0;
        }
        .rpt-sum-sub {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* Chart card */
        .rpt-chart-card {
          margin-bottom: 16px;
        }
        .rpt-chart-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .rpt-chart-title {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          margin: 0;
        }
        .rpt-chart-sub {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 500;
          margin-top: 2px;
        }
        .rpt-tabs {
          display: flex;
          gap: 4px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 3px;
          flex-shrink: 0;
        }
        .rpt-tab {
          padding: 4px 12px;
          border: none;
          border-radius: 4px;
          background: transparent;
          color: var(--text-muted);
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
        }
        .rpt-tab.active {
          background: var(--bg-card);
          color: var(--text-primary);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .rpt-chart-wrap {
          height: 240px;
        }
        .rpt-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 16px;
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }
        .rpt-legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .rpt-legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .rpt-legend-name {
          font-size: 0.72rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        /* Category breakdown */
        .rpt-cat-card {
          margin-bottom: 16px;
        }
        .rpt-cat-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-top: 12px;
        }
        .rpt-cat-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 9px 0;
          border-bottom: 1px solid var(--border);
        }
        .rpt-cat-row:last-child { border-bottom: none; }
        .rpt-cat-left {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 160px;
          flex-shrink: 0;
        }
        .rpt-cat-rank {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          width: 14px;
          text-align: right;
          flex-shrink: 0;
        }
        .rpt-cat-icon {
          width: 26px;
          height: 26px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          flex-shrink: 0;
        }
        .rpt-cat-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .rpt-cat-mid {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .rpt-cat-bar {
          flex: 1;
          height: 6px;
          background: var(--border);
          border-radius: 99px;
          overflow: hidden;
        }
        .rpt-cat-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.6s ease;
        }
        .rpt-cat-pct {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 600;
          width: 36px;
          text-align: right;
          flex-shrink: 0;
        }
        .rpt-cat-amount {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          width: 100px;
          text-align: right;
          flex-shrink: 0;
        }

        /* Monthly list */
        .rpt-month-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .rpt-month-row {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 14px 18px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
        }
        .rpt-month-row:hover { border-color: var(--border-light); background: var(--bg-card-hover); }
        .rpt-month-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 140px;
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
        .rpt-month-cats {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 2px;
        }
        .rpt-month-cat-chip {
          font-size: 0.62rem;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 99px;
          white-space: nowrap;
        }
        .rpt-month-stats {
          display: flex;
          gap: 16px;
          flex: 1;
          align-items: flex-start;
        }
        .rpt-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 72px;
        }
        .rpt-stat-label {
          font-size: 0.6rem;
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
        .rpt-month-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          flex-shrink: 0;
        }
        .rpt-month-bar {
          width: 72px;
          height: 4px;
          background: var(--border);
          border-radius: 99px;
          overflow: hidden;
        }
        .rpt-month-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.6s ease;
        }
        .rpt-arrow {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* Mobile */
        @media (max-width: 768px) {
          .rpt-summary { grid-template-columns: 1fr 1fr; }
          .rpt-sum-val { font-size: 1rem; }
          .rpt-chart-wrap { height: 200px; }
          .rpt-cat-left { width: 110px; }
          .rpt-cat-amount { width: 80px; font-size: 0.75rem; }
          .rpt-cat-pct { width: 30px; font-size: 0.62rem; }
          .rpt-month-row { padding: 12px 14px; flex-wrap: wrap; gap: 8px; }
          .rpt-month-left { min-width: 0; flex: 1 1 100%; }
          .rpt-month-stats { width: 100%; gap: 0; }
          .rpt-stat { flex: 1; }
          .rpt-month-right { display: none; }
          .rpt-legend { gap: 6px 12px; }
          .rpt-legend-name { font-size: 0.68rem; }
        }
        @media (max-width: 480px) {
          .rpt-summary { grid-template-columns: 1fr 1fr; }
          .rpt-sum-val { font-size: 0.9rem; }
          .rpt-cat-row { flex-wrap: wrap; gap: 6px; }
          .rpt-cat-left { width: 100%; }
          .rpt-cat-mid { display: flex; width: 100%; order: 3; }
          .rpt-cat-amount { width: auto; margin-left: auto; }
          .rpt-cat-rank { display: none; }
        }
      `}</style>
    </div>
  )
}
