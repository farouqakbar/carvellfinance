-- ============================================
-- CASHVELL — Supabase Schema v5
-- Jalankan di Supabase SQL Editor
-- ============================================

-- 0. USER PROFILES
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1. SALARIES (per bulan)
CREATE TABLE IF NOT EXISTS salaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC(15,2) NOT NULL,
  month TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, month)
);

-- 2. CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  budget_limit NUMERIC(15,2) DEFAULT 0,
  color TEXT DEFAULT '#6366f1',
  icon TEXT DEFAULT '💰',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TRANSACTIONS (per tanggal → otomatis per bulan)
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

-- 4. SAVINGS (daftar nama tabungan + alokasi per bulan)
CREATE TABLE IF NOT EXISTS savings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL DEFAULT 'Tabungan',
  target_amount NUMERIC(15,2) NOT NULL DEFAULT 0, -- nominal yg disisihkan per bulan
  current_amount NUMERIC(15,2) NOT NULL DEFAULT 0, -- total terkumpul semua waktu
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CATEGORY BUDGETS per bulan (override global budget_limit) ← BARU
CREATE TABLE IF NOT EXISTS category_budgets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
  month TEXT NOT NULL,
  budget_limit NUMERIC(15,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(category_id, month)
);

-- 6. SAVINGS LOG (realisasi tabungan per bulan) ← BARU
CREATE TABLE IF NOT EXISTS savings_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  savings_id UUID REFERENCES savings(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  month TEXT NOT NULL,                              -- format: YYYY-MM
  amount NUMERIC(15,2) NOT NULL DEFAULT 0,          -- realisasi bulan ini
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(savings_id, month)
);

-- ============================================
-- MATIKAN RLS
-- ============================================
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE salaries DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE savings DISABLE ROW LEVEL SECURITY;
ALTER TABLE category_budgets DISABLE ROW LEVEL SECURITY;
ALTER TABLE savings_log DISABLE ROW LEVEL SECURITY;

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_salaries_user_month ON salaries(user_id, month);
CREATE INDEX IF NOT EXISTS idx_categories_user_id ON categories(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_date ON transactions(user_id, date);
CREATE INDEX IF NOT EXISTS idx_savings_user_id ON savings(user_id);
CREATE INDEX IF NOT EXISTS idx_cat_budgets_user_month ON category_budgets(user_id, month);
CREATE INDEX IF NOT EXISTS idx_savings_log_user_month ON savings_log(user_id, month);
CREATE INDEX IF NOT EXISTS idx_savings_log_savings_month ON savings_log(savings_id, month);
