import { Card } from "@/components/ui/card";

export function EmptyState({ title, body }: { title: string; body: string }) {
  return <Card className="text-center"><p className="font-medium">{title}</p><p className="text-sm text-muted-foreground">{body}</p></Card>;
}
