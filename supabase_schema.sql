-- ============================================
-- FINORA — Supabase SQL Setup
-- Jalankan file ini di Supabase SQL Editor
-- ============================================

-- 1. SALARIES TABLE
CREATE TABLE salaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC(15,2) NOT NULL,
  month TEXT NOT NULL, -- format: "YYYY-MM"
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  budget_limit NUMERIC(15,2) DEFAULT 0,
  color TEXT DEFAULT '#6366f1',
  icon TEXT DEFAULT '💰',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TRANSACTIONS TABLE
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  amount NUMERIC(15,2) NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'expense' CHECK (type IN ('expense', 'income')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SAVINGS TABLE
CREATE TABLE savings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL DEFAULT 'Target Tabungan',
  target_amount NUMERIC(15,2) NOT NULL DEFAULT 0,
  current_amount NUMERIC(15,2) NOT NULL DEFAULT 0,
  deadline DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE salaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings ENABLE ROW LEVEL SECURITY;

-- Salaries RLS
CREATE POLICY "Users can view own salaries" ON salaries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own salaries" ON salaries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own salaries" ON salaries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own salaries" ON salaries FOR DELETE USING (auth.uid() = user_id);

-- Categories RLS
CREATE POLICY "Users can view own categories" ON categories FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own categories" ON categories FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own categories" ON categories FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own categories" ON categories FOR DELETE USING (auth.uid() = user_id);

-- Transactions RLS
CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own transactions" ON transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own transactions" ON transactions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own transactions" ON transactions FOR DELETE USING (auth.uid() = user_id);

-- Savings RLS
CREATE POLICY "Users can view own savings" ON savings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own savings" ON savings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own savings" ON savings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own savings" ON savings FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- PENTING: MATIKAN EMAIL CONFIRMATION
-- ============================================
-- Buka Supabase Dashboard →
-- Authentication → Email Templates → "Confirm signup"
-- ATAU lebih mudah:
-- Authentication → Providers → Email →
-- Matikan toggle "Confirm email" → Save
--
-- Ini wajib agar user bisa langsung login setelah daftar
-- tanpa harus verifikasi email (karena kita pakai username, bukan email asli)

-- ============================================
-- SAMPLE DATA (OPTIONAL - hapus jika tidak perlu)
-- ============================================
-- Uncomment untuk insert sample categories setelah register:
/*
INSERT INTO categories (user_id, name, budget_limit, color, icon) VALUES
  (auth.uid(), 'Makan & Minum', 2000000, '#f59e0b', '🍜'),
  (auth.uid(), 'Transportasi', 500000, '#3b82f6', '🚗'),
  (auth.uid(), 'Belanja', 1000000, '#ec4899', '🛍️'),
  (auth.uid(), 'Hiburan', 500000, '#8b5cf6', '🎮'),
  (auth.uid(), 'Kesehatan', 300000, '#10b981', '💊'),
  (auth.uid(), 'Tagihan', 800000, '#ef4444', '📱');
*/
