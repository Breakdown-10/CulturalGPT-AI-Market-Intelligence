# PowerShell script to remove sensitive files from Git history
# USE WITH CAUTION - This rewrites Git history

Write-Host "⚠️  WARNING: This script will rewrite Git history!" -ForegroundColor Yellow
Write-Host "This will remove sensitive files from all commits." -ForegroundColor Yellow
Write-Host ""
$confirm = Read-Host "Are you sure you want to continue? (yes/no)"

if ($confirm -ne "yes") {
    Write-Host "Aborted." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "🔄 Removing sensitive files from Git history..." -ForegroundColor Cyan
Write-Host ""

# Remove .env files
git filter-branch --force --index-filter `
  "git rm --cached --ignore-unmatch .env .env.local .env.development.local .env.test.local .env.production.local" `
  --prune-empty --tag-name-filter cat -- --all

# Remove firebase config
git filter-branch --force --index-filter `
  "git rm --cached --ignore-unmatch firebase/config.ts" `
  --prune-empty --tag-name-filter cat -- --all

# Remove .firebaserc
git filter-branch --force --index-filter `
  "git rm --cached --ignore-unmatch .firebaserc" `
  --prune-empty --tag-name-filter cat -- --all

Write-Host ""
Write-Host "✅ Files removed from Git history" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Verify the changes: git log --all --oneline"
Write-Host "2. Force push to remote: git push origin --force --all"
Write-Host "3. Force push tags: git push origin --force --tags"
Write-Host "4. Rotate all exposed API keys immediately!"
Write-Host ""
Write-Host "⚠️  All collaborators must re-clone the repository!" -ForegroundColor Red
