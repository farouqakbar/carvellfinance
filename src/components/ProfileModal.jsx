import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../services/supabaseClient'
import CurrencyInput from './CurrencyInput'
import { useToast } from './Toast'
import { IconX, IconAlertTriangle } from './Icons'

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
  const { user, updateProfile } = useAuth()
  const toast = useToast()

  const [fullName, setFullName] = useState(user?.full_name || '')
  const [startMonth, setStartMonth] = useState(user?.recording_start_month || '')
  const [saldoAwal, setSaldoAwal] = useState(String(user?.saldo_awal || ''))
  const [tabunganAwal, setTabunganAwal] = useState(String(user?.tabungan_awal || ''))
  const [budgetHarian, setBudgetHarian] = useState(String(user?.budget_harian || ''))
  const [saving, setSaving] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [resetting, setResetting] = useState(false)

  const handleReset = async () => {
    setResetting(true)
    try {
      const uid = user.id
      await Promise.all([
        supabase.from('transactions').delete().eq('user_id', uid),
        supabase.from('category_budgets').delete().eq('user_id', uid),
        supabase.from('savings_log').delete().eq('user_id', uid),
        supabase.from('hutang').delete().eq('user_id', uid),
      ])
      await supabase.from('categories').delete().eq('user_id', uid)
      await supabase.from('savings').delete().eq('user_id', uid)
      await supabase.from('user_profiles').update({
        recording_start_month: null,
        saldo_awal: 0,
        tabungan_awal: 0,
        budget_harian: 0,
      }).eq('id', uid)
      toast('Semua data berhasil dihapus', 'success')
      setTimeout(() => window.location.reload(), 800)
    } catch {
      toast('Gagal menghapus data', 'error')
      setResetting(false)
    }
  }

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
          <button className="btn btn-ghost" onClick={onClose}><IconX size={16} /></button>
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

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, paddingTop: 4 }}>
            <button className="btn btn-ghost btn-sm" onClick={onClose} disabled={saving}>Batal</button>
            <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>

          {/* ── Danger zone ── */}
          <div className="pf-danger-zone">
            <div className="pf-danger-label">ZONA BERBAHAYA</div>

            {!showResetConfirm ? (
              <button
                className="pf-reset-btn"
                onClick={() => setShowResetConfirm(true)}
                disabled={saving}
              >
                Reset semua data
              </button>
            ) : (
              <div className="pf-reset-confirm">
                <div className="pf-reset-warn">
                  <IconAlertTriangle size={14} />
                  <span>
                    <strong>Tidak bisa dibatalkan.</strong> Semua transaksi, kategori, budget,
                    tabungan, dan hutang akan dihapus permanen. Akun kamu tetap ada.
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setShowResetConfirm(false)}
                    disabled={resetting}
                    style={{ flex: 1 }}
                  >
                    Batal
                  </button>
                  <button
                    className="pf-reset-confirm-btn"
                    onClick={handleReset}
                    disabled={resetting}
                    style={{ flex: 1 }}
                  >
                    {resetting ? 'Menghapus...' : 'Ya, Hapus Semua'}
                  </button>
                </div>
              </div>
            )}
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

        .pf-danger-zone {
          border-top: 1px solid rgba(248,113,113,0.15);
          padding-top: 16px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .pf-danger-label {
          font-size: 0.55rem; font-weight: 700; letter-spacing: 0.12em;
          color: rgba(248,113,113,0.5); text-transform: uppercase;
        }
        .pf-reset-btn {
          display: inline-flex; align-items: center;
          padding: 7px 14px; border-radius: 7px;
          font-size: 0.78rem; font-weight: 600;
          color: #f87171;
          background: rgba(248,113,113,0.06);
          border: 1px solid rgba(248,113,113,0.2);
          cursor: pointer; transition: all 0.15s;
          font-family: var(--font-sans);
          align-self: flex-start;
        }
        .pf-reset-btn:hover {
          background: rgba(248,113,113,0.1);
          border-color: rgba(248,113,113,0.35);
        }
        .pf-reset-confirm {
          display: flex; flex-direction: column; gap: 12px;
          background: rgba(248,113,113,0.06);
          border: 1px solid rgba(248,113,113,0.2);
          border-radius: 9px; padding: 12px;
        }
        .pf-reset-warn {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 0.75rem; color: #f87171; line-height: 1.5;
        }
        .pf-reset-warn svg { flex-shrink: 0; margin-top: 2px; }
        .pf-reset-confirm-btn {
          padding: 8px 14px; border-radius: 7px;
          font-size: 0.78rem; font-weight: 700;
          color: #fff; background: #ef4444;
          border: none; cursor: pointer; transition: all 0.15s;
          font-family: var(--font-sans);
        }
        .pf-reset-confirm-btn:hover { background: #dc2626; }
        .pf-reset-confirm-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>
    </div>
  )
}
