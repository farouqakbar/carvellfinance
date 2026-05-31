# 🚀 Deploy ke GitHub Pages - Step by Step

Panduan lengkap untuk deploy React/Vite app ke GitHub Pages GRATIS!

## ✅ Step 1: Update Vite Config (SUDAH DONE ✓)

File `vite.config.js` sudah di-update dengan:

```javascript
base: '/carvellfinance/', // GitHub Pages base URL
```

## ✅ Step 2: Add GitHub Actions Workflow (SUDAH DONE ✓)

File `.github/workflows/deploy.yml` sudah di-setup untuk auto-deploy setiap ada push ke `main` branch.

## ⏭️ Step 3: Setup Secrets di GitHub

1. **Buka repository di GitHub**: https://github.com/farouqakbar/carvellfinance

2. **Settings** (tab paling kanan)

3. **Security** → **Secrets and variables** → **Actions**

4. **New repository secret** (2x)

   **Secret 1:**

   ```
   Name: VITE_SUPABASE_URL
   Value: https://ourualaimpjurwpyajab.supabase.co
   ```

   Click **"Add secret"**

   **Secret 2:**

   ```
   Name: VITE_SUPABASE_ANON_KEY
   Value: [PASTE API KEY DARI .env ANDA]
   ```

   Click **"Add secret"**

## ⏭️ Step 4: Push Changes ke GitHub

```bash
cd "f:\0. FARUQ\1. pribadi\Keuangan"
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

## ⏭️ Step 5: Enable GitHub Pages

1. **Settings** → **Pages** (sidebar kiri)

2. **Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** (auto-created oleh GitHub Actions)
   - Folder: **/ (root)**
   - Click **Save**

3. Tunggu beberapa detik, maka akan keluar URL:
   ```
   ✅ Your site is live at: https://farouqakbar.github.io/carvellfinance/
   ```

## ⏭️ Step 6: Verify Deployment

1. Tunggu GitHub Actions selesai run (lihat tab "Actions" di repo)
   - Akan ada job berjalan otomatis
   - Tunggu sampai ✅ hijau

2. Buka URL: https://farouqakbar.github.io/carvellfinance/

3. Test:
   - ✅ Login dengan username + password
   - ✅ Input transaksi
   - ✅ Lihat dashboard
   - ✅ Buat kategori

## 🔄 How It Works (Auto-Deploy)

Setiap kali Anda:

```bash
git push origin main
```

GitHub Actions **otomatis**:

1. Build project (`npm run build`)
2. Deploy ke `gh-pages` branch
3. GitHub Pages host folder `dist/`

**JADI ANDA TIDAK PERLU PUSH MANUAL KE `gh-pages`** ✓

---

## ⚠️ Important Notes

### `.env` Security

- ✅ `.env` sudah ada di `.gitignore` (tidak akan push)
- ✅ Secrets di-set di GitHub Settings (aman)
- ❌ **JANGAN** manually add `.env` ke GitHub

### Build Time

- Build memakan waktu ~1-2 menit
- Cek progress di: https://github.com/farouqakbar/carvellfinance/actions

### Custom Domain (Optional)

Jika punya domain sendiri (e.g., `carvellfinance.com`):

1. Settings → **Pages**
2. Custom domain: masukkan domain
3. Update DNS pointing ke GitHub Pages

---

## 🆘 Troubleshooting

### "Actions permissions denied"

**Fix**: Settings → Actions → General → Workflow permissions → Read and write

### Build failed / Error in actions

**Check**:

1. GitHub Actions log (tab Actions di repo)
2. Pastikan Supabase secrets sudah di-add dengan benar
3. `vite.config.js` sudah ada `base: '/carvellfinance/'`

### Website blank/white screen

**Fix**:

- Clear browser cache (Ctrl+Shift+Delete)
- Check console (F12) untuk error message
- Pastikan Supabase URL & key benar di GitHub Secrets

### "Supabase connection error"

**Check**:

- Verifikasi `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY` di GitHub Secrets
- Buka Supabase → Project Settings → API untuk verify keys

---

## 📊 Setelah Deployment

**Website live di:**

```
https://farouqakbar.github.io/carvellfinance/
```

**Share ke teman/keluarga** dan start tracking keuangan! 🎉

---

## 📚 Resources

- [GitHub Pages Docs](https://pages.github.com/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)

---

## ✅ Checklist Sebelum Deploy

- [ ] Sudah update `vite.config.js` dengan base path
- [ ] `.github/workflows/deploy.yml` sudah ada
- [ ] 2 Secrets sudah di-add di GitHub
- [ ] Push changes ke main
- [ ] GitHub Pages enabled di Settings
- [ ] Actions permissions allow read & write
- [ ] Test website setelah live

Selamat! Website Anda sekarang **live di GitHub Pages** 🚀
