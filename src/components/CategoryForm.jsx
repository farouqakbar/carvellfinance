import { useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { useToast } from './Toast'
import CurrencyInput from './CurrencyInput'
import { formatCurrency } from '../utils/formatCurrency'

const COLORS = ['#6366f1','#3b82f6','#06b6d4','#10b981','#84cc16','#f59e0b','#f97316','#ef4444','#ec4899','#a855f7']

export default function CategoryForm({ onSuccess, onClose, editData, salary = 0, month }) {
  const { user } = useAuth()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [pct, setPct] = useState('')
  const [nominal, setNominal] = useState(editData?.budget_limit ? String(editData.budget_limit) : '')
  const [form, setForm] = useState({
    name: '',
    color: '#6366f1',
    is_mandatory: false,
    ...editData,
  })

  const handlePctChange = (val) => {
    setPct(val)
    const p = parseFloat(val) || 0
    if (salary > 0 && p > 0) setNominal(String(Math.round((p / 100) * salary)))
    else setNominal('')
  }

  const handleNominalChange = (raw) => {
    setNominal(raw)
    const nom = parseFloat(raw) || 0
    if (salary > 0 && nom > 0) setPct(((nom / salary) * 100).toFixed(1))
    else setPct('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name) return
    setLoading(true)
    try {
      const budget = parseFloat(nominal) || 0
      const payload = {
        user_id: user.id,
        name: form.name,
        budget_limit: budget,
        color: form.color,
        icon: '',
        is_mandatory: form.is_mandatory || false,
      }
      let catId = editData?.id
      if (catId) {
        await supabase.from('categories').update(payload).eq('id', catId)
        toast('Kategori diperbarui', 'success')
      } else {
        const { data: newCat } = await supabase.from('categories').insert(payload).select('id').single()
        catId = newCat?.id
        toast('Kategori ditambahkan', 'success')
      }
      // Simpan budget ke category_budgets (per-bulan) jika month tersedia
      if (catId && month && budget > 0) {
        await supabase.from('category_budgets').upsert(
          { user_id: user.id, category_id: catId, month, budget_limit: budget },
          { onConflict: 'category_id,month' }
        )
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

      <div className="form-group">
        <label className="form-label">Nama Kategori</label>
        <input
          className="form-input"
          type="text"
          placeholder="Misal: Cicilan, Asuransi..."
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
          autoFocus
        />
      </div>

      <div className="form-group">
        <label className="form-label">Budget per Bulan</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              className="form-input"
              type="number"
              placeholder="0"
              value={pct}
              onChange={e => handlePctChange(e.target.value)}
              min="0" max="100" step="any"
              style={{ paddingRight: 36 }}
            />
            <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.85rem' }}>%</span>
          </div>
          {pct && salary > 0 && (
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}>
              = {formatCurrency(Math.round((parseFloat(pct) / 100) * salary))}
            </span>
          )}
        </div>
        {!pct && salary > 0 && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
            {[10, 15, 20, 25].map(p => (
              <button key={p} type="button" className="btn btn-secondary btn-sm" onClick={() => handlePctChange(String(p))}>{p}%</button>
            ))}
          </div>
        )}
        <CurrencyInput
          value={nominal}
          onChange={handleNominalChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Warna</label>
        <div className="cf-color-grid">
          {COLORS.map(color => (
            <button
              key={color}
              type="button"
              className={`cf-color-btn ${form.color === color ? 'active' : ''}`}
              style={{ background: color }}
              onClick={() => setForm(f => ({ ...f, color }))}
              title={color}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-8" style={{ marginTop: 20 }}>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
        <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
          {loading ? 'Menyimpan...' : editData?.id ? 'Perbarui' : 'Buat Kategori'}
        </button>
      </div>

      <style>{`
        .cf-color-grid { display: flex; gap: 8px; flex-wrap: wrap; }
        .cf-color-btn {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 2.5px solid transparent;
          cursor: pointer;
          transition: all 0.12s;
          outline: none;
        }
        .cf-color-btn:hover { transform: scale(1.15); }
        .cf-color-btn:active { transform: scale(0.95); }
        .cf-color-btn.active {
          box-shadow: 0 0 0 2px var(--bg-card), 0 0 0 4px currentColor;
          transform: scale(1.1);
        }
      `}</style>
    </form>
  )
}
