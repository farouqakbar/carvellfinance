-- ============================================
-- MIGRATION: Add Password Field to user_profiles
-- Jalankan di Supabase SQL Editor
-- ============================================

-- Hapus dependency dari auth.users untuk custom auth
ALTER TABLE user_profiles DROP CONSTRAINT user_profiles_id_fkey;

-- Ubah id menjadi UUID tanpa reference ke auth.users
ALTER TABLE user_profiles DROP CONSTRAINT user_profiles_pkey;
ALTER TABLE user_profiles ADD COLUMN id UUID DEFAULT gen_random_uuid();
ALTER TABLE user_profiles ADD PRIMARY KEY (id);

-- Tambah password_hash column
ALTER TABLE user_profiles ADD COLUMN password_hash TEXT NOT NULL DEFAULT '';

-- Buat index untuk username untuk performa query login
CREATE INDEX idx_user_profiles_username ON user_profiles(username);

-- Update RLS policy agar tidak tergantung auth.uid() lagi
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Simplified RLS policies
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (TRUE);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (TRUE);
