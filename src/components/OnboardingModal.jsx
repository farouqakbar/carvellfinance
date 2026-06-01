import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import CurrencyInput from './CurrencyInput'
import { getCurrentMonth } from '../utils/formatCurrency'

function getPastMonthOptions() {
  const opts = []
  const now = new Date()
  for (let i = 0; i < 24; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
    opts.push({ val, label })
  }
  return opts
}

const MONTH_OPTS = getPastMonthOptions()

export default function OnboardingModal({ onClose }) {
  const { updateProfile } = useAuth()
  const [startMonth, setStartMonth] = useState(getCurrentMonth())
  const [saldoAwal, setSaldoAwal] = useState('')
  const [tabunganAwal, setTabunganAwal] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateProfile({
        recording_start_month: startMonth,
        saldo_awal: parseFloat(saldoAwal) || 0,
        tabungan_awal: parseFloat(tabunganAwal) || 0,
      })
      onClose()
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const handleSkip = async () => {
    setSaving(true)
    try {
      await updateProfile({
        recording_start_month: getCurrentMonth(),
        saldo_awal: 0,
        tabungan_awal: 0,
      })
      onClose()
    } catch {
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Selamat datang! 👋</h2>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Setup awal pencatatan keuanganmu
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          <div className="ob-group">
            <label className="ob-label">Mulai pencatatan dari bulan apa?</label>
            <select
              className="form-input"
              value={startMonth}
              onChange={e => setStartMonth(e.target.value)}
            >
              {MONTH_OPTS.map(o => (
                <option key={o.val} value={o.val}>{o.label}</option>
              ))}
            </select>
            <p className="ob-hint">Data sebelum bulan ini tidak akan dihitung</p>
          </div>

          <div className="ob-group">
            <label className="ob-label">
              Saldo awal <span className="ob-opt">(opsional)</span>
            </label>
            <CurrencyInput value={saldoAwal} onChange={setSaldoAwal} />
            <p className="ob-hint">Total uang yang kamu punya sebelum mulai nyatet</p>
          </div>

          <div className="ob-group">
            <label className="ob-label">
              Tabungan awal <span className="ob-opt">(opsional)</span>
            </label>
            <CurrencyInput value={tabunganAwal} onChange={setTabunganAwal} />
            <p className="ob-hint">Tabungan yang sudah ada sebelum mulai nyatet</p>
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost btn-sm" onClick={handleSkip} disabled={saving}>
              Lewati
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
              {saving ? 'Menyimpan...' : 'Mulai'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .ob-group { display: flex; flex-direction: column; gap: 6px; }
        .ob-label { font-size: 0.78rem; font-weight: 600; color: var(--text-primary); }
        .ob-opt { font-weight: 400; color: var(--text-muted); }
        .ob-hint { font-size: 0.68rem; color: var(--text-muted); }
      `}</style>
    </div>
  )
}
