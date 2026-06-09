"use client";
import React, { useState, useRef, useEffect } from "react";
import LanguageSwitcher from "@/components/Reusable/LanguageSwitcher";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import NavLogo from "./NavLogo";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/Reusable/ThemeToggle";

const MobileNavbar = () => {
  const t = useTranslations("Navbar");
  const [isOpen, setIsOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Menu height calculation
  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight);
    }
  }, [isOpen]);

  // Close menu after route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="bg-white dark:bg-black shadow border-b border-gray-200 dark:border-gray-800 fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <NavLogo />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            className="p-2 rounded-md cursor-pointer z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        style={{
          maxHeight: isOpen ? `${menuHeight}px` : "0px",
        }}
        className="overflow-hidden transition-[max-height] duration-500 absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800 z-50"
      >
        <nav className="flex flex-col gap-4 p-6 text-gray-800 dark:text-gray-100">
          <Link href="/dashboard/consumer/local-tasks" className="hover:text-blue-500">
            {t("local")}
          </Link>
          <Link href="/freelancer" className="hover:text-blue-500">
            {t("freelancer")}
          </Link>
          <Link href="/more" className="hover:text-blue-500">
            {t("more")}
          </Link>

          <div className="flex flex-col gap-3 mt-4">
            <Link href={"/auth/sign-in"}>
              <Button className="w-full">{t("getStarted")} </Button>
            </Link>

            <div className="flex flex-col gap-2 border-t border-gray-200 dark:border-gray-700 pt-4">
              <Link
                href="/auth/register/skilled"
                className="hover:text-blue-500"
              >
                {t("joinSkilledProvider")}
              </Link>
              <Link
                href="/auth/register/general"
                className="hover:text-blue-500"
              >
                {t("joinGeneralProvider")}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default MobileNavbar;
