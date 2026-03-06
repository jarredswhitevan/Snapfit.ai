"use server";

export const createCheckoutSession = async () => {
  return { url: "/app/billing?mockCheckout=1" };
};

export const createBillingPortal = async () => {
  return { url: "/app/billing?portal=mock" };
};
