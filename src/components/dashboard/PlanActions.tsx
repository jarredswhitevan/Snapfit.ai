import { Button } from "@/components/ui/button";

export function PlanActions({
  onGenerate,
  onRegenerate,
}: {
  onGenerate: () => void;
  onRegenerate: () => void;
}) {
  return (
    <div className="mt-3 flex gap-2">
      <Button type="button" onClick={onGenerate}>Generate plan</Button>
      <Button className="bg-slate-700" type="button" onClick={onRegenerate}>Regenerate</Button>
    </div>
  );
}
