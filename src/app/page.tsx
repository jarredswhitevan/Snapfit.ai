import Link from "next/link";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PricingPreview } from "@/components/marketing/pricing-preview";
import { Card } from "@/components/ui/card";
import { SnapfitLogo } from "@/components/branding/logo";

export default function LandingPage() {
  return (
    <div>
      <PublicNavbar />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Train smarter. Eat better. Progress faster.</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">SnapFIT combines AI workout programming, nutrition planning, and habit analytics into one premium coaching dashboard.</p>
        <div className="mt-8 flex gap-3"><Link href="/signup" className="rounded-lg bg-green-500 px-5 py-3 font-medium text-white">Start 7-Day Free Trial</Link><Link href="/pricing" className="rounded-lg border px-5 py-3">View Pricing</Link></div>
        <Card className="mt-10"><p className="text-sm text-muted-foreground">Live dashboard preview</p><div className="mt-4 grid gap-4 md:grid-cols-3"><Card><p>Calorie target</p><p className="text-2xl font-semibold">2,550</p></Card><Card><p>Workouts this week</p><p className="text-2xl font-semibold">4/5</p></Card><Card><p>Habit streak</p><p className="text-2xl font-semibold">12 days</p></Card></div></Card>
      </section>
      <section id="features" className="mx-auto max-w-6xl px-4 py-12"><div className="grid gap-4 md:grid-cols-3">{["AI workout plans","AI meal plans","Progress tracking","Habit streaks","Elite personalization","Subscription controls"].map((f)=><Card key={f}><p className="font-medium">{f}</p><p className="text-sm text-muted-foreground">Built for modern fitness routines.</p></Card>)}</div></section>
      <section className="mx-auto max-w-6xl px-4 py-12"><h2 className="text-2xl font-semibold">How it works</h2><div className="mt-4 grid gap-3 md:grid-cols-4">{["Tell us your goals","Get custom plans","Track progress daily","Level up every week"].map((s,i)=><Card key={s}><p className="text-xs text-green-600">0{i+1}</p><p>{s}</p></Card>)}</div></section>
      <PricingPreview />
      <section className="mx-auto max-w-6xl px-4 py-12"><h2 className="text-2xl font-semibold">Testimonials</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{["SnapFIT gave me structure without overthinking.","The meal plans are practical and easy to prep.","Elite insights made my plateau disappear."].map((t)=> <Card key={t}><p className="text-sm">“{t}”</p></Card>)}</div></section>
      <section className="mx-auto max-w-6xl px-4 py-12"><h2 className="text-2xl font-semibold">FAQ</h2><div className="mt-4 space-y-3 text-sm">{[["How does the free trial work?","You get full access for 7 days."],["Can I cancel anytime?","Yes, directly from billing settings."],["Do I need gym access?","No, home and gym programs are both supported."],["Does it support different diets?","Yes, including vegetarian, vegan, high-protein, and custom preferences."],["What is included in Elite?","Advanced customization, analytics, and deeper AI controls."]].map(([q,a])=> <Card key={q}><p className="font-medium">{q}</p><p className="text-muted-foreground">{a}</p></Card>)}</div></section>
      <section className="mx-auto max-w-6xl px-4 py-16 text-center"><h2 className="text-3xl font-semibold">Start your free trial today</h2><Link href="/signup" className="mt-4 inline-block rounded-lg bg-green-500 px-5 py-3 font-medium text-white">Create account</Link></section>
      <footer className="border-t"><div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-8 text-sm"><SnapfitLogo /><div className="flex gap-4"><Link href="/pricing">Pricing</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/login">Login</Link></div></div></footer>
    </div>
  );
}
