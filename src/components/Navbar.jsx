import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogoWordmark, LogoMark } from './Logo'
import { IconGrid, IconBookmark, IconBarChart, IconMoon, IconSun, IconLogOut } from './Icons'

const navItems = [
  { to: '/dashboard', Icon: IconGrid, label: 'Dashboard' },
  { to: '/savings',   Icon: IconBookmark, label: 'Rencana' },
  { to: '/report',    Icon: IconBarChart, label: 'Laporan' },
]

export default function Navbar({ darkMode, setDarkMode, onProfileClick }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const handleSignOut = async () => { await signOut(); navigate('/login') }
  const name = user?.full_name || user?.username || 'User'
  const initial = name.charAt(0).toUpperCase()

  const dateStr = now.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })

  return (
    <>
      {/* ── Desktop Sidebar ──────────────────────── */}
      <nav className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <LogoWordmark dark={darkMode} size="md" id="nav-logo" />
          <button
            type="button"
            className={`theme-btn ${darkMode ? 'theme-night' : 'theme-day'}`}
            onClick={() => setDarkMode(v => !v)}
            title={darkMode ? 'Mode Gelap' : 'Mode Terang'}
          >
            {darkMode ? <IconMoon size={14} /> : <IconSun size={14} />}
          </button>
        </div>

        {/* Nav items */}
        <div className="sidebar-nav">
          {navItems.map(({ to, Icon, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              {({ isActive }) => (
                <>
                  <span className="nav-icon-wrap">
                    <Icon size={16} />
                    {isActive && <span className="nav-icon-glow" />}
                  </span>
                  <span className="nav-label">{label}</span>
                  {isActive && <span className="nav-active-dot" />}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Bottom */}
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
              <IconLogOut size={14} />
            </button>
          </div>

          <div className="datetime-card">
            <span className="dt-date">{dateStr}</span>
            <div className="dt-time">{timeStr}</div>
          </div>
        </div>
      </nav>

      {/* ── Mobile topbar ────────────────────────── */}
      <header className="mobile-topbar">
        <div className="mtp-row1">
          <div className="mtp-logo">
            <LogoMark size={22} id="mobile-logo" />
            <span className="mtp-logo-text">Cashvell</span>
          </div>
          <div className="mtp-controls">
            <div className="mtp-theme">
              <button type="button" className={`mtp-btn ${darkMode ? 'active' : ''}`} onClick={() => setDarkMode(true)}><IconMoon size={13} /></button>
              <button type="button" className={`mtp-btn ${!darkMode ? 'active' : ''}`} onClick={() => setDarkMode(false)}><IconSun size={13} /></button>
            </div>
            <div className="mtp-avatar" onClick={onProfileClick}>{initial}</div>
          </div>
        </div>
        <div className="mtp-row2">
          <span className="mtp-datetime">{dateStr} · {timeStr}</span>
          <button className="mtp-signout" onClick={handleSignOut}>{name} · Keluar</button>
        </div>
      </header>

      {/* ── Mobile bottom nav ────────────────────── */}
      <nav className="mobile-nav">
        {navItems.map(({ to, Icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
            <span className="mobile-nav-icon"><Icon size={20} /></span>
            <span className="mobile-nav-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <style>{`
        /* ── Sidebar ───────────────────────────── */
        .sidebar {
          position: fixed; left:0; top:0; bottom:0; width:240px;
          background: rgba(8,8,20,0.82);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border-right: 1px solid rgba(99,102,241,0.12);
          display: flex; flex-direction: column; padding: 20px 12px;
          z-index: 100;
          box-shadow: 4px 0 32px rgba(0,0,0,0.3);
        }
        [data-theme="light"] .sidebar {
          background: rgba(255,255,255,0.85);
          border-right-color: rgba(99,102,241,0.12);
          box-shadow: 4px 0 24px rgba(0,0,0,0.06);
        }

        .sidebar-logo {
          padding: 4px 8px 24px;
          display: flex; align-items: center; justify-content: space-between;
        }

        /* Theme toggle */
        .theme-btn {
          width: 32px; height: 32px;
          border-radius: 8px;
          border: 1px solid rgba(99,102,241,0.2);
          background: rgba(99,102,241,0.08);
          color: var(--accent);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .theme-btn:hover { background: var(--accent-dim); box-shadow: var(--glow-sm); }
        .theme-night { background: linear-gradient(135deg,rgba(13,18,53,0.8),rgba(30,27,75,0.8)); color: #c7d2fe; }
        .theme-day   { background: linear-gradient(135deg,rgba(255,251,235,0.9),rgba(253,230,138,0.8)); color: #92400e; }

        /* Nav */
        .sidebar-nav { flex:1; display:flex; flex-direction:column; gap:3px; }

        .nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 10px;
          text-decoration: none; color: var(--text-muted);
          font-size: 0.8125rem; font-weight: 600;
          transition: all 0.18s; position: relative;
          letter-spacing: -0.01em; cursor: pointer;
          border: 1px solid transparent;
        }
        .nav-item:hover { color: var(--text-primary); background: rgba(99,102,241,0.06); border-color: var(--border-glass); }
        .nav-item.active {
          color: #fff;
          background: linear-gradient(135deg, rgba(99,102,241,0.22), rgba(139,92,246,0.14));
          border: 1px solid rgba(139,92,246,0.2);
        }
        [data-theme="light"] .nav-item.active { color: var(--accent); background: var(--accent-dim); border-color: var(--accent); }

        .nav-icon-wrap { width:20px; height:20px; display:flex; align-items:center; justify-content:center; flex-shrink:0; position:relative; }
        .nav-icon-glow {
          position:absolute; inset:-4px;
          background: radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%);
          border-radius:50%; pointer-events:none;
        }
        .nav-label { flex:1; }
        .nav-active-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gradient-accent);
          box-shadow: 0 0 6px rgba(139,92,246,0.8);
          flex-shrink: 0;
        }

        /* Sidebar bottom */
        .sidebar-bottom { display:flex; flex-direction:column; gap:8px; padding-top:14px; border-top:1px solid var(--border-glass); }

        .user-chip {
          display:flex; align-items:center;
          border-radius:10px;
          background: rgba(99,102,241,0.06);
          border:1px solid rgba(99,102,241,0.12);
          overflow: hidden;
        }
        .user-chip-main {
          display:flex; align-items:center; gap:10px;
          padding:10px; flex:1; min-width:0;
          cursor:pointer; transition:background 0.18s;
          text-align:left; background:transparent; border:none;
          font-family:var(--font-sans); color:inherit;
        }
        .user-chip-main:hover { background: rgba(99,102,241,0.08); }
        .user-chip-logout {
          width:36px; height:100%; flex-shrink:0;
          border:none; border-left:1px solid rgba(99,102,241,0.12);
          background:transparent; color:var(--text-muted);
          cursor:pointer; transition:all 0.18s;
          display:flex; align-items:center; justify-content:center;
          padding: 0;
        }
        .user-chip-logout:hover { background:rgba(248,113,113,0.08); color:var(--danger); border-left-color:rgba(248,113,113,0.2); }
        .user-avatar {
          width:32px; height:32px; border-radius:50%;
          background: linear-gradient(135deg,#6366f1,#8b5cf6);
          color:#fff; display:flex; align-items:center; justify-content:center;
          font-weight:800; font-size:0.75rem; flex-shrink:0;
          box-shadow: 0 0 12px rgba(99,102,241,0.5);
        }
        .user-detail { flex:1; min-width:0; }
        .user-name { font-size:0.78rem; font-weight:700; color:var(--text-primary); letter-spacing:-0.01em; }
        .user-sub { font-size:0.64rem; color:var(--text-muted); font-weight:500; display:block; margin-top:1px; }

        .datetime-card {
          background: rgba(99,102,241,0.06);
          border:1px solid var(--border-glass);
          border-radius:10px; padding:9px 12px;
          display:flex; flex-direction:column; align-items:center; gap:3px;
        }
        .dt-date { font-size:0.6rem; font-weight:600; color:var(--text-muted); text-transform:capitalize; letter-spacing:0.03em; line-height:1; }
        .dt-time { font-size:1.05rem; font-weight:800; font-variant-numeric:tabular-nums; letter-spacing:-0.04em; color:var(--text-primary); line-height:1; }

        /* ── Mobile topbar ─────────────────────── */
        .mobile-topbar {
          display:none; position:fixed; top:0; left:0; right:0;
          background: rgba(5,5,12,0.90);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border-bottom:1px solid rgba(99,102,241,0.12);
          z-index:100;
        }
        [data-theme="light"] .mobile-topbar {
          background: rgba(255,255,255,0.90);
          border-bottom-color: rgba(99,102,241,0.1);
        }
        .mtp-row1 {
          display:flex; align-items:center; justify-content:space-between;
          padding:0 16px; height:50px;
        }
        .mtp-logo { display:flex; align-items:center; gap:8px; }
        .mtp-logo-text { font-size:1rem; font-weight:800; letter-spacing:-0.035em; color:var(--text-primary); }
        .mtp-controls { display:flex; align-items:center; gap:10px; }

        .mtp-theme {
          display:flex; gap:2px; padding:2px;
          background: var(--bg-glass); backdrop-filter: var(--glass-blur);
          border:1px solid var(--border); border-radius:8px;
        }
        .mtp-btn {
          width:30px; height:26px; border:none; border-radius:5px;
          cursor:pointer; display:flex; align-items:center; justify-content:center;
          background:transparent; color:var(--text-muted); transition:all 0.2s;
          font-family:var(--font-sans);
        }
        .mtp-btn.active { background:var(--gradient-accent); color:#fff; box-shadow:var(--glow-sm); }

        .mtp-avatar {
          width:32px; height:32px; border-radius:50%;
          background: linear-gradient(135deg,#6366f1,#8b5cf6);
          color:#fff; display:flex; align-items:center; justify-content:center;
          font-weight:800; font-size:0.78rem; flex-shrink:0; cursor:pointer;
          box-shadow: 0 0 12px rgba(99,102,241,0.4);
        }

        .mtp-row2 {
          display:flex; align-items:center; justify-content:space-between;
          padding:0 16px; height:28px;
          background: rgba(99,102,241,0.05);
          border-top:1px solid var(--border-glass);
        }
        .mtp-datetime { font-size:0.6rem; font-weight:600; color:var(--text-muted); font-variant-numeric:tabular-nums; text-transform:capitalize; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .mtp-signout {
          background:none; border:1px solid transparent; color:var(--text-muted); font-size:0.6rem;
          font-family:var(--font-sans); font-weight:600; cursor:pointer;
          padding:2px 6px; border-radius:4px;
          flex-shrink:0; margin-left:8px; transition:all 0.15s;
        }
        .mtp-signout:hover { color:var(--danger); border-color:rgba(248,113,113,0.25); background:rgba(248,113,113,0.06); }

        /* ── Mobile bottom nav ─────────────────── */
        .mobile-nav {
          display:none; position:fixed; bottom:0; left:0; right:0;
          background: rgba(5,5,12,0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top:1px solid rgba(99,102,241,0.15);
          z-index:100;
          padding: 6px 8px max(8px, env(safe-area-inset-bottom));
          grid-template-columns: repeat(3,1fr);
          box-shadow: 0 -4px 24px rgba(0,0,0,0.3);
        }
        [data-theme="light"] .mobile-nav {
          background: rgba(255,255,255,0.92);
          border-top-color: rgba(99,102,241,0.12);
        }
        .mobile-nav-item {
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          gap:3px; padding:6px 4px;
          text-decoration:none; color:var(--text-muted);
          transition:color 0.15s, background 0.15s; border-radius:var(--radius-sm);
          min-height:46px; cursor:pointer;
        }
        .mobile-nav-item:hover { color:var(--text-secondary); }
        .mobile-nav-item.active { color:var(--accent); }
        .mobile-nav-item.active .mobile-nav-icon {
          background: var(--accent-dim);
          border-radius:8px;
          box-shadow: 0 0 6px rgba(99,102,241,0.2);
        }
        .mobile-nav-item:active { background:var(--bg-glass); transform: scale(0.95); }
        .mobile-nav-icon { width:24px; height:24px; display:flex; align-items:center; justify-content:center; padding:2px; transition: all 0.15s; }
        .mobile-nav-label { font-size:0.6rem; font-weight:700; letter-spacing:0.02em; }

        @media (max-width: 768px) {
          .sidebar { display:none; }
          .mobile-topbar { display:block; }
          .mobile-nav { display:grid; }
        }
      `}</style>
    </>
  )
}
