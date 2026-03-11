"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

export function UnitSystemSelect({ initial }: { initial: "imperial" | "metric" }) {
  const [unitSystem, setUnitSystem] = useState<"imperial" | "metric">(initial);
  const [saving, setSaving] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={unitSystem} onChange={(e) => setUnitSystem(e.target.value as any)}>
        <option value="imperial">Imperial (lb, ft/in)</option>
        <option value="metric">Metric (kg, cm)</option>
      </Select>
      <Button
        disabled={saving}
        onClick={async () => {
          setSaving(true);
          try {
            await fetch("/api/profile/units", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ unitSystem }),
            });
          } finally {
            setSaving(false);
            // quick refresh to update server-rendered settings page
            window.location.reload();
          }
        }}
      >
        {saving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
