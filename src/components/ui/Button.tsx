import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-brand text-white hover:bg-green-600",
  outline: "border border-slate-300 text-slate-900 hover:bg-slate-100",
  ghost: "text-slate-900 hover:bg-slate-100"
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

export const Button = ({
  className,
  variant = "default",
  ...props
}: ButtonProps) => (
  <button
    className={cn(
      "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
      variants[variant],
      className
    )}
    {...props}
  />
);
