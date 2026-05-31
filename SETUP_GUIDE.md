# 🚀 Setup & Deployment Guide - Carvell Finance

Panduan lengkap untuk setup lokal dan deploy ke GitHub.

## 1️⃣ LOCAL SETUP

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Setup Supabase

#### 2a. Buat Supabase Project

1. Buka https://supabase.com
2. Sign up / Login
3. Klik **New Project**
4. Isi form:
   - **Project name**: carvell-finance
   - **Database password**: Buat yang kuat & ingat!
   - **Region**: Pilih terdekat (misal: Singapore)
5. Tunggu sampai project selesai di-create (±5 menit)

#### 2b. Run SQL Schema

1. Di Supabase Dashboard, buka **SQL Editor**
2. Klik **New Query**
3. Copy paste **seluruh isi** file `supabase_schema.sql`
4. Klik **Run**
5. Tunggu sampai semua queries selesai (check di "Results")

#### 2c. Disable Email Confirmation

**WAJIB!** Tanpa ini, signup tidak akan bisa langsung login.

1. Buka **Authentication** (menu kiri)
2. Klik **Providers**
3. Cari **Email**
4. Toggle **Confirm email** → OFF
5. Klik **Save**

### Step 3: Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_SUPABASE_URL=https://xxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

**Dapatkan credentials:**

1. Buka Supabase Dashboard
2. Settings → Project → API
3. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Anon (public)** → `VITE_SUPABASE_ANON_KEY`

### Step 4: Test Lokale

```bash
npm run dev
```

Buka: http://localhost:5173

**Test Flow:**

1. Klik **Register**
2. Input username & password (min 6 char)
3. Klik **Buat Akun**
4. Seharusnya redirect ke Dashboard
5. Coba add category, transaksi, dll

---

## 2️⃣ GITHUB SETUP

### Step 1: Create Repository

1. Buka https://github.com/farouqakbar
2. Klik **New** (atau create new repository)
3. Repository name: `carvellfinance`
4. Description: `Personal Finance Tracker`
5. Visibility: **Public** (agar bisa diakses)
6. **DO NOT** initialize with README (kita sudah punya)
7. Klik **Create repository**

### Step 2: Push Code ke GitHub

Di local folder `carvellfinance`:

```bash
# Initialize git (jika belum)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Carvell Finance with Supabase"

# Add remote
git remote add origin https://github.com/farouqakbar/carvellfinance.git

# Push ke main branch
git branch -M main
git push -u origin main
```

**Verify:**

- Buka https://github.com/farouqakbar/carvellfinance
- Seharusnya ada semua files kamu

---

## 3️⃣ DEPLOY KE VERCEL

### Step 1: Connect GitHub ke Vercel

1. Buka https://vercel.com
2. Sign up dengan GitHub (authorize Vercel)
3. Klik **New Project**
4. Pilih repository: `carvellfinance`
5. Klik **Import**

### Step 2: Set Environment Variables

Di Vercel dashboard, di bagian **Environment Variables**:

```
VITE_SUPABASE_URL = https://xxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGc...
```

Klik **Save**

### Step 3: Deploy

Klik tombol **Deploy**

**Tunggu ±2-5 menit**, maka akan mendapat URL seperti:

```
https://carvellfinance.vercel.app
```

### Step 4: Update Supabase CORS (Important!)

Agar API calls dari Vercel domain bisa ke Supabase:

1. Buka Supabase Dashboard
2. Settings → Project → Authentication
3. Scroll ke **URL Configuration**
4. Di field **Site URL**, add:
   ```
   https://carvellfinance.vercel.app
   ```
5. Klik **Save**

---

## 4️⃣ OPTIONAL: Deploy ke GitHub Pages

Jika ingin host di GitHub Pages (gratis tapi static only):

```bash
npm run build
```

Push folder `dist/` ke branch `gh-pages`:

```bash
git subtree push --prefix dist origin gh-pages
```

Di GitHub Settings → Pages:

- Source: `gh-pages` branch
- Biarkan automatic deploys

Nanti bisa akses di: `https://farouqakbar.github.io/carvellfinance`

---

## 5️⃣ TESTING DEPLOYMENT

Setelah deploy ke Vercel:

1. Buka deployed URL (https://carvellfinance.vercel.app)
2. Test register dengan username baru
3. Test login
4. Test add category, transaction
5. Check Supabase dashboard → Tables → data sudah tersimpan?

---

## 🐛 TROUBLESHOOTING

### Error: "Missing Supabase environment variables"

**Solution:**

- Cek `.env` file ada & berisi URL + KEY yang benar
- Jika di Vercel, cek Environment Variables sudah di-set
- Restart dev server: `npm run dev`

### Error: "Email already registered"

**Solution:**

- Signup menggunakan username yang berbeda
- Atau delete user di Supabase → Users → delete

### Vercel deploy gagal dengan error npm

**Solution:**

```bash
npm ci
npm run build
```

Kemudian push ke GitHub lagi.

### Cannot connect to Supabase dari Vercel

**Solution:**

- Pastikan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` sudah set di Vercel
- Redeploy setelah set env vars
- Check Supabase URL Configuration sudah include Vercel domain

---

## 📋 CHECKLIST

- [ ] Supabase project created
- [ ] SQL schema di-run di Supabase
- [ ] Email confirmation di-disable di Supabase
- [ ] `.env` file dibuat & berisi credentials
- [ ] `npm run dev` berjalan tanpa error
- [ ] Local testing (register, login, add data) berhasil
- [ ] Repository di-push ke GitHub
- [ ] Vercel project di-create & connected
- [ ] Environment variables di-set di Vercel
- [ ] Vercel deployment berhasil
- [ ] Supabase URL Configuration di-update dengan Vercel domain
- [ ] Test di deployed URL berhasil

---

## 🎉 Done!

Aplikasi kamu sekarang live di: **https://carvellfinance.vercel.app**

Setiap kali push ke `main` branch di GitHub, Vercel otomatis redeploy! 🚀

---

**Need help?** Check error messages di:

- Vercel Dashboard → Deployments → logs
- Browser DevTools → Console
- Supabase Dashboard → Logs
