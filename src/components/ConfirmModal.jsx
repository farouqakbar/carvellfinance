import { IconX } from './Icons'

export default function ConfirmModal({ title, message, confirmLabel = 'Hapus', onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button type="button" className="btn btn-ghost" onClick={onCancel}><IconX size={16} /></button>
        </div>
        {message && (
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>
            {message}
          </p>
        )}
        <div className="flex gap-8">
          <button type="button" className="btn btn-secondary btn-lg" style={{ flex: 1 }} onClick={onCancel}>Batal</button>
          <button type="button" className="btn btn-danger btn-lg" style={{ flex: 1 }} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
