# ✅ PRE-PUSH CHECKLIST

Jalankan checklist ini SEBELUM push ke GitHub untuk memastikan semua siap.

## 🔍 Code Quality Check

```bash
# 1. Check for errors
npm run dev
# → Tidak boleh ada error di terminal atau browser console

# 2. Test di browser (http://localhost:5173):
# → Register test: username=test123, password=test123
# → Login test: username=test123, password=test123
# → Add category
# → Add transaction
# → View dashboard - data harus tampil
# → Logout
# → Login lagi - harus berhasil
```

**Semua test harus PASS sebelum lanjut!**

---

## 📁 Files Check

```bash
# Cek semua files sudah ada
ls -la

# Semua ini harus ada:
✅ src/                     (folder)
✅ public/                  (folder)
✅ .env.example             (file)
✅ .gitignore               (file)
✅ package.json             (file)
✅ README.md                (file)
✅ SETUP_GUIDE.md           (file)
✅ GITHUB_PUSH.md           (file)
✅ DEPLOYMENT_CHECKLIST.md  (file)
✅ FINAL_SUMMARY.md         (file)
✅ supabase_schema.sql      (file)
✅ vite.config.js           (file)
✅ index.html               (file)
```

---

## 🔐 Security Check

```bash
# 1. Cek .env TIDAK di-track oleh git
git status

# Seharusnya TIDAK muncul:
#   - .env
# Seharusnya muncul:
#   - .env.example

# 2. Cek .gitignore contains .env
cat .gitignore
# Should include: .env

# 3. Cek node_modules tidak di-track
# Should NOT include node_modules/ di git status
```

---

## 📝 Documentation Check

Pastikan file ini ada dan lengkap:

```bash
✅ README.md - Has setup instructions, features, tech stack
✅ SETUP_GUIDE.md - Has local setup, Supabase setup, Vercel deploy
✅ GITHUB_PUSH.md - Has step-by-step push instructions
✅ DEPLOYMENT_CHECKLIST.md - Has pre-deployment checklist
✅ FINAL_SUMMARY.md - Has overview and next steps
```

---

## 🚀 Git Commands (Copy-Paste Ready)

Jalankan commands ini saat ready untuk push:

```bash
# 1. Check status
git status

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit: Carvell Finance - Personal Finance Tracker"

# 4. Rename branch to main (jika masih master)
git branch -M main

# 5. Add remote
git remote add origin https://github.com/farouqakbar/carvellfinance.git

# 6. Push
git push -u origin main

# 7. Verify
# Buka: https://github.com/farouqakbar/carvellfinance
# Seharusnya ada semua files
```

---

## ⚠️ FINAL CHECKS SEBELUM PUSH

Pastikan semua ini SUDAH DONE:

- [ ] `npm run dev` berjalan tanpa error
- [ ] Bisa register dengan username baru
- [ ] Bisa login dengan username yang baru
- [ ] Bisa add category, transaction, savings
- [ ] Data muncul di dashboard
- [ ] `git status` shows no `.env` file
- [ ] `.gitignore` contains `.env`
- [ ] Semua documentation files ada
- [ ] README.md updated dengan info yang benar
- [ ] No console errors di browser (F12)

---

## 🎯 Jika Semua Checklist ✅

Siap untuk:

1. **PUSH KE GITHUB**

   ```bash
   git push -u origin main
   ```

2. **VERIFY DI GITHUB**
   - Open https://github.com/farouqakbar/carvellfinance
   - Check semua files ada
   - Check README muncul di home

3. **NEXT: DEPLOY KE VERCEL**
   - Follow SETUP_GUIDE.md section "DEPLOY KE VERCEL"

---

## 📞 Troubleshooting

### Git error: "fatal: not a git repository"

```bash
# Run di folder project:
git init
```

### Git error: "fatal: 'origin' does not appear to be a 'git' repository"

```bash
git remote remove origin
git remote add origin https://github.com/farouqakbar/carvellfinance.git
```

### Files tidak muncul di GitHub setelah push

```bash
# Cek git status
git status

# Jika ada modified files, add dan commit lagi:
git add .
git commit -m "Add missing files"
git push origin main
```

### npm error saat dev

```bash
# Clean install:
rm -rf node_modules
npm install
npm run dev
```

---

## ✨ READY!

Jika semua checklist ✅, tinggal run:

```bash
git add .
git commit -m "Initial commit: Carvell Finance - Personal Finance Tracker"
git branch -M main
git remote add origin https://github.com/farouqakbar/carvellfinance.git
git push -u origin main
```

Selesai! Code sudah di-GitHub. 🎉

Next step: Deploy ke Vercel (lihat SETUP_GUIDE.md)
