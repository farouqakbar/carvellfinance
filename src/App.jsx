import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect, lazy, Suspense, Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(e) { return { error: e } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, color: '#f87171', fontFamily: 'monospace', fontSize: 13, background: '#07070f', minHeight: '100vh' }}>
          <strong>Runtime Error:</strong><br />
          {this.state.error.message}<br /><br />
          <pre style={{ whiteSpace: 'pre-wrap', color: '#888' }}>{this.state.error.stack}</pre>
        </div>
      )
    }
    return this.props.children
  }
}
import { AuthProvider, useAuth } from './context/AuthContext'
import { ToastProvider } from './components/Toast'
import { PageHeaderProvider, usePageHeader } from './context/PageHeaderContext'
import Navbar from './components/Navbar'
import OnboardingModal from './components/OnboardingModal'
import ProfileModal from './components/ProfileModal'
import RecoveryCodeModal from './components/RecoveryCodeModal'
import DevOverlay from './components/DevOverlay'
import Aurora from './components/ui/Aurora'
import './index.css'

const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Transactions = lazy(() => import('./pages/Transactions'))
const Categories = lazy(() => import('./pages/CategoriesV2'))
const Savings = lazy(() => import('./pages/Savings'))
const Report = lazy(() => import('./pages/Report'))

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/login" replace />
  return children
}

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: '2rem', animation: 'pulse 1.5s infinite' }}>◈</div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Memuat...</div>
    </div>
  )
}

function AppRoutes() {
  const { user, pendingRecoveryCode, dismissRecoveryCode } = useAuth()
  const { header } = usePageHeader()
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') !== 'light'
  })
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    if (user && user.isNewUser === true) {
      setShowOnboarding(true)
    }
  }, [user?.id])

  return (
    <BrowserRouter basename="/carvellfinance">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />

          <Route path="/*" element={
            <ProtectedRoute>
              <div className="app-layout">
                <Navbar
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  onProfileClick={() => setShowProfile(true)}
                />
                <div className={`main-wrapper${header ? ' has-page-topbar' : ''}`}>
                  {header && <div className="page-topbar-slot">{header}</div>}
                  <main className="main-content">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/transactions" element={<Transactions />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/savings" element={<Savings />} />
                      <Route path="/report" element={<Report />} />
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </main>
                </div>
              </div>
              {/* Recovery code harus dicatat dulu sebelum onboarding jalan */}
              {showOnboarding && !pendingRecoveryCode && (
                <OnboardingModal onClose={() => setShowOnboarding(false)} />
              )}
              {showProfile && (
                <ProfileModal onClose={() => setShowProfile(false)} />
              )}
              {pendingRecoveryCode && (
                <RecoveryCodeModal
                  code={pendingRecoveryCode.code}
                  reason={pendingRecoveryCode.reason}
                  username={user?.username}
                  onClose={dismissRecoveryCode}
                />
              )}
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <PageHeaderProvider>
            <Aurora />
            <AppRoutes />
            <DevOverlay />
          </PageHeaderProvider>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}
