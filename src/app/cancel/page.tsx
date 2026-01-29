import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function CancelPage() {
  return (
    <div className="container flex justify-center">
      <Card className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Checkout canceled</h1>
        <p className="text-sm text-slate-600">
          No worries — you can subscribe any time.
        </p>
        <Link href="/pricing">
          <Button className="w-full">Back to Pricing</Button>
        </Link>
      </Card>
    </div>
  );
}
