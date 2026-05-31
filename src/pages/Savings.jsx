import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { formatCurrency, getCurrentMonth, getMonthLabel } from '../utils/formatCurrency'
import { useToast } from '../components/Toast'
import CurrencyInput from '../components/CurrencyInput'

function prevMonth(m) {
  const [y, mo] = m.split('-').map(Number)
  const d = new Date(y, mo - 2, 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}
function nextMonth(m) {
  const [y, mo] = m.split('-').map(Number)
  const d = new Date(y, mo, 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export default function Savings() {
  const { user } = useAuth()
  const toast = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const [month, setMonth] = useState(() => searchParams.get('month') || getCurrentMonth())
  const [savings, setSavings] = useState([])
  const [logs, setLogs] = useState([])   // savings_log untuk bulan ini
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [logModal, setLogModal] = useState(null)  // {saving, currentLog}
  const [logAmount, setLogAmount] = useState('')

  const isCurrentMonth = month === getCurrentMonth()

  useEffect(() => { fetchData() }, [month])

  const goToMonth = (m) => { setMonth(m); setSearchParams({ month: m }) }

  const fetchData = async () => {
    setLoading(true)
    const [savRes, logRes] = await Promise.all([
      supabase.from('savings').select('*').eq('user_id', user.id).order('created_at'),
      supabase.from('savings_log').select('*').eq('user_id', user.id).eq('month', month),
    ])
    setSavings(savRes.data || [])
    setLogs(logRes.data || [])
    setLoading(false)
  }

  const handleSave = async (form) => {
    try {
      const payload = { name: form.name, target_amount: parseFloat(form.monthly_amount) || 0 }
      if (editData?.id) {
        await supabase.from('savings').update(payload).eq('id', editData.id)
        toast('Tabungan diperbarui', 'success')
      } else {
        await supabase.from('savings').insert({ ...payload, user_id: user.id, current_amount: 0 })
        toast('Tabungan dibuat', 'success')
      }
      setShowForm(false)
      fetchData()
    } catch (err) { toast(err.message, 'error') }
  }

  // Simpan realisasi tabungan bulan ini
  const handleLogSave = async () => {
    if (!logAmount) return
    const amount = parseFloat(logAmount)
    if (!amount || amount < 0) return

    const existing = logs.find(l => l.savings_id === logModal.id)
    const diff = amount - (existing?.amount || 0)  // selisih untuk update current_amount

    // Upsert savings_log untuk bulan ini
    await supabase.from('savings_log').upsert(
      { savings_id: logModal.id, user_id: user.id, month, amount },
      { onConflict: 'savings_id,month' }
    )

    // Update total di tabel savings
    const newTotal = Math.max(0, Number(logModal.current_amount) + diff)
    await supabase.from('savings').update({ current_amount: newTotal }).eq('id', logModal.id)

    toast(`Tabungan ${getMonthLabel(month)} disimpan`, 'success')
    setLogModal(null)
    setLogAmount('')
    fetchData()
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus tabungan ini?')) return
    await supabase.from('savings').delete().eq('id', id)
    toast('Tabungan dihapus', 'success')
    fetchData()
  }

  const totalTerkumpul = savings.reduce((s, sv) => s + Number(sv.current_amount), 0)
  const totalPerBulan = savings.reduce((s, sv) => s + Number(sv.target_amount), 0)
  const totalRealisasiBulanIni = logs.reduce((s, l) => s + Number(l.amount), 0)

  const getLog = (savingsId) => logs.find(l => l.savings_id === savingsId)

  return (
    <div className="animate-in">
      {/* Header + month nav */}
      <div className="sv-page-header mb-20">
        <div>
          <h1 className="page-title">Tabungan</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>
            <span style={{ color: 'var(--success)', fontWeight: 700 }}>{formatCurrency(totalTerkumpul)}</span>
            <span style={{ color: 'var(--text-muted)' }}> total · {formatCurrency(totalPerBulan)}/bln dialokasikan</span>
          </p>
        </div>
        <div className="sv-header-right">
          <div className="month-nav-group">
            <button className="month-btn" onClick={() => goToMonth(prevMonth(month))}>‹</button>
            <span className="month-label-sm">{getMonthLabel(month)}</span>
            <button className="month-btn" onClick={() => goToMonth(nextMonth(month))} disabled={isCurrentMonth}>›</button>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => { setEditData(null); setShowForm(true) }}>
            + Baru
          </button>
        </div>
      </div>

      {/* Ringkasan bulan ini */}
      {savings.length > 0 && (
        <div className="sv-month-summary mb-20">
          <div className="sv-sum-item">
            <span className="sv-sum-label">Dialokasikan {getMonthLabel(month)}</span>
            <span className="sv-sum-val tabular">{formatCurrency(totalPerBulan)}</span>
          </div>
          <div className="sv-sum-divider" />
          <div className="sv-sum-item">
            <span className="sv-sum-label">Direalisasikan</span>
            <span className="sv-sum-val tabular" style={{ color: totalRealisasiBulanIni >= totalPerBulan ? 'var(--success)' : 'var(--warning)' }}>
              {formatCurrency(totalRealisasiBulanIni)}
            </span>
          </div>
          <div className="sv-sum-divider" />
          <div className="sv-sum-item">
            <span className="sv-sum-label">Total Terkumpul</span>
            <span className="sv-sum-val tabular" style={{ color: 'var(--accent)' }}>{formatCurrency(totalTerkumpul)}</span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="sv-grid">
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 160 }} />)}
        </div>
      ) : savings.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">◎</div>
            <strong>Belum ada tabungan</strong>
            <p>Buat tabungan dan tentukan berapa yang disisihkan per bulan</p>
            <button className="btn btn-primary mt-16" onClick={() => setShowForm(true)}>Buat Tabungan</button>
          </div>
        </div>
      ) : (
        <div className="sv-grid">
          {savings.map(sv => {
            const log = getLog(sv.id)
            const realisasi = log ? Number(log.amount) : 0
            const alokasi = Number(sv.target_amount)
            const pct = alokasi > 0 ? Math.min((realisasi / alokasi) * 100, 100) : 0
            const sudahDiisi = realisasi > 0

            return (
              <div key={sv.id} className={`sv-card ${sudahDiisi ? 'sv-filled' : ''}`}>
                <div className="sv-card-header">
                  <span className="sv-name">{sv.name}</span>
                  <div className="sv-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => { setEditData(sv); setShowForm(true) }}>✎</button>
                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(sv.id)}>✕</button>
                  </div>
                </div>

                {/* Bulan ini */}
                <div className="sv-month-row">
                  <div>
                    <div className="sv-row-label">Bulan ini</div>
                    <div className="sv-realisasi tabular" style={{ color: sudahDiisi ? 'var(--success)' : 'var(--text-muted)' }}>
                      {sudahDiisi ? formatCurrency(realisasi) : '—'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="sv-row-label">Alokasi</div>
                    <div className="sv-alokasi tabular">{formatCurrency(alokasi)}/bln</div>
                  </div>
                </div>

                {/* Progress bar bulan ini */}
                {alokasi > 0 && (
                  <div className="progress-bar" style={{ height: 5 }}>
                    <div className="progress-fill" style={{
                      width: `${pct}%`,
                      background: pct >= 100 ? 'var(--success)' : 'var(--accent)',
                    }} />
                  </div>
                )}

                {/* Total terkumpul */}
                <div className="sv-total-row">
                  <span className="sv-row-label">Total terkumpul</span>
                  <span className="sv-total tabular">{formatCurrency(sv.current_amount)}</span>
                </div>

                <button
                  className="sv-log-btn"
                  onClick={() => {
                    setLogModal(sv)
                    setLogAmount(log ? String(log.amount) : '')
                  }}
                >
                  {sudahDiisi ? `✓ Ubah realisasi ${getMonthLabel(month)}` : `+ Catat tabungan ${getMonthLabel(month)}`}
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Form modal */}
      {showForm && <SavingsForm editData={editData} onSave={handleSave} onClose={() => setShowForm(false)} />}

      {/* Log modal */}
      {logModal && (
        <div className="modal-overlay" onClick={() => setLogModal(null)}>
          <div className="modal" style={{ maxWidth: 360 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">{logModal.name}</h2>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{getMonthLabel(month)}</p>
              </div>
              <button className="btn btn-ghost" onClick={() => setLogModal(null)}>✕</button>
            </div>
            <div className="form-group">
              <label className="form-label">Berapa yang ditabung bulan ini?</label>
              <CurrencyInput value={logAmount} onChange={setLogAmount} autoFocus />
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 6 }}>
                Alokasi: {formatCurrency(logModal.target_amount)}/bulan
              </p>
            </div>
            <div className="flex gap-8 mt-16">
              <button className="btn btn-secondary" onClick={() => setLogModal(null)}>Batal</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleLogSave} disabled={!logAmount}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .sv-page-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap; }
        .sv-header-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .month-nav-group { display: flex; align-items: center; gap: 2px; }
        .month-btn {
          width: 28px; height: 28px; border: none; background: none;
          color: var(--text-muted); font-size: 1.1rem; cursor: pointer;
          border-radius: var(--radius-sm); display: flex; align-items: center;
          justify-content: center; font-family: var(--font-sans); transition: all 0.15s;
        }
        .month-btn:hover { background: var(--bg-input); color: var(--text-primary); }
        .month-btn:disabled { opacity: 0.25; cursor: not-allowed; }
        .month-label-sm { font-size: 0.8125rem; font-weight: 700; color: var(--text-primary); padding: 0 6px; white-space: nowrap; }

        .sv-month-summary {
          display: flex; align-items: center;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-lg); overflow: hidden;
        }
        .sv-sum-item { flex: 1; padding: 14px 18px; display: flex; flex-direction: column; gap: 4px; }
        .sv-sum-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.07em; color: var(--text-muted); font-weight: 600; }
        .sv-sum-val { font-size: 1rem; font-weight: 800; letter-spacing: -0.025em; }
        .sv-sum-divider { width: 1px; align-self: stretch; background: var(--border); }

        .sv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }

        .sv-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 18px 20px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .sv-card.sv-filled { border-color: rgba(52,211,153,0.3); }

        .sv-card-header { display: flex; justify-content: space-between; align-items: center; }
        .sv-name { font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; }
        .sv-actions { display: flex; gap: 2px; }

        .sv-month-row { display: flex; justify-content: space-between; align-items: flex-end; }
        .sv-row-label { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); font-weight: 600; margin-bottom: 3px; }
        .sv-realisasi { font-size: 1.25rem; font-weight: 800; letter-spacing: -0.03em; }
        .sv-alokasi { font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); }

        .sv-total-row { display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid var(--border); }
        .sv-total { font-size: 0.875rem; font-weight: 700; color: var(--accent); }

        .sv-log-btn {
          width: 100%; padding: 9px; border: 1px solid var(--border);
          border-radius: var(--radius-sm); background: var(--bg-input);
          font-family: var(--font-sans); font-size: 0.775rem; font-weight: 600;
          color: var(--text-secondary); cursor: pointer; transition: all 0.15s; text-align: center;
        }
        .sv-log-btn:hover { background: var(--accent-dim); border-color: var(--accent); color: var(--accent); }

        @media (max-width: 768px) {
          .sv-month-summary { flex-direction: column; }
          .sv-sum-divider { width: 100%; height: 1px; align-self: auto; }
          .sv-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

function SavingsForm({ editData, onSave, onClose }) {
  const [form, setForm] = useState({
    name: editData?.name || '',
    monthly_amount: editData?.target_amount ? String(Math.round(editData.target_amount)) : '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name) return
    setLoading(true)
    await onSave(form)
    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{editData?.id ? 'Edit Tabungan' : 'Tabungan Baru'}</h2>
          <button className="btn btn-ghost" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nama Tabungan</label>
            <input
              className="form-input" type="text"
              placeholder="Dana Darurat, Liburan, Motor..."
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Alokasi per Bulan</label>
            <CurrencyInput
              value={form.monthly_amount}
              onChange={raw => setForm(f => ({ ...f, monthly_amount: raw }))}
            />
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 6 }}>
              Jumlah yang akan disisihkan setiap bulan
            </p>
          </div>
          <div className="flex gap-8 mt-16">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
              {loading ? 'Menyimpan...' : editData?.id ? 'Perbarui' : 'Buat'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
