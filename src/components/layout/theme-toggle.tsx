"use client";

import { useThemeMode } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, setTheme } = useThemeMode();
  const isDark = theme === "dark";

  return (
    <button
      className="rounded-lg border px-3 py-2 text-sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title="Toggle theme mode"
      type="button"
    >
      Theme: {isDark ? "Dark" : "Light"}
    </button>
  );
}
