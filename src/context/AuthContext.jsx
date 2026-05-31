import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        await loadProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId) => {
    const { data } = await supabase
      .from("user_profiles")
      .select("id, username, full_name, avatar_url")
      .eq("id", userId)
      .single();
    setUser(data || { id: userId, username: "", full_name: "" });
    setLoading(false);
  };

  const signIn = async (username, password) => {
    // Lookup email dari username via RPC (bypasses RLS, no session needed)
    const { data: email, error: rpcErr } = await supabase.rpc("get_email_by_username", {
      uname: username.toLowerCase(),
    });
    if (rpcErr || !email) throw new Error("Username tidak ditemukan");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error("Username atau password salah");
  };

  const signUp = async (username, email, password) => {
    // Cek username unik via RPC sebelum daftar
    const { data: existingEmail } = await supabase.rpc("get_email_by_username", {
      uname: username.toLowerCase(),
    });
    if (existingEmail) throw new Error("Username sudah digunakan");

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      if (error.message.toLowerCase().includes("already registered")) {
        throw new Error("Email sudah terdaftar");
      }
      throw new Error(error.message || "Pendaftaran gagal");
    }

    if (data.user) {
      const { error: profileErr } = await supabase.from("user_profiles").insert({
        id: data.user.id,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        full_name: username,
      });
      if (profileErr?.code === "23505") throw new Error("Username sudah digunakan");
      if (profileErr) throw new Error("Gagal membuat profil: " + profileErr.message);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
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
