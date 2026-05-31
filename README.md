# Carvell Finance — Personal Finance Tracker

**Kelola keuangan dengan lebih bijak** 💰

Aplikasi tracker keuangan personal yang simple dan powerful. Catat pengeluaran, atur budget per kategori, dan pantau progress target tabungan kamu — semua dalam satu tempat.

## 🎯 Fitur Utama

- 📊 **Dashboard Visual** — Ringkasan keuangan bulanan dengan grafik
- 💳 **Kategori & Budget** — Buat kategori custom dan set budget limit
- 💰 **Target Tabungan** — Tetapkan target dan pantau progress real-time
- 📝 **Riwayat Transaksi** — Catat semua pengeluaran dengan filter lengkap
- 🌙 **Dark Mode** — Nyaman digunakan kapan saja
- 🔐 **Secure Auth** — Login dengan username + password (Supabase)

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/farouqakbar/carvellfinance.git
cd carvellfinance
npm install
```

### 2. Setup Supabase

1. Buka [supabase.com](https://supabase.com) → **Create a new project**
2. Tunggu project selesai dibuat
3. **SQL Editor** → Copy paste isi `supabase_schema.sql` → **Run**
4. **Authentication → Providers → Email**:
   - Matikan toggle **"Confirm email"** → **Save**

### 3. Environment Variables

```bash
cp .env.example .env
```

Edit `.env` dan isi dengan Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Dapatkan dari: **Supabase → Project Settings → API**

### 4. Run

```bash
npm run dev
```

Buka browser: `http://localhost:5173`

## 🚢 Deployment

### Option 1: Vercel (Recommended)

```bash
npm run build
```

1. Push ke GitHub
2. Buka [vercel.com](https://vercel.com) → **New Project**
3. Import repository
4. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

### Option 2: GitHub Pages

```bash
npm run build
# Push dist folder ke gh-pages branch
```

### Option 3: Netlify

```bash
npm run build
# Drag dist folder ke Netlify
```

Atau connect GitHub dan set env vars di Netlify dashboard.

## 📁 Struktur Proyek

```
src/
├── components/          # UI components
├── context/             # React Context (Auth)
├── pages/               # Page components
├── services/            # Supabase client
├── hooks/               # Custom hooks
├── utils/               # Utilities
├── App.jsx
├── index.css
└── main.jsx
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (Email/Password)
- **Charts**: Recharts
- **Routing**: React Router v6

## 🔐 Keamanan

- Passwords di-hash di Supabase Auth
- Row Level Security (RLS) pada semua tables
- Credentials tidak di-commit (`.gitignore`)
- User data terenkripsi di database

## 📊 Database Schema

- `user_profiles` — Menyimpan username & data user
- `salaries` — Gaji bulanan
- `categories` — Kategori pengeluaran custom
- `transactions` — Catat semua transaksi
- `savings` — Target tabungan

## 🐛 Troubleshooting

**Error: "Missing Supabase environment variables"**
→ Cek file `.env` sudah ada dan berisi credentials yang benar

**Login gagal dengan "Username atau password salah"**
→ Pastikan email confirmation sudah di-disable di Supabase

**Username sudah terdaftar tapi lupa password**
→ Buka Supabase Dashboard → Users → hapus user → daftar ulang

## 📝 Available Scripts

```bash
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview build
```

## 📄 License

MIT License

## 👤 Author

**Farouq Akbar** — [@farouqakbar](https://github.com/farouqakbar)

---

**Mulai kelola keuangan dengan bijak hari ini! 🚀**
