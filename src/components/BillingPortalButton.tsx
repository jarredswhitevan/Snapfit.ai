"use client";

import { useTransition } from "react";
import { createBillingPortal } from "@/app/actions/stripe";
import { Button } from "@/components/ui/Button";

export const BillingPortalButton = () => {
  const [isPending, startTransition] = useTransition();

  const handlePortal = () => {
    startTransition(async () => {
      const { url } = await createBillingPortal();
      if (url) {
        window.location.href = url;
      }
    });
  };

  return (
    <Button variant="outline" onClick={handlePortal} disabled={isPending}>
      Manage Billing
    </Button>
  );
};
