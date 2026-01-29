import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function SuccessPage() {
  return (
    <div className="container flex justify-center">
      <Card className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Subscription active</h1>
        <p className="text-sm text-slate-600">
          You are all set! Your subscription is active.
        </p>
        <Link href="/dashboard">
          <Button className="w-full">Go to Dashboard</Button>
        </Link>
      </Card>
    </div>
  );
}
