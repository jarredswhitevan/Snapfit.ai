export const stripeEnv = {
  secretKey: process.env.STRIPE_SECRET_KEY,
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  priceIds: {
    coreMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_CORE_MONTHLY,
    coreAnnual: process.env.NEXT_PUBLIC_STRIPE_PRICE_CORE_ANNUAL,
    eliteMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ELITE_MONTHLY,
    eliteAnnual: process.env.NEXT_PUBLIC_STRIPE_PRICE_ELITE_ANNUAL,
  },
};

export const isStripeConfigured = Boolean(stripeEnv.secretKey && stripeEnv.publishableKey);
