"use client";

import { useThemeMode } from "@/hooks/use-theme";

const cycle: Array<"light" | "dark" | "system"> = ["light", "dark", "system"];

export function ThemeToggle() {
  const { theme, setTheme } = useThemeMode();
  const currentIndex = cycle.indexOf(theme);
  const nextTheme = cycle[(currentIndex + 1) % cycle.length];
  const label = theme === "dark" ? "Dark" : theme === "light" ? "Light" : "System";

  return (
    <button
      className="rounded-lg border px-3 py-2 text-sm"
      onClick={() => setTheme(nextTheme)}
      title="Toggle theme mode"
      type="button"
    >
      Theme: {label}
    </button>
  );
}
