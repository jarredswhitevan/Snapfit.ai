"use client";

import { useTransition } from "react";
import { createCheckoutSession } from "@/app/actions/stripe";
import { Button } from "@/components/ui/Button";

export const CheckoutButton = ({ label }: { label?: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleCheckout = () => {
    startTransition(async () => {
      const { url } = await createCheckoutSession();
      if (url) {
        window.location.href = url;
      }
    });
  };

  return (
    <Button onClick={handleCheckout} disabled={isPending}>
      {label ?? "Upgrade"}
    </Button>
  );
};
