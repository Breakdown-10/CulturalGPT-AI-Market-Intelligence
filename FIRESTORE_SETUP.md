# Firestore Setup Guide

## 1. Enable Firestore in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `cultural-gpt`
3. Click on "Firestore Database" in the left sidebar
4. Click "Create database"
5. Choose "Start in production mode" (we'll deploy custom rules)
6. Select your preferred location (e.g., `us-central1`)

## 2. Deploy Firestore Security Rules

### Option A: Using Firebase CLI (Recommended)

```bash
# Install Firebase CLI if you haven't already
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (if not already done)
firebase init firestore

# Deploy the rules
firebase deploy --only firestore:rules
```

### Option B: Manual Deployment via Console

1. Go to Firebase Console > Firestore Database
2. Click on the "Rules" tab
3. Copy the contents of `firestore.rules` file
4. Paste into the rules editor
5. Click "Publish"

## 3. Create Firestore Indexes (Optional but Recommended)

For better query performance, create these indexes:

### Via Firebase Console:
1. Go to Firestore Database > Indexes tab
2. Create a composite index:
   - Collection: `reports`
   - Fields: `userId` (Ascending), `createdAt` (Descending)
   - Query scope: Collection

### Via Firebase CLI:
Create a `firestore.indexes.json` file and deploy with:
```bash
firebase deploy --only firestore:indexes
```

## 4. Security Rules Explanation

### Users Collection (`/users/{userId}`)
- ✅ Users can READ their own profile
- ✅ Users can CREATE their profile (once during registration)
- ✅ Users can UPDATE their profile (except uid and email)
- ❌ Users CANNOT delete their profile
- ❌ Users CANNOT access other users' profiles

### Reports Collection (`/reports/{reportId}`)
- ✅ Users can READ their own reports
- ✅ Users can CREATE reports (must set userId to their own)
- ✅ Users can UPDATE their own reports
- ✅ Users can DELETE their own reports
- ❌ Users CANNOT access other users' reports

## 5. Test Your Rules

Use the Firebase Console Rules Playground:
1. Go to Firestore Database > Rules tab
2. Click "Rules Playground"
3. Test various scenarios:
   - Authenticated user reading their own data ✅
   - Authenticated user reading another user's data ❌
   - Unauthenticated user reading any data ❌

## 6. Verify Setup

After deployment, test in your app:
```typescript
import { useReports } from './hooks/useReports';

// In your component
const { reports, createReport } = useReports();

// This should work for authenticated users
await createReport('TestBrand', 'Japan');
```

## Troubleshooting

### "Missing or insufficient permissions" error
- Make sure the user is authenticated
- Verify the userId in the document matches the authenticated user's uid
- Check that the rules are deployed correctly

### Queries not working
- Create the necessary indexes (Firebase will show a link in console errors)
- Wait a few minutes after creating indexes for them to build

### Rules not updating
- Clear browser cache
- Wait 1-2 minutes for rules to propagate
- Verify deployment was successful in Firebase Console
