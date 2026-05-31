-- ============================================
-- CASHVELL — Supabase Schema v4
-- Jalankan di Supabase SQL Editor
-- ============================================

-- 0. USER PROFILES TABLE
-- Tidak pakai Supabase Auth — username + password hash disimpan langsung
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1. SALARIES TABLE
CREATE TABLE IF NOT EXISTS salaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC(15,2) NOT NULL,
  month TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, month)
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
-- MATIKAN RLS (tidak pakai Supabase Auth)
-- Akses dikontrol oleh app via user_id filter
-- ============================================
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE salaries DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE savings DISABLE ROW LEVEL SECURITY;

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_salaries_user_month ON salaries(user_id, month);
CREATE INDEX IF NOT EXISTS idx_categories_user_id ON categories(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_date ON transactions(user_id, date);
CREATE INDEX IF NOT EXISTS idx_savings_user_id ON savings(user_id);
