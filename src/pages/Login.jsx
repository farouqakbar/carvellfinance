import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogoWordmark, LogoMark } from '../components/Logo'
import { IconGrid, IconTag, IconPiggyBank, IconBarChart } from '../components/Icons'

export default function Login() {
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (mode === 'register') {
      if (form.username.length < 3) return setError('Username minimal 3 karakter')
      if (!/^[a-zA-Z0-9_]+$/.test(form.username)) return setError('Username hanya boleh huruf, angka, dan underscore')
      if (form.password.length < 6) return setError('Password minimal 6 karakter')
      if (form.password !== form.confirmPassword) return setError('Password tidak cocok')
    }

    setLoading(true)
    try {
      if (mode === 'login') {
        await signIn(form.username, form.password)
      } else {
        await signUp(form.username, form.password)
      }
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const switchMode = (m) => {
    setMode(m)
    setError('')
    setForm({ username: '', password: '', confirmPassword: '' })
  }

  return (
    <div className="login-root">
      {/* Left panel */}
      <div className="login-panel">
        <div className="login-panel-inner">
          <LogoWordmark dark size="lg" id="login-logo" />

          <div className="login-hero">
            <h1 className="login-headline">
              Kendali penuh<br />atas keuanganmu.
            </h1>
            <p className="login-sub-text">
              Catat pemasukan dan pengeluaran, pantau budget per kategori,
              dan capai target tabungan — dalam satu dashboard yang ringkas.
            </p>
          </div>

          <ul className="login-features">
            {[
              { Icon: IconGrid, text: 'Dashboard keuangan per bulan' },
              { Icon: IconTag, text: 'Budget per kategori + alert overbudget' },
              { Icon: IconPiggyBank, text: 'Target tabungan dengan progress' },
              { Icon: IconBarChart, text: 'Laporan bulanan dengan grafik tren' },
            ].map(f => (
              <li key={f.text} className="login-feature-item">
                <span className="login-feature-icon"><f.Icon size={15} /></span>
                <span>{f.text}</span>
              </li>
            ))}
          </ul>

          {/* Decorative grid dots */}
          <div className="login-grid-dots" aria-hidden />
        </div>
      </div>

      {/* Right panel — form */}
      <div className="login-form-panel">
        <div className="login-form-wrap">
          {/* Mobile logo */}
          <div className="login-mobile-logo">
            <LogoWordmark dark={false} size="md" id="login-mobile-logo" />
          </div>

          <div className="login-form-header">
            <h2 className="login-form-title">
              {mode === 'login' ? 'Selamat datang' : 'Buat akun'}
            </h2>
            <p className="login-form-sub">
              {mode === 'login'
                ? 'Masuk dengan username dan password kamu'
                : 'Pilih username dan password'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Username</label>
              <div className="input-prefix-wrap">
                <span className="input-prefix-char">@</span>
                <input
                  className="form-input input-has-prefix"
                  type="text"
                  placeholder="username_kamu"
                  value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value.toLowerCase().replace(/\s/g, '') }))}
                  required
                  autoComplete="username"
                  autoFocus
                />
              </div>
              {mode === 'register' && (
                <p className="form-hint">Huruf, angka, underscore. Min. 3 karakter.</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                placeholder={mode === 'register' ? 'Minimal 6 karakter' : '••••••••'}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            </div>

            {mode === 'register' && (
              <div className="form-group">
                <label className="form-label">Konfirmasi Password</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="Ulangi password"
                  value={form.confirmPassword}
                  onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                  required
                  autoComplete="new-password"
                />
              </div>
            )}

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="btn btn-primary btn-block login-submit-btn" disabled={loading}>
              {loading ? 'Memproses...' : mode === 'login' ? 'Masuk' : 'Buat Akun'}
            </button>
          </form>

          <p className="login-switch">
            {mode === 'login' ? (
              <>Belum punya akun? <button type="button" onClick={() => switchMode('register')}>Daftar</button></>
            ) : (
              <>Sudah punya akun? <button type="button" onClick={() => switchMode('login')}>Masuk</button></>
            )}
          </p>
        </div>
      </div>

      <style>{`
        .login-root {
          min-height: 100dvh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--bg);
        }

        /* Left panel */
        .login-panel {
          background: #0a0a10;
          border-right: 1px solid #1e1e2a;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: stretch;
        }
        .login-panel::before {
          content: '';
          position: absolute;
          top: -120px; left: -120px;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%);
          pointer-events: none;
        }
        .login-panel::after {
          content: '';
          position: absolute;
          bottom: -80px; right: -80px;
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .login-panel-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 40px 44px;
          width: 100%;
        }

        .login-hero { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 40px 0; }
        .login-headline {
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.1;
          color: #eeeef5;
          margin-bottom: 16px;
        }
        .login-sub-text {
          font-size: 0.9rem;
          line-height: 1.65;
          color: #6565808a;
          color: rgba(160, 160, 200, 0.7);
          max-width: 380px;
        }

        .login-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .login-feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(160, 160, 200, 0.65);
          font-size: 0.8125rem;
          font-weight: 500;
        }
        .login-feature-icon {
          color: #818cf8;
          font-size: 0.85rem;
          width: 18px;
          text-align: center;
          flex-shrink: 0;
        }

        .login-grid-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 0.4;
          pointer-events: none;
          mask-image: radial-gradient(ellipse at 80% 20%, black 20%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at 80% 20%, black 20%, transparent 70%);
        }

        /* Right panel */
        .login-form-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
        }
        .login-form-wrap {
          width: 100%;
          max-width: 380px;
        }

        .login-mobile-logo {
          display: none;
          margin-bottom: 32px;
        }

        .login-form-header { margin-bottom: 28px; }
        .login-form-title {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.035em;
          color: var(--text-primary);
          margin-bottom: 6px;
        }
        .login-form-sub {
          font-size: 0.825rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .login-form { display: flex; flex-direction: column; gap: 0; }

        .input-prefix-wrap { position: relative; }
        .input-prefix-char {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 0.875rem;
          font-weight: 600;
          pointer-events: none;
          z-index: 1;
        }
        .input-has-prefix { padding-left: 28px !important; }

        .form-hint {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 5px;
          font-weight: 500;
        }

        .auth-error {
          background: var(--danger-dim);
          color: var(--danger);
          border: 1px solid rgba(248,113,113,0.2);
          border-radius: var(--radius-sm);
          padding: 9px 13px;
          font-size: 0.8rem;
          font-weight: 500;
          margin-bottom: 14px;
        }

        .login-submit-btn {
          padding: 12px;
          font-size: 0.875rem;
          border-radius: var(--radius-sm);
          margin-top: 4px;
          letter-spacing: -0.01em;
        }

        .login-switch {
          text-align: center;
          margin-top: 20px;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .login-switch button {
          background: none;
          border: none;
          color: var(--accent);
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0;
          text-decoration: none;
          margin-left: 4px;
          transition: opacity 0.15s;
        }
        .login-switch button:hover { opacity: 0.75; }

        @media (max-width: 768px) {
          .login-root { grid-template-columns: 1fr; }
          .login-panel { display: none; }
          .login-form-panel { padding: 32px 20px; align-items: flex-start; padding-top: 48px; }
          .login-mobile-logo { display: block; }
        }
      `}</style>
    </div>
  )
}
