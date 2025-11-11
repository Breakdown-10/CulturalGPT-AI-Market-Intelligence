#!/bin/bash

# Deployment script for Vercel

echo "🚀 CulturalGPT Deployment Script"
echo "================================"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "✅ Vercel CLI found"
echo ""

# Check if git is clean
if [[ -n $(git status -s) ]]; then
    echo "⚠️  You have uncommitted changes:"
    git status -s
    echo ""
    read -p "Do you want to commit these changes? (y/n): " commit_choice
    
    if [ "$commit_choice" = "y" ]; then
        read -p "Enter commit message: " commit_msg
        git add .
        git commit -m "$commit_msg"
        git push origin main
        echo "✅ Changes committed and pushed"
    else
        echo "⚠️  Deploying with uncommitted changes (not recommended)"
    fi
else
    echo "✅ Git working tree is clean"
fi

echo ""
echo "Choose deployment type:"
echo "1. Preview deployment (test)"
echo "2. Production deployment"
read -p "Enter choice (1 or 2): " deploy_choice

echo ""

if [ "$deploy_choice" = "2" ]; then
    echo "🚀 Deploying to PRODUCTION..."
    vercel --prod
else
    echo "🔍 Deploying to PREVIEW..."
    vercel
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Test your deployment URL"
echo "2. Add Vercel domain to Firebase authorized domains"
echo "3. Configure API key restrictions"
echo ""
