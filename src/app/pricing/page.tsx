import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function PricingPage() {
  return (
    <div className="container space-y-10">
      <div className="text-center">
        <Badge>Simple pricing</Badge>
        <h1 className="mt-4 text-4xl font-semibold">SnapFIT Monthly</h1>
        <p className="mt-2 text-slate-600">
          Unlimited plan regeneration after your free first plan.
        </p>
      </div>
      <div className="mx-auto max-w-xl">
        <Card className="space-y-6">
          <div>
            <p className="text-4xl font-semibold">$19</p>
            <p className="text-sm text-slate-500">per month</p>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>✔️ Personalized workout + meal plans</li>
            <li>✔️ AI regeneration up to 3x per day</li>
            <li>✔️ Progress logging and dashboard insights</li>
            <li>✔️ Cancel anytime</li>
          </ul>
          <Link href="/auth">
            <Button className="w-full">Get Started</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
