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
import { IconBarChart, IconArrowUp, IconArrowDown, IconActivity } from '../components/Icons'

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
          salaryMap[m] = (salaryMap[m] || 0) + Number(tx.amount)
        } else {
          monthMap[m].income += Number(tx.amount)
        }
      } else {
        monthMap[m].expense += Number(tx.amount)
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
      const expense = monthMap[m].expense
      return {
        month: m,
        label: getMonthLabel(m),
        shortLabel: new Intl.DateTimeFormat('id-ID', { month: 'short', year: '2-digit' }).format(new Date(m + '-01')),
        income: salary + txIncome,
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

  const totalIncome  = months.reduce((s, m) => s + m.income, 0)
  const totalExpense = months.reduce((s, m) => s + m.expense, 0)
  const net          = totalIncome - totalExpense
  const avgExpense   = months.length ? Math.round(totalExpense / months.length) : 0
  const avgIncome    = months.length ? Math.round(totalIncome  / months.length) : 0
  const savingsRate  = totalIncome > 0 ? Math.round((net / totalIncome) * 100) : 0
  const expRatioPct  = totalIncome > 0 ? Math.round((totalExpense / totalIncome) * 100) : 0
  const healthyCount = months.filter(m => m.net >= 0).length
  const topCat       = categories[0]

  return (
    <div className="animate-in">
      <div className="page-header-banner" style={{ marginBottom: 20 }}>
        <div className="page-header-icon" style={{ background: 'rgba(96,165,250,0.1)', color: 'var(--info)' }}>
          <IconBarChart size={18} />
        </div>
        <div>
          <h1 className="page-header-title">Laporan Keuangan</h1>
          <p className="page-header-sub">Ringkasan dan analisis keuangan kamu</p>
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
            <p>Mulai catat transaksi untuk melihat laporan keuangan kamu</p>
          </div>
        </div>
      ) : (
        <>
          {/* ── 3 Summary Cards ──────────────────── */}
          <div className="rpt-summary">
            <div className="rpt-sum-card rpt-sum-income">
              <div className="rpt-sum-icon"><IconArrowUp size={14} /></div>
              <span className="rpt-sum-label">Total Uang Masuk</span>
              <span className="rpt-sum-val text-success tabular">{formatCurrency(totalIncome)}</span>
              <span className="rpt-sum-sub">{months.length} bulan tercatat</span>
            </div>
            <div className="rpt-sum-card rpt-sum-expense">
              <div className="rpt-sum-icon"><IconArrowDown size={14} /></div>
              <span className="rpt-sum-label">Total Uang Keluar</span>
              <span className="rpt-sum-val text-danger tabular">{formatCurrency(totalExpense)}</span>
              <span className="rpt-sum-sub">{expRatioPct}% dari total pemasukan</span>
            </div>
            <div className="rpt-sum-card rpt-sum-net">
              <div className="rpt-sum-icon"><IconActivity size={14} /></div>
              <span className="rpt-sum-label">Total Tersimpan</span>
              <span className={`rpt-sum-val tabular ${net >= 0 ? 'text-success' : 'text-danger'}`}>
                {net >= 0 ? '+' : ''}{formatCurrency(net)}
              </span>
              <span className="rpt-sum-sub" style={{ color: net >= 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 700 }}>
                {net >= 0 ? `${savingsRate}% dari pemasukan` : 'Pengeluaran melebihi pemasukan'}
              </span>
            </div>
          </div>

          {/* ── Insight Strip ─────────────────────── */}
          <div className="rpt-insights">
            <div className="rpt-insight-item">
              <span className="rpt-insight-label">Rata-rata keluar/bulan</span>
              <span className="rpt-insight-val">{formatCurrency(avgExpense)}</span>
            </div>
            {months.length > 1 && (
              <div className="rpt-insight-item">
                <span className="rpt-insight-label">Rata-rata masuk/bulan</span>
                <span className="rpt-insight-val">{formatCurrency(avgIncome)}</span>
              </div>
            )}
            <div className="rpt-insight-item">
              <span className="rpt-insight-label">Bulan keuangan aman</span>
              <span className="rpt-insight-val" style={{ color: 'var(--success)' }}>
                {healthyCount} dari {months.length} bulan
              </span>
            </div>
            {topCat && (
              <div className="rpt-insight-item">
                <span className="rpt-insight-label">Pengeluaran terbesar</span>
                <span className="rpt-insight-val" style={{
                  maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                }}>{topCat.name}</span>
              </div>
            )}
          </div>

          {/* ── Chart ───────────────────────────── */}
          {trendData.length > 0 && (
            <div className="card rpt-chart-card">
              <div className="rpt-chart-head">
                <div>
                  <h3 className="rpt-chart-title">Tren Keuangan Bulanan</h3>
                  <p className="rpt-chart-sub">Perbandingan uang masuk dan keluar setiap bulan</p>
                </div>
              </div>
              <div className="rpt-chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gInc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#34d399" stopOpacity={0.22} />
                        <stop offset="95%" stopColor="#34d399" stopOpacity={0}    />
                      </linearGradient>
                      <linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#f87171" stopOpacity={0.22} />
                        <stop offset="95%" stopColor="#f87171" stopOpacity={0}    />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis
                      dataKey="label"
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
                    <Area type="monotone" dataKey="Pemasukan"   stroke="#34d399" strokeWidth={2} fill="url(#gInc)" dot={{ r: 3, fill: '#34d399' }} />
                    <Area type="monotone" dataKey="Pengeluaran" stroke="#f87171" strokeWidth={2} fill="url(#gExp)" dot={{ r: 3, fill: '#f87171' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="rpt-legend">
                <div className="rpt-legend-item">
                  <span className="rpt-legend-dot" style={{ background: '#34d399' }} />
                  <span className="rpt-legend-name">Uang Masuk (Pemasukan)</span>
                </div>
                <div className="rpt-legend-item">
                  <span className="rpt-legend-dot" style={{ background: '#f87171' }} />
                  <span className="rpt-legend-name">Uang Keluar (Pengeluaran)</span>
                </div>
              </div>
            </div>
          )}

          {/* ── Kategori Terbesar ─────────────────── */}
          {categories.length > 0 && (
            <div className="card rpt-cat-card">
              <div className="rpt-chart-head">
                <div>
                  <h3 className="rpt-chart-title">Pengeluaran Terbesar</h3>
                  <p className="rpt-chart-sub">Kategori dengan total pengeluaran tertinggi (semua bulan)</p>
                </div>
              </div>
              <div className="rpt-cat-list">
                {categories.slice(0, 8).map((cat, i) => {
                  const pctOfExpense = totalExpense > 0 ? (cat.total / totalExpense) * 100 : 0
                  const pctOfIncome  = totalIncome  > 0 ? (cat.total / totalIncome)  * 100 : 0
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
                          <div className="rpt-cat-fill" style={{ width: `${pctOfExpense}%`, background: cat.color }} />
                        </div>
                        <span className="rpt-cat-pct">{pctOfExpense.toFixed(0)}%</span>
                      </div>
                      <div className="rpt-cat-right">
                        <span className="rpt-cat-amount tabular">{formatCurrency(cat.total)}</span>
                        {totalIncome > 0 && (
                          <span className="rpt-cat-of-income">{pctOfIncome.toFixed(0)}% gaji</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── Per Bulan ─────────────────────────── */}
          <div className="rpt-month-list">
            {months.map(m => {
              const health   = getHealth(m)
              const expRatio = m.income > 0 ? Math.min((m.expense / m.income) * 100, 100) : 0
              const expPct   = m.income > 0 ? Math.round((m.expense / m.income) * 100) : 0
              const topCats  = Object.entries(m.catBreakdown).sort((a, b) => b[1] - a[1]).slice(0, 3)
              return (
                <div key={m.month} className="rpt-month-row" onClick={() => navigate(`/dashboard?month=${m.month}`)}>

                  {/* Row 1: nama bulan + badge */}
                  <div className="rpt-month-head">
                    <div className="rpt-month-title-row">
                      <span className="rpt-month-name">{m.label}</span>
                      <span className="rpt-health-badge" style={{ color: health.color, background: health.bg }}>
                        {health.label}
                      </span>
                    </div>
                    {m.salary > 0 && (
                      <span className="rpt-month-salary">Gaji {formatCurrency(m.salary)}</span>
                    )}
                  </div>

                  {/* Row 2: 3 stat */}
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

                  {/* Row 3: bar + chips + cta */}
                  <div className="rpt-month-footer">
                    <div className="rpt-exp-bar-row">
                      <div className="rpt-exp-bar">
                        <div className="rpt-exp-fill" style={{
                          width: `${expRatio}%`,
                          background: health.color,
                        }} />
                      </div>
                      <span className="rpt-exp-label">{expPct}% pengeluaran dari gaji</span>
                    </div>
                    {topCats.length > 0 && (
                      <div className="rpt-month-cats">
                        {topCats.map(([name]) => {
                          const c = categories.find(c => c.name === name)
                          return (
                            <span key={name} className="rpt-month-cat-chip"
                              style={{ background: `${c?.color || '#6366f1'}15`, color: c?.color || '#6366f1' }}>
                              {name}
                            </span>
                          )
                        })}
                      </div>
                    )}
                    <span className="rpt-cta">Lihat detail bulan ini →</span>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      <style>{`
        /* ── Summary Cards ────────────────────── */
        .rpt-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px; margin-bottom: 12px;
        }
        .rpt-sum-card {
          background: var(--bg-card);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-lg);
          padding: 18px 20px;
          display: flex; flex-direction: column; gap: 4px;
          position: relative; overflow: hidden;
          box-shadow: var(--shadow); transition: all 0.2s;
        }
        .rpt-sum-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
        .rpt-sum-card::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px; border-radius: 0 2px 2px 0;
        }
        .rpt-sum-income::before { background: linear-gradient(180deg,#34d399,#10b981); box-shadow:0 0 8px rgba(52,211,153,0.5); }
        .rpt-sum-expense::before { background: linear-gradient(180deg,#f87171,#ef4444); box-shadow:0 0 8px rgba(248,113,113,0.5); }
        .rpt-sum-net::before { background: var(--gradient-accent); box-shadow:0 0 8px rgba(99,102,241,0.5); }
        .rpt-sum-icon {
          width: 30px; height: 30px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 4px; flex-shrink: 0;
        }
        .rpt-sum-income .rpt-sum-icon { background: var(--success-dim); color: var(--success); }
        .rpt-sum-expense .rpt-sum-icon { background: var(--danger-dim);  color: var(--danger);  }
        .rpt-sum-net .rpt-sum-icon     { background: var(--accent-dim);  color: var(--accent);  }
        .rpt-sum-label {
          font-size: 0.63rem; text-transform: uppercase;
          letter-spacing: 0.07em; color: var(--text-muted); font-weight: 700;
        }
        .rpt-sum-val {
          font-size: 1.2rem; font-weight: 800;
          letter-spacing: -0.035em; line-height: 1.1; margin: 2px 0;
        }
        .rpt-sum-sub { font-size: 0.68rem; color: var(--text-muted); font-weight: 500; }

        /* ── Insight Strip ────────────────────── */
        .rpt-insights {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px; margin-bottom: 12px;
        }
        .rpt-insight-item {
          background: var(--bg-card);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          display: flex; flex-direction: column; gap: 3px;
          box-shadow: var(--shadow);
        }
        .rpt-insight-label {
          font-size: 0.60rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--text-muted);
        }
        .rpt-insight-val {
          font-size: 0.8125rem; font-weight: 700;
          color: var(--text-primary); letter-spacing: -0.02em;
        }

        /* ── Chart ────────────────────────────── */
        .rpt-chart-card { margin-bottom: 12px; }
        .rpt-chart-head {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 16px; gap: 12px;
        }
        .rpt-chart-title {
          font-size: 0.8125rem; font-weight: 700;
          color: var(--text-primary); letter-spacing: -0.01em; margin: 0;
        }
        .rpt-chart-sub {
          font-size: 0.68rem; color: var(--text-muted); font-weight: 500; margin-top: 3px;
        }
        .rpt-chart-wrap { height: 240px; }
        .rpt-legend {
          display: flex; flex-wrap: wrap; gap: 8px 20px;
          margin-top: 14px; padding-top: 12px;
          border-top: 1px solid var(--border);
        }
        .rpt-legend-item { display: flex; align-items: center; gap: 7px; }
        .rpt-legend-dot {
          width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0;
        }
        .rpt-legend-name { font-size: 0.75rem; color: var(--text-secondary); font-weight: 600; }

        /* ── Category Breakdown ───────────────── */
        .rpt-cat-card { margin-bottom: 12px; }
        .rpt-cat-list { display: flex; flex-direction: column; margin-top: 14px; }
        .rpt-cat-row {
          display: flex; align-items: center; gap: 12px;
          padding: 9px 0; border-bottom: 1px solid var(--border);
        }
        .rpt-cat-row:last-child { border-bottom: none; }
        .rpt-cat-left {
          display: flex; align-items: center; gap: 8px;
          width: 160px; flex-shrink: 0;
        }
        .rpt-cat-rank {
          font-size: 0.65rem; font-weight: 700; color: var(--text-muted);
          width: 14px; text-align: right; flex-shrink: 0;
        }
        .rpt-cat-icon {
          width: 26px; height: 26px; border-radius: 6px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .rpt-cat-name {
          font-size: 0.8rem; font-weight: 600; color: var(--text-primary);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .rpt-cat-mid {
          flex: 1; display: flex; align-items: center; gap: 8px;
        }
        .rpt-cat-bar {
          flex: 1; height: 6px; background: var(--border); border-radius: 99px; overflow: hidden;
        }
        .rpt-cat-fill { height: 100%; border-radius: 99px; transition: width 0.6s ease; }
        .rpt-cat-pct {
          font-size: 0.68rem; color: var(--text-muted); font-weight: 600;
          width: 32px; text-align: right; flex-shrink: 0;
        }
        .rpt-cat-right {
          display: flex; flex-direction: column; align-items: flex-end; gap: 1px;
          width: 100px; flex-shrink: 0;
        }
        .rpt-cat-amount {
          font-size: 0.8rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em;
        }
        .rpt-cat-of-income {
          font-size: 0.62rem; color: var(--text-muted); font-weight: 500;
        }

        /* ── Monthly List ─────────────────────── */
        .rpt-month-list { display: flex; flex-direction: column; gap: 10px; }
        .rpt-month-row {
          background: var(--bg-card);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-lg);
          padding: 16px 18px;
          display: flex; flex-direction: column; gap: 12px;
          cursor: pointer; transition: all 0.18s;
          box-shadow: var(--shadow);
        }
        .rpt-month-row:hover {
          border-color: rgba(99,102,241,0.25);
          transform: translateY(-1px);
          box-shadow: var(--shadow-lg);
        }

        .rpt-month-head { display: flex; flex-direction: column; gap: 3px; }
        .rpt-month-title-row {
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
        }
        .rpt-month-name {
          font-size: 0.9375rem; font-weight: 700; letter-spacing: -0.025em; color: var(--text-primary);
        }
        .rpt-health-badge {
          font-size: 0.65rem; font-weight: 700; padding: 3px 10px;
          border-radius: 99px; flex-shrink: 0; letter-spacing: 0.02em;
        }
        .rpt-month-salary {
          font-size: 0.7rem; color: var(--text-muted); font-weight: 500;
        }

        .rpt-month-stats {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 0;
          padding: 10px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .rpt-stat { display: flex; flex-direction: column; gap: 2px; padding: 0 8px; }
        .rpt-stat:first-child { padding-left: 0; border-right: 1px solid var(--border); padding-right: 12px; }
        .rpt-stat:last-child  { padding-right: 0; padding-left: 12px; }
        .rpt-stat:nth-child(2) { padding: 0 12px; border-right: 1px solid var(--border); }
        .rpt-stat-label {
          font-size: 0.6rem; text-transform: uppercase;
          letter-spacing: 0.06em; color: var(--text-muted); font-weight: 700;
        }
        .rpt-stat-val { font-size: 0.875rem; font-weight: 700; letter-spacing: -0.025em; }
        .rpt-stat-sub { font-size: 0.62rem; font-weight: 600; color: var(--text-muted); }

        .rpt-month-footer { display: flex; flex-direction: column; gap: 8px; }
        .rpt-exp-bar-row { display: flex; align-items: center; gap: 10px; }
        .rpt-exp-bar {
          flex: 1; height: 5px; background: var(--border); border-radius: 99px; overflow: hidden;
        }
        .rpt-exp-fill { height: 100%; border-radius: 99px; transition: width 0.6s ease; }
        .rpt-exp-label {
          font-size: 0.62rem; color: var(--text-muted); font-weight: 600; flex-shrink: 0;
        }
        .rpt-month-cats { display: flex; flex-wrap: wrap; gap: 4px; }
        .rpt-month-cat-chip {
          font-size: 0.62rem; font-weight: 600; padding: 2px 8px;
          border-radius: 99px; white-space: nowrap;
        }
        .rpt-cta {
          font-size: 0.68rem; color: var(--accent); font-weight: 700;
          align-self: flex-end; margin-top: -2px;
        }

        /* ── Mobile ───────────────────────────── */
        @media (max-width: 768px) {
          .rpt-summary { grid-template-columns: 1fr 1fr; }
          .rpt-summary .rpt-sum-card:last-child { grid-column: span 2; }
          .rpt-sum-val { font-size: 1rem; }
          .rpt-insights { grid-template-columns: 1fr 1fr; }
          .rpt-chart-wrap { height: 200px; }
          .rpt-cat-left { width: 110px; }
          .rpt-cat-right { width: 80px; }
          .rpt-cat-amount { font-size: 0.75rem; }
          .rpt-month-row { padding: 12px 14px; }
        }
        @media (max-width: 480px) {
          .rpt-summary { grid-template-columns: 1fr 1fr; }
          .rpt-insights { grid-template-columns: 1fr 1fr; }
          .rpt-sum-val { font-size: 0.9rem; }
          .rpt-cat-row { flex-wrap: wrap; gap: 6px; }
          .rpt-cat-left { width: 100%; }
          .rpt-cat-mid { width: 100%; order: 3; }
          .rpt-cat-right { width: auto; margin-left: auto; flex-direction: row; align-items: center; gap: 6px; }
          .rpt-cat-rank { display: none; }
          .rpt-month-stats { grid-template-columns: 1fr 1fr 1fr; }
          .rpt-stat { padding: 0 4px !important; border: none !important; }
          .rpt-stat:first-child { padding-left: 0 !important; }
          .rpt-stat-val { font-size: 0.78rem; }
        }
      `}</style>
    </div>
  )
}
