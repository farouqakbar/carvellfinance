import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { copyToClipboard } from '../utils/clipboard'
import { LogoWordmark, LogoMark } from '../components/Logo'
import { IconGrid, IconTag, IconPiggyBank, IconBarChart, IconKey, IconCopy, IconCheck, IconAlertTriangle } from '../components/Icons'

const EMPTY_FORM = { username: '', password: '', confirmPassword: '', recoveryCode: '' }

export default function Login() {
  const { signIn, signUp, resetPasswordWithCode } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetDone, setResetDone] = useState(null) // { username, code }
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (mode === 'register') {
      if (form.username.length < 3) return setError('Username minimal 3 karakter')
      if (!/^[a-zA-Z0-9_]+$/.test(form.username)) return setError('Username hanya boleh huruf, angka, dan underscore')
      if (form.password.length < 6) return setError('Password minimal 6 karakter')
      if (form.password !== form.confirmPassword) return setError('Password tidak cocok')
    }

    if (mode === 'forgot') {
      if (!form.recoveryCode.trim()) return setError('Masukkan recovery code kamu')
      if (form.password.length < 6) return setError('Password baru minimal 6 karakter')
      if (form.password !== form.confirmPassword) return setError('Password tidak cocok')
    }

    setLoading(true)
    try {
      if (mode === 'login') {
        await signIn(form.username, form.password)
        navigate('/dashboard')
      } else if (mode === 'register') {
        await signUp(form.username, form.password)
        navigate('/dashboard')
      } else {
        const nextCode = await resetPasswordWithCode(form.username, form.recoveryCode, form.password)
        setResetDone({ username: form.username, code: nextCode })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const switchMode = (m) => {
    setMode(m)
    setError('')
    setResetDone(null)
    setCopied(false)
    setForm(EMPTY_FORM)
  }

  const handleCopyCode = async () => {
    if (await copyToClipboard(resetDone.code)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const TITLES = {
    login: { title: 'Selamat datang', sub: 'Masuk dengan username dan password kamu' },
    register: { title: 'Buat akun', sub: 'Pilih username dan password' },
    forgot: { title: 'Lupa password', sub: 'Masukkan recovery code kamu untuk mengatur password baru' },
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

          {resetDone ? (
            <>
              <div className="login-form-header">
                <h2 className="login-form-title">Password berhasil diganti</h2>
                <p className="login-form-sub">
                  Recovery code lama sudah dipakai dan tidak berlaku. Simpan kode baru di bawah ini.
                </p>
              </div>

              <div className="login-code-box">
                <code className="login-code">{resetDone.code}</code>
              </div>

              <button type="button" className="btn btn-ghost btn-sm login-copy-btn" onClick={handleCopyCode}>
                {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                {copied ? 'Tersalin' : 'Salin kode baru'}
              </button>

              <div className="login-warn">
                <IconAlertTriangle size={14} />
                <span>Kode ini cuma ditampilkan sekali. Catat sekarang sebelum lanjut.</span>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-block login-submit-btn"
                onClick={() => switchMode('login')}
              >
                Lanjut ke Masuk
              </button>
            </>
          ) : (
          <>
          <div className="login-form-header">
            <h2 className="login-form-title">{TITLES[mode].title}</h2>
            <p className="login-form-sub">{TITLES[mode].sub}</p>
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

            {mode === 'forgot' && (
              <div className="form-group">
                <label className="form-label">Recovery code</label>
                <div className="input-prefix-wrap">
                  <span className="input-prefix-icon"><IconKey size={14} /></span>
                  <input
                    className="form-input input-has-prefix login-code-input"
                    type="text"
                    placeholder="CV-XXXX-XXXX-XXXX"
                    value={form.recoveryCode}
                    onChange={e => setForm(f => ({ ...f, recoveryCode: e.target.value.toUpperCase() }))}
                    required
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                  />
                </div>
                <p className="form-hint">Kode yang kamu simpan waktu daftar. Strip dan spasi boleh diabaikan.</p>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">{mode === 'forgot' ? 'Password baru' : 'Password'}</label>
              <input
                className="form-input"
                type="password"
                placeholder={mode === 'login' ? '••••••••' : 'Minimal 6 karakter'}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            </div>

            {(mode === 'register' || mode === 'forgot') && (
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

            {mode === 'login' && (
              <button type="button" className="login-forgot-link" onClick={() => switchMode('forgot')}>
                Lupa password?
              </button>
            )}

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="btn btn-primary btn-block login-submit-btn" disabled={loading}>
              {loading
                ? 'Memproses...'
                : mode === 'login' ? 'Masuk'
                : mode === 'register' ? 'Buat Akun'
                : 'Reset Password'}
            </button>
          </form>

          <p className="login-switch">
            {mode === 'login' ? (
              <>Belum punya akun? <button type="button" onClick={() => switchMode('register')}>Daftar</button></>
            ) : mode === 'register' ? (
              <>Sudah punya akun? <button type="button" onClick={() => switchMode('login')}>Masuk</button></>
            ) : (
              <>Ingat password kamu? <button type="button" onClick={() => switchMode('login')}>Kembali masuk</button></>
            )}
          </p>
          </>
          )}
        </div>
      </div>

      <style>{`
        .login-root {
          min-height: 100dvh;
          display: grid;
          grid-template-columns: 55% 45%;
          background: var(--bg);
        }

        /* Left panel — glass aurora */
        .login-panel {
          background: linear-gradient(145deg, rgba(6,6,16,0.96) 0%, rgba(10,8,24,0.98) 100%);
          border-right: 1px solid rgba(99,102,241,0.15);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: stretch;
        }
        /* Aurora blobs inside panel */
        .login-panel::before {
          content: '';
          position: absolute;
          top: -80px; left: -80px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 65%);
          filter: blur(40px);
          pointer-events: none;
          animation: aurora-drift-1 18s ease-in-out infinite;
        }
        .login-panel::after {
          content: '';
          position: absolute;
          bottom: -100px; right: -80px;
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 65%);
          filter: blur(50px);
          pointer-events: none;
          animation: aurora-drift-2 24s ease-in-out infinite;
        }
        .login-panel-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; justify-content: space-between;
          padding: 44px 48px; width: 100%;
        }

        .login-hero { flex:1; display:flex; flex-direction:column; justify-content:center; padding: 48px 0; }
        .login-headline {
          font-size: clamp(2rem, 3.2vw, 3rem);
          font-weight: 800; letter-spacing: -0.045em; line-height: 1.08;
          margin-bottom: 18px;
          background: linear-gradient(135deg, #fff 30%, rgba(167,139,250,0.9) 65%, rgba(99,102,241,0.85) 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        [data-theme="light"] .login-headline {
          background: linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #4f46e5 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .login-sub-text {
          font-size: 0.95rem; line-height: 1.7;
          color: rgba(160, 160, 200, 0.60); max-width: 360px;
        }
        [data-theme="light"] .login-sub-text { color: var(--text-secondary); }

        .login-features { list-style:none; display:flex; flex-direction:column; gap:12px; }
        .login-feature-item {
          display: flex; align-items: center; gap: 12px;
          color: rgba(160, 160, 200, 0.55); font-size: 0.85rem; font-weight: 500;
        }
        [data-theme="light"] .login-feature-item { color: var(--text-secondary); }
        .login-feature-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.20);
          display: flex; align-items: center; justify-content: center;
          color: #a78bfa; flex-shrink: 0;
        }

        /* Dot grid */
        .login-grid-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px);
          background-size: 28px 28px; opacity: 0.35; pointer-events: none;
          mask-image: radial-gradient(ellipse at 70% 30%, black 10%, transparent 65%);
          -webkit-mask-image: radial-gradient(ellipse at 70% 30%, black 10%, transparent 65%);
        }

        /* Right panel — glass form */
        .login-form-panel {
          display: flex; align-items: center; justify-content: center;
          padding: 48px 40px;
          background: rgba(8,8,20,0.5);
          backdrop-filter: blur(8px);
        }
        [data-theme="light"] .login-form-panel { background: rgba(240,240,248,0.7); }
        .login-form-wrap { width: 100%; max-width: 380px; }

        .login-mobile-logo { display: none; margin-bottom: 32px; }

        .login-form-header { margin-bottom: 32px; }
        .login-form-title {
          font-size: 1.75rem; font-weight: 800; letter-spacing: -0.04em;
          color: var(--text-primary); margin-bottom: 8px;
        }
        .login-form-sub { font-size: 0.85rem; color: var(--text-secondary); font-weight: 500; }

        .login-form { display: flex; flex-direction: column; gap: 0; }

        .input-prefix-wrap { position: relative; }
        .input-prefix-char {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%);
          color: var(--accent); font-size: 0.9rem; font-weight: 700;
          pointer-events: none; z-index: 1;
        }
        .input-has-prefix { padding-left: 30px !important; }
        .input-prefix-icon {
          position: absolute; left: 11px; top: 50%;
          transform: translateY(-50%);
          color: var(--accent); display: flex;
          pointer-events: none; z-index: 1;
        }
        .login-code-input {
          font-family: var(--font-mono, ui-monospace, "SF Mono", Menlo, monospace);
          letter-spacing: 0.06em;
        }

        .login-forgot-link {
          align-self: flex-end;
          background: none; border: none; padding: 0;
          margin: -4px 0 14px;
          color: var(--text-muted); cursor: pointer;
          font-family: var(--font-sans); font-size: 0.76rem; font-weight: 600;
          transition: color 0.15s;
        }
        .login-forgot-link:hover { color: var(--accent); }

        .login-code-box {
          background: var(--accent-dim);
          border: 1px dashed rgba(99,102,241,0.45);
          border-radius: var(--radius-sm);
          padding: 16px 12px; text-align: center;
          margin-bottom: 10px;
        }
        .login-code {
          font-family: var(--font-mono, ui-monospace, "SF Mono", Menlo, monospace);
          font-size: clamp(0.95rem, 4.5vw, 1.3rem);
          font-weight: 700; letter-spacing: 0.08em;
          color: var(--text-primary); user-select: all; word-break: break-all;
        }
        .login-copy-btn {
          width: 100%; display: inline-flex; align-items: center;
          justify-content: center; gap: 6px; margin-bottom: 14px;
        }
        .login-warn {
          display: flex; align-items: flex-start; gap: 8px;
          background: rgba(245,158,11,0.07);
          border: 1px solid rgba(245,158,11,0.22);
          border-radius: var(--radius-sm);
          padding: 10px 12px; margin-bottom: 14px;
          font-size: 0.73rem; line-height: 1.55; color: #f59e0b;
        }
        .login-warn svg { flex-shrink: 0; margin-top: 2px; }

        .form-hint { font-size: 0.7rem; color: var(--text-muted); margin-top: 5px; font-weight: 500; }

        .auth-error {
          background: var(--danger-dim); color: var(--danger);
          border: 1px solid rgba(248,113,113,0.25);
          border-radius: var(--radius-sm); padding: 10px 14px;
          font-size: 0.8rem; font-weight: 500; margin-bottom: 14px;
          backdrop-filter: var(--glass-blur);
        }

        .login-submit-btn {
          padding: 13px; font-size: 0.9rem;
          border-radius: var(--radius-sm); margin-top: 6px;
          letter-spacing: -0.01em; font-weight: 700;
        }

        .login-switch {
          text-align: center; margin-top: 22px;
          font-size: 0.82rem; color: var(--text-muted); font-weight: 500;
        }
        .login-switch button {
          background: none; border: none; color: var(--accent);
          cursor: pointer; font-family: var(--font-sans);
          font-size: 0.82rem; font-weight: 700; padding: 0;
          margin-left: 4px; transition: all 0.15s;
        }
        .login-switch button:hover { opacity: 0.8; text-decoration: underline; }

        @media (max-width: 768px) {
          .login-root { grid-template-columns: 1fr; }
          .login-panel { display: none; }
          .login-form-panel { padding: 32px 20px; align-items: flex-start; padding-top: 56px; background: transparent; }
          .login-mobile-logo { display: block; }
        }
      `}</style>
    </div>
  )
}
