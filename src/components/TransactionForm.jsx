import { useState, useEffect, useRef } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { useToast } from './Toast'

export default function TransactionForm({ onSuccess, onClose, editData }) {
  const { user } = useAuth()
  const toast = useToast()
  const amountRef = useRef(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    amount: '',
    category_id: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    type: 'expense',
    ...editData,
  })

  useEffect(() => {
    fetchCategories()
    setTimeout(() => amountRef.current?.focus(), 80)
  }, [])

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').eq('user_id', user.id).order('name')
    setCategories(data || [])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.amount || !form.date) return
    setLoading(true)
    try {
      const payload = {
        user_id: user.id,
        amount: parseFloat(form.amount),
        category_id: form.category_id || null,
        date: form.date,
        description: form.description,
        type: form.type,
      }
      if (editData?.id) {
        await supabase.from('transactions').update(payload).eq('id', editData.id)
        toast('Transaksi diperbarui', 'success')
      } else {
        await supabase.from('transactions').insert(payload)
        toast('Transaksi ditambahkan', 'success')
      }
      onSuccess?.()
      onClose?.()
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const isExpense = form.type === 'expense'

  return (
    <form onSubmit={handleSubmit}>

      {/* Type toggle */}
      <div className="tf-type-row">
        <button
          type="button"
          className={`tf-type-btn ${isExpense ? 'active' : ''}`}
          data-type="expense"
          onClick={() => setForm(f => ({ ...f, type: 'expense' }))}
        >
          <span className="tf-type-icon">↓</span> Pengeluaran
        </button>
        <button
          type="button"
          className={`tf-type-btn ${!isExpense ? 'active' : ''}`}
          data-type="income"
          onClick={() => setForm(f => ({ ...f, type: 'income' }))}
        >
          <span className="tf-type-icon">↑</span> Pemasukan
        </button>
      </div>

      {/* Amount — prominent */}
      <div className="tf-amount-group">
        <span className="tf-currency">Rp</span>
        <input
          ref={amountRef}
          className="tf-amount-input"
          type="number"
          placeholder="0"
          value={form.amount}
          onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
          required
          min="1"
          style={{ color: isExpense ? 'var(--danger)' : 'var(--success)' }}
        />
      </div>

      {/* Fields */}
      <div className="form-group">
        <label className="form-label">Kategori</label>
        <select
          className="form-select"
          value={form.category_id}
          onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))}
        >
          <option value="">— Tanpa kategori —</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
          ))}
        </select>
      </div>

      <div className="tf-row-2">
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label">Tanggal</label>
          <input
            className="form-input"
            type="date"
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            required
          />
        </div>
        <div className="form-group" style={{ flex: 2 }}>
          <label className="form-label">Deskripsi <span style={{ color: 'var(--text-muted)', textTransform: 'none', letterSpacing: 0, fontWeight: 500 }}>(opsional)</span></label>
          <input
            className="form-input"
            type="text"
            placeholder="Keterangan..."
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex gap-8" style={{ marginTop: 20 }}>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
        <button
          type="submit"
          className="btn btn-primary btn-block"
          style={{
            flex: 1,
            background: isExpense ? 'var(--danger)' : 'var(--success)',
            boxShadow: isExpense ? '0 4px 14px rgba(248,113,113,0.3)' : '0 4px 14px rgba(52,211,153,0.3)',
          }}
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : editData?.id ? 'Perbarui' : isExpense ? 'Catat Pengeluaran' : 'Catat Pemasukan'}
        </button>
      </div>

      <style>{`
        .tf-type-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          margin-bottom: 20px;
        }
        .tf-type-btn {
          padding: 10px 12px;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--bg-input);
          transition: all 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          letter-spacing: -0.01em;
        }
        .tf-type-btn:active { transform: scale(0.97); }
        .tf-type-btn.active[data-type="expense"] {
          background: var(--danger-dim);
          border-color: var(--danger);
          color: var(--danger);
        }
        .tf-type-btn.active[data-type="income"] {
          background: var(--success-dim);
          border-color: var(--success);
          color: var(--success);
        }
        .tf-type-icon { font-size: 0.9rem; }

        .tf-amount-group {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--bg-input);
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-sm);
          padding: 0 16px;
          margin-bottom: 18px;
          transition: border-color 0.15s;
        }
        .tf-amount-group:focus-within {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-dim);
        }
        .tf-currency {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-muted);
          flex-shrink: 0;
          padding-right: 4px;
        }
        .tf-amount-input {
          flex: 1;
          border: none;
          background: transparent;
          font-family: var(--font-sans);
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          font-variant-numeric: tabular-nums;
          padding: 14px 0;
          outline: none;
          width: 100%;
          min-width: 0;
        }
        .tf-amount-input::placeholder { color: var(--border-light); }
        .tf-amount-input::-webkit-inner-spin-button,
        .tf-amount-input::-webkit-outer-spin-button { -webkit-appearance: none; }

        .tf-row-2 {
          display: flex;
          gap: 10px;
        }
        @media (max-width: 480px) {
          .tf-row-2 { flex-direction: column; gap: 0; }
        }
      `}</style>
    </form>
  )
}
