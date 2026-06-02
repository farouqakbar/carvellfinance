-- ============================================================
-- Cashvell Schema Fix — 2026-06-02
-- Jalankan di Supabase SQL Editor (Settings > SQL Editor)
-- ============================================================

-- 1. Tambah kolom budget_harian ke user_profiles
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS budget_harian numeric DEFAULT 0;

-- 2. Pastikan unique constraint di category_budgets ada (category_id + month)
--    Diperlukan untuk upsert onConflict agar tidak duplikat
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'category_budgets_category_id_month_key'
  ) THEN
    ALTER TABLE category_budgets
      ADD CONSTRAINT category_budgets_category_id_month_key
      UNIQUE (category_id, month);
  END IF;
END $$;

-- 3. Fix Tabungan Bulanan — seharusnya is_mandatory = true
UPDATE categories
SET is_mandatory = true
WHERE name = 'Tabungan Bulanan' AND is_mandatory = false;

-- 4. Bersihkan categories.budget_limit yang stale (global, bukan per-bulan)
--    Set semua ke 0 karena nilai ini tidak dipakai app (app pakai category_budgets)
UPDATE categories
SET budget_limit = 0
WHERE budget_limit != 0;
