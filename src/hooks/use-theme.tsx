"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemePreference = "light" | "dark";

const ThemeContext = createContext<{
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
}>({
  theme: "light",
  setTheme: () => undefined,
});

const STORAGE_KEY = "snapfit-theme";

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>("light");

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as ThemePreference | null) ?? "light";
    setThemeState(stored);
    document.documentElement.classList.toggle("dark", stored === "dark");
  }, []);

  const setTheme = (next: ThemePreference) => {
    localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useThemeMode = () => useContext(ThemeContext);
