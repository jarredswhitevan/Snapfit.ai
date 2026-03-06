import Link from "next/link";

export function SnapfitLogo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 font-semibold tracking-tight">
      <span className="rounded-xl bg-green-500/15 p-2 text-green-500">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9h3v6H2zM19 9h3v6h-3zM5 10h3v4H5zM16 10h3v4h-3zM8 11h8v2H8z"/></svg>
      </span>
      <span className="text-xl">SnapFIT</span>
    </Link>
  );
}
