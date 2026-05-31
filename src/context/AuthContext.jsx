import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (username, password) => {
    // Supabase Auth requires email format, so we use username@finora.app as internal email
    const email = `${username.toLowerCase()}@finora.app`
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error('Username atau password salah')
    return data
  }

  const signUp = async (username, password) => {
    const email = `${username.toLowerCase()}@finora.app`
    // Check username availability via trying to sign in first is not ideal,
    // so we just attempt signup and catch duplicate errors
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, full_name: username } }
    })
    if (error) {
      if (error.message.includes('already registered')) throw new Error('Username sudah digunakan')
      throw error
    }
    return data
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
