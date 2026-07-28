-- ============================================================
-- CASHVELL — Operasi Recovery Code (manual, jalankan di Supabase SQL Editor)
--
-- PENTING: jalankan migrasi 20260728_recovery_code.sql DULU.
-- Jalankan blok di bawah SATU PER SATU, jangan sekaligus.
--
-- Formula hash harus identik dengan hashRecoveryCode() di
-- src/context/AuthContext.jsx:
--   normalized = uppercase(code), buang semua selain A-Z0-9  → 'CV' ikut terbawa
--   hash       = sha256_hex('cashvell-recovery:' || normalized)
-- ============================================================


-- ── 0. SELF-TEST — pastikan formula SQL == formula JS ───────
-- Harus mengembalikan cocok = true. Kalau false, JANGAN lanjut.
SELECT
  encode(sha256(convert_to('cashvell-recovery:CVABCDEFGHJKLM', 'UTF8')), 'hex') AS hash_sql,
  '5a8372d86ec24857a9e17f0b6e96d7d2847cf563c870ee8247fdc4de8cc1472c'            AS hash_js_referensi,
  encode(sha256(convert_to('cashvell-recovery:CVABCDEFGHJKLM', 'UTF8')), 'hex')
    = '5a8372d86ec24857a9e17f0b6e96d7d2847cf563c870ee8247fdc4de8cc1472c'        AS cocok;


-- ── 1. CEK USER TERDAFTAR ───────────────────────────────────
-- Siapa saja yang ada, dan siapa yang belum punya recovery code.
SELECT
  username,
  full_name,
  created_at::date AS terdaftar,
  (recovery_code_hash IS NOT NULL) AS punya_recovery_code
FROM user_profiles
ORDER BY (recovery_code_hash IS NOT NULL), created_at;

-- Ringkasannya saja:
-- SELECT count(*) AS total,
--        count(recovery_code_hash) AS sudah_punya,
--        count(*) - count(recovery_code_hash) AS belum_punya
-- FROM user_profiles;


-- ── 2. GENERATE CODE UNTUK SEMUA USER YANG BELUM PUNYA ──────
-- ⚠️ Kolom `recovery_code` di hasil adalah PLAINTEXT dan HANYA MUNCUL SEKALI.
--    Salin hasilnya sekarang juga — DB cuma menyimpan hash-nya.
--    Kirim ke masing-masing user lewat jalur yang aman.
WITH target AS (
  SELECT id, username
  FROM user_profiles
  WHERE recovery_code_hash IS NULL
), chars AS (
  -- 12 karakter acak per user; alfabet 32 simbol tanpa I/O/0/1
  SELECT
    t.id,
    g.i,
    substr('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 1 + floor(random() * 32)::int, 1) AS ch
  FROM target t
  CROSS JOIN generate_series(1, 12) AS g(i)
), raw AS (
  SELECT id, string_agg(ch, '' ORDER BY i) AS body
  FROM chars
  GROUP BY id
), gen AS (
  SELECT
    id,
    'CV-' || substr(body, 1, 4) || '-' || substr(body, 5, 4) || '-' || substr(body, 9, 4) AS code,
    'CV'  || body AS normalized
  FROM raw
)
UPDATE user_profiles u
SET recovery_code_hash = encode(sha256(convert_to('cashvell-recovery:' || gen.normalized, 'UTF8')), 'hex')
FROM gen
WHERE u.id = gen.id
RETURNING u.username, gen.code AS recovery_code;


-- ── 3. GENERATE / RESET UNTUK SATU USER ─────────────────────
-- Ganti 'ganti_username_ini'. Kode lama (kalau ada) langsung tidak berlaku.
WITH target AS (
  SELECT id FROM user_profiles
  WHERE username = lower('ganti_username_ini')
), chars AS (
  SELECT t.id, g.i,
         substr('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 1 + floor(random() * 32)::int, 1) AS ch
  FROM target t CROSS JOIN generate_series(1, 12) AS g(i)
), raw AS (
  SELECT id, string_agg(ch, '' ORDER BY i) AS body FROM chars GROUP BY id
), gen AS (
  SELECT id,
         'CV-' || substr(body, 1, 4) || '-' || substr(body, 5, 4) || '-' || substr(body, 9, 4) AS code,
         'CV'  || body AS normalized
  FROM raw
)
UPDATE user_profiles u
SET recovery_code_hash = encode(sha256(convert_to('cashvell-recovery:' || gen.normalized, 'UTF8')), 'hex')
FROM gen
WHERE u.id = gen.id
RETURNING u.username, gen.code AS recovery_code;


-- ── 4. VERIFIKASI SEBUAH CODE TANPA MENGUBAH APA PUN ────────
-- Berguna untuk memastikan kode yang kamu catat memang cocok.
-- Ganti username + kode. Toleran huruf kecil / spasi / strip, sama seperti app.
SELECT
  username,
  recovery_code_hash = encode(
    sha256(convert_to(
      'cashvell-recovery:' || regexp_replace(upper('CV-XXXX-XXXX-XXXX'), '[^A-Z0-9]', '', 'g'),
      'UTF8')),
    'hex') AS code_cocok
FROM user_profiles
WHERE username = lower('ganti_username_ini');
