"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { generatePlan } from "@/app/actions/plan";

export const PlanActions = ({ hasPlan }: { hasPlan: boolean }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = (regenerate: boolean) => {
    startTransition(async () => {
      setError(null);
      try {
        await generatePlan({ regenerate });
        window.location.reload();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  };

  return (
    <div className="space-y-3">
      {error && <p className="text-sm text-red-500">{error}</p>}
      {!hasPlan ? (
        <Button onClick={() => handleGenerate(false)} disabled={isPending}>
          Generate My Plan
        </Button>
      ) : (
        <Button variant="outline" onClick={() => handleGenerate(true)} disabled={isPending}>
          Regenerate Plan
        </Button>
      )}
    </div>
  );
};
