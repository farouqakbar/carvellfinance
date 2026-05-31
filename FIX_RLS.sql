-- ============================================
-- FIX: Disable RLS untuk Custom Auth
-- Jalankan di Supabase SQL Editor
-- ============================================

-- Disable RLS di user_profiles (custom auth tidak pakai auth.uid())
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- Untuk table lain, buat policy yang lebih permissive
-- (atau disable juga jika custom auth tidak punya user_id di context)

-- Disable untuk semua table karena custom auth
ALTER TABLE salaries DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE savings DISABLE ROW LEVEL SECURITY;

-- ============================================
-- Alternatif: Jika mau pakai RLS, gunakan policy ini:
-- ============================================
-- ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
-- DROP POLICY IF EXISTS "Allow public insert" ON user_profiles;
-- CREATE POLICY "Allow public insert" ON user_profiles FOR INSERT WITH CHECK (TRUE);
-- CREATE POLICY "Allow public select" ON user_profiles FOR SELECT USING (TRUE);
-- CREATE POLICY "Allow public update" ON user_profiles FOR UPDATE USING (TRUE);
-- CREATE POLICY "Allow public delete" ON user_profiles FOR DELETE USING (TRUE);
