import { useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { useToast } from './Toast'

const ICONS = ['🍜','🚗','🛍️','🎮','💊','📱','✈️','📚','🏠','⚡','💰','🎓','🏋️','🎬','☕','🍔','🎁','💇','🐾','🌱']
const COLORS = ['#f59e0b','#3b82f6','#ec4899','#8b5cf6','#10b981','#ef4444','#f97316','#06b6d4','#84cc16','#a855f7']

export default function CategoryForm({ onSuccess, onClose, editData }) {
  const { user } = useAuth()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    budget_limit: '',
    color: '#6366f1',
    icon: '💰',
    ...editData
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
      <div className="form-group">
        <label className="form-label">Nama Kategori</label>
        <input
          className="form-input"
          type="text"
          placeholder="Misal: Makan & Minum"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Batas Budget (Rp)</label>
        <input
          className="form-input"
          type="number"
          placeholder="0"
          value={form.budget_limit}
          onChange={e => setForm(f => ({ ...f, budget_limit: e.target.value }))}
          min="0"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Icon</label>
        <div className="icon-grid">
          {ICONS.map(icon => (
            <button
              key={icon}
              type="button"
              className={`icon-btn ${form.icon === icon ? 'selected' : ''}`}
              onClick={() => setForm(f => ({ ...f, icon }))}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Warna</label>
        <div className="color-grid">
          {COLORS.map(color => (
            <button
              key={color}
              type="button"
              className={`color-btn ${form.color === color ? 'selected' : ''}`}
              style={{ background: color }}
              onClick={() => setForm(f => ({ ...f, color }))}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-8 mt-16">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
        <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
          {loading ? 'Menyimpan...' : editData?.id ? 'Perbarui' : 'Simpan'}
        </button>
      </div>

      <style>{`
        .icon-grid {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 4px;
        }
        .icon-btn {
          background: var(--bg-input);
          border: 2px solid transparent;
          border-radius: 6px;
          padding: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.15s;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-btn:hover { border-color: var(--border-light); }
        .icon-btn.selected { border-color: var(--accent); background: var(--accent-dim); }

        .color-grid {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .color-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 3px solid transparent;
          cursor: pointer;
          transition: all 0.15s;
          outline-offset: 2px;
        }
        .color-btn:hover { transform: scale(1.1); }
        .color-btn.selected { outline: 2px solid var(--text-primary); }
      `}</style>
    </form>
  )
}
