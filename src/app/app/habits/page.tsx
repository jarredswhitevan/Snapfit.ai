"use client";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";

type Habit = { name: string; streak: number; completed: boolean };

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);

  return (
    <div>
      <PageHeader title="Habits" description="Build consistency with daily completion and streaks." />

      {habits.length ? (
        <div className="grid gap-3 md:grid-cols-2">
          {habits.map((h, idx) => (
            <Card key={h.name}>
              <label className="flex items-center justify-between">
                <span>{h.name}</span>
                <input
                  type="checkbox"
                  checked={h.completed}
                  onChange={() =>
                    setHabits(habits.map((x, i) => (i === idx ? { ...x, completed: !x.completed } : x)))
                  }
                />
              </label>
              <p className="text-xs text-muted-foreground">Current streak: {h.streak} days</p>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <p className="font-medium">No habits yet</p>
          <p className="text-sm text-muted-foreground">This section will let you track daily habits once wired to the DB.</p>
        </Card>
      )}
    </div>
  );
}
