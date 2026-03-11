import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";

export default function HistoryPage() {
  return <div><PageHeader title="Plan History" description="Access prior AI generations and saved plans." /><div className="space-y-3">{["Workout: Strength + Conditioning Split","Meal: Lean Muscle Daily Meal Plan"].map((i)=><Card key={i}><p className="font-medium">{i}</p><p className="text-xs text-muted-foreground">Generated just now · quick reopen available</p></Card>)}</div></div>;
}
