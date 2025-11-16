# AI Visibility Tracker

**AI-powered brand visibility analysis platform** built with React, TypeScript, and Lovable Cloud.

🔗 **Live Project**: https://lovable.dev/projects/02f05da7-a2ab-4460-805e-4798115b9e8c

## 🚀 For AI Claude: Quick Deployment Guide

**Hey Claude!** This is a full-stack app with backend already running on Lovable Cloud. You only need to deploy the frontend to Vercel.

**📖 READ THIS FIRST**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Complete step-by-step instructions!

### Quick Vercel Deploy:
1. Import from GitHub: `guannko/hello-wonder-forge`
2. Add 3 environment variables (see DEPLOYMENT_GUIDE.md)
3. Click Deploy
4. Done! ✅

## 🏗️ Architecture

- **Frontend**: React + Vite → Deploy to Vercel
- **Backend**: PostgreSQL + Edge Functions → Already on Lovable Cloud (no deployment needed!)

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - For AI Claude: Step-by-step deployment
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design & technical details
- **[.env.example](./.env.example)** - Environment variables

## 🛠️ Tech Stack

- React 18 + TypeScript + Vite
- Shadcn/ui + Tailwind CSS
- TanStack Query + React Router
- Supabase (PostgreSQL + Auth + Edge Functions)

## 📦 Project Structure

```
├── src/              # Frontend (deploy to Vercel)
├── supabase/         # Backend (already on Cloud)
└── public/           # Static assets
```

## 🔐 Features

- ✅ Email/Password authentication
- ✅ Brand visibility analysis
- ✅ Admin panel
- ✅ Rate limiting & caching
- ⚠️ Email notifications (logs only - needs RESEND_API_KEY)

## 📖 Full Documentation in README Files

See the detailed guide files for complete information!

---

**Built with ❤️ using Lovable AI**
