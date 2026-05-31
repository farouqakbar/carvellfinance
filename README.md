# Finora — Personal Finance Tracker

App manajemen keuangan pribadi dengan React + Supabase.

## 🚀 Setup Cepat

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase

1. Buka [supabase.com](https://supabase.com) → buat project baru
2. Buka **SQL Editor** → paste isi file `supabase_schema.sql` → **Run**
3. Buka **Authentication → Providers → Email** → **matikan "Confirm email"** → Save

> ⚠️ Langkah 3 wajib! App ini pakai username (bukan email asli), jadi konfirmasi email harus dimatikan agar user bisa langsung masuk setelah daftar.

### 3. Environment Variables
```bash
cp .env.example .env
```
Isi `.env` dengan nilai dari **Supabase → Project Settings → API**:
```
VITE_SUPABASE_URL=https://xxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### 4. Jalankan
```bash
npm run dev
```

## 📦 Build & Deploy ke Vercel

```bash
npm run build
```

Di Vercel:
- Import repo GitHub
- Set environment variables: `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`
- Tambahkan URL Vercel ke **Supabase → Authentication → URL Configuration → Site URL**
- Tambahkan juga ke Google OAuth redirect URIs

## 📁 Struktur Proyek
```
src/
├── components/     # UI components (Navbar, Card, Forms, Toast)
├── pages/          # Dashboard, Login, Transactions, Categories, Savings
├── context/        # AuthContext
├── hooks/          # useAuth
├── services/       # supabaseClient
└── utils/          # formatCurrency, formatDate
```

## ✨ Fitur
- 🔐 Auth username + password (tanpa email)
- 📊 Dashboard dengan chart pengeluaran
- 💸 Tracking transaksi (pemasukan & pengeluaran)
- 🏷️ Kategori custom dengan budget limit
- 💰 Target tabungan + progress bar
- ⚠️ Warning overbudget otomatis
- 📥 Export CSV
- 🌓 Dark/light mode
