import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { getCurrentMonth } from "../utils/formatCurrency";

const AuthContext = createContext({});
const STORAGE_KEY = "cashvell_user";

const DEFAULT_CATEGORIES = [
  { name: "Pemasukan Bulanan", icon: "", color: "#22c55e", budget_limit: 0, is_mandatory: false },
  { name: "Keluarga",        icon: "",  color: "#f59e0b", budget_limit: 0, is_mandatory: true  },
  { name: "Tabungan Bulanan", icon: "", color: "#6366f1", budget_limit: 0, is_mandatory: true  },
  { name: "Investasi",        icon: "", color: "#10b981", budget_limit: 0, is_mandatory: true  },
];

async function hashPassword(password) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function seedDefaultCategories(userId) {
  const month = getCurrentMonth()

  // Cek kategori yang sudah ada di bulan ini
  const { data: existing } = await supabase
    .from("categories")
    .select("name")
    .eq("user_id", userId)
    .eq("month", month);

  const existingNames = new Set((existing || []).map(c => c.name));

  const toInsert = DEFAULT_CATEGORIES
    .filter(c => !existingNames.has(c.name))
    .map(c => ({ ...c, user_id: userId, month }));

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
      .select("id, username, full_name, password_hash, recording_start_month, saldo_awal, tabungan_awal, budget_harian")
      .eq("username", username.toLowerCase())
      .single();

    if (error || !data) throw new Error("Username atau password salah");

    const hash = await hashPassword(password);
    if (hash !== data.password_hash) throw new Error("Username atau password salah");

    const userData = {
      id: data.id,
      username: data.username,
      full_name: data.full_name,
      recording_start_month: data.recording_start_month || null,
      saldo_awal: Number(data.saldo_awal) || 0,
      tabungan_awal: Number(data.tabungan_awal) || 0,
      budget_harian: Number(data.budget_harian) || 0,
    };
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
      .select("id, username, full_name, recording_start_month, saldo_awal, tabungan_awal, budget_harian")
      .single();

    if (error) {
      if (error.code === "23505") throw new Error("Username sudah digunakan");
      throw new Error("Pendaftaran gagal: " + error.message);
    }

    const userData = {
      id: data.id,
      username: data.username,
      full_name: data.full_name,
      recording_start_month: null,
      saldo_awal: 0,
      tabungan_awal: 0,
      budget_harian: 0,
      isNewUser: true,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
    await seedDefaultCategories(userData.id);
  };

  const updateProfile = async (updates) => {
    const allowed = {};
    if (updates.full_name !== undefined) allowed.full_name = updates.full_name;
    if (updates.recording_start_month !== undefined) allowed.recording_start_month = updates.recording_start_month;
    if (updates.saldo_awal !== undefined) allowed.saldo_awal = updates.saldo_awal;
    if (updates.tabungan_awal !== undefined) allowed.tabungan_awal = updates.tabungan_awal;
    if (updates.budget_harian !== undefined) allowed.budget_harian = updates.budget_harian;

    const { error } = await supabase
      .from("user_profiles")
      .update(allowed)
      .eq("id", user.id);

    if (error) throw error;

    const updatedUser = { ...user, ...allowed, isNewUser: false };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
