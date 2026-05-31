import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext({});
const STORAGE_KEY = "cashvell_user";

async function hashPassword(password) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem(STORAGE_KEY); }
    }
    setLoading(false);
  }, []);

  const signIn = async (username, password) => {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("id, username, full_name, password_hash")
      .eq("username", username.toLowerCase())
      .single();

    if (error || !data) throw new Error("Username atau password salah");

    const hash = await hashPassword(password);
    if (hash !== data.password_hash) throw new Error("Username atau password salah");

    const userData = { id: data.id, username: data.username, full_name: data.full_name };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const signUp = async (username, password) => {
    // Cek username sudah ada
    const { data: existing } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("username", username.toLowerCase())
      .single();

    if (existing) throw new Error("Username sudah digunakan");

    const password_hash = await hashPassword(password);
    const { data, error } = await supabase
      .from("user_profiles")
      .insert({ username: username.toLowerCase(), password_hash, full_name: username })
      .select("id, username, full_name")
      .single();

    if (error) {
      if (error.code === "23505") throw new Error("Username sudah digunakan");
      throw new Error("Pendaftaran gagal: " + error.message);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setUser(data);
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
