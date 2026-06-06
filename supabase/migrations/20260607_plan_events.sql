-- plan_events: financial event planning for simulation
CREATE TABLE IF NOT EXISTS plan_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  amount numeric NOT NULL DEFAULT 0,
  date date NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);
