import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Badge = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700",
      className
    )}
    {...props}
  />
);
