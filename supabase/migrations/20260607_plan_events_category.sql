-- Add category_id to plan_events (optional link to categories)
ALTER TABLE plan_events ADD COLUMN IF NOT EXISTS category_id uuid REFERENCES categories(id) ON DELETE SET NULL;
