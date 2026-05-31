export default function ConfirmModal({ title, message, confirmLabel = 'Hapus', onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" style={{ maxWidth: 360 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button type="button" className="btn btn-ghost" onClick={onCancel}>✕</button>
        </div>
        {message && (
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.55 }}>
            {message}
          </p>
        )}
        <div className="flex gap-8">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Batal</button>
          <button type="button" className="btn btn-danger" style={{ flex: 1 }} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
