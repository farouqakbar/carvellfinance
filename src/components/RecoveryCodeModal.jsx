import { useState } from 'react'
import { useToast } from './Toast'
import { copyToClipboard } from '../utils/clipboard'
import { IconKey, IconAlertTriangle, IconCopy, IconCheck, IconDownload } from './Icons'

export default function RecoveryCodeModal({ code, reason = 'signup', username, onClose }) {
  const toast = useToast()
  const [copied, setCopied] = useState(false)
  const [acknowledged, setAcknowledged] = useState(false)

  const handleCopy = async () => {
    const ok = await copyToClipboard(code)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast('Recovery code disalin', 'success')
    } else {
      toast('Gagal menyalin — catat manual ya', 'error')
    }
  }

  const handleDownload = () => {
    const body = [
      'CASHVELL — RECOVERY CODE',
      username ? `Akun: @${username}` : '',
      '',
      code,
      '',
      'Simpan file ini di tempat aman.',
      'Kode ini dipakai untuk reset password kalau kamu lupa.',
      'Kode akan diganti otomatis setiap kali dipakai reset.',
    ].filter(Boolean).join('\n')

    const url = URL.createObjectURL(new Blob([body], { type: 'text/plain' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `cashvell-recovery-code${username ? '-' + username : ''}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const title = reason === 'signup' ? 'Simpan recovery code kamu' : 'Recovery code baru'
  const sub = reason === 'signup'
    ? 'Cashvell tidak pakai email, jadi kode ini satu-satunya cara memulihkan akun kalau kamu lupa password.'
    : 'Kode lama sudah tidak berlaku. Pakai kode baru ini kalau kamu lupa password.'

  return (
    <div className="modal-overlay rc-overlay">
      <div className="modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="rc-icon"><IconKey size={17} /></div>
            <div>
              <h2 className="modal-title">{title}</h2>
              {username && (
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 1 }}>@{username}</p>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p className="rc-sub">{sub}</p>

          <div className="rc-code-box">
            <code className="rc-code">{code}</code>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost btn-sm rc-action" onClick={handleCopy}>
              {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
              {copied ? 'Tersalin' : 'Salin'}
            </button>
            <button className="btn btn-ghost btn-sm rc-action" onClick={handleDownload}>
              <IconDownload size={14} />
              Unduh .txt
            </button>
          </div>

          <div className="rc-warn">
            <IconAlertTriangle size={14} />
            <span>
              <strong>Kode ini cuma ditampilkan sekali.</strong> Kalau hilang, kamu masih bisa
              buat yang baru lewat Profil &rsaquo; Keamanan — tapi hanya selama kamu masih bisa masuk.
            </span>
          </div>

          <label className="rc-ack">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={e => setAcknowledged(e.target.checked)}
            />
            <span>Saya sudah menyimpan kode ini di tempat aman</span>
          </label>

          <button
            className="btn btn-primary btn-block"
            onClick={onClose}
            disabled={!acknowledged}
          >
            Selesai
          </button>
        </div>
      </div>

      <style>{`
        .rc-overlay { z-index: 1200; }
        .rc-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: var(--accent-dim);
          border: 1px solid var(--accent);
          color: var(--accent);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .rc-sub { font-size: 0.8rem; line-height: 1.6; color: var(--text-secondary); }

        .rc-code-box {
          background: var(--accent-dim);
          border: 1px dashed rgba(99,102,241,0.45);
          border-radius: var(--radius-sm);
          padding: 16px 12px;
          text-align: center;
        }
        .rc-code {
          font-family: var(--font-mono, ui-monospace, "SF Mono", Menlo, monospace);
          font-size: clamp(1rem, 4.5vw, 1.35rem);
          font-weight: 700; letter-spacing: 0.08em;
          color: var(--text-primary);
          user-select: all;
          word-break: break-all;
        }

        .rc-action { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; }

        .rc-warn {
          display: flex; align-items: flex-start; gap: 8px;
          background: rgba(245,158,11,0.07);
          border: 1px solid rgba(245,158,11,0.22);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          font-size: 0.73rem; line-height: 1.55; color: #f59e0b;
        }
        .rc-warn svg { flex-shrink: 0; margin-top: 2px; }

        .rc-ack {
          display: flex; align-items: flex-start; gap: 9px;
          font-size: 0.78rem; color: var(--text-secondary);
          cursor: pointer; line-height: 1.5;
        }
        .rc-ack input { margin-top: 2px; accent-color: var(--accent); cursor: pointer; flex-shrink: 0; }
      `}</style>
    </div>
  )
}
