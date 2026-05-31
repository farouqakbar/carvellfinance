# Finora — Personal Finance Tracker

**Kelola keuangan dengan lebih bijak** 💰

Aplikasi tracker keuangan personal yang simple dan powerful. Catat pengeluaran, atur budget per kategori, dan pantau progress target tabungan kamu — semua dalam satu tempat.

## 🎯 Fitur Utama

- 📊 **Dashboard Visual** — Ringkasan keuangan dengan grafik
- 💳 **Kategori & Budget** — Buat kategori custom dan set budget limit
- 💰 **Target Tabungan** — Tetapkan target dan pantau progress
- 📝 **Riwayat Transaksi** — Catat pengeluaran dengan filter lengkap
- 🔐 **Secure Auth** — Login dengan username + password

## 🌐 Live Demo

Website tersedia di: **https://farouqakbar.github.io/carvellfinance/**

Coba login dengan username dan password yang Anda daftar!

## ⚙️ Tech Stack

- **Frontend**: React 18 + Vite
- **Database**: Supabase (PostgreSQL)
- **Auth**: Custom username/password authentication
- **Charts**: Recharts
- **Deploy**: GitHub Pages

## 🚀 Quick Start (Development)

### 1. Clone & Install

```bash
git clone https://github.com/farouqakbar/carvellfinance.git
cd carvellfinance
npm install
```

### 2. Setup Supabase

1. Buka [supabase.com](https://supabase.com) → Create project
2. SQL Editor → Run `supabase_schema.sql`
3. Disable RLS untuk testing (atau setup policies)

### 3. Environment Variables

```bash
# Create .env file
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development Server

```bash
npm run dev
```

Browser: `http://localhost:5173`

## 🛠️ Build & Deploy

### Build untuk Production

```bash
npm run build
```

Output: `docs/` folder (siap untuk GitHub Pages)

### Deploy Changes

```bash
npm run build
git add .
git commit -m "Update website"
git push origin main
```

Website akan update otomatis dalam 1-2 menit di GitHub Pages!

## 📂 Struktur Folder

```
finora/
├── src/
│   ├── components/       # React components
│   ├── pages/            # Page routes
│   ├── context/          # Auth context
│   ├── services/         # Supabase client
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Helper functions
│   ├── App.jsx
│   └── main.jsx
├── docs/                 # Build output (GitHub Pages)
├── public/               # Static assets
├── package.json
├── vite.config.js
├── supabase_schema.sql   # Database schema
└── .env                  # Environment variables
```

## 🔐 Authentication

Sistem menggunakan **custom username/password** stored di Supabase:

- Register dengan username (min 3 char) dan password (min 6 char)
- Login dengan username + password
- Session disimpan di localStorage
- Auto-logout saat refresh browser (optional)

## 📊 Database Schema

| Table | Deskripsi |
|-------|-----------|
| `user_profiles` | Store user account & password |
| `categories` | Kategori pengeluaran |
| `transactions` | Riwayat transaksi |
| `salaries` | Pendapatan bulanan |
| `savings` | Target tabungan |

## 🐛 Troubleshooting

### Supabase connection error

- Verifikasi `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY` di `.env`
- Cek Supabase project status
- Clear browser cache (Ctrl+Shift+Del)

### Login gagal

- Pastikan database table `user_profiles` sudah dibuat
- Check apakah RLS policies tidak menghalangi insert/select
- Verify password hashing function di `src/utils/passwordUtils.js`

### Website blank saat deploy

- Check GitHub Pages settings: Source = `main` branch, folder = `/docs`
- Cek browser console (F12) untuk error message
- Tunggu 1-2 menit setelah push

## 📚 Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Supabase Docs](https://supabase.com/docs)
- [GitHub Pages Guide](https://pages.github.com)

## 📝 License

MIT License - Feel free to use for personal projects!

## 👨‍💻 Author

Farouq - [GitHub](https://github.com/farouqakbar)

---

**Happy tracking your finances! 🎉**
