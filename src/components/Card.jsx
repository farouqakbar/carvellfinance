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
      <div className="stat-icon-wrap" style={{ background: `${color}14`, color }}>
        <span className="stat-icon-glyph">{icon}</span>
      </div>
      <div className="stat-body">
        <div className="stat-label">{label}</div>
        <div className="stat-value tabular">{value}</div>
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
          padding: 18px 20px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          transition: border-color 0.2s, transform 0.15s;
        }
        .stat-card:hover {
          border-color: var(--border-light);
          transform: translateY(-1px);
        }
        .stat-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .stat-icon-glyph { font-size: 1rem; }
        .stat-body { flex: 1; min-width: 0; }
        .stat-label {
          font-size: 0.68rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .stat-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.025em;
          line-height: 1.2;
          font-variant-numeric: tabular-nums;
        }
        .stat-sub {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 3px;
          font-weight: 500;
        }
        .stat-trend {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 3px 7px;
          border-radius: 99px;
          white-space: nowrap;
          margin-top: 2px;
        }
        .stat-trend.up { color: var(--success); background: var(--success-dim); }
        .stat-trend.down { color: var(--danger); background: var(--danger-dim); }
      `}</style>
    </div>
  )
}
