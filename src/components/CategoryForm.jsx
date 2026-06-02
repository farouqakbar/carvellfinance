import { useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { useToast } from './Toast'
import CurrencyInput from './CurrencyInput'
import { formatCurrency } from '../utils/formatCurrency'

export default function CategoryForm({ onSuccess, onClose, editData, salary = 0, month }) {
  const { user } = useAuth()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [setBudget, setSetBudget] = useState(!!(editData?.budget_limit > 0))
  const [pct, setPct] = useState('')
  const [nominal, setNominal] = useState(editData?.budget_limit ? String(editData.budget_limit) : '')
  const [form, setForm] = useState({
    name: '',
    color: '#6366f1',
    is_mandatory: false,
    is_monthly: false,
    is_planned: false,
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
      const budget = setBudget ? (parseFloat(nominal) || 0) : 0
      const payload = {
        user_id: user.id,
        name: form.name,
        budget_limit: budget,
        color: form.color,
        icon: '',
        is_mandatory: form.is_mandatory || false,
        is_monthly: form.is_monthly || false,
        is_planned: form.is_planned || false,
      }
      let catId = editData?.id
      if (catId) {
        // Edit: jangan ubah month
        await supabase.from('categories').update(payload).eq('id', catId)
        toast('Kategori diperbarui', 'success')
      } else {
        const { data: newCat } = await supabase.from('categories').insert({ ...payload, month: month || null }).select('id').single()
        catId = newCat?.id
        toast('Kategori ditambahkan', 'success')
      }
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

      {/* Toggle budget */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: setBudget ? 10 : 20 }}>
        <span className="form-label" style={{ margin: 0 }}>Set budget bulan ini</span>
        <button
          type="button"
          onClick={() => { setSetBudget(v => !v); if (setBudget) { setPct(''); setNominal('') } }}
          style={{
            width: 40, height: 22, borderRadius: 99, border: 'none', cursor: 'pointer',
            background: setBudget ? 'var(--accent)' : 'var(--border)',
            position: 'relative', transition: 'background 0.2s', flexShrink: 0,
          }}
        >
          <span style={{
            position: 'absolute', top: 3, left: setBudget ? 21 : 3,
            width: 16, height: 16, borderRadius: '50%',
            background: '#fff', transition: 'left 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }} />
        </button>
      </div>

      {setBudget && (
        <div className="form-group">
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
          <CurrencyInput value={nominal} onChange={handleNominalChange} />
        </div>
      )}

      <div className="flex gap-8">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
        <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
          {loading ? 'Menyimpan...' : editData?.id ? 'Perbarui' : 'Buat Kategori'}
        </button>
      </div>
    </form>
  )
}
