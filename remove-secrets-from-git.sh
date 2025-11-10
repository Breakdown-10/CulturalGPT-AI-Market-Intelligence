#!/bin/bash

# Script to remove sensitive files from Git history
# USE WITH CAUTION - This rewrites Git history

echo "⚠️  WARNING: This script will rewrite Git history!"
echo "This will remove sensitive files from all commits."
echo ""
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Aborted."
    exit 0
fi

echo ""
echo "🔄 Removing sensitive files from Git history..."
echo ""

# Remove .env files
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env .env.local .env.development.local .env.test.local .env.production.local" \
  --prune-empty --tag-name-filter cat -- --all

# Remove firebase config
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch firebase/config.ts" \
  --prune-empty --tag-name-filter cat -- --all

# Remove .firebaserc
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .firebaserc" \
  --prune-empty --tag-name-filter cat -- --all

echo ""
echo "✅ Files removed from Git history"
echo ""
echo "Next steps:"
echo "1. Verify the changes: git log --all --oneline"
echo "2. Force push to remote: git push origin --force --all"
echo "3. Force push tags: git push origin --force --tags"
echo "4. Rotate all exposed API keys immediately!"
echo ""
echo "⚠️  All collaborators must re-clone the repository!"
