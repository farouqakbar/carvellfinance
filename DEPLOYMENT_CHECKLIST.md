# 📋 DEPLOYMENT CHECKLIST

Panduan lengkap untuk memastikan semua step berhasil sebelum push ke GitHub dan deploy ke Vercel.

## ✅ PRE-DEPLOYMENT CHECKLIST

### Local Setup

- [ ] `npm install` berhasil tanpa error
- [ ] `.env` file dibuat dengan credentials Supabase yang benar
- [ ] `npm run dev` berjalan di http://localhost:5173

### Supabase Setup

- [ ] Supabase project sudah dibuat
- [ ] SQL schema (`supabase_schema.sql`) sudah di-run
- [ ] Email confirmation sudah di-disable di Authentication → Providers → Email
- [ ] User profiles table sudah terbuat di Database

### Local Testing

- [ ] Bisa register dengan username baru
- [ ] Bisa login dengan username + password
- [ ] Bisa add category
- [ ] Bisa add transaction
- [ ] Bisa view dashboard dengan data
- [ ] Bisa logout
- [ ] Dark mode berfungsi
- [ ] No error di browser console (F12)

### Code Quality

- [ ] Tidak ada `console.error` yang tidak di-handle
- [ ] Tidak ada sensitive data di-hardcode (credentials, API keys)
- [ ] `.env` di-add ke `.gitignore`
- [ ] `.gitignore` sudah di-update

---

## 🚀 DEPLOYMENT CHECKLIST

### GitHub

- [ ] Repository `carvellfinance` sudah dibuat di GitHub
- [ ] README.md sudah di-update dengan instruksi
- [ ] `.gitignore` sudah di-configure (exclude `.env`, `node_modules`, `dist`)
- [ ] All files sudah di-commit
- [ ] Code sudah di-push ke `main` branch

### Vercel Setup

- [ ] Vercel account sudah dibuat (atau login via GitHub)
- [ ] Repository sudah di-connect ke Vercel
- [ ] Project sudah di-create di Vercel

### Environment Variables (Vercel)

- [ ] `VITE_SUPABASE_URL` sudah di-set
- [ ] `VITE_SUPABASE_ANON_KEY` sudah di-set
- [ ] Variables sudah di-save

### Post-Deploy

- [ ] Build berhasil di Vercel (check deployment logs)
- [ ] Deploy URL sudah active (https://carvellfinance.vercel.app)
- [ ] Bisa akses deployed URL tanpa error
- [ ] Supabase URL Configuration sudah di-update dengan Vercel domain
- [ ] Test register/login di production
- [ ] Test semua features di production

---

## 📊 File Structure Check

Pastikan struktur folder seperti ini:

```
carvellfinance/
├── src/
│   ├── components/
│   │   ├── Card.jsx
│   │   ├── CategoryForm.jsx
│   │   ├── Navbar.jsx
│   │   ├── Toast.jsx
│   │   └── TransactionForm.jsx
│   ├── context/
│   │   └── AuthContext.jsx      ← Updated dengan profile table
│   ├── pages/
│   │   ├── Categories.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Savings.jsx
│   │   └── Transactions.jsx
│   ├── services/
│   │   └── supabaseClient.js
│   ├── hooks/
│   │   └── useAuth.js
│   ├── utils/
│   │   └── formatCurrency.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
├── .env                         ← Private (NOT in GitHub)
├── .env.example                 ← Public template
├── .gitignore
├── supabase_schema.sql          ← Updated v2
├── package.json
├── vite.config.js
├── README.md                    ← Updated
├── SETUP_GUIDE.md              ← New
├── GITHUB_PUSH.md              ← New
├── DEPLOYMENT_CHECKLIST.md      ← This file
└── index.html
```

---

## 🔐 Security Check

- [ ] No passwords di-hardcode di code
- [ ] No API keys di-hardcode di code
- [ ] `.env` file tidak di-commit (check di `.gitignore`)
- [ ] Supabase RLS sudah enable di semua tables
- [ ] User data terproteksi dari akses user lain

---

## 📝 Documentation Check

- [ ] README.md sudah lengkap dengan setup instructions
- [ ] SETUP_GUIDE.md ada dan lengkap
- [ ] GITHUB_PUSH.md ada dan jelas
- [ ] DEPLOYMENT_CHECKLIST.md (file ini) ada

---

## 🛠️ Quick Commands Reference

```bash
# Local setup
npm install
cp .env.example .env
npm run dev

# Before push
git status
git add .
git commit -m "message"
git push origin main

# Build for production
npm run build

# Check build size
ls -lah dist/
```

---

## 📞 Troubleshooting Quick Links

### If register fails:

- Check Supabase email confirmation is OFF
- Check `.env` credentials adalah correct
- Check Supabase Authentication → Email provider is ON

### If deploy fails:

- Check environment variables di Vercel
- Check build logs di Vercel dashboard
- Try manual rebuild di Vercel

### If app shows blank:

- Check browser console untuk errors (F12)
- Check network tab untuk API errors
- Check Supabase connection dengan test query

---

## ✅ Final Verification

Sebelum dianggap "selesai", pastikan:

1. **Local Works**: `npm run dev` → register → login → add data → all features work
2. **GitHub Ready**: All files pushed, no sensitive data, .gitignore proper
3. **Vercel Live**: URL accessible, environment variables set, app functions correctly
4. **Documentation**: README, SETUP_GUIDE, GITHUB_PUSH semuanya ada dan jelas

---

## 🎉 Congratulations!

Jika semua checklist di atas ✅, project sudah ready for production!

**Next steps:**

- Share link ke Vercel deployment
- Collect feedback dari users
- Monitor Vercel logs untuk errors
- Update code → git push → auto redeploy

Happy coding! 🚀
