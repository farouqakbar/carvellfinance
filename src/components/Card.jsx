export default function Card({ children, className = '', onClick, style }) {
  return (
    <div
      className={`card ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
    >
      {children}
    </div>
  )
}

export function StatCard({ icon, label, value, sub, color = 'var(--accent)', trend }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ color, background: `${color}18` }}>{icon}</div>
      <div className="stat-body">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
        {sub && <div className="stat-sub">{sub}</div>}
      </div>
      {trend !== undefined && (
        <div className={`stat-trend ${trend >= 0 ? 'up' : 'down'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </div>
      )}
      <style>{`
        .stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: all 0.2s;
        }
        .stat-card:hover { border-color: var(--border-light); transform: translateY(-1px); }
        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        .stat-body { flex: 1; min-width: 0; }
        .stat-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 500; }
        .stat-value { font-size: 1.3rem; font-weight: 600; color: var(--text-primary); margin-top: 4px; }
        .stat-sub { font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px; }
        .stat-trend { font-size: 0.75rem; font-weight: 500; padding: 3px 8px; border-radius: 99px; }
        .stat-trend.up { color: var(--success); background: var(--success-dim); }
        .stat-trend.down { color: var(--danger); background: var(--danger-dim); }
      `}</style>
    </div>
  )
}
