import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { useToast } from './Toast'

export default function TransactionForm({ onSuccess, onClose, editData }) {
  const { user } = useAuth()
  const toast = useToast()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    amount: '',
    category_id: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    type: 'expense',
    ...editData
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').eq('user_id', user.id)
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

  return (
    <form onSubmit={handleSubmit}>
      {/* Type toggle */}
      <div className="type-toggle">
        <button
          type="button"
          className={`type-btn ${form.type === 'expense' ? 'active-expense' : ''}`}
          onClick={() => setForm(f => ({ ...f, type: 'expense' }))}
        >
          ↓ Pengeluaran
        </button>
        <button
          type="button"
          className={`type-btn ${form.type === 'income' ? 'active-income' : ''}`}
          onClick={() => setForm(f => ({ ...f, type: 'income' }))}
        >
          ↑ Pemasukan
        </button>
      </div>

      <div className="form-group">
        <label className="form-label">Nominal</label>
        <input
          className="form-input"
          type="number"
          placeholder="0"
          value={form.amount}
          onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
          required
          min="0"
        />
      </div>

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

      <div className="form-group">
        <label className="form-label">Tanggal</label>
        <input
          className="form-input"
          type="date"
          value={form.date}
          onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Deskripsi</label>
        <input
          className="form-input"
          type="text"
          placeholder="Keterangan transaksi..."
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        />
      </div>

      <div className="flex gap-8 mt-16">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
        <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
          {loading ? 'Menyimpan...' : editData?.id ? 'Perbarui' : 'Simpan'}
        </button>
      </div>

      <style>{`
        .type-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 20px;
          background: var(--bg-input);
          padding: 4px;
          border-radius: var(--radius-sm);
        }
        .type-btn {
          padding: 8px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          background: transparent;
          transition: all 0.15s;
        }
        .type-btn.active-expense {
          background: var(--bg-card);
          color: var(--danger);
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
        .type-btn.active-income {
          background: var(--bg-card);
          color: var(--success);
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </form>
  )
}
