import Link from "next/link";

export default function CancelPage() {
  return <main className="mx-auto max-w-xl p-10"><h1 className="text-2xl font-semibold">Checkout canceled</h1><Link href="/pricing" className="text-green-600">Return to pricing</Link></main>;
}
