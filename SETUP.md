# CulturalGPT Setup Guide

## 🔐 Security First

This project uses environment variables and Firebase configuration that contain sensitive API keys. These files are **NOT** included in the repository for security reasons.

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- Google AI Studio account (for Gemini API)

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd CulturalGPT-AI-Market-Intelligence
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the template and add your API keys:

```bash
cp .env.template .env
```

Edit `.env` and add your Gemini API key:
- Get your key from: https://aistudio.google.com/app/apikey

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 4. Configure Firebase

#### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication (Email/Password)
4. Enable Firestore Database

#### Step 2: Get Firebase Configuration
1. Go to Project Settings > General
2. Scroll to "Your apps" section
3. Click on Web app (</>) icon
4. Copy the firebaseConfig object

#### Step 3: Create config.ts
```bash
cp firebase/config.template.ts firebase/config.ts
```

Edit `firebase/config.ts` and replace with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 5. Deploy Firestore Rules

```bash
# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init firestore

# Deploy security rules and indexes
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

### 6. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## 🔒 Security Notes

### Files NOT in Git (Sensitive)
- `.env` - Contains API keys
- `firebase/config.ts` - Contains Firebase credentials
- `.firebaserc` - Contains Firebase project ID

### Files IN Git (Safe)
- `.env.template` - Template for environment variables
- `firebase/config.template.ts` - Template for Firebase config
- `firestore.rules` - Security rules (no secrets)
- `firestore.indexes.json` - Database indexes (no secrets)

## ⚠️ Important Security Reminders

1. **Never commit** `.env` or `firebase/config.ts` to Git
2. **Never share** your API keys publicly
3. **Rotate keys** if accidentally exposed
4. Use **environment variables** in production
5. Enable **Firebase App Check** for production

## 🔄 If You Accidentally Committed Secrets

1. **Immediately rotate** all exposed API keys:
   - Regenerate Gemini API key in AI Studio
   - Regenerate Firebase API key in Firebase Console

2. **Remove from Git history**:
```bash
# Remove file from Git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch firebase/config.ts" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (WARNING: This rewrites history)
git push origin --force --all
```

3. **Update .gitignore** and commit:
```bash
git add .gitignore
git commit -m "Add sensitive files to .gitignore"
git push
```

## 📚 Additional Resources

- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Environment Variables in Vite](https://vitejs.dev/guide/env-and-mode.html)
- [Google AI Studio](https://aistudio.google.com/)

## 🆘 Troubleshooting

### "Firebase not initialized" error
- Make sure `firebase/config.ts` exists and has valid credentials
- Check that Firebase project is created in console

### "Invalid API key" error
- Verify your Gemini API key in `.env`
- Make sure the key is active in AI Studio

### "Permission denied" in Firestore
- Deploy security rules: `firebase deploy --only firestore:rules`
- Check that user is authenticated
- Verify rules in Firebase Console

## 🤝 Contributing

When contributing, never commit:
- API keys or credentials
- Personal Firebase configurations
- Environment variable files

Always use the template files provided.
