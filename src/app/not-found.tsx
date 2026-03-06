import Link from "next/link";

export default function NotFound() { return <main className="mx-auto max-w-xl px-4 py-24 text-center"><h1 className="text-4xl font-semibold">Page not found</h1><p className="mt-2 text-muted-foreground">We could not find that route.</p><Link href="/" className="mt-4 inline-block rounded-lg border px-4 py-2">Go home</Link></main>; }
