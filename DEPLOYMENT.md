# Deployment Guide - Railway

This guide walks you through deploying the Expense Tracker to Railway.

## Prerequisites

- GitHub account
- Railway account ([signup here](https://railway.app))
- OpenAI API key
- Code pushed to GitHub repository

## Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure your code is pushed to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub
5. Select your expense-tracker repository

### 3. Configure Environment Variables

In the Railway dashboard, go to Variables tab and add:

```
OPENAI_API_KEY=sk-proj-your-actual-key-here
NODE_ENV=production
PORT=3001
CORS_ORIGIN=*
MAX_FILE_SIZE=5242880
```

**Important:** Railway automatically sets the `PORT` variable, but we specify 3001 as backup.

### 4. Configure Build Settings

Railway should auto-detect the build commands from `railway.json`, but verify:

**Build Command:**
```
npm run install-all && npm run build
```

**Start Command:**
```
npm start
```

### 5. Deploy

1. Railway will automatically deploy after connecting the repo
2. Monitor the deployment logs in the Railway dashboard
3. Wait for build to complete (usually 2-5 minutes)

### 6. Get Your URL

1. In Railway dashboard, go to Settings
2. Click "Generate Domain" to get a public URL
3. Your app will be available at: `https://your-app.railway.app`

### 7. Update CORS (Optional)

For production, you might want to restrict CORS:

```
CORS_ORIGIN=https://your-app.railway.app
```

## Verification

Test your deployed app:

1. Visit your Railway URL
2. Upload a test receipt
3. Verify extraction works
4. Check expenses persist

Test the API directly:
```bash
curl https://your-app.railway.app/api/health
```

## Troubleshooting

### Build Fails

**Error: "Cannot find module 'express'"**
- Solution: Check that `npm run install-all` is in build command

**Error: "OpenAI API key missing"**
- Solution: Add `OPENAI_API_KEY` in Railway Variables

### Runtime Issues

**503 Service Unavailable**
- Check deployment logs for errors
- Verify start command is correct
- Ensure PORT variable is set

**CORS errors in browser**
- Update `CORS_ORIGIN` to match your domain
- Or set to `*` to allow all origins (development only)

**Receipt processing fails**
- Verify OpenAI API key is valid
- Check OpenAI account has credits
- Review server logs for detailed errors

### Storage Issues

**Expenses not persisting**
- localStorage is per-browser
- Clearing browser data will clear expenses
- Consider adding cloud storage for production

## Cost Optimization

### Railway
- Free tier: 500 execution hours/month
- Usage-based pricing after free tier
- Monitor usage in Railway dashboard

### OpenAI API
- gpt-4o-mini is cost-effective: ~$0.000150 per image
- Monitor usage at [platform.openai.com](https://platform.openai.com/usage)
- Set usage limits to prevent overages

## Monitoring

### Railway Logs
- View real-time logs in Railway dashboard
- Filter by service (backend/frontend)
- Download logs for debugging

### OpenAI Usage
- Track API calls at OpenAI dashboard
- Set up usage alerts
- Review error rates

## Updates & Redeployment

Railway auto-deploys when you push to main:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Manual redeploy in Railway dashboard:
1. Go to Deployments tab
2. Click three dots on latest deployment
3. Select "Redeploy"

## Rollback

If deployment fails:
1. Go to Deployments tab
2. Find last working deployment
3. Click three dots → "Redeploy"

## Custom Domain (Optional)

1. In Railway Settings, click "Custom Domain"
2. Add your domain (e.g., expenses.yourdomain.com)
3. Update DNS records as shown
4. Wait for SSL certificate provisioning (~10 mins)
5. Update `CORS_ORIGIN` to match new domain

## Environment-Specific Builds

For multiple environments (staging/production):

1. Create separate Railway projects
2. Connect different GitHub branches
3. Use different environment variables per project

## Backup Strategy

Since we use localStorage:
1. Advise users to export data (future feature)
2. Or migrate to database (PostgreSQL on Railway)
3. Consider adding cloud backup option

## Security Checklist

- ✅ Never commit `.env` files
- ✅ Use environment variables for secrets
- ✅ Keep OpenAI API key secure
- ✅ Set reasonable file size limits
- ✅ Validate file types on backend
- ✅ Use HTTPS only (Railway provides this)
- ✅ Monitor for unusual API usage

## Next Steps

After successful deployment:
1. Test all features thoroughly
2. Monitor logs for errors
3. Track OpenAI API usage
4. Gather user feedback
5. Plan feature enhancements

## Support Resources

- [Railway Docs](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [OpenAI API Docs](https://platform.openai.com/docs)


