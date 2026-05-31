import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext({});
const EMAIL_DOMAIN = "@cashvell.app";

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
    const { error } = await supabase.auth.signInWithPassword({
      email: username.toLowerCase() + EMAIL_DOMAIN,
      password,
    });
    if (error) throw new Error("Username atau password salah");
  };

  const signUp = async (username, password) => {
    const email = username.toLowerCase() + EMAIL_DOMAIN;

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      if (error.message.toLowerCase().includes("already registered")) {
        throw new Error("Username sudah digunakan");
      }
      throw new Error(error.message || "Pendaftaran gagal");
    }

    if (data.user) {
      const { error: profileErr } = await supabase.from("user_profiles").insert({
        id: data.user.id,
        username: username.toLowerCase(),
        full_name: username,
      });
      if (profileErr?.code === "23505") {
        throw new Error("Username sudah digunakan");
      }
      if (profileErr) {
        throw new Error("Gagal membuat profil: " + profileErr.message);
      }
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
