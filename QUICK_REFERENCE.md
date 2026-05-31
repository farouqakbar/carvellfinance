# 📋 QUICK REFERENCE GUIDE

Panduan cepat untuk akses perintah yang sering digunakan.

## 🚀 Development Commands

```bash
# Start dev server
npm run dev
# → Open http://localhost:5173

# Build for production
npm run build
# → Output: dist/ folder

# Preview build
npm run preview
```

---

## 🔗 Git Commands

### Setup (First time only)

```bash
git init
git add .
git commit -m "Initial commit: Carvell Finance"
git branch -M main
git remote add origin https://github.com/farouqakbar/carvellfinance.git
git push -u origin main
```

### Regular Push (After changes)

```bash
git add .
git commit -m "Description of changes"
git push origin main
```

### Check Status

```bash
git status
git log --oneline
```

---

## 🔐 Environment Setup

### First Time

```bash
cp .env.example .env
# Edit .env and add Supabase credentials:
# VITE_SUPABASE_URL=https://xxxx.supabase.co
# VITE_SUPABASE_ANON_KEY=eyJ...
```

### To Get Credentials

1. Open Supabase Dashboard
2. Settings → Project → API
3. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Anon (public)** → `VITE_SUPABASE_ANON_KEY`

---

## 📊 Supabase SQL (Copy-Paste Ready)

### Setup di Supabase SQL Editor:

1. Buka Supabase Dashboard
2. SQL Editor → New Query
3. Copy paste semua dari file `supabase_schema.sql`
4. Run

### Disable Email Confirmation (WAJIB!)

1. Authentication → Providers → Email
2. Toggle **Confirm email** → OFF
3. Save

---

## 🌐 URLs Quick Access

```
Local Development:  http://localhost:5173
Supabase Dashboard: https://supabase.com/dashboard
GitHub Repo:        https://github.com/farouqakbar/carvellfinance
Vercel:             https://vercel.com
Deployed App:       https://carvellfinance.vercel.app
```

---

## 📁 Project Structure Quick View

```
carvellfinance/
├── src/
│   ├── components/      → React UI components
│   ├── pages/           → Page components
│   ├── context/         → AuthContext (state management)
│   ├── services/        → supabaseClient
│   ├── utils/           → Utility functions
│   └── App.jsx, main.jsx, index.css
├── public/              → Static assets
├── .env                 → Credentials (NOT in Git!)
├── .env.example         → Template
├── .gitignore           → Git ignore rules
├── package.json         → Dependencies
├── vite.config.js       → Vite config
├── supabase_schema.sql  → Database schema
├── README.md            → Main documentation
├── SETUP_GUIDE.md       → Full setup guide
├── GITHUB_PUSH.md       → GitHub push instructions
├── DEPLOYMENT_CHECKLIST.md → Pre-deploy checklist
├── FINAL_SUMMARY.md     → Overview
└── PRE_PUSH_CHECKLIST.md → This file series
```

---

## 🔍 Troubleshooting Quick Links

| Problem                     | Solution                                    |
| --------------------------- | ------------------------------------------- |
| "Missing Supabase env vars" | Check `.env` exists and has credentials     |
| "Login fails"               | Check email confirmation is OFF in Supabase |
| "Build fails"               | Run `npm ci` then `npm run build`           |
| "Can't push to GitHub"      | Check git remote: `git remote -v`           |
| "Deploy fails"              | Check env vars di Vercel dashboard          |

---

## 🎯 Common Workflows

### I want to add a new feature

```bash
# 1. Make changes to files
# 2. Test locally
npm run dev

# 3. Commit
git add .
git commit -m "Add [feature name]"

# 4. Push
git push origin main

# 5. Vercel auto-deploys!
```

### I found a bug

```bash
# 1. Fix in code
# 2. Test locally
npm run dev

# 3. Commit and push
git add .
git commit -m "Fix [bug description]"
git push origin main
```

### I want to reset everything locally

```bash
# ⚠️ WARNING: This deletes local changes!
git reset --hard origin/main
git clean -fd
npm install
npm run dev
```

---

## 💡 Tips & Tricks

### View Supabase data directly

1. Open Supabase Dashboard
2. Tables → Select any table
3. See all data in real-time

### Monitor Vercel deployment

1. Open Vercel dashboard
2. Select project
3. Deployments → Check logs

### Debug with browser DevTools

- Press `F12` to open DevTools
- Check Console for errors
- Check Network for API calls to Supabase

### Clean node_modules (if having issues)

```bash
rm -rf node_modules
npm install
npm run dev
```

---

## 🔐 Security Reminders

- ✅ Never commit `.env` file
- ✅ Never share credentials in code
- ✅ Always use `.env.example` as template
- ✅ Check `.gitignore` includes `.env`
- ✅ Enable RLS on Supabase tables
- ✅ Use environment variables for sensitive data

---

## 📚 Documentation Links

- **Getting Started**: README.md
- **Full Setup**: SETUP_GUIDE.md
- **GitHub Push**: GITHUB_PUSH.md
- **Pre-Deploy**: DEPLOYMENT_CHECKLIST.md
- **Overview**: FINAL_SUMMARY.md
- **This File**: QUICK_REFERENCE.md

---

## ✨ Need Help?

1. Check relevant documentation file above
2. Check browser console (F12) for error messages
3. Check Vercel/Supabase logs
4. Re-read the error message carefully - it often tells you what's wrong!

---

**Keep this file bookmarked for quick reference!** 📌
