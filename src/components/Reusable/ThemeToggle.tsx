"use client";

import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Toggle variant="outline" size="sm" disabled aria-label="Loading theme">
        <Sun className="h-4 w-4" />
      </Toggle>
    );
  }

  const isDark = theme === "dark";

  return (
    <Toggle
      pressed={isDark}
      onPressedChange={() => setTheme(isDark ? "light" : "dark")}
      variant="outline"
      size="sm"
      className="relative bg-slate-800/10 hover:bg-slate-800/20 data-[state=on]:bg-slate-800 data-[state=on]:text-white border-slate-300 dark:border-slate-700 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {/* Sun (Light Mode) */}
      <Sun
        className={`h-4 w-4 transition-all duration-500 ${
          isDark
            ? "scale-0 rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        }`}
      />

      {/* Moon (Dark Mode) */}
      <Moon
        className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-500 ${
          isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0"
        }`}
      />
    </Toggle>
  );
};