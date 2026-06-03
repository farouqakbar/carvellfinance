import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { useToast } from './Toast'
import CurrencyInput from './CurrencyInput'
import { isMandatory, isMandatoryIncome, isProtected } from '../constants/mandatoryCategories'
import { getCurrentMonth, getToday } from '../utils/formatCurrency'
import { IconArrowUp, IconArrowDown } from './Icons'

export default function TransactionForm({ onSuccess, onClose, editData, month }) {
  const { user } = useAuth()
  const toast = useToast()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const defaultDate = () => {
    if (editData?.date) return editData.date
    if (!month) return getToday()
    return month === getCurrentMonth() ? getToday() : `${month}-01`
  }

  const [form, setForm] = useState({
    amount: '',
    category_id: '',
    date: defaultDate(),
    description: '',
    type: 'expense',
    ...editData,
  })

  useEffect(() => { fetchCategories() }, [month])

  const fetchCategories = async () => {
    const [globalRes, monthRes] = await Promise.all([
      supabase.from('categories').select('*').eq('user_id', user.id).is('month', null),
      month ? supabase.from('categories').select('*').eq('user_id', user.id).eq('month', month) : Promise.resolve({ data: [] }),
    ])
    const merged = [
      ...(globalRes.data || []).filter(c => isProtected(c)),
      ...(monthRes.data || []),
    ].sort((a, b) => a.name.localeCompare(b.name))
    const seen = new Set()
    const all = merged.filter(c => { if (seen.has(c.name)) return false; seen.add(c.name); return true })
    setCategories(all.filter(c => !isMandatory(c) && !isMandatoryIncome(c)))
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
        const { error } = await supabase.from('transactions').update(payload).eq('id', editData.id)
        if (error) throw error
        toast('Transaksi diperbarui', 'success')
      } else {
        const { error } = await supabase.from('transactions').insert(payload)
        if (error) throw error
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
          <span className="tf-type-icon"><IconArrowDown size={14} /></span> Pengeluaran
        </button>
        <button
          type="button"
          className={`tf-type-btn ${!isExpense ? 'active' : ''}`}
          data-type="income"
          onClick={() => setForm(f => ({ ...f, type: 'income' }))}
        >
          <span className="tf-type-icon"><IconArrowUp size={14} /></span> Pemasukan
        </button>
      </div>

      {/* Amount — prominent */}
      <CurrencyInput
        variant="large"
        value={form.amount}
        onChange={raw => setForm(f => ({ ...f, amount: raw }))}
        inputColor={isExpense ? 'var(--danger)' : 'var(--success)'}
        autoFocus
        style={{ marginBottom: 18 }}
      />
      {/* hidden required field agar form validation tetap jalan */}
      <input type="hidden" value={form.amount} required />

      {/* Fields */}
      <div className="form-group">
        <label className="form-label">Kategori</label>
        <select
          className="form-select"
          value={form.category_id}
          onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))}
        >
          <option value="">— Tanpa kategori —</option>
          {(() => {
            const rutin = categories.filter(c => c.is_monthly)
            const lainnya = categories.filter(c => !c.is_monthly)
            return (
              <>
                {rutin.length > 0 && (
                  <optgroup label="Pengeluaran Rutin">
                    {rutin.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </optgroup>
                )}
                {lainnya.length > 0 && (
                  <optgroup label="Kategori Lainnya">
                    {lainnya.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </optgroup>
                )}
              </>
            )
          })()}
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
          min-height: 44px;
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
        .tf-type-icon { display: flex; align-items: center; }

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
