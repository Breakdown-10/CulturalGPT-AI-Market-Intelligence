# Security Policy

## 🔐 Sensitive Files

The following files contain sensitive information and are **excluded from Git**:

### Never Commit These Files:

- `.env` - Environment variables with API keys
- `.env.local`, `.env.*.local` - Local environment overrides
- `firebase/config.ts` - Firebase credentials
- `.firebaserc` - Firebase project configuration

### Template Files (Safe to Commit):

- `.env.template` - Template for environment variables
- `firebase/config.template.ts` - Template for Firebase config

## 🛡️ Security Measures

### 1. .gitignore Protection

All sensitive files are listed in `.gitignore` to prevent accidental commits.

### 2. Template Files

Template files are provided for easy setup without exposing credentials.

### 3. Firestore Security Rules

Database access is restricted by security rules in `firestore.rules`:

- Users can only access their own data
- All operations require authentication
- Cross-user access is blocked

## 🚨 If Secrets Are Exposed

### Immediate Actions:

1. **Rotate All Keys Immediately**

   - Gemini API Key: https://aistudio.google.com/app/apikey
   - Firebase API Key: Firebase Console > Project Settings > General

2. **Remove from Git History**

   On Windows (PowerShell):

   ```powershell
   .\remove-secrets-from-git.ps1
   ```

   On Linux/Mac:

   ```bash
   chmod +x remove-secrets-from-git.sh
   ./remove-secrets-from-git.sh
   ```

3. **Force Push Changes**

   ```bash
   git push origin --force --all
   git push origin --force --tags
   ```

4. **Notify Team**
   - All collaborators must re-clone the repository
   - Update all deployed instances with new keys

## 🔍 Checking for Exposed Secrets

### Check Current Files

```bash
# Check if sensitive files are tracked
git ls-files | grep -E "(config\.ts|\.env)$"
```

### Check Git History

```bash
# Search for API keys in history
git log -p | grep -i "apikey"
git log -p | grep -i "firebase"
```

### Use Git-Secrets Tool

```bash
# Install git-secrets
# https://github.com/awslabs/git-secrets

# Scan repository
git secrets --scan-history
```

## 📝 Best Practices

### For Developers:

1. ✅ Always use template files as starting point
2. ✅ Never commit `.env` or `firebase/config.ts`
3. ✅ Use environment variables in production
4. ✅ Rotate keys regularly
5. ✅ Review commits before pushing

### For Production:

1. ✅ Use environment variables (not files)
2. ✅ Enable Firebase App Check
3. ✅ Set up API key restrictions
4. ✅ Monitor API usage
5. ✅ Use separate keys for dev/staging/prod

## 🔒 API Key Restrictions

### Firebase API Key

In Firebase Console > Credentials:

- Restrict to specific domains
- Enable only required APIs
- Set usage quotas

### Gemini API Key

In Google AI Studio:

- Restrict to specific IPs (if possible)
- Set usage limits
- Monitor usage regularly

## 📞 Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email the maintainers directly
3. Include details of the vulnerability
4. Allow time for a fix before disclosure

## ✅ Security Checklist

Before committing:

- [ ] No API keys in code
- [ ] `.env` not staged for commit
- [ ] `firebase/config.ts` not staged for commit
- [ ] Template files are up to date
- [ ] `.gitignore` includes all sensitive files

Before deploying:

- [ ] Environment variables configured
- [ ] Firebase security rules deployed
- [ ] API keys restricted to production domain
- [ ] Firebase App Check enabled
- [ ] Monitoring and alerts set up

## 📚 Resources

- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Git-Secrets Tool](https://github.com/awslabs/git-secrets)
- [Environment Variables Best Practices](https://12factor.net/config)
