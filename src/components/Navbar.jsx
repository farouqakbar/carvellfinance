import { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogoWordmark, LogoMark } from './Logo'
import { IconGrid, IconBookmark, IconBarChart, IconMoon, IconSun, IconLogOut, IconSettings } from './Icons'

const navItems = [
  { to: '/dashboard', Icon: IconGrid,     label: 'Dashboard' },
  { to: '/savings',   Icon: IconBookmark, label: 'Plan & Wishlist' },
  { to: '/report',    Icon: IconBarChart, label: 'Laporan'   },
]

export default function Navbar({ darkMode, setDarkMode, onProfileClick }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [now, setNow] = useState(new Date())
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef(null)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!showUserMenu) return
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setShowUserMenu(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showUserMenu])

  const handleSignOut = async () => { await signOut(); navigate('/login') }
  const name = user?.full_name || user?.username || 'User'
  const initial = name.charAt(0).toUpperCase()

  const dateStr = now.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
  const timeShort = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })

  return (
    <>
      {/* ── Desktop Sidebar ────────────────────────────────────── */}
      <nav className="sidebar">
        <div className="sidebar-logo">
          <LogoWordmark dark={darkMode} size="md" id="nav-logo" />
          <button className="theme-btn" onClick={() => setDarkMode(v => !v)} title={darkMode ? 'Mode Gelap' : 'Mode Terang'}>
            {darkMode ? <IconMoon size={13} /> : <IconSun size={13} />}
          </button>
        </div>

        <div className="sidebar-nav">
          {navItems.map(({ to, Icon, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <Icon size={15} />
              <span className="nav-label">{label}</span>
            </NavLink>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="user-chip">
            <button className="user-chip-main" onClick={onProfileClick}>
              <div className="user-avatar">{initial}</div>
              <div className="user-detail">
                <div className="user-name truncate">{name}</div>
                <span className="user-sub">Profil &amp; Pengaturan</span>
              </div>
            </button>
            <button className="user-chip-logout" onClick={handleSignOut} title="Keluar">
              <IconLogOut size={13} />
            </button>
          </div>

          <div className="datetime-strip">
            <span className="dt-date">{dateStr}</span>
            <span className="dt-time tabular">{timeStr}</span>
          </div>
        </div>
      </nav>

      {/* ── Mobile Topbar ─────────────────────────────────────── */}
      <header className="mobile-topbar">
        <div className="mtp-inner">
          <div className="mtp-logo">
            <LogoMark size={20} id="mobile-logo" />
            <span className="mtp-logo-text">Cashvell</span>
          </div>

          <div className="mtp-datetime">
            <span className="mtp-date">{dateStr}</span>
            <span className="mtp-time tabular">{timeShort}</span>
          </div>

          <button className="mtp-icon-btn" onClick={() => setDarkMode(v => !v)} title={darkMode ? 'Mode Gelap' : 'Mode Terang'}>
            {darkMode ? <IconMoon size={14} /> : <IconSun size={14} />}
          </button>

          <div className="mtp-user-wrap" ref={userMenuRef}>
            <button
              className={`mtp-avatar${showUserMenu ? ' open' : ''}`}
              onClick={() => setShowUserMenu(v => !v)}
            >
              {initial}
            </button>

            {showUserMenu && (
              <div className="mtp-dropdown">
                <div className="mtp-dd-user">
                  <div className="mtp-dd-avatar">{initial}</div>
                  <div>
                    <div className="mtp-dd-name">{name}</div>
                    <div className="mtp-dd-sub">{dateStr}</div>
                  </div>
                </div>

                <div className="mtp-dd-divider" />

                <button className="mtp-dd-item" onClick={() => { onProfileClick(); setShowUserMenu(false) }}>
                  <IconSettings size={14} />
                  <span>Profil &amp; Pengaturan</span>
                </button>

                <div className="mtp-dd-divider" />

                <button className="mtp-dd-item mtp-dd-danger" onClick={handleSignOut}>
                  <IconLogOut size={14} />
                  <span>Keluar</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Mobile Bottom Nav ─────────────────────────────────── */}
      <nav className="mobile-nav">
        {navItems.map(({ to, Icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}`}>
            <span className="mobile-nav-icon"><Icon size={20} /></span>
            <span className="mobile-nav-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <style>{`
        /* ── Desktop Sidebar ──────────────────────────────────── */
        .sidebar {
          position: fixed; left: 0; top: 0; bottom: 0; width: 240px;
          background: rgba(6,6,16,0.88);
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
          border-right: 1px solid rgba(255,255,255,0.05);
          display: flex; flex-direction: column; padding: 20px 12px;
          z-index: 100;
        }
        [data-theme="light"] .sidebar {
          background: rgba(252,252,255,0.94);
          border-right-color: rgba(0,0,0,0.07);
          box-shadow: 2px 0 16px rgba(0,0,0,0.04);
        }

        .sidebar-logo {
          padding: 2px 8px 22px;
          display: flex; align-items: center; justify-content: space-between;
        }

        .theme-btn {
          width: 30px; height: 30px; border-radius: 7px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: var(--text-muted);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.15s;
        }
        .theme-btn:hover { background: rgba(255,255,255,0.09); color: var(--text-primary); border-color: rgba(255,255,255,0.12); }
        [data-theme="light"] .theme-btn { border-color: rgba(0,0,0,0.1); background: rgba(0,0,0,0.03); }
        [data-theme="light"] .theme-btn:hover { background: rgba(0,0,0,0.06); }

        /* Nav items */
        .sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 2px; }

        .nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 8px;
          text-decoration: none; color: var(--text-muted);
          font-size: 0.8125rem; font-weight: 600;
          transition: all 0.15s; position: relative;
          letter-spacing: -0.01em; cursor: pointer;
          border: 1px solid transparent;
        }
        .nav-item:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.06);
        }
        .nav-item.active {
          color: var(--text-primary);
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.08);
        }
        .nav-item.active::before {
          content: '';
          position: absolute;
          left: 0; top: 7px; bottom: 7px;
          width: 2px;
          background: var(--accent);
          border-radius: 0 2px 2px 0;
        }
        [data-theme="light"] .nav-item:hover { background: rgba(99,102,241,0.05); border-color: rgba(99,102,241,0.1); color: var(--text-primary); }
        [data-theme="light"] .nav-item.active { color: var(--accent); background: var(--accent-dim); border-color: rgba(99,102,241,0.15); }
        [data-theme="light"] .nav-item.active::before { background: var(--accent); }
        .nav-label { flex: 1; }

        /* Bottom section */
        .sidebar-bottom {
          display: flex; flex-direction: column; gap: 6px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        [data-theme="light"] .sidebar-bottom { border-top-color: rgba(0,0,0,0.07); }

        .user-chip {
          display: flex; align-items: center;
          border-radius: 9px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
        }
        [data-theme="light"] .user-chip { background: rgba(0,0,0,0.03); border-color: rgba(0,0,0,0.08); }

        .user-chip-main {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 10px; flex: 1; min-width: 0;
          cursor: pointer; transition: background 0.15s;
          text-align: left; background: transparent; border: none;
          font-family: var(--font-sans); color: inherit;
        }
        .user-chip-main:hover { background: rgba(255,255,255,0.04); }
        [data-theme="light"] .user-chip-main:hover { background: rgba(0,0,0,0.03); }

        .user-chip-logout {
          width: 34px; flex-shrink: 0;
          align-self: stretch;
          border: none; border-left: 1px solid rgba(255,255,255,0.06);
          background: transparent; color: var(--text-muted);
          cursor: pointer; transition: all 0.15s;
          display: flex; align-items: center; justify-content: center;
        }
        .user-chip-logout:hover { background: rgba(248,113,113,0.08); color: #f87171; border-left-color: rgba(248,113,113,0.15); }
        [data-theme="light"] .user-chip-logout { border-left-color: rgba(0,0,0,0.07); }

        .user-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff; display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 0.72rem; flex-shrink: 0;
        }
        .user-detail { flex: 1; min-width: 0; }
        .user-name { font-size: 0.78rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.01em; }
        .user-sub { font-size: 0.6rem; color: var(--text-muted); font-weight: 500; display: block; margin-top: 1px; }

        .datetime-strip {
          display: flex; justify-content: space-between; align-items: center;
          padding: 7px 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 8px;
        }
        [data-theme="light"] .datetime-strip { background: rgba(0,0,0,0.03); border-color: rgba(0,0,0,0.07); }
        .dt-date {
          font-size: 0.58rem; font-weight: 600; color: var(--text-muted);
          text-transform: capitalize; letter-spacing: 0.02em;
        }
        .dt-time {
          font-size: 0.78rem; font-weight: 800; letter-spacing: -0.03em;
          color: var(--text-primary); font-variant-numeric: tabular-nums;
        }

        /* ── Mobile Topbar ──────────────────────────────────── */
        .mobile-topbar {
          display: none; position: fixed; top: 0; left: 0; right: 0;
          height: calc(52px + env(safe-area-inset-top, 0px));
          background: rgba(6,6,16,0.92);
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          z-index: 100;
        }
        [data-theme="light"] .mobile-topbar {
          background: rgba(252,252,255,0.94);
          border-bottom-color: rgba(0,0,0,0.07);
        }
        .mtp-inner {
          display: flex; align-items: center;
          padding: env(safe-area-inset-top, 0px) 14px 0; height: 100%; gap: 10px;
        }
        .mtp-logo { display: flex; align-items: center; gap: 7px; flex-shrink: 0; }
        .mtp-logo-text {
          font-size: 0.95rem; font-weight: 800;
          letter-spacing: -0.035em; color: var(--text-primary);
        }

        /* Datetime — center, grows to fill space */
        .mtp-datetime {
          flex: 1;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 1px; min-width: 0;
        }
        .mtp-date {
          font-size: 0.58rem; font-weight: 600; color: var(--text-muted);
          text-transform: capitalize; letter-spacing: 0.02em; line-height: 1;
          white-space: nowrap;
        }
        .mtp-time {
          font-size: 0.85rem; font-weight: 800;
          letter-spacing: -0.03em; color: var(--text-primary); line-height: 1;
        }

        .mtp-icon-btn {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.07);
          color: var(--text-muted);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.15s; flex-shrink: 0;
        }
        .mtp-icon-btn:hover { background: rgba(255,255,255,0.09); color: var(--text-primary); }
        [data-theme="light"] .mtp-icon-btn { background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.09); }
        [data-theme="light"] .mtp-icon-btn:hover { background: rgba(0,0,0,0.07); color: var(--text-primary); }

        /* Avatar + dropdown */
        .mtp-user-wrap { position: relative; flex-shrink: 0; }

        .mtp-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff; display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 0.75rem;
          cursor: pointer; border: 2px solid transparent;
          transition: border-color 0.15s, opacity 0.15s;
        }
        .mtp-avatar:hover { opacity: 0.85; }
        .mtp-avatar.open { border-color: rgba(99,102,241,0.5); }

        /* Dropdown */
        .mtp-dropdown {
          position: absolute; top: calc(100% + 10px); right: 0;
          min-width: 210px;
          background: var(--bg-card);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.3);
          z-index: 200;
        }
        [data-theme="light"] .mtp-dropdown {
          border-color: rgba(0,0,0,0.08);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
        }

        .mtp-dd-user {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 14px 12px;
        }
        .mtp-dd-avatar {
          width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff; display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 0.75rem;
        }
        .mtp-dd-name {
          font-size: 0.82rem; font-weight: 700;
          color: var(--text-primary); letter-spacing: -0.01em;
        }
        .mtp-dd-sub {
          font-size: 0.6rem; color: var(--text-muted);
          font-weight: 500; margin-top: 2px;
          text-transform: capitalize;
        }

        .mtp-dd-divider {
          height: 1px; background: rgba(255,255,255,0.06); margin: 0;
        }
        [data-theme="light"] .mtp-dd-divider { background: rgba(0,0,0,0.07); }

        .mtp-dd-item {
          display: flex; align-items: center; gap: 10px;
          width: 100%; padding: 11px 14px;
          background: transparent; border: none;
          color: var(--text-secondary); font-family: var(--font-sans);
          font-size: 0.82rem; font-weight: 600; cursor: pointer;
          transition: background 0.12s; text-align: left;
          letter-spacing: -0.01em;
        }
        .mtp-dd-item span:nth-child(2) { flex: 1; }
        .mtp-dd-item:hover { background: rgba(255,255,255,0.04); color: var(--text-primary); }
        [data-theme="light"] .mtp-dd-item:hover { background: rgba(0,0,0,0.04); }
        .mtp-dd-toggle { font-size: 0.7rem; color: var(--accent); font-weight: 700; }
        .mtp-dd-danger { color: #f87171; }
        .mtp-dd-danger:hover { background: rgba(248,113,113,0.08) !important; color: #f87171; }

        /* ── Mobile Bottom Nav ──────────────────────────────── */
        .mobile-nav {
          display: none; position: fixed; bottom: 0; left: 0; right: 0;
          background: rgba(6,6,16,0.94);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255,255,255,0.05);
          z-index: 100;
          padding: 6px 12px max(8px, env(safe-area-inset-bottom));
          grid-template-columns: repeat(3, 1fr);
        }
        [data-theme="light"] .mobile-nav {
          background: rgba(252,252,255,0.94);
          border-top-color: rgba(0,0,0,0.07);
        }

        .mobile-nav-item {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 4px; padding: 5px 4px;
          text-decoration: none; color: var(--text-muted);
          transition: color 0.15s; border-radius: 10px;
          min-height: 48px; cursor: pointer;
          position: relative;
        }
        .mobile-nav-item:hover { color: var(--text-secondary); }
        .mobile-nav-item:active { transform: scale(0.93); }

        .mobile-nav-item.active { color: var(--text-primary); }
        .mobile-nav-item.active .mobile-nav-icon {
          background: rgba(255,255,255,0.09);
        }
        [data-theme="light"] .mobile-nav-item.active .mobile-nav-icon {
          background: var(--accent-dim);
        }
        [data-theme="light"] .mobile-nav-item.active { color: var(--accent); }

        .mobile-nav-icon {
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 9px;
          transition: background 0.15s;
        }
        .mobile-nav-label { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.02em; }

        @media (max-width: 768px) {
          .sidebar { display: none; }
          .mobile-topbar { display: block; }
          .mobile-nav { display: grid; }
        }
      `}</style>
    </>
  )
}
