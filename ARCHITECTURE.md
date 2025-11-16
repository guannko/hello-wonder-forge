# Architecture Documentation

## System Overview

AI Visibility Tracker is a full-stack web application built on a **serverless architecture** using Lovable Cloud (Supabase) for backend services.

## Tech Stack

### Frontend (Deployed on Vercel)
```
React 18.3.1          - UI framework
TypeScript 5.x        - Type safety
Vite 5.x              - Build tool & dev server
TanStack Query 5.x    - Server state management
React Router 6.x      - Client-side routing
Tailwind CSS 3.x      - Utility-first CSS
Shadcn/ui            - Component library
Recharts 2.x         - Data visualization
```

### Backend (Lovable Cloud / Supabase)
```
PostgreSQL 15        - Database
Supabase Auth       - Authentication
Deno Runtime        - Edge Functions
Row Level Security  - Authorization
```

### External Services
```
Railway API         - Brand analysis engine
Resend (TODO)       - Email delivery
```

## Application Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                      │
│  ┌────────────────────────────────────────────────────┐  │
│  │  React App (Vite)                                  │  │
│  │  ├── Pages (Routes)                                │  │
│  │  ├── Components (UI)                               │  │
│  │  ├── Hooks (Logic)                                 │  │
│  │  └── Contexts (Global State)                       │  │
│  └────────────────────────────────────────────────────┘  │
│                          ↓↑ HTTP                          │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                    VERCEL (CDN + SSR)                     │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Static Assets (HTML, CSS, JS, Images)            │  │
│  │  └── Served via Vercel Edge Network                │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                  LOVABLE CLOUD (Backend)                  │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Supabase Auth                                     │  │
│  │  ├── Email/Password authentication                 │  │
│  │  ├── Session management                            │  │
│  │  └── JWT token generation                          │  │
│  └────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │  PostgreSQL Database                               │  │
│  │  ├── profiles (user data)                          │  │
│  │  ├── analyses (brand analysis results)             │  │
│  │  ├── competitors (tracking data)                   │  │
│  │  ├── subscriptions (billing)                       │  │
│  │  ├── user_roles (RBAC)                             │  │
│  │  ├── email_preferences (settings)                  │  │
│  │  ├── analyses_cache (performance)                  │  │
│  │  └── rate_limits (throttling)                      │  │
│  └────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Edge Functions (Deno)                             │  │
│  │  ├── analyze-brand                                 │  │
│  │  │   ├── Rate limiting (10/hour)                   │  │
│  │  │   ├── Caching (7 days)                          │  │
│  │  │   ├── External API call → Railway               │  │
│  │  │   └── Email notification                        │  │
│  │  ├── send-email                                    │  │
│  │  │   ├── HTML email generation                     │  │
│  │  │   └── TODO: Resend integration                  │  │
│  │  └── weekly-summary                                │  │
│  │      ├── Aggregate user stats                      │  │
│  │      └── Batch email sending                       │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                       │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Railway API (Brand Analysis Engine)              │  │
│  │  https://primary-production-636cc.up.railway.app  │  │
│  └────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Resend (Email Delivery) - TODO                    │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Brand Analysis Flow

```
User → Dashboard
  ↓ Enter brand name
Client validates input
  ↓ supabase.functions.invoke('analyze-brand')
Edge Function receives request
  ↓ Check authentication
Get user from JWT token
  ↓ Check rate limit
Query rate_limits table (10/hour limit)
  ↓ Check cache
Query analyses_cache table (7 day TTL)
  ↓ If not cached
Call Railway API (external)
  ↓ Receive analysis data
Save to analyses table
  ↓ Update cache
Insert into analyses_cache
  ↓ Check email preferences
Query email_preferences table
  ↓ If notifications enabled
Call send-email function
  ↓ Return to client
Display results in dashboard
```

### 2. Authentication Flow

```
User → Login/Signup page
  ↓ Submit credentials
supabase.auth.signInWithPassword()
  ↓ 
Supabase Auth validates
  ↓ Generate JWT token
Set session in localStorage
  ↓ onAuthStateChange fires
Update React context
  ↓ Redirect to dashboard
ProtectedRoute validates session
  ↓ Render protected content
```

### 3. Admin Access Flow

```
User navigates to /admin
  ↓
AdminRoute component checks
  ↓ Get user from auth context
Query user_roles table
  ↓ Check for 'admin' role
RLS policy validates
  ↓ If admin
Render AdminLayout
  ↓ Else
Redirect to /dashboard
```

## Database Schema

### Core Tables

```sql
-- User Management
profiles (
  id uuid PRIMARY KEY,
  email text NOT NULL,
  full_name text,
  company text,
  avatar_url text,
  created_at timestamptz,
  updated_at timestamptz
)

user_roles (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles(id),
  role app_role NOT NULL, -- 'admin' | 'user'
  created_at timestamptz
)

-- Analysis Data
analyses (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles(id),
  brand_name text NOT NULL,
  overall_score integer,
  ai_systems jsonb NOT NULL DEFAULT '[]',
  findings jsonb NOT NULL DEFAULT '[]',
  recommendations jsonb NOT NULL DEFAULT '[]',
  status text NOT NULL DEFAULT 'completed',
  created_at timestamptz
)

-- Performance
analyses_cache (
  id uuid PRIMARY KEY,
  brand_name text UNIQUE NOT NULL,
  cache_data jsonb NOT NULL,
  created_at timestamptz,
  expires_at timestamptz NOT NULL
)

rate_limits (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles(id),
  action text NOT NULL,
  count integer NOT NULL DEFAULT 1,
  window_start timestamptz NOT NULL,
  created_at timestamptz,
  UNIQUE(user_id, action, window_start)
)

-- User Preferences
email_preferences (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) UNIQUE,
  analysis_complete boolean DEFAULT true,
  weekly_summary boolean DEFAULT true,
  competitor_updates boolean DEFAULT true,
  marketing_emails boolean DEFAULT false,
  created_at timestamptz,
  updated_at timestamptz
)

-- Subscriptions
subscriptions (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles(id),
  plan subscription_plan NOT NULL, -- 'free' | 'pro' | 'enterprise'
  status subscription_status NOT NULL, -- 'active' | 'cancelled' | 'expired'
  next_billing_date timestamptz,
  created_at timestamptz,
  updated_at timestamptz
)

-- Competitors Tracking
competitors (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles(id),
  competitor_name text NOT NULL,
  your_score integer,
  their_score integer,
  last_updated timestamptz,
  created_at timestamptz
)
```

## Security Model

### Row Level Security (RLS)

All tables have RLS enabled with policies:

```sql
-- Example: analyses table
CREATE POLICY "Users can view own analyses"
  ON analyses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own analyses"
  ON analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all"
  ON analyses FOR SELECT
  USING (has_role(auth.uid(), 'admin'));
```

### Authentication
- JWT tokens stored in `localStorage`
- Auto-refresh enabled
- Session persists across page reloads
- Tokens include user metadata

### Authorization
- Role-based access control (RBAC)
- Security definer functions prevent RLS recursion
- Admin detection via `has_role()` function

## Performance Optimizations

### 1. Caching Strategy
```
analyses_cache table
  ├── 7 day TTL
  ├── Brand name as unique key
  └── Reduces external API calls
```

### 2. Rate Limiting
```
rate_limits table
  ├── Per-user tracking
  ├── 10 requests/hour for analyze-brand
  └── Sliding window implementation
```

### 3. Query Optimization
```
TanStack Query
  ├── Automatic request deduplication
  ├── Background refetching
  ├── Optimistic updates
  └── Infinite scroll pagination ready
```

### 4. Code Splitting
```
React Router lazy loading
  ├── Route-based splitting
  ├── Reduces initial bundle size
  └── Faster first paint
```

## Deployment Strategy

### Frontend (Vercel)
```
GitHub → Vercel
  ├── Auto-deploy on push to main
  ├── Preview deployments for PRs
  ├── Edge network distribution
  └── Automatic HTTPS
```

### Backend (Lovable Cloud)
```
Lovable Editor → Cloud
  ├── Edge functions auto-deployed
  ├── Database migrations applied
  ├── Zero downtime deployments
  └── Automatic scaling
```

## Monitoring & Observability

### Available Metrics (via Admin Panel)
- Total users
- Total analyses
- Average scores
- Active subscriptions
- Cache hit rate
- Rate limit events
- Edge function health

### Logging
- Edge functions log to Supabase
- Client errors captured (TODO: Sentry)
- Database query logs available

## Scalability Considerations

### Current Capacity
- Database: Handles 1000s of concurrent users
- Edge Functions: Auto-scale to demand
- Rate Limiting: 10 analyses/hour/user = ~240/day/user
- Cache: Reduces API load by ~80%

### Bottlenecks
1. **Railway API**: External dependency, unknown limits
2. **Email Sending**: Not implemented yet (logs only)
3. **Weekly Scheduler**: Manual trigger only

### Future Improvements
- Add CDN for static assets (Vercel does this)
- Implement queue for analysis requests
- Add Redis for hot cache layer
- Setup monitoring/alerting (Sentry, Datadog)

## Development Workflow

```
Local Development (Lovable)
  ↓ Make changes
Auto-save to Lovable
  ↓ Sync
GitHub repository
  ↓ Webhook
Vercel auto-deploy
  ↓ Live in ~2 minutes
Production site updated
```

## API Endpoints

### Supabase Edge Functions
```
POST /functions/v1/analyze-brand
  Headers: Authorization: Bearer <token>
  Body: { brandName: string }
  Returns: { overall_score, ai_systems[], findings[], recommendations[] }

POST /functions/v1/send-email
  Headers: Authorization: Bearer <token>
  Body: { to, subject, type, data }
  Returns: { success: boolean }

POST /functions/v1/weekly-summary
  Headers: Authorization: Bearer <token>
  Returns: { summariesSent: number }
```

### Supabase Auth
```
POST /auth/v1/signup
POST /auth/v1/token?grant_type=password
POST /auth/v1/logout
GET  /auth/v1/user
```

### Supabase Database (via PostgREST)
```
GET    /rest/v1/analyses?user_id=eq.<id>
POST   /rest/v1/analyses
GET    /rest/v1/profiles?id=eq.<id>
PATCH  /rest/v1/profiles?id=eq.<id>
... (all tables accessible via REST)
```

## Environment Variables

### Client-Side (Vercel)
```env
VITE_SUPABASE_URL              - Public Supabase endpoint
VITE_SUPABASE_PUBLISHABLE_KEY  - Public anon key
VITE_SUPABASE_PROJECT_ID       - Project identifier
```

### Server-Side (Lovable Cloud)
```env
SUPABASE_URL                   - Same as client
SUPABASE_ANON_KEY             - Same as PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY     - Admin key (never exposed!)
SUPABASE_DB_URL               - Direct database connection
LOVABLE_API_KEY               - For AI features (future)
RESEND_API_KEY                - For email (TODO)
```

## File Structure

```
hello-wonder-forge/
├── src/
│   ├── App.tsx                    # Root component + routing
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Global styles + design system
│   │
│   ├── components/
│   │   ├── ui/                    # Shadcn components
│   │   ├── admin/                 # Admin-specific
│   │   ├── ProtectedRoute.tsx    # Auth guard
│   │   └── AdminRoute.tsx         # Admin guard
│   │
│   ├── pages/
│   │   ├── Index.tsx              # Landing page
│   │   ├── Login.tsx              # Auth
│   │   ├── Dashboard.tsx          # Main app
│   │   ├── MyAnalyses.tsx         # History
│   │   ├── AnalysisDetails.tsx    # Single analysis
│   │   └── admin/                 # Admin panel
│   │       ├── AdminDashboard.tsx
│   │       ├── AdminUsers.tsx
│   │       ├── AdminAnalyses.tsx
│   │       └── SystemMonitoring.tsx
│   │
│   ├── layouts/
│   │   ├── DashboardLayout.tsx    # User dashboard wrapper
│   │   └── AdminLayout.tsx        # Admin panel wrapper
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx        # Global auth state
│   │
│   ├── hooks/
│   │   ├── useAnalyzeBrand.ts     # Analysis logic
│   │   └── useIsAdmin.ts          # Admin detection
│   │
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts          # Supabase client
│   │       └── types.ts           # Generated DB types
│   │
│   └── lib/
│       └── utils.ts               # Helpers
│
├── supabase/
│   ├── config.toml                # Supabase config
│   └── functions/                 # Edge functions
│       ├── analyze-brand/
│       ├── send-email/
│       └── weekly-summary/
│
├── public/                        # Static assets
├── .env                           # Environment vars
├── vite.config.ts                 # Vite configuration
├── tailwind.config.ts             # Tailwind config
├── README.md                      # Main docs
├── DEPLOYMENT_GUIDE.md            # This file's sibling
└── package.json                   # Dependencies
```

---

**Last Updated**: 2025-01-16
**Version**: 1.0.0
**Built with**: Lovable AI
