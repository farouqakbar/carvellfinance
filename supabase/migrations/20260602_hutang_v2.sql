CREATE TABLE IF NOT EXISTS hutang (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  nama text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  jenis text NOT NULL DEFAULT 'hutang',  -- 'hutang' = pinjam dari orang, 'piutang' = orang pinjam dari saya
  due_date date,
  month text,
  sumber text NOT NULL DEFAULT 'saldo',  -- 'saldo' = potong saldo, 'tabungan' = potong tabungan
  savings_id uuid REFERENCES savings(id) ON DELETE SET NULL,
  linked_tx_id uuid REFERENCES transactions(id) ON DELETE SET NULL,
  lunas boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS hutang_user_id_idx ON hutang(user_id);
