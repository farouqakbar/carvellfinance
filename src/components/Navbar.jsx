import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

const navItems = [
  { to: '/dashboard', icon: '⬡', label: 'Dashboard' },
  { to: '/transactions', icon: '↕', label: 'Transaksi' },
  { to: '/categories', icon: '◈', label: 'Kategori' },
  { to: '/savings', icon: '◎', label: 'Tabungan' },
]

export default function Navbar({ darkMode, setDarkMode }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const avatarUrl = user?.user_metadata?.avatar_url
  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
  const initial = name.charAt(0).toUpperCase()

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-mark">◈</span>
          <span className="logo-text">Finora</span>
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
            title="Toggle theme"
          >
            {darkMode ? '☀' : '◑'}
          </button>

          <div className="user-info">
            {avatarUrl
              ? <img src={avatarUrl} alt={name} className="avatar" />
              : <div className="avatar avatar-fallback">{initial}</div>
            }
            <div className="user-detail">
              <div className="user-name truncate">{name}</div>
              <button className="sign-out-btn" onClick={handleSignOut}>Keluar</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-nav">
        {navItems.map(item => (
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
          left: 0;
          top: 0;
          bottom: 0;
          width: 240px;
          background: var(--bg-card);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 24px 16px;
          z-index: 100;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 8px;
          margin-bottom: 32px;
        }

        .logo-mark {
          font-size: 1.4rem;
          color: var(--accent);
        }

        .logo-text {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-style: italic;
          color: var(--text-primary);
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.15s;
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
          font-size: 1rem;
          width: 20px;
          text-align: center;
        }

        .sidebar-bottom {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .theme-toggle {
          background: none;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 8px;
          cursor: pointer;
          color: var(--text-secondary);
          font-size: 1rem;
          transition: all 0.15s;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .theme-toggle:hover {
          color: var(--accent);
          border-color: var(--accent);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .avatar-fallback {
          background: var(--accent-dim);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.875rem;
          flex-shrink: 0;
        }

        .user-detail { flex: 1; min-width: 0; }

        .user-name {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .sign-out-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 0.7rem;
          cursor: pointer;
          padding: 0;
          font-family: var(--font-sans);
          transition: color 0.15s;
        }

        .sign-out-btn:hover { color: var(--danger); }

        /* Mobile Nav */
        .mobile-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--bg-card);
          border-top: 1px solid var(--border);
          z-index: 100;
          padding: 8px 0 max(8px, env(safe-area-inset-bottom));
        }

        .mobile-nav {
          display: none;
          grid-template-columns: repeat(4, 1fr);
        }

        .mobile-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 8px;
          text-decoration: none;
          color: var(--text-muted);
          transition: color 0.15s;
        }

        .mobile-nav-item.active { color: var(--accent); }

        .mobile-nav-icon { font-size: 1.2rem; }
        .mobile-nav-label { font-size: 0.65rem; font-weight: 500; }

        @media (max-width: 768px) {
          .sidebar { display: none; }
          .mobile-nav { display: grid; }
        }
      `}</style>
    </>
  )
}
