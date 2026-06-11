"use client";

import { useLocale } from "next-intl";
import { Toggle } from "@/components/ui/toggle";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale() as "en" | "bn";

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "bn" : "en";
    const currentPath =
      window.location.pathname + window.location.search;
    window.location.href = `/api/set-locale?locale=${newLocale}&redirect=${encodeURIComponent(currentPath)}`;
  };

  return (
    <Toggle
      pressed={locale === "bn"}
      onPressedChange={toggleLanguage}
      variant="outline"
      size="sm"
      className="bg-slate-800/10 hover:bg-slate-800/20 data-[state=on]:bg-slate-800 data-[state=on]:text-white border-slate-300 dark:border-slate-700"
      aria-label="Toggle language"
    >
      <Languages className="w-4 h-4 mr-1" />
      {locale === "bn" ? "EN" : "বাং"}
    </Toggle>
  );
}
