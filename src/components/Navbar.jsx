import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogoWordmark, LogoMark } from './Logo'

const navItems = [
  { to: '/dashboard', icon: '⬡', label: 'Dashboard' },
  { to: '/savings', icon: '◎', label: 'Rencana' },
  { to: '/report', icon: '▤', label: 'Laporan' },
]

const mobileItems = navItems

export default function Navbar({ darkMode, setDarkMode }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const name = user?.full_name || user?.username || 'User'
  const initial = name.charAt(0).toUpperCase()

  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const dateStr = now.toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'short', year: 'numeric',
  })
  const timeStr = now.toLocaleTimeString('id-ID', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  })

  return (
    <>
      <nav className="sidebar">
        <div className="sidebar-logo">
          <LogoWordmark dark={darkMode} size="md" id="nav-logo" />
        </div>

        <div className="sidebar-nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="datetime-card">
            <span className="datetime-date">{dateStr}</span>
            <div className="datetime-time">{timeStr}</div>
          </div>

          {/* Weather toggle */}
          <div className="weather-toggle">
            <button
              type="button"
              className={`weather-btn weather-night ${darkMode ? 'active' : ''}`}
              onClick={() => setDarkMode(true)}
            >
              <span className="weather-icon">◑</span>
              <span className="weather-label">Gelap</span>
              {darkMode && <span className="weather-star">✦</span>}
            </button>
            <button
              type="button"
              className={`weather-btn weather-day ${!darkMode ? 'active' : ''}`}
              onClick={() => setDarkMode(false)}
            >
              <span className="weather-icon">☀</span>
              <span className="weather-label">Terang</span>
            </button>
          </div>

          <div className="user-chip">
            <div className="user-avatar">{initial}</div>
            <div className="user-detail">
              <div className="user-name truncate">{name}</div>
              <button className="sign-out-btn" onClick={handleSignOut}>Keluar</button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile topbar ─────────────────── */}
      <header className="mobile-topbar">
        {/* Row 1: Logo + controls */}
        <div className="mtp-row1">
          <div className="mtp-logo">
            <LogoMark size={22} id="mobile-logo" />
            <span className="mtp-logo-text">Cashvell</span>
          </div>

          <div className="mtp-controls">
            {/* Theme toggle compact */}
            <div className="mtp-theme">
              <button
                type="button"
                className={`mtp-theme-btn mtp-night ${darkMode ? 'active' : ''}`}
                onClick={() => setDarkMode(true)}
                title="Gelap"
              >◑</button>
              <button
                type="button"
                className={`mtp-theme-btn mtp-day ${!darkMode ? 'active' : ''}`}
                onClick={() => setDarkMode(false)}
                title="Terang"
              >☀</button>
            </div>

            {/* Profile avatar */}
            <div className="mtp-avatar">{initial}</div>
          </div>
        </div>

        {/* Row 2: Date + time + signout */}
        <div className="mtp-row2">
          <span className="mtp-datetime">{dateStr} · {timeStr}</span>
          <button className="mtp-signout" onClick={handleSignOut}>
            {name} · Keluar
          </button>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="mobile-nav">
        {mobileItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="mobile-nav-icon">{item.icon}</span>
            <span className="mobile-nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <style>{`
        .sidebar {
          position: fixed;
          left: 0; top: 0; bottom: 0;
          width: 240px;
          background: var(--bg-card);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 20px 12px;
          z-index: 100;
        }

        .sidebar-logo {
          padding: 4px 8px 24px;
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          color: var(--text-muted);
          font-size: 0.8125rem;
          font-weight: 600;
          transition: all 0.15s;
          letter-spacing: -0.01em;
          position: relative;
        }
        .nav-item:hover {
          color: var(--text-primary);
          background: var(--bg-input);
        }
        .nav-item.active {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .nav-item.active::before {
          content: '';
          position: absolute;
          left: 0; top: 20%; bottom: 20%;
          width: 3px;
          background: var(--accent);
          border-radius: 0 3px 3px 0;
        }
        .nav-icon {
          font-size: 0.95rem;
          width: 18px;
          text-align: center;
          flex-shrink: 0;
        }

        .sidebar-bottom {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
        }

        .datetime-card {
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 9px 11px 8px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .datetime-date {
          font-size: 0.62rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.01em;
          text-transform: capitalize;
          line-height: 1;
        }
        .datetime-time {
          font-size: 1.05rem;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          line-height: 1;
        }

        /* Weather toggle */
        .weather-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3px;
          padding: 3px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
        }
        .weather-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 8px 6px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 700;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
          color: var(--text-muted);
          position: relative;
          overflow: hidden;
          letter-spacing: -0.01em;
        }
        .weather-btn:hover:not(.active) {
          background: var(--bg-card);
          color: var(--text-secondary);
        }
        .weather-night.active {
          background: linear-gradient(135deg, #0d1235 0%, #1e1b4b 100%);
          color: #c7d2fe;
          box-shadow: 0 1px 4px rgba(0,0,0,0.4), inset 0 0 14px rgba(99,102,241,0.15);
        }
        .weather-day.active {
          background: linear-gradient(135deg, #fffbeb 0%, #fde68a 100%);
          color: #92400e;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1), inset 0 0 14px rgba(245,158,11,0.15);
        }
        .weather-icon {
          font-size: 1rem;
          line-height: 1;
        }
        .weather-label { line-height: 1; }
        .weather-star {
          position: absolute;
          top: 4px;
          right: 6px;
          font-size: 0.45rem;
          color: #a5b4fc;
          animation: twinkle 2.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(0.6); }
        }

        .user-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 10px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          background: var(--bg-input);
        }
        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--accent-dim);
          border: 1.5px solid var(--accent);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.75rem;
          flex-shrink: 0;
          letter-spacing: 0;
        }
        .user-detail { flex: 1; min-width: 0; }
        .user-name {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }
        .sign-out-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 0.68rem;
          cursor: pointer;
          padding: 0;
          font-family: var(--font-sans);
          font-weight: 500;
          transition: color 0.15s;
          display: block;
          margin-top: 1px;
        }
        .sign-out-btn:hover { color: var(--danger); }

        /* ── Mobile topbar ─────────────────── */
        .mobile-topbar {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0;
          background: var(--bg-card);
          border-bottom: 1px solid var(--border);
          z-index: 100;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }

        .mtp-row1 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          height: 50px;
        }

        .mtp-logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mtp-logo-text {
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: -0.035em;
          color: var(--text-primary);
        }

        .mtp-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Compact weather toggle */
        .mtp-theme {
          display: flex;
          gap: 2px;
          padding: 2px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: 7px;
        }
        .mtp-theme-btn {
          width: 32px;
          height: 28px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: var(--text-muted);
          transition: all 0.2s;
          font-family: var(--font-sans);
        }
        .mtp-night.active {
          background: linear-gradient(135deg, #0d1235, #1e1b4b);
          color: #c7d2fe;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        .mtp-day.active {
          background: linear-gradient(135deg, #fffbeb, #fde68a);
          color: #92400e;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .mtp-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--accent-dim);
          border: 1.5px solid var(--accent);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.78rem;
          flex-shrink: 0;
        }

        .mtp-row2 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          height: 28px;
          background: var(--bg-input);
          border-top: 1px solid var(--border);
        }
        .mtp-datetime {
          font-size: 0.63rem;
          font-weight: 600;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.01em;
          text-transform: capitalize;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mtp-signout {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 0.63rem;
          font-family: var(--font-sans);
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
          margin-left: 8px;
          transition: color 0.15s;
        }
        .mtp-signout:hover { color: var(--danger); }

        /* ── Mobile bottom nav ──────────────── */
        .mobile-nav {
          display: none;
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: var(--bg-card);
          border-top: 1px solid var(--border);
          z-index: 100;
          padding: 6px 8px max(8px, env(safe-area-inset-bottom));
          grid-template-columns: repeat(3, 1fr);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
        }
        .mobile-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding: 6px 4px;
          text-decoration: none;
          color: var(--text-muted);
          transition: color 0.15s;
          border-radius: var(--radius-sm);
          min-height: 46px;
        }
        .mobile-nav-item.active { color: var(--accent); }
        .mobile-nav-item:active { background: var(--bg-input); }
        .mobile-nav-icon { font-size: 1.1rem; line-height: 1; }
        .mobile-nav-label { font-size: 0.58rem; font-weight: 600; letter-spacing: 0.02em; }

        @media (max-width: 768px) {
          .sidebar { display: none; }
          .mobile-topbar { display: block; }
          .mobile-nav { display: grid; }
        }
      `}</style>
    </>
  )
}
