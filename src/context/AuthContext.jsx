import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { hashPassword, verifyPassword } from "../utils/passwordUtils";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("authUser");
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (username, password) => {
    try {
      // Query user dari database
      const { data, error } = await supabase
        .from("user_profiles")
        .select("id, username, full_name, password_hash")
        .eq("username", username.toLowerCase())
        .single();

      if (error || !data) {
        throw new Error("Username atau password salah");
      }

      // Verify password
      const isPasswordValid = await verifyPassword(
        password,
        data.password_hash,
      );
      if (!isPasswordValid) {
        throw new Error("Username atau password salah");
      }

      // Set user di localStorage
      const userData = {
        id: data.id,
        username: data.username,
        full_name: data.full_name,
      };
      localStorage.setItem("authUser", JSON.stringify(userData));
      setUser(userData);

      return userData;
    } catch (err) {
      throw new Error(err.message || "Login gagal");
    }
  };

  const signUp = async (username, password) => {
    try {
      // Check if username already exists
      const { data: existingUser } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("username", username.toLowerCase())
        .single();

      if (existingUser) {
        throw new Error("Username sudah digunakan");
      }

      // Hash password
      const passwordHash = await hashPassword(password);

      // Create new user
      const { data, error } = await supabase
        .from("user_profiles")
        .insert({
          username: username.toLowerCase(),
          full_name: username,
          password_hash: passwordHash,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message || "Pendaftaran gagal");
      }

      // Auto-login after registration
      const userData = {
        id: data.id,
        username: data.username,
        full_name: data.full_name,
      };
      localStorage.setItem("authUser", JSON.stringify(userData));
      setUser(userData);

      return userData;
    } catch (err) {
      throw new Error(err.message || "Pendaftaran gagal");
    }
  };

  const signOut = async () => {
    localStorage.removeItem("authUser");
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
