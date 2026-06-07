-- Ledger untuk setiap perubahan saldo tabungan (insert-only, tidak pernah dihapus kecuali reversal)
CREATE TABLE IF NOT EXISTS savings_ledger (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  savings_id uuid REFERENCES savings(id) ON DELETE SET NULL,
  amount numeric NOT NULL,  -- positif = masuk, negatif = keluar
  month char(7) NOT NULL,   -- 'YYYY-MM'
  date date NOT NULL,
  note text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_savings_ledger_user_month ON savings_ledger(user_id, month);
