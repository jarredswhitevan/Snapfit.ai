"use client";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Entry = { date: string; weightKg: number };

export default function ProgressPage() {
  const [data, setData] = useState<Entry[]>([]);
  const [weight, setWeight] = useState("");

  const max = data.length ? Math.max(...data.map((d) => d.weightKg)) : 0;
  const min = data.length ? Math.min(...data.map((d) => d.weightKg)) : 0;

  return (
    <div>
      <PageHeader title="Progress Tracking" description="Track weight trends, body metrics, and adherence." />

      <Card>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!weight) return;
            setData([
              ...data,
              { date: new Date().toISOString().slice(0, 10), weightKg: Number(weight) },
            ]);
            setWeight("");
          }}
        >
          <Input value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight kg" />
          <Button>Add entry</Button>
        </form>
      </Card>

      {data.length ? (
        <Card className="mt-4">
          <p className="mb-3 text-sm">Weight trend</p>
          <div className="flex h-44 items-end gap-2">
            {data.map((d) => {
              const h = ((d.weightKg - min) / (max - min || 1)) * 120 + 20;
              return (
                <div key={d.date} className="flex-1">
                  <div className="w-full rounded-t bg-green-500" style={{ height: h }} />
                  <p className="mt-1 text-[10px] text-muted-foreground">{d.date.slice(5)}</p>
                </div>
              );
            })}
          </div>
        </Card>
      ) : (
        <Card className="mt-4">
          <p className="font-medium">No progress yet</p>
          <p className="text-sm text-muted-foreground">Add your first entry above.</p>
        </Card>
      )}
    </div>
  );
}
