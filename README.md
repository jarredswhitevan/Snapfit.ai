# SnapFIT MVP

SnapFIT is a polished AI-powered fitness and nutrition SaaS MVP built with Next.js App Router.

## Features
- Marketing landing page + pricing + auth + legal pages
- Authenticated app shell with dashboard, workouts, meals, progress, habits, history, billing, settings
- Multi-step onboarding form with React Hook Form + Zod validation
- AI generation scaffold for workout + meal plans with mock fallback behavior
- Stripe checkout/portal/webhook route scaffolding with mock subscription fallback
- Supabase-ready auth scaffolding and graceful demo mode when env vars are missing
- Light/dark theme support

## Tech Stack
- Next.js 14 (App Router), TypeScript, Tailwind CSS
- React Hook Form, Zod
- Supabase (`@supabase/ssr`) scaffold
- Stripe scaffold

## Local Setup
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Demo Mode Behavior
When service credentials are missing:
- **Supabase missing**: mock login endpoint (`/api/auth/mock-login`) keeps product testable
- **Stripe missing**: checkout route returns mock URL and UI still supports plan gating
- **AI key missing**: generation endpoint returns polished mock plans

## Integration Points
- Supabase: `src/lib/supabase/*`, `src/lib/auth/session.ts`
- Stripe: `src/lib/stripe/config.ts`, `src/app/api/stripe/*`
- AI provider: `src/lib/ai/provider.ts`, `src/app/api/ai/generate/route.ts`

## Routes
- Public: `/`, `/pricing`, `/login`, `/signup`, `/forgot-password`, `/terms`, `/privacy`
- App: `/app`, `/app/onboarding`, `/app/workouts`, `/app/meals`, `/app/progress`, `/app/habits`, `/app/history`, `/app/billing`, `/app/settings`

## Pricing
- SnapFIT Core: $19.99/mo or $191.90/yr (20% off)
- SnapFIT Elite: $39.99/mo or $383.90/yr (20% off)
- 7-day free trial on both tiers

## Suggested Data Model
Core tables:
- `profiles`
- `subscriptions`
- `onboarding_profiles`
- `workout_plans`
- `meal_plans`
- `progress_logs`
- `habit_logs`
- `ai_generations`

## Deployment (Vercel)
1. Import repo into Vercel
2. Add env vars from `.env.example`
3. Configure Supabase auth callback URLs + Stripe webhook URL
4. Deploy
