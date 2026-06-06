-- Step 1: Add category_type column
ALTER TABLE categories ADD COLUMN IF NOT EXISTS category_type TEXT DEFAULT NULL;

-- Step 2: Migrate existing data

-- Rename "Pemasukan Bulanan" → "Gaji" (preserves category_id so all transactions stay linked)
UPDATE categories
SET name = 'Gaji', category_type = 'income'
WHERE name = 'Pemasukan Bulanan' AND month IS NULL;

-- Savings categories
UPDATE categories
SET category_type = 'savings'
WHERE name = 'Tabungan Bulanan' AND month IS NULL AND category_type IS NULL;

-- Wajib: is_mandatory=true, not yet classified
UPDATE categories
SET category_type = 'wajib'
WHERE is_mandatory = true AND category_type IS NULL;

-- Rutin: is_monthly=true, not mandatory
UPDATE categories
SET category_type = 'rutin'
WHERE is_monthly = true AND is_mandatory = false AND category_type IS NULL;

-- Everything else = tambahan
UPDATE categories
SET category_type = 'tambahan'
WHERE category_type IS NULL;

-- Step 3: Seed new global defaults for every existing user
-- Dana Darurat (savings, is_mandatory=true for auto-deduct)
INSERT INTO categories (user_id, name, color, icon, budget_limit, is_mandatory, is_monthly, is_planned, category_type)
SELECT id, 'Dana Darurat', '#06b6d4', '', 0, true, false, false, 'savings'
FROM user_profiles
WHERE id NOT IN (
  SELECT DISTINCT user_id FROM categories WHERE name = 'Dana Darurat' AND month IS NULL
);

-- Investasi (wajib, is_mandatory=true)
INSERT INTO categories (user_id, name, color, icon, budget_limit, is_mandatory, is_monthly, is_planned, category_type)
SELECT id, 'Investasi', '#a855f7', '', 0, true, false, false, 'wajib'
FROM user_profiles
WHERE id NOT IN (
  SELECT DISTINCT user_id FROM categories WHERE name = 'Investasi' AND month IS NULL
);

-- Belanja Bulanan (rutin, is_monthly=true)
INSERT INTO categories (user_id, name, color, icon, budget_limit, is_mandatory, is_monthly, is_planned, category_type)
SELECT id, 'Belanja Bulanan', '#f59e0b', '', 0, false, true, false, 'rutin'
FROM user_profiles
WHERE id NOT IN (
  SELECT DISTINCT user_id FROM categories WHERE name = 'Belanja Bulanan' AND month IS NULL
);

-- Jajan (tambahan)
INSERT INTO categories (user_id, name, color, icon, budget_limit, is_mandatory, is_monthly, is_planned, category_type)
SELECT id, 'Jajan', '#f97316', '', 0, false, false, false, 'tambahan'
FROM user_profiles
WHERE id NOT IN (
  SELECT DISTINCT user_id FROM categories WHERE name = 'Jajan' AND month IS NULL
);
