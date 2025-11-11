# 🚀 Vercel Deployment Guide

## Prerequisites

- GitHub repository with your code
- Vercel account (sign up at https://vercel.com)
- Firebase project configured
- Gemini API key

## 📋 Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure all changes are committed and pushed:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### 3. Deploy via Vercel Dashboard (Recommended)

#### A. Connect Repository

1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import your GitHub repository: `Breakdown-10/CulturalGPT-AI-Market-Intelligence`
4. Click "Import"

#### B. Configure Project

**Framework Preset:** Vite
**Root Directory:** `./` (leave as default)
**Build Command:** `npm run build`
**Output Directory:** `dist`

#### C. Set Environment Variables

Click "Environment Variables" and add these:

##### Required Variables:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_GEMINI_API_KEY` | Your Gemini API key | Production, Preview, Development |
| `VITE_FIREBASE_API_KEY` | Your Firebase API key | Production, Preview, Development |
| `VITE_FIREBASE_AUTH_DOMAIN` | `cultural-gpt.firebaseapp.com` | Production, Preview, Development |
| `VITE_FIREBASE_PROJECT_ID` | `cultural-gpt` | Production, Preview, Development |
| `VITE_FIREBASE_STORAGE_BUCKET` | `cultural-gpt.firebasestorage.app` | Production, Preview, Development |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `806772390887` | Production, Preview, Development |
| `VITE_FIREBASE_APP_ID` | `1:806772390887:web:4e5bbaaa3c25838889db42` | Production, Preview, Development |

**How to add:**
1. Click "Add" for each variable
2. Enter the Name and Value
3. Select all environments (Production, Preview, Development)
4. Click "Add"

#### D. Deploy

1. Click "Deploy"
2. Wait for the build to complete (2-3 minutes)
3. Your app will be live at `https://your-project.vercel.app`

### 4. Deploy via Vercel CLI (Alternative)

```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

When prompted, set environment variables:
```bash
vercel env add VITE_GEMINI_API_KEY
vercel env add VITE_FIREBASE_API_KEY
# ... add all other variables
```

## 🔧 Post-Deployment Configuration

### 1. Update Firebase Authorized Domains

1. Go to Firebase Console > Authentication > Settings
2. Under "Authorized domains", add your Vercel domain:
   - `your-project.vercel.app`
   - Any custom domains you've added

### 2. Update Firebase API Key Restrictions

1. Go to Google Cloud Console > Credentials
2. Find your Firebase API key
3. Under "Application restrictions", add:
   - `https://your-project.vercel.app/*`
   - `https://*.vercel.app/*` (for preview deployments)

### 3. Test Your Deployment

Visit your Vercel URL and test:
- ✅ Landing page loads
- ✅ User registration works
- ✅ User login works
- ✅ Firestore data saves correctly
- ✅ AI analysis works (if implemented)

## 🔄 Automatic Deployments

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request

## 🌐 Custom Domain (Optional)

### Add Custom Domain

1. Go to Vercel Dashboard > Your Project > Settings > Domains
2. Click "Add"
3. Enter your domain (e.g., `culturalgpt.com`)
4. Follow DNS configuration instructions
5. Update Firebase authorized domains

## 🐛 Troubleshooting

### Build Fails

**Error: "Module not found"**
```bash
# Make sure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

**Error: "Environment variable not defined"**
- Check that all `VITE_*` variables are set in Vercel Dashboard
- Redeploy after adding variables

### Firebase Connection Issues

**Error: "Firebase: Error (auth/unauthorized-domain)"**
- Add your Vercel domain to Firebase authorized domains
- Wait a few minutes for changes to propagate

**Error: "Missing or insufficient permissions"**
- Verify Firestore rules are deployed
- Check that user is authenticated

### Blank Page After Deployment

1. Check browser console for errors (F12)
2. Verify all environment variables are set
3. Check Vercel deployment logs
4. Ensure `vercel.json` is configured correctly

### Environment Variables Not Working

- Variable names must start with `VITE_` to be exposed to the client
- Redeploy after adding/changing variables
- Clear browser cache

## 📊 Monitoring

### Vercel Analytics

Enable in Vercel Dashboard > Your Project > Analytics

### Firebase Usage

Monitor in Firebase Console:
- Authentication > Users
- Firestore > Usage
- Project Settings > Usage and billing

## 🔒 Security Checklist

- [ ] All environment variables set in Vercel (not in code)
- [ ] Firebase authorized domains updated
- [ ] API key restrictions configured
- [ ] Firestore security rules deployed
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] No sensitive data in git repository

## 🚀 Performance Optimization

### Enable Vercel Speed Insights

```bash
npm install @vercel/speed-insights
```

Add to your app:
```typescript
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <>
      <YourApp />
      <SpeedInsights />
    </>
  );
}
```

### Enable Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to your app:
```typescript
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

## 📝 Deployment Checklist

Before deploying:
- [ ] All code committed and pushed to GitHub
- [ ] Environment variables documented
- [ ] Firebase project configured
- [ ] Firestore rules deployed
- [ ] Build tested locally (`npm run build`)
- [ ] No sensitive data in repository

After deploying:
- [ ] Test all features on production URL
- [ ] Add Vercel domain to Firebase
- [ ] Configure API key restrictions
- [ ] Set up custom domain (if needed)
- [ ] Enable monitoring/analytics
- [ ] Test on mobile devices

## 🆘 Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Firebase Documentation: https://firebase.google.com/docs

## 🎉 Success!

Your app should now be live at:
- Production: `https://your-project.vercel.app`
- Custom domain: `https://your-domain.com` (if configured)

Share your app and start getting users! 🚀
