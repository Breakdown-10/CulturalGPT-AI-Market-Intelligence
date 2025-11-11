# PowerShell deployment script for Vercel

Write-Host "🚀 CulturalGPT Deployment Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
    Write-Host "✅ Vercel CLI installed" -ForegroundColor Green
} else {
    Write-Host "✅ Vercel CLI found" -ForegroundColor Green
}

Write-Host ""

# Check if git is clean
$gitStatus = git status -s

if ($gitStatus) {
    Write-Host "⚠️  You have uncommitted changes:" -ForegroundColor Yellow
    git status -s
    Write-Host ""
    $commitChoice = Read-Host "Do you want to commit these changes? (y/n)"
    
    if ($commitChoice -eq "y") {
        $commitMsg = Read-Host "Enter commit message"
        git add .
        git commit -m $commitMsg
        git push origin main
        Write-Host "✅ Changes committed and pushed" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Deploying with uncommitted changes (not recommended)" -ForegroundColor Yellow
    }
} else {
    Write-Host "✅ Git working tree is clean" -ForegroundColor Green
}

Write-Host ""
Write-Host "Choose deployment type:" -ForegroundColor Cyan
Write-Host "1. Preview deployment (test)"
Write-Host "2. Production deployment"
$deployChoice = Read-Host "Enter choice (1 or 2)"

Write-Host ""

if ($deployChoice -eq "2") {
    Write-Host "🚀 Deploying to PRODUCTION..." -ForegroundColor Green
    vercel --prod
} else {
    Write-Host "🔍 Deploying to PREVIEW..." -ForegroundColor Yellow
    vercel
}

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Test your deployment URL"
Write-Host "2. Add Vercel domain to Firebase authorized domains"
Write-Host "3. Configure API key restrictions"
Write-Host ""
