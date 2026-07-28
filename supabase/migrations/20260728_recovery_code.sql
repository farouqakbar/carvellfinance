-- Recovery code untuk reset password tanpa email.
-- Menyimpan SHA-256 dari kode (bukan kodenya) — sama seperti password_hash.
-- User lama akan NULL: mereka wajib generate dari Profil > Keamanan.
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS recovery_code_hash TEXT;
