ALTER TABLE categories ADD COLUMN IF NOT EXISTS is_planned boolean DEFAULT false;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS is_monthly boolean DEFAULT false;
