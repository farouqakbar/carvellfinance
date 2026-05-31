import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { StatCard } from '../components/Card'
import { formatCurrency, getCurrentMonth, getMonthLabel } from '../utils/formatCurrency'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

export default function Dashboard() {
  const { user } = useAuth()
  const [data, setData] = useState({
    salary: 0,
    totalExpense: 0,
    totalIncome: 0,
    categories: [],
    transactions: [],
    savings: [],
    categorySpend: [],
  })
  const [loading, setLoading] = useState(true)
  const [month, setMonth] = useState(getCurrentMonth())
  const [showSalaryForm, setShowSalaryForm] = useState(false)
  const [salaryInput, setSalaryInput] = useState('')

  useEffect(() => {
    fetchDashboard()
  }, [month])

  const fetchDashboard = async () => {
    setLoading(true)
    try {
      const startDate = `${month}-01`
      const endDate = `${month}-31`

      const [salaryRes, txRes, catRes, savingsRes] = await Promise.all([
        supabase.from('salaries').select('*').eq('user_id', user.id).eq('month', month).single(),
        supabase.from('transactions').select('*, categories(name, color, icon)').eq('user_id', user.id).gte('date', startDate).lte('date', endDate),
        supabase.from('categories').select('*').eq('user_id', user.id),
        supabase.from('savings').select('*').eq('user_id', user.id),
      ])

      const txs = txRes.data || []
      const cats = catRes.data || []

      const totalExpense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
      const totalIncome = txs.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)

      // Category spend
      const catSpendMap = {}
      txs.filter(t => t.type === 'expense' && t.categories).forEach(t => {
        const name = t.categories.name
        if (!catSpendMap[name]) catSpendMap[name] = { name, amount: 0, color: t.categories.color, icon: t.categories.icon }
        catSpendMap[name].amount += Number(t.amount)
      })
      const categorySpend = Object.values(catSpendMap).sort((a,b) => b.amount - a.amount)

      // Overbudget check per category
      const catsWithStatus = cats.map(cat => {
        const spent = catSpendMap[cat.name]?.amount || 0
        return { ...cat, spent, overBudget: cat.budget_limit > 0 && spent > cat.budget_limit }
      })

      setData({
        salary: salaryRes.data?.amount || 0,
        totalExpense,
        totalIncome,
        categories: catsWithStatus,
        transactions: txs.slice(0, 5),
        savings: savingsRes.data || [],
        categorySpend,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSalary = async () => {
    const amount = parseFloat(salaryInput)
    if (!amount) return
    await supabase.from('salaries').upsert({
      user_id: user.id,
      month,
      amount,
    }, { onConflict: 'user_id,month' })
    setShowSalaryForm(false)
    setSalaryInput('')
    fetchDashboard()
  }

  const balance = data.salary + data.totalIncome - data.totalExpense
  const budgetUsed = data.salary > 0 ? (data.totalExpense / data.salary) * 100 : 0
  const name = user?.user_metadata?.full_name?.split(' ')[0] || 'Kamu'

  const overBudgetCats = data.categories.filter(c => c.overBudget)

  return (
    <div className="animate-in">
      <div className="flex-between mb-16" style={{ flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Halo, {name} 👋</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>{getMonthLabel(month)}</p>
        </div>
        <div className="flex gap-8 align-center" style={{ flexWrap: 'wrap' }}>
          <input
            type="month"
            className="form-input"
            style={{ width: 'auto' }}
            value={month}
            onChange={e => setMonth(e.target.value)}
          />
          <button className="btn btn-secondary btn-sm" onClick={() => setShowSalaryForm(true)}>
            + Atur Gaji
          </button>
        </div>
      </div>

      {/* Salary Modal */}
      {showSalaryForm && (
        <div className="modal-overlay" onClick={() => setShowSalaryForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Gaji Bulan Ini</h2>
              <button className="btn btn-ghost" onClick={() => setShowSalaryForm(false)}>✕</button>
            </div>
            <p className="text-sm text-secondary mb-16">Masukkan gaji/pemasukan utama untuk {getMonthLabel(month)}</p>
            <div className="form-group">
              <label className="form-label">Nominal (Rp)</label>
              <input
                className="form-input"
                type="number"
                placeholder="0"
                value={salaryInput}
                onChange={e => setSalaryInput(e.target.value)}
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

      {/* Overbudget warning */}
      {overBudgetCats.length > 0 && (
        <div className="warning-banner">
          <span>⚠</span>
          <span>
            <strong>Overbudget!</strong> Kategori {overBudgetCats.map(c => c.name).join(', ')} telah melewati batas budget.
          </span>
        </div>
      )}

      {/* Stats */}
      <div className="grid-4 mb-24">
        <StatCard
          icon="💵"
          label="Saldo"
          value={formatCurrency(balance)}
          color="var(--accent)"
        />
        <StatCard
          icon="📊"
          label="Gaji/Bulan"
          value={formatCurrency(data.salary)}
          sub={data.salary === 0 ? 'Belum diatur' : undefined}
          color="var(--info)"
        />
        <StatCard
          icon="↑"
          label="Total Pemasukan"
          value={formatCurrency(data.totalIncome)}
          color="var(--success)"
        />
        <StatCard
          icon="↓"
          label="Total Pengeluaran"
          value={formatCurrency(data.totalExpense)}
          sub={data.salary > 0 ? `${budgetUsed.toFixed(0)}% dari gaji` : undefined}
          color="var(--danger)"
        />
      </div>

      <div className="grid-2 mb-24">
        {/* Chart Kategori */}
        <div className="card">
          <h3 className="font-serif font-italic mb-16" style={{ fontSize: '1.1rem' }}>Pengeluaran per Kategori</h3>
          {data.categorySpend.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📊</div>
              <strong>Belum ada data</strong>
              <p>Tambah transaksi untuk melihat chart</p>
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={data.categorySpend} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={50}>
                    {data.categorySpend.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatCurrency(v)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="cat-legend">
                {data.categorySpend.map((c, i) => (
                  <div key={i} className="cat-legend-item">
                    <div className="dot" style={{ background: c.color }} />
                    <span className="truncate">{c.icon} {c.name}</span>
                    <span className="font-medium">{formatCurrency(c.amount)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Budget per kategori */}
        <div className="card">
          <h3 className="font-serif font-italic mb-16" style={{ fontSize: '1.1rem' }}>Status Budget</h3>
          {data.categories.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">◈</div>
              <strong>Belum ada kategori</strong>
              <p>Buat kategori untuk tracking budget</p>
            </div>
          ) : (
            <div className="budget-list">
              {data.categories.filter(c => c.budget_limit > 0).slice(0, 5).map(cat => {
                const pct = Math.min((cat.spent / cat.budget_limit) * 100, 100)
                const isOver = cat.spent > cat.budget_limit
                return (
                  <div key={cat.id} className="budget-item">
                    <div className="flex-between mb-8">
                      <span className="text-sm">{cat.icon} {cat.name}</span>
                      <span className={`text-xs font-medium ${isOver ? 'text-danger' : 'text-secondary'}`}>
                        {formatCurrency(cat.spent)} / {formatCurrency(cat.budget_limit)}
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${pct}%`,
                          background: isOver ? 'var(--danger)' : cat.color
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Savings */}
      {data.savings.length > 0 && (
        <div className="card mb-24">
          <h3 className="font-serif font-italic mb-16" style={{ fontSize: '1.1rem' }}>Progress Tabungan</h3>
          <div className="grid-3">
            {data.savings.map(s => {
              const pct = s.target_amount > 0 ? Math.min((s.current_amount / s.target_amount) * 100, 100) : 0
              return (
                <div key={s.id} className="saving-item">
                  <div className="flex-between mb-8">
                    <span className="font-medium text-sm">{s.name}</span>
                    <span className="badge badge-success">{pct.toFixed(0)}%</span>
                  </div>
                  <div className="text-2xl font-medium mb-4">{formatCurrency(s.current_amount)}</div>
                  <div className="text-xs text-secondary mb-8">dari {formatCurrency(s.target_amount)}</div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${pct}%`, background: 'var(--success)' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex-between mb-16">
          <h3 className="font-serif font-italic" style={{ fontSize: '1.1rem' }}>Transaksi Terakhir</h3>
          <a href="/transactions" className="text-xs text-accent">Lihat semua →</a>
        </div>
        {data.transactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">↕</div>
            <strong>Belum ada transaksi</strong>
            <p>Mulai catat pengeluaran kamu</p>
          </div>
        ) : (
          <div>
            {data.transactions.map(tx => (
              <div key={tx.id} className="tx-row">
                <div className="tx-icon" style={{ background: tx.categories?.color ? `${tx.categories.color}22` : 'var(--bg-input)' }}>
                  {tx.categories?.icon || (tx.type === 'income' ? '↑' : '↓')}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="text-sm font-medium">{tx.description || tx.categories?.name || 'Transaksi'}</div>
                  <div className="text-xs text-muted">{tx.date}</div>
                </div>
                <div className={`font-medium ${tx.type === 'income' ? 'text-success' : 'text-danger'}`}>
                  {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .warning-banner {
          background: var(--warning-dim);
          border: 1px solid var(--warning);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--warning);
          font-size: 0.875rem;
          margin-bottom: 24px;
        }
        .cat-legend { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
        .cat-legend-item { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; }
        .cat-legend-item span:last-child { margin-left: auto; color: var(--text-secondary); }
        .budget-list { display: flex; flex-direction: column; gap: 16px; }
        .budget-item {}
        .saving-item { background: var(--bg-input); border-radius: var(--radius-sm); padding: 16px; }
        .tx-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
        }
        .tx-row:last-child { border-bottom: none; }
        .tx-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  )
}
