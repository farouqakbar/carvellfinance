import { useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { useToast } from './Toast'
import CurrencyInput from './CurrencyInput'
import { getMonthEndDate } from '../utils/formatCurrency'

export default function CategoryForm({ onSuccess, onClose, editData, salary = 0, month }) {
  const { user } = useAuth()
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  // false = Budget (set limit), true = Nominal (langsung catat transaksi)
  const [nominalMode, setNominalMode] = useState(false)

  const [amount, setAmount] = useState(editData?.budget_limit ? String(editData.budget_limit) : '')
  const [txDate, setTxDate] = useState('')

  const [form, setForm] = useState({
    name: '',
    color: '#6366f1',
    is_mandatory: false,
    is_monthly: false,
    is_planned: false,
    ...editData,
  })

  const handleAmountChange = (raw) => {
    setAmount(raw)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name) return
    setLoading(true)
    try {
      const value = parseFloat(amount) || 0
      // Nominal mode tidak set budget_limit (0), budget mode set ke value
      const budgetLimit = nominalMode ? 0 : value
      const payload = {
        user_id: user.id,
        name: form.name,
        budget_limit: budgetLimit,
        color: form.color,
        icon: '',
        is_mandatory: form.is_mandatory || false,
        is_monthly: form.is_monthly || false,
        is_planned: form.is_planned || false,
      }
      let catId = editData?.id
      if (catId) {
        const { error } = await supabase.from('categories').update(payload).eq('id', catId)
        if (error) throw error
        toast('Kategori diperbarui', 'success')
      } else {
        // Kategori baru: simpan dengan month agar hanya muncul di bulan ini
        if (month) payload.month = month
        const { data: newCat, error } = await supabase.from('categories').insert(payload).select('id').single()
        if (error) throw error
        catId = newCat?.id
        toast('Kategori ditambahkan', 'success')
      }

      if (catId && month) {
        if (!nominalMode && value > 0) {
          // Budget mode: upsert ke category_budgets
          const { error } = await supabase.from('category_budgets').upsert(
            { user_id: user.id, category_id: catId, month, budget_limit: value },
            { onConflict: 'category_id,month' }
          )
          if (error) throw error
        } else {
          // Nominal mode atau budget = 0: hapus entry category_budgets bulan ini
          const { error } = await supabase.from('category_budgets').delete()
            .eq('user_id', user.id).eq('category_id', catId).eq('month', month)
          if (error) throw error
        }
      }

      // Nominal mode: catat langsung sebagai transaksi
      if (nominalMode && value > 0 && txDate && catId) {
        const { error } = await supabase.from('transactions').insert({
          user_id: user.id,
          category_id: catId,
          type: 'expense',
          amount: value,
          description: form.name,
          date: txDate,
        })
        if (error) throw error
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

      {form.is_mandatory ? (
        <div className="form-group">
          <label className="form-label">Nominal per bulan</label>
          <CurrencyInput value={amount} onChange={handleAmountChange} />
        </div>
      ) : (
        <>
          {/* Switch utama: Budget vs Nominal */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {nominalMode ? 'Nominal' : 'Budget'}
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginTop: 1 }}>
                {nominalMode ? 'Langsung catat sebagai transaksi' : 'Batasan pengeluaran bulan ini'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setNominalMode(v => !v)}
              style={{
                width: 40, height: 22, borderRadius: 99, border: 'none', cursor: 'pointer',
                background: nominalMode ? 'var(--accent)' : 'var(--border)',
                position: 'relative', transition: 'background 0.2s', flexShrink: 0,
              }}
            >
              <span style={{
                position: 'absolute', top: 3, left: nominalMode ? 21 : 3,
                width: 16, height: 16, borderRadius: '50%',
                background: '#fff', transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }} />
            </button>
          </div>

          {nominalMode ? (
            /* Nominal mode: amount + tanggal → transaksi */
            <>
              <div className="form-group">
                <label className="form-label">Jumlah</label>
                <CurrencyInput value={amount} onChange={handleAmountChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Tanggal</label>
                <input
                  className="form-input"
                  type="date"
                  value={txDate}
                  min={month ? `${month}-01` : undefined}
                  max={month ? getMonthEndDate(month) : undefined}
                  onChange={e => setTxDate(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            /* Budget mode: set budget_limit */
            <div className="form-group">
              <label className="form-label">Nominal budget</label>
              <CurrencyInput value={amount} onChange={handleAmountChange} />
            </div>
          )}
        </>
      )}

      {editData?.id && !form.is_mandatory && (editData.budget_limit > 0) && !nominalMode && (
        <div style={{ marginBottom: 12 }}>
          <button
            type="button"
            onClick={async () => {
              setLoading(true)
              try {
                await Promise.all([
                  supabase.from('categories').update({ budget_limit: 0 }).eq('id', editData.id),
                  supabase.from('category_budgets').delete()
                    .eq('user_id', user.id).eq('category_id', editData.id).eq('month', month),
                ])
                toast('Budget dihapus', 'success')
                onSuccess?.()
                onClose?.()
              } catch (err) {
                toast(err.message, 'error')
              } finally {
                setLoading(false)
              }
            }}
            disabled={loading}
            style={{ fontSize: '0.72rem', color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            × Hapus budget bulan ini
          </button>
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
