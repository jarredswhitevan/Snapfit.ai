"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Estimate = {
  estimatedCalories: number;
  confidence?: number;
  items?: Array<{ name: string; calories: number }>;
};

export default function CaloriesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <PageHeader
        title="Calorie Tracker"
        description="Take a photo of your food and let AI estimate calories."
      />

      <div className="grid gap-3 rounded-xl border bg-background p-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Food photo</label>
          <Input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null;
              setFile(f);
              setEstimate(null);
              setError(null);
            }}
          />
          <p className="text-xs text-muted-foreground">
            Tip: include the whole plate and any drinks/sauces in the frame.
          </p>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Notes (optional)</label>
          <Input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder='e.g., "2 slices", "no mayo", "grilled chicken bowl"'
          />
        </div>

        <div className="flex gap-2">
          <Button
            disabled={!file || loading}
            onClick={async () => {
              if (!file) return;
              setLoading(true);
              setError(null);
              setEstimate(null);

              try {
                const form = new FormData();
                form.append("image", file);
                form.append("notes", notes);

                const r = await fetch("/api/ai/calories", { method: "POST", body: form });
                const data = await r.json();
                if (!r.ok) {
                  setError(data?.error ?? "Request failed");
                  return;
                }
                setEstimate(data);
              } catch (e: any) {
                setError(e?.message ?? "Request failed");
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? "Estimating..." : "Estimate calories"}
          </Button>

          <Button
            className="bg-slate-700"
            disabled={!estimate}
            onClick={() => {
              // MVP: wire this into logs later
              alert("Saved (MVP placeholder)");
            }}
          >
            Save
          </Button>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        {estimate ? (
          <div className="mt-2 grid gap-2 rounded-lg bg-muted p-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm text-muted-foreground">Estimated total</p>
              <p className="text-2xl font-semibold">{Math.round(estimate.estimatedCalories)} kcal</p>
            </div>
            {typeof estimate.confidence === "number" ? (
              <p className="text-xs text-muted-foreground">
                Confidence: {Math.round(estimate.confidence * 100)}%
              </p>
            ) : null}
            {estimate.items?.length ? (
              <div className="mt-2">
                <p className="text-sm font-medium">Breakdown</p>
                <ul className="mt-1 list-inside list-disc text-sm">
                  {estimate.items.map((it, idx) => (
                    <li key={idx}>
                      {it.name}: {Math.round(it.calories)} kcal
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
