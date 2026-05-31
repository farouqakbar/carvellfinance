# 📤 Push ke GitHub - Step by Step

Ikuti langkah ini untuk push project ke GitHub.

## Prerequisites ✅

- Git sudah installed di komputer
- GitHub account sudah dibuat
- Repository `carvellfinance` sudah dibuat di GitHub

## Step-by-Step Push

### 1. Buka Terminal di Folder Project

```bash
cd "f:\0. FARUQ\1. pribadi\Keuangan"
```

### 2. Check Git Status

```bash
git status
```

Seharusnya akan list semua files yang belum di-commit (warna merah).

### 3. Initialize Git (Jika Belum)

Jika muncul error "fatal: not a git repository", run:

```bash
git init
```

### 4. Add All Files

```bash
git add .
```

Ini akan stage semua files untuk di-commit.

### 5. Create Commit

```bash
git commit -m "Initial commit: Carvell Finance with Supabase setup"
```

### 6. Rename Branch ke Main (Jika Perlu)

Check branch sekarang:

```bash
git branch
```

Jika masih `master`, rename ke `main`:

```bash
git branch -M main
```

### 7. Add GitHub Remote

```bash
git remote add origin https://github.com/farouqakbar/carvellfinance.git
```

> Ganti `farouqakbar` dengan username GitHub kamu!

### 8. Push ke GitHub

```bash
git push -u origin main
```

Mungkin diminta untuk login GitHub. Ikuti instruksi di terminal.

### 9. Verify di GitHub

1. Buka https://github.com/farouqakbar/carvellfinance
2. Seharusnya sudah bisa melihat semua files kamu

---

## ✅ Done!

Project sudah di-GitHub dan siap di-deploy ke Vercel! 🎉

---

## Untuk Push Selanjutnya

Setelah ada perubahan:

```bash
git add .
git commit -m "Deskripsi perubahan"
git push origin main
```

---

## 🆘 Common Issues

### Error: "Permission denied (publickey)"

**Solution:**
Cek Git credentials kamu atau gunakan HTTPS dengan personal access token:

```bash
git remote set-url origin https://github.com/farouqakbar/carvellfinance.git
```

### Error: "fatal: 'origin' does not appear to be a 'git' repository"

**Solution:**
Re-add remote:

```bash
git remote remove origin
git remote add origin https://github.com/farouqakbar/carvellfinance.git
```

### Files tidak muncul di GitHub

**Solution:**
Cek `.gitignore` — pastikan tidak exclude files penting:

```bash
cat .gitignore
```

Seharusnya ada:

```
node_modules
.env
dist
```

Tapi files lain seperti `src/`, `package.json`, `README.md` harus included.

---

## Next: Deploy ke Vercel

Setelah push ke GitHub berhasil, ikuti SETUP_GUIDE.md step **DEPLOY KE VERCEL**.
