import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function HomePage() {
  return (
    <div className="container space-y-20">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            AI Fitness That Ships Fast
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Meet SnapFIT: your personal trainer + nutritionist in one
          </h1>
          <p className="text-lg text-slate-600">
            Generate a 7-day workout split and a realistic meal plan in seconds.
            Track progress, stay consistent, and iterate with AI-backed guidance.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline">View Pricing</Button>
            </Link>
          </div>
        </div>
        <Card className="space-y-4 bg-slate-950 text-white">
          <p className="text-sm uppercase tracking-widest text-green-300">
            SnapFIT Preview
          </p>
          <h2 className="text-2xl font-semibold">Your weekly plan, ready today.</h2>
          <ul className="space-y-3 text-sm text-slate-200">
            <li>✔️ Structured workouts matched to your equipment</li>
            <li>✔️ Macro-balanced meal plans with grocery-friendly foods</li>
            <li>✔️ Built-in rate limits so plans stay focused</li>
          </ul>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Personalized onboarding",
            description:
              "Tell us your goals, stats, training days, and preferences. We tailor everything."
          },
          {
            title: "AI plans that stick",
            description:
              "Workout splits and meals include sets, reps, rest times, and macros."
          },
          {
            title: "Track your progress",
            description:
              "Log weight and workouts so SnapFIT stays aligned with your journey."
          }
        ].map((item) => (
          <Card key={item.title}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.description}</p>
          </Card>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
        <h2 className="text-3xl font-semibold">Ready to build your plan?</h2>
        <p className="mt-2 text-slate-600">
          Start free, generate one plan on us, and upgrade when you want unlimited regeneration.
        </p>
        <div className="mt-6">
          <Link href="/auth">
            <Button>Get Started</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
