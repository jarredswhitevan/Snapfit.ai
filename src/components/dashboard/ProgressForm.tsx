"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProgressForm({ onAdd }: { onAdd: (weightKg: number) => void }) {
  const [weight, setWeight] = useState("");

  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!weight) return;
        onAdd(Number(weight));
        setWeight("");
      }}
    >
      <Input value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight kg" />
      <Button type="submit">Add entry</Button>
    </form>
  );
}
