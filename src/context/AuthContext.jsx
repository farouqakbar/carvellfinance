import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext({});
const STORAGE_KEY = "cashvell_user";

const DEFAULT_CATEGORIES = [
  { name: "Gaji",            icon: "💰",    color: "#22c55e", budget_limit: 0 },
  { name: "Orang Tua",       icon: "👨‍👩‍👧", color: "#f59e0b", budget_limit: 0 },
  { name: "Tabungan Bulanan", icon: "🏦",    color: "#6366f1", budget_limit: 0 },
  { name: "Investasi",        icon: "📈",    color: "#10b981", budget_limit: 0 },
];

async function hashPassword(password) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function seedDefaultCategories(userId) {
  const { data: existing } = await supabase
    .from("categories")
    .select("name")
    .eq("user_id", userId);

  const existingNames = new Set((existing || []).map(c => c.name));

  const toInsert = DEFAULT_CATEGORIES
    .filter(c => !existingNames.has(c.name))
    .map(c => ({ ...c, user_id: userId }));

  if (toInsert.length > 0) {
    await supabase.from("categories").insert(toInsert);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const u = JSON.parse(stored);
        setUser(u);
        seedDefaultCategories(u.id);
      } catch { localStorage.removeItem(STORAGE_KEY); }
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
    await seedDefaultCategories(userData.id);
  };

  const signUp = async (username, password) => {
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
    await seedDefaultCategories(data.id);
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
