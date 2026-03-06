"use client";
import { ThemeContextProvider } from "@/hooks/use-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}
