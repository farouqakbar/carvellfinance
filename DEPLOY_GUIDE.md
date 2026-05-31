# 🚀 Deploy Finora ke Internet - Panduan Lengkap

Project Anda sudah **di-push ke GitHub**. Sekarang kita deploy ke internet agar bisa diakses semua orang.

---

## 🎯 Pilihan Deploy (Rekomendasi: **Vercel**)

| Platform | Fitur | Harga | Kecepatan |
|----------|-------|-------|----------|
| **Vercel** ⭐ | CI/CD auto, custom domain, serverless | Gratis (generous free tier) | ⚡ Sangat cepat |
| Netlify | CI/CD auto, custom domain, serverless | Gratis | ⚡ Cepat |
| GitHub Pages | Statis, gratis, mudah | Gratis | ⏱️ Standar |
| Heroku | Full backend support | Gratis dihentikan | ⏱️ Standar |

**Saya rekomendasikan: VERCEL** (paling mudah + cepat untuk React/Vite)

---

## 📝 OPSI 1: Deploy ke Vercel (RECOMMENDED) ✨

### Step 1: Setup Vercel Account
1. Buka https://vercel.com
2. **Sign Up** dengan GitHub account (lebih mudah)
3. Authorize akses ke GitHub

### Step 2: Import Project
1. Di Vercel dashboard, klik **"Add New..."** → **"Project"**
2. Pilih repository: `carvellfinance`
3. Klik **"Import"**

### Step 3: Configure Environment Variables
1. Di halaman import, scroll ke **"Environment Variables"**
2. **Add** 3 variable:
   ```
   VITE_SUPABASE_URL = https://ourualaimpjurwpyajab.supabase.co
   VITE_SUPABASE_ANON_KEY = (copy dari .env Anda)
   ```

### Step 4: Deploy
1. Klik **"Deploy"**
2. Tunggu ~2-3 menit untuk build
3. ✅ **Selesai!** Website live di: `https://carvellfinance.vercel.app`

### Step 5: Custom Domain (Optional)
1. Di Vercel project settings
2. **Domains** → **Add domain**
3. Point domain ke Vercel (ikuti instruksi)

---

## 📝 OPSI 2: Deploy ke Netlify

### Step 1: Setup Netlify Account
1. Buka https://netlify.com
2. **Sign Up** dengan GitHub

### Step 2: Connect GitHub Repository
1. Klik **"Add new site"** → **"Import an existing project"**
2. Pilih GitHub → `carvellfinance`

### Step 3: Configure Build Settings
1. **Build command**: `npm run build`
2. **Publish directory**: `dist`

### Step 4: Add Environment Variables
1. **Site settings** → **Build & deploy** → **Environment**
2. **Add variable**:
   ```
   VITE_SUPABASE_URL = https://ourualaimpjurwpyajab.supabase.co
   VITE_SUPABASE_ANON_KEY = (copy dari .env Anda)
   ```

### Step 5: Deploy
1. Klik **"Deploy"**
2. ✅ Website live di: `https://[sitename].netlify.app`

---

## 📝 OPSI 3: Deploy ke GitHub Pages (Static)

### Step 1: Update `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/carvellfinance/', // Sesuaikan dengan repo name
})
```

### Step 2: Add Deployment Workflow
Buat file: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Step 3: Add Secrets di GitHub
1. Repository → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret**:
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://ourualaimpjurwpyajab.supabase.co`
3. **New repository secret**:
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: (copy dari .env)

### Step 4: Push & Deploy
```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

✅ Website akan live di: `https://farouqakbar.github.io/carvellfinance/`

---

## 🔐 SECURITY WARNING ⚠️

**JANGAN PUSH `.env` ke GitHub!**

Vercel/Netlify akan read environment variables dari:
- Dashboard settings
- GitHub Secrets (untuk GitHub Actions)
- File `.env.local` (di .gitignore)

---

## ✅ Post-Deploy Checklist

Setelah deploy:
- [ ] Test login dengan username/password
- [ ] Test buat kategori baru
- [ ] Test input transaksi
- [ ] Test view dashboard
- [ ] Custom domain (jika ada)
- [ ] Setup email notifications (optional)

---

## 🆘 Troubleshooting

### "Module not found" error
**Solusi**: Pastikan `.env` variables di-set di dashboard platform

### App blank/white screen
**Solusi**: 
- Check browser console (F12) untuk error
- Pastikan Supabase API key benar
- Clear browser cache (Ctrl+Shift+Delete)

### Supabase connection error
**Solusi**:
- Verifikasi VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY
- Check Supabase project settings → API
- Pastikan database table sudah created

---

## 📚 Dokumentasi Helpful

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [GitHub Pages Docs](https://pages.github.com/)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)

---

## 🎉 Selesai!

Website Anda sekarang **live di internet**! 🚀

Share URL dengan teman/keluarga dan mulai track keuangan bersama!
