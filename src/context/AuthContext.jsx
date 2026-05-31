import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (username, password) => {
    // Supabase Auth requires email format
    const email = `${username.toLowerCase()}@carvellfinance.local`;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        throw new Error("Username atau password salah");
      }
      throw new Error(error.message || "Login gagal");
    }
    return data;
  };

  const signUp = async (username, password) => {
    // Check if username already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("username", username.toLowerCase())
      .single();

    if (existingUser) {
      throw new Error("Username sudah digunakan");
    }

    const email = `${username.toLowerCase()}@carvellfinance.local`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username.toLowerCase(),
          full_name: username,
        },
      },
    });

    if (error) {
      if (error.message.includes("already registered")) {
        throw new Error("Username sudah digunakan");
      }
      throw new Error(error.message || "Pendaftaran gagal");
    }

    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from("user_profiles")
        .insert({
          id: data.user.id,
          username: username.toLowerCase(),
          full_name: username,
        });

      if (profileError) {
        throw new Error("Gagal membuat profil: " + profileError.message);
      }
    }

    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
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
