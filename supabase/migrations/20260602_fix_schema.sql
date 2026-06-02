-- budget_harian: batas pengeluaran per hari, alert di Dashboard
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS budget_harian numeric DEFAULT 0;

-- unique constraint diperlukan untuk upsert onConflict: 'category_id,month'
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
