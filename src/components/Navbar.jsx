import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogoWordmark, LogoMark } from './Logo'

const navItems = [
  { to: '/dashboard', icon: '⬡', label: 'Dashboard' },
  { to: '/transactions', icon: '↕', label: 'Transaksi' },
  { to: '/categories', icon: '◈', label: 'Kategori' },
  { to: '/savings', icon: '◎', label: 'Tabungan' },
  { to: '/report', icon: '▤', label: 'Laporan' },
]

const mobileItems = navItems.slice(0, 4)

export default function Navbar({ darkMode, setDarkMode }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const name = user?.full_name || user?.username || 'User'
  const initial = name.charAt(0).toUpperCase()

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
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Mode terang' : 'Mode gelap'}
          >
            {darkMode ? '☀' : '◑'}
          </button>

          <div className="user-chip">
            <div className="user-avatar">{initial}</div>
            <div className="user-detail">
              <div className="user-name truncate">{name}</div>
              <button className="sign-out-btn" onClick={handleSignOut}>Keluar</button>
            </div>
          </div>
        </div>
      </nav>

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
          padding: 9px 10px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 0.8125rem;
          font-weight: 600;
          transition: all 0.15s;
          letter-spacing: -0.01em;
        }
        .nav-item:hover {
          color: var(--text-primary);
          background: var(--bg-input);
        }
        .nav-item.active {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .nav-icon {
          font-size: 0.95rem;
          width: 18px;
          text-align: center;
          flex-shrink: 0;
          opacity: 0.8;
        }
        .nav-item.active .nav-icon { opacity: 1; }

        .sidebar-bottom {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }

        .theme-toggle {
          background: none;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 7px;
          cursor: pointer;
          color: var(--text-muted);
          font-size: 0.875rem;
          transition: all 0.15s;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          align-self: flex-start;
        }
        .theme-toggle:hover {
          color: var(--accent);
          border-color: var(--accent);
          background: var(--accent-dim);
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

        /* Mobile */
        .mobile-nav {
          display: none;
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: var(--bg-card);
          border-top: 1px solid var(--border);
          z-index: 100;
          padding: 8px 8px max(10px, env(safe-area-inset-bottom));
          grid-template-columns: repeat(4, 1fr);
          box-shadow: 0 -4px 24px rgba(0,0,0,0.15);
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
          min-height: 48px;
        }
        .mobile-nav-item.active { color: var(--accent); }
        .mobile-nav-item:active { background: var(--bg-input); }
        .mobile-nav-icon { font-size: 1.15rem; line-height: 1; }
        .mobile-nav-label { font-size: 0.58rem; font-weight: 600; letter-spacing: 0.02em; margin-top: 2px; }

        @media (max-width: 768px) {
          .sidebar { display: none; }
          .mobile-nav { display: grid; }
        }
      `}</style>
    </>
  )
}
