"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState<"en" | "bn">("en");

  // Detect current locale from URL
  useEffect(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    setLocale(pathParts[0] === "bn" ? "bn" : "en");
  }, [pathname]);

  // Toggle language and update URL
  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "bn" : "en";
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts[0] === locale) pathParts.shift();

    const newPath = "/" + [newLocale, ...pathParts].join("/");
    router.replace(newPath);
    setLocale(newLocale);
  };

  return (
    <Toggle
      pressed={locale === "en"}
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