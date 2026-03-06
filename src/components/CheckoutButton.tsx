"use client";

import { Button } from "@/components/ui/button";

export function CheckoutButton({ label = "Upgrade" }: { label?: string }) {
  return (
    <Button
      type="button"
      onClick={async () => {
        const res = await fetch("/api/stripe/checkout", { method: "POST" });
        const data = await res.json();
        if (data.checkoutUrl) window.location.href = data.checkoutUrl;
      }}
    >
      {label}
    </Button>
  );
}
