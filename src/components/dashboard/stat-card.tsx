import { Card } from "@/components/ui/card";

export function StatCard({ label, value, helper }: { label: string; value: string; helper?: string }) {
  return (
    <Card>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      {helper && <p className="mt-1 text-xs text-muted-foreground">{helper}</p>}
    </Card>
  );
}
