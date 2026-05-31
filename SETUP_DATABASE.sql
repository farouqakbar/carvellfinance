-- ============================================
-- FINORA - Database Setup (Custom Auth)
-- Jalankan di Supabase SQL Editor
-- ============================================

-- 0. USER PROFILES TABLE (custom auth dengan password)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT DEFAULT '',
  password_hash TEXT NOT NULL,
  avatar_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Buat index untuk performa login
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON user_profiles(username);

-- 1. SALARIES TABLE
CREATE TABLE IF NOT EXISTS salaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC(15,2) NOT NULL,
  month TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  budget_limit NUMERIC(15,2) DEFAULT 0,
  color TEXT DEFAULT '#6366f1',
  icon TEXT DEFAULT '💰',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  amount NUMERIC(15,2) NOT NULL,
  date DATE NOT NULL,
  description TEXT DEFAULT '',
  type TEXT DEFAULT 'expense' CHECK (type IN ('expense', 'income')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SAVINGS TABLE
CREATE TABLE IF NOT EXISTS savings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL DEFAULT 'Target Tabungan',
  target_amount NUMERIC(15,2) NOT NULL DEFAULT 0,
  current_amount NUMERIC(15,2) NOT NULL DEFAULT 0,
  deadline DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE salaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings ENABLE ROW LEVEL SECURITY;

-- Drop old policies if exist
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can view own salaries" ON salaries;
DROP POLICY IF EXISTS "Users can insert own salaries" ON salaries;
DROP POLICY IF EXISTS "Users can update own salaries" ON salaries;
DROP POLICY IF EXISTS "Users can delete own salaries" ON salaries;
DROP POLICY IF EXISTS "Users can view own categories" ON categories;
DROP POLICY IF EXISTS "Users can insert own categories" ON categories;
DROP POLICY IF EXISTS "Users can update own categories" ON categories;
DROP POLICY IF EXISTS "Users can delete own categories" ON categories;
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can insert own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can update own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can delete own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can view own savings" ON savings;
DROP POLICY IF EXISTS "Users can insert own savings" ON savings;
DROP POLICY IF EXISTS "Users can update own savings" ON savings;
DROP POLICY IF EXISTS "Users can delete own savings" ON savings;

-- User Profiles RLS (tidak pakai auth.uid() karena custom auth)
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (TRUE);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (TRUE);

-- Salaries RLS (pakai user_id biasa)
CREATE POLICY "Users can view own salaries" ON salaries FOR SELECT USING (TRUE);
CREATE POLICY "Users can insert own salaries" ON salaries FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Users can update own salaries" ON salaries FOR UPDATE USING (TRUE);
CREATE POLICY "Users can delete own salaries" ON salaries FOR DELETE USING (TRUE);

-- Categories RLS
CREATE POLICY "Users can view own categories" ON categories FOR SELECT USING (TRUE);
CREATE POLICY "Users can insert own categories" ON categories FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Users can update own categories" ON categories FOR UPDATE USING (TRUE);
CREATE POLICY "Users can delete own categories" ON categories FOR DELETE USING (TRUE);

-- Transactions RLS
CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (TRUE);
CREATE POLICY "Users can insert own transactions" ON transactions FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Users can update own transactions" ON transactions FOR UPDATE USING (TRUE);
CREATE POLICY "Users can delete own transactions" ON transactions FOR DELETE USING (TRUE);

-- Savings RLS
CREATE POLICY "Users can view own savings" ON savings FOR SELECT USING (TRUE);
CREATE POLICY "Users can insert own savings" ON savings FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Users can update own savings" ON savings FOR UPDATE USING (TRUE);
CREATE POLICY "Users can delete own savings" ON savings FOR DELETE USING (TRUE);

-- ============================================
-- INDEXES (untuk performa query)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_salaries_user_id ON salaries(user_id);
CREATE INDEX IF NOT EXISTS idx_categories_user_id ON categories(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_category_id ON transactions(category_id);
CREATE INDEX IF NOT EXISTS idx_savings_user_id ON savings(user_id);

-- ============================================
-- DONE! Database siap untuk custom auth
-- ============================================
