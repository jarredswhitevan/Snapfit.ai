# SnapFIT

AI-generated workout + meal plans with progress logging and Stripe subscriptions.

## Local setup

```bash
npm install
npm run dev
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_APP_URL`
- `STRIPE_PRICE_ID`

### Supabase SQL

Run the SQL in `supabase/schema.sql` in the Supabase SQL editor to create tables, RLS policies, and the profile trigger.

### Stripe webhook testing

Use the Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Then trigger a checkout session through the UI and confirm webhook events are received.

## Deployment

Deploy to Vercel with the same environment variables configured in the project settings.
