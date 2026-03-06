import Link from "next/link";

export default function SuccessPage() {
  return <main className="mx-auto max-w-xl p-10"><h1 className="text-2xl font-semibold">Subscription started</h1><Link href="/app/billing" className="text-green-600">Open billing</Link></main>;
}
