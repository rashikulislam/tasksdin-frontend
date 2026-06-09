"use client";

import LanguageSwitcher from "@/components/Reusable/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NavLogo from "./NavLogo";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/Reusable/ThemeToggle";

const ComputerNavbar = () => {
  const t = useTranslations("Navbar");

  return (
    <header className="bg-white fixed w-full dark:bg-black py-4 shadow shadow-gray-200 dark:shadow-black border-b border-gray-200 dark:border-gray-800">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <NavLogo />

        {/* Navigation Links */}
        <nav className="relative flex gap-6 text-gray-800 dark:text-primary font-medium">
          <Link
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200"
            href="/local-work"
          >
            {t("local")}
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200"
            href="/freelancer"
          >
            {t("freelancer")}
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200"
            href="/youth-ambassador"
          >
            {"Youth Ambassador"}
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200"
            href="/dashboard/consumer/house-rental"
          >
            {"House Rental"}
          </Link>
        </nav>

        {/* Language Switcher */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />

          <Link
            className="text-muted-foreground font-medium hover:text-foreground hover:bg-muted/50 items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200"
            href="/auth/register/auth-choice"
          >
            {("Join Now")}
          </Link>

          {/* <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-800 dark:text-gray-100 dark:bg-gray-900 bg-gray-100 dark:hover:bg-gray-900 border-none transition cursor-pointer focus:outline-none focus:ring-0">
              {t("joinAsProviderBtn")}
              <ChevronDown className="w-4 h-4 ml-1" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="center"
              className="w-52 bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden animate-fade-in-up focus:outline-none focus:ring-0"
            >
              <DropdownMenuItem className="px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition focus:outline-none focus:ring-0">
                <Link href={"/auth/register/skilled"}>
                  {t("joinSkilledProvider")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition focus:outline-none focus:ring-0">
                <Link href={"/auth/register/general"}>
                  {t("joinGeneralProvider")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          <Link href={"/auth/sign-in"}>
            <Button className="cursor-pointer ">{t("getStarted")}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default ComputerNavbar;
