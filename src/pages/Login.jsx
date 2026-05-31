import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const BASE = import.meta.env.BASE_URL

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(form.username, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const isDark = localStorage.getItem('theme') !== 'light'
  const loginIcon = isDark ? `${BASE}logo/logologindark.svg` : `${BASE}logo/logologinlight.svg`

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <img src={loginIcon} alt="Cashvell" width="48" height="48" />
          <span className="login-logo-text">Cashvell</span>
        </div>
        <div className="login-tagline">
          <h1>Kelola keuangan<br /><em>dengan lebih bijak.</em></h1>
          <p>Lacak pengeluaran, atur budget, dan capai target tabungan kamu — semua dalam satu tempat.</p>
        </div>
        <div className="login-features">
          {[
            'Dashboard visual ringkas per bulan',
            'Kategori & budget limit custom',
            'Target tabungan & progress',
            'Laporan keuangan bulanan',
          ].map(f => (
            <div key={f} className="feature-item">
              <span className="feature-check">✓</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo-sm">
              <img src={loginIcon} alt="Cashvell" width="32" height="32" />
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.2rem' }}>Cashvell</span>
            </div>
            <h2 className="login-title">Selamat datang kembali</h2>
            <p className="login-sub">Masukkan username dan password kamu</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <div className="input-wrap">
                <span className="input-prefix">@</span>
                <input
                  className="form-input input-with-prefix"
                  type="text"
                  placeholder="username_kamu"
                  value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value.toLowerCase().replace(/\s/g, '') }))}
                  required
                  autoComplete="username"
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
                autoComplete="current-password"
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .login-left {
          background: linear-gradient(135deg, #0a0a10 0%, #13131a 100%);
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }

        .login-left::before {
          content: '';
          position: absolute;
          top: -80px; left: -80px;
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .login-left::after {
          content: '';
          position: absolute;
          bottom: -60px; right: -60px;
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .login-brand { display: flex; align-items: center; gap: 12px; }

        .login-logo-text {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          font-style: italic;
          color: #f1f5f9;
        }

        .login-tagline h1 {
          font-family: var(--font-serif);
          font-size: 2.8rem;
          line-height: 1.15;
          color: #f1f5f9;
          margin-bottom: 16px;
        }

        .login-tagline p {
          color: #94a3b8;
          font-size: 1rem;
          line-height: 1.6;
          max-width: 380px;
        }

        .login-features { display: flex; flex-direction: column; gap: 12px; }
        .feature-item { display: flex; align-items: center; gap: 12px; color: #94a3b8; font-size: 0.9rem; }
        .feature-check { color: #60a5fa; font-weight: 700; width: 20px; text-align: center; flex-shrink: 0; }

        .login-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
          background: var(--bg);
        }

        .login-card { width: 100%; max-width: 400px; }
        .login-header { margin-bottom: 28px; }

        .login-logo-sm {
          display: none;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .login-title {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-style: italic;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .login-sub { color: var(--text-secondary); font-size: 0.875rem; }

        .input-wrap { position: relative; }
        .input-prefix {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 0.9rem;
          pointer-events: none;
        }
        .input-with-prefix { padding-left: 28px !important; }

        .auth-error {
          background: var(--danger-dim);
          color: var(--danger);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          font-size: 0.85rem;
          margin-bottom: 16px;
        }

        @media (max-width: 768px) {
          .login-page { grid-template-columns: 1fr; }
          .login-left { display: none; }
          .login-right { padding: 24px; align-items: flex-start; padding-top: 48px; }
          .login-logo-sm { display: flex; }
        }
      `}</style>
    </div>
  )
}
