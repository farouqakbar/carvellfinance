import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import CurrencyInput from './CurrencyInput'
import { useToast } from './Toast'

function getPastMonthOptions() {
  const opts = []
  const now = new Date()
  for (let i = 0; i < 36; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
    opts.push({ val, label })
  }
  return opts
}

const MONTH_OPTS = getPastMonthOptions()

export default function ProfileModal({ onClose }) {
  const { user, updateProfile, signOut } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState(user?.full_name || '')
  const [startMonth, setStartMonth] = useState(user?.recording_start_month || '')
  const [saldoAwal, setSaldoAwal] = useState(String(user?.saldo_awal || ''))
  const [tabunganAwal, setTabunganAwal] = useState(String(user?.tabungan_awal || ''))
  const [budgetHarian, setBudgetHarian] = useState(String(user?.budget_harian || ''))
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateProfile({
        full_name: fullName.trim() || user.username,
        recording_start_month: startMonth || null,
        saldo_awal: parseFloat(saldoAwal) || 0,
        tabungan_awal: parseFloat(tabunganAwal) || 0,
        budget_harian: parseFloat(budgetHarian) || 0,
      })
      toast('Profil disimpan', 'success')
      onClose()
    } catch {
      toast('Gagal menyimpan', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="prof-avatar">
              {(user?.full_name || user?.username || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="modal-title">Profil</h2>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 1 }}>
                @{user?.username}
              </p>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={onClose}>✕</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          <div className="pf-group">
            <label className="pf-label">Nama</label>
            <input
              className="form-input"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder={user?.username}
            />
          </div>

          <div className="pf-group">
            <label className="pf-label">Mulai pencatatan dari</label>
            <select
              className="form-input"
              value={startMonth}
              onChange={e => setStartMonth(e.target.value)}
            >
              <option value="">Semua data (tanpa filter)</option>
              {MONTH_OPTS.map(o => (
                <option key={o.val} value={o.val}>{o.label}</option>
              ))}
            </select>
            <p className="pf-hint">Data sebelum bulan ini tidak dihitung di saldo</p>
          </div>

          <div className="pf-group">
            <label className="pf-label">Saldo awal</label>
            <CurrencyInput value={saldoAwal} onChange={setSaldoAwal} />
            <p className="pf-hint">Total uang yang kamu punya sebelum mulai nyatet</p>
          </div>

          <div className="pf-group">
            <label className="pf-label">Tabungan awal</label>
            <CurrencyInput value={tabunganAwal} onChange={setTabunganAwal} />
            <p className="pf-hint">Tabungan yang sudah ada sebelum mulai nyatet</p>
          </div>

          <div className="pf-group">
            <label className="pf-label">Budget harian <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(opsional)</span></label>
            <CurrencyInput value={budgetHarian} onChange={setBudgetHarian} />
            <p className="pf-hint">Batas pengeluaran per hari — akan muncul indikator di dashboard</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 }}>
            <button
              className="btn btn-ghost btn-sm"
              style={{ color: 'var(--danger)', fontSize: '0.78rem' }}
              onClick={handleLogout}
            >
              Keluar
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost btn-sm" onClick={onClose} disabled={saving}>Batal</button>
              <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .prof-avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: var(--accent-dim);
          border: 2px solid var(--accent);
          color: var(--accent);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 1rem;
          flex-shrink: 0;
        }
        .pf-group { display: flex; flex-direction: column; gap: 6px; }
        .pf-label { font-size: 0.78rem; font-weight: 600; color: var(--text-primary); }
        .pf-hint { font-size: 0.68rem; color: var(--text-muted); margin-top: 2px; }
      `}</style>
    </div>
  )
}
