# Deployment Guide for AI Claude

**Hello Claude!** 👋 This guide will help you deploy this Lovable project to Vercel.

## 🎯 What You're Deploying

This is a **full-stack AI visibility tracking platform** with:
- **Frontend**: React + Vite app (what you'll deploy to Vercel)
- **Backend**: Already running on Lovable Cloud (no deployment needed!)

**Important**: Only the frontend needs deployment. The backend, database, and edge functions are already live!

## 🏗️ Architecture Understanding

```
┌─────────────────────────────────────────────────────┐
│  VERCEL (what you're deploying)                    │
│  ├── React Frontend                                │
│  ├── Static assets                                 │
│  └── Build output (dist/)                          │
└─────────────────────────────────────────────────────┘
                    ↓ API calls
┌─────────────────────────────────────────────────────┐
│  LOVABLE CLOUD (already deployed & running)        │
│  ├── PostgreSQL Database                           │
│  ├── Authentication (Supabase Auth)                │
│  ├── Edge Functions (Deno runtime)                 │
│  │   ├── analyze-brand                             │
│  │   ├── send-email                                │
│  │   └── weekly-summary                            │
│  └── Row Level Security policies                   │
└─────────────────────────────────────────────────────┘
```

## 📋 Pre-Deployment Checklist

- [x] Repository is at: `github.com/guannko/hello-wonder-forge`
- [x] Backend is running on Lovable Cloud
- [x] Database tables are created with RLS policies
- [x] Edge functions are deployed
- [ ] Vercel account is ready

## 🚀 Step-by-Step Deployment

### Step 1: Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select or paste: `github.com/guannko/hello-wonder-forge`
4. Click **"Import"**

### Step 2: Configure Project Settings

Vercel will auto-detect these (but verify):

```yaml
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node Version: 18.x
```

**Do NOT change these unless necessary!**

### Step 3: Add Environment Variables

Click **"Environment Variables"** and add these **EXACTLY**:

```env
VITE_SUPABASE_URL=https://ypxtiolorgmmqnryzsgg.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlweHRpb2xvcmdtbXFucnl6c2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMDcwNzAsImV4cCI6MjA3ODg4MzA3MH0.Dhl4VEPnEqx-GNqSai6VIjClErYkLXdC2UPNzOIIh68
VITE_SUPABASE_PROJECT_ID=ypxtiolorgmmqnryzsgg
```

**Important Notes**:
- These are **publishable keys** - safe for client-side
- Copy them EXACTLY (including the long JWT token)
- Make sure there are NO extra spaces or line breaks
- Add them to ALL environments (Production, Preview, Development)

### Step 4: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://hello-wonder-forge.vercel.app`

### Step 5: Verify Deployment

Visit your deployed URL and test:

1. **Homepage loads** ✓
2. **Login page** (`/login`) works ✓
3. **Can sign up** - create a test account ✓
4. **Dashboard loads** after login ✓
5. **Can run analysis** - try analyzing "Nike" ✓

If all these work → **SUCCESS!** 🎉

## ✅ Post-Deployment Verification

### Test Authentication
```
1. Go to /signup
2. Create account: test@example.com / password123
3. You should auto-login (email confirm is disabled)
4. Should redirect to /dashboard
```

### Test Analysis
```
1. In dashboard, enter brand name: "Nike"
2. Click "Analyze"
3. Wait 10-30 seconds
4. Should see results with score
```

### Test Admin Panel
```
1. Need to manually add admin role in database
2. Go to /admin
3. Should see admin dashboard
```

## 🔧 Troubleshooting

### Build Fails with "Module not found"

**Cause**: Missing dependencies or wrong node version

**Fix**:
```bash
# In Vercel settings, ensure:
Node.js Version: 18.x
Install Command: npm install
```

### "Cannot connect to database"

**Cause**: Environment variables not set correctly

**Fix**: Double-check that ALL 3 env vars are set EXACTLY as shown above

### Authentication Errors

**Cause**: VITE_SUPABASE_PUBLISHABLE_KEY is wrong

**Fix**: Make sure the key is the complete JWT token (very long string starting with "eyJ...")

### CORS Errors

**Cause**: Edge functions CORS misconfiguration

**Fix**: This shouldn't happen - edge functions have CORS enabled. If it does, check browser console for specific URL

### "Failed to fetch" on Analysis

**Cause**: Edge function not responding

**Fix**: The edge function is already deployed on Lovable Cloud. Wait a bit and retry.

## 🔄 Continuous Deployment

**Good news**: Auto-deployment is already configured!

```
Lovable Editor → GitHub → Vercel
     ↓              ↓         ↓
   Change      Auto-push   Auto-deploy
```

Every change in Lovable automatically:
1. Pushes to GitHub
2. Triggers Vercel webhook
3. Rebuilds and redeploys

**You don't need to do anything!**

## 🎨 Custom Domain (Optional)

Want to use a custom domain like `ai-tracker.com`?

1. In Vercel, go to **Project Settings → Domains**
2. Click **"Add Domain"**
3. Enter your domain name
4. Follow Vercel's DNS instructions
5. Wait for DNS propagation (5-60 minutes)

## 📧 Enabling Real Emails (Optional)

Currently emails are only logged. To enable real sending:

1. Get a Resend.com API key
2. Add it to Lovable Cloud secrets (not Vercel!)
3. Uncomment code in `supabase/functions/send-email/index.ts`

**Note**: This is a Lovable Cloud configuration, NOT Vercel!

## 🔐 Security Notes

### What's Public (Safe)
✅ `VITE_SUPABASE_URL` - Public endpoint
✅ `VITE_SUPABASE_PUBLISHABLE_KEY` - Client-safe key
✅ `VITE_SUPABASE_PROJECT_ID` - Public identifier

### What's Private (On Lovable Cloud)
🔒 `SUPABASE_SERVICE_ROLE_KEY` - Backend only
🔒 `RESEND_API_KEY` - Backend only
🔒 Database connection strings - Backend only

**The private keys are already secured on Lovable Cloud and never exposed to frontend!**

## 📊 Performance Expectations

### Build Time
- First build: ~2-3 minutes
- Subsequent builds: ~1-2 minutes

### Load Time
- Homepage: <1 second
- Dashboard (auth): 1-2 seconds
- Analysis request: 10-30 seconds (depends on external API)

### Edge Functions
- analyze-brand: ~10-30s (external API call)
- send-email: <1s (currently just logs)
- weekly-summary: ~2-5s per user

## 🐛 Known Issues

### 1. Email Only Logs
- **Status**: Expected behavior
- **Fix**: Add RESEND_API_KEY to enable real sending
- **Impact**: Users won't receive email notifications

### 2. Weekly Reports Not Scheduled
- **Status**: Manual only
- **Fix**: Setup Supabase Cron job
- **Impact**: No automatic weekly emails

### 3. Competitors Feature Incomplete
- **Status**: UI exists but minimal logic
- **Fix**: Future enhancement
- **Impact**: Feature is visible but not fully functional

## 📚 Additional Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev
- **Supabase Docs**: https://supabase.com/docs
- **Lovable Docs**: https://docs.lovable.dev

## 🆘 Need Help?

If something doesn't work:

1. Check Vercel build logs
2. Check browser console for errors
3. Verify environment variables are set correctly
4. Check that backend (Lovable Cloud) is responding

**Everything is already configured correctly**, so if it doesn't work on first try, it's usually:
- Missing/wrong environment variables
- Build configuration issue

## ✨ Success Indicators

You'll know it's working when:
- ✅ Site loads at your Vercel URL
- ✅ Can create an account
- ✅ Can login
- ✅ Can run an analysis
- ✅ Dashboard shows data
- ✅ Admin panel accessible (with admin role)

**That's it! You're done!** 🎉

---

Good luck, Claude! This should be a smooth deployment. The hard work (backend, database, edge functions) is already done and running on Lovable Cloud. You're just deploying the pretty frontend! 😊
