# 🚀 Deploy to Vercel NOW - Quick Start

## Option 1: Deploy via Vercel Dashboard (Easiest - 5 minutes)

### Step 1: Go to Vercel
👉 **Click here:** https://vercel.com/new

### Step 2: Import Your Repository
1. Click "Import Git Repository"
2. Select: `Breakdown-10/CulturalGPT-AI-Market-Intelligence`
3. Click "Import"

### Step 3: Configure Project
- **Framework Preset:** Vite (auto-detected)
- **Root Directory:** `./`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Step 4: Add Environment Variables

Click "Environment Variables" and add these **7 variables**:

```
VITE_GEMINI_API_KEY = your_gemini_api_key_here
VITE_FIREBASE_API_KEY = AIzaSyADsIjEMSyEP-1dMmfv7-qp_dQML9U57n4
VITE_FIREBASE_AUTH_DOMAIN = cultural-gpt.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = cultural-gpt
VITE_FIREBASE_STORAGE_BUCKET = cultural-gpt.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID = 806772390887
VITE_FIREBASE_APP_ID = 1:806772390887:web:4e5bbaaa3c25838889db42
```

**Important:** Select "Production", "Preview", and "Development" for each variable!

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. 🎉 Your app is live!

### Step 6: Update Firebase (CRITICAL!)
1. Go to [Firebase Console](https://console.firebase.google.com/project/cultural-gpt/authentication/settings)
2. Under "Authorized domains", click "Add domain"
3. Add your Vercel URL: `your-project.vercel.app`
4. Click "Add"

---

## Option 2: Deploy via CLI (For Developers)

### Prerequisites
```bash
npm install -g vercel
```

### Deploy
```bash
# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Set Environment Variables
```bash
vercel env add VITE_GEMINI_API_KEY
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
vercel env add VITE_FIREBASE_PROJECT_ID
vercel env add VITE_FIREBASE_STORAGE_BUCKET
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
vercel env add VITE_FIREBASE_APP_ID
```

---

## Option 3: Use Deployment Script (Windows)

```powershell
.\deploy.ps1
```

Follow the prompts!

---

## ✅ Post-Deployment Checklist

After deployment:

1. **Test Your App**
   - Visit your Vercel URL
   - Try registering a new user
   - Test login/logout
   - Check if data saves to Firestore

2. **Update Firebase Authorized Domains**
   - Add your Vercel domain to Firebase Console
   - This is REQUIRED for authentication to work!

3. **Optional: Add Custom Domain**
   - Go to Vercel Dashboard > Your Project > Settings > Domains
   - Add your custom domain
   - Update DNS records
   - Add custom domain to Firebase too

---

## 🐛 Common Issues

### "Firebase: Error (auth/unauthorized-domain)"
**Solution:** Add your Vercel domain to Firebase authorized domains

### "Environment variable not defined"
**Solution:** Make sure all variables start with `VITE_` and are set in Vercel Dashboard

### Blank page after deployment
**Solution:** 
1. Check browser console (F12)
2. Verify all environment variables are set
3. Check Vercel deployment logs

---

## 📚 Full Documentation

For detailed instructions, see:
- **VERCEL_DEPLOYMENT.md** - Complete deployment guide
- **SETUP.md** - Development setup
- **SECURITY.md** - Security best practices

---

## 🎉 You're Ready!

Your app will be live at:
- **Production:** `https://your-project.vercel.app`
- **Preview:** `https://your-project-git-branch.vercel.app`

Every push to `main` automatically deploys to production! 🚀
