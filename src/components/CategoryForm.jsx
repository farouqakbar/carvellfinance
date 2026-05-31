import { useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { useToast } from './Toast'
import CurrencyInput from './CurrencyInput'

const ICONS = ['🍜','🚗','🛍️','🎮','💊','📱','✈️','📚','🏠','⚡','💰','🎓','🏋️','🎬','☕','🍔','🎁','💇','🐾','🌱']
const COLORS = ['#6366f1','#3b82f6','#06b6d4','#10b981','#84cc16','#f59e0b','#f97316','#ef4444','#ec4899','#a855f7']

export default function CategoryForm({ onSuccess, onClose, editData }) {
  const { user } = useAuth()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    budget_limit: '',
    color: '#6366f1',
    icon: '💰',
    ...editData,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name) return
    setLoading(true)
    try {
      const payload = {
        user_id: user.id,
        name: form.name,
        budget_limit: parseFloat(form.budget_limit) || 0,
        color: form.color,
        icon: form.icon,
      }
      if (editData?.id) {
        await supabase.from('categories').update(payload).eq('id', editData.id)
        toast('Kategori diperbarui', 'success')
      } else {
        await supabase.from('categories').insert(payload)
        toast('Kategori ditambahkan', 'success')
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

      {/* Preview */}
      <div className="cf-preview">
        <div className="cf-preview-icon" style={{ background: `${form.color}18`, color: form.color }}>
          {form.icon}
        </div>
        <div className="cf-preview-info">
          <span className="cf-preview-name">{form.name || 'Nama kategori'}</span>
          {form.budget_limit && (
            <span className="cf-preview-budget">Budget: Rp {Number(form.budget_limit).toLocaleString('id-ID')}/bulan</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Nama Kategori</label>
        <input
          className="form-input"
          type="text"
          placeholder="Misal: Makan, Transportasi, Hiburan..."
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
          autoFocus
        />
      </div>

      <div className="form-group">
        <label className="form-label">Budget per Bulan <span style={{ color: 'var(--text-muted)', textTransform: 'none', letterSpacing: 0, fontWeight: 500 }}>(opsional, 0 = tanpa batas)</span></label>
        <CurrencyInput
          value={form.budget_limit}
          onChange={raw => setForm(f => ({ ...f, budget_limit: raw }))}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Icon</label>
        <div className="cf-icon-grid">
          {ICONS.map(icon => (
            <button
              key={icon}
              type="button"
              className={`cf-icon-btn ${form.icon === icon ? 'active' : ''}`}
              style={form.icon === icon ? { borderColor: form.color, background: `${form.color}15` } : {}}
              onClick={() => setForm(f => ({ ...f, icon }))}
            >
              {icon}
            </button>
          ))}
        </div>
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
        .cf-preview {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          margin-bottom: 20px;
        }
        .cf-preview-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem; flex-shrink: 0;
          transition: background 0.2s, color 0.2s;
        }
        .cf-preview-info { display: flex; flex-direction: column; gap: 2px; }
        .cf-preview-name {
          font-size: 0.875rem; font-weight: 700;
          color: var(--text-primary); letter-spacing: -0.01em;
        }
        .cf-preview-budget { font-size: 0.72rem; color: var(--text-muted); font-weight: 500; }

        .cf-icon-grid {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 4px;
        }
        .cf-icon-btn {
          background: var(--bg-input);
          border: 1.5px solid transparent;
          border-radius: 7px;
          padding: 5px;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.12s;
          aspect-ratio: 1;
          display: flex; align-items: center; justify-content: center;
        }
        .cf-icon-btn:hover { border-color: var(--border-light); transform: scale(1.1); }
        .cf-icon-btn:active { transform: scale(0.95); }
        .cf-icon-btn.active { border-width: 1.5px; }

        .cf-color-grid {
          display: flex; gap: 8px; flex-wrap: wrap;
        }
        .cf-color-btn {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 2.5px solid transparent;
          cursor: pointer;
          transition: all 0.12s;
          outline: none;
          position: relative;
        }
        .cf-color-btn:hover { transform: scale(1.15); }
        .cf-color-btn:active { transform: scale(0.95); }
        .cf-color-btn.active {
          box-shadow: 0 0 0 2px var(--bg-card), 0 0 0 4px currentColor;
          transform: scale(1.1);
        }

        @media (max-width: 480px) {
          .cf-icon-grid { grid-template-columns: repeat(8, 1fr); }
        }
      `}</style>
    </form>
  )
}
