"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { logOutUserFromSystem } from "@/service/logOutUserFromSystem";
import { useLocale } from "next-intl";
import {
  Moon,
  Sun,
  Languages,
  User,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { useSocketStore } from "@/lib/socketStore";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import LocationManage from "@/components/Dashboard/Common/LocationManage";

type TItems = {
  id: string;
  label: string;
  href: string;
};
interface MobileMenuProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  items: TItems[];
}

const MobileMenu = ({
  items,
  user = {
    name: "রহিম আহমেদ",
    email: "rahim@example.com",
    avatar: "",
  },
}: MobileMenuProps) => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [language, setLanguage] = useState<"en" | "bn">("bn");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { disconnect } = useSocketStore();
  const locale = useLocale();

  const handleLogout = () => {
    logOutUserFromSystem();
    disconnect();
    setTimeout(() => {
      router.replace(`/${locale}/auth/sign-in`);
    }, 500);
  };

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "bn" ? "en" : "bn"));

  return (
    <>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-[999] bg-white backdrop-blur-md border-b border-border flex items-center justify-between h-16 px-4">
        <h1 className="text-lg font-bold">LOGO</h1>
        <LocationManage />
        <div className="flex items-center gap-2">
          <NotificationBell />
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-0 rounded-full focus:outline-none"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </button>
        </div>
      </header>

      {/* Sidebar overlay */}
      {/* Sidebar overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300
  ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
  z-[999]`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar drawer */}
      <aside
        className={`fixed top-0 left-0 z-[999] h-full w-64 bg-card shadow-lg transform transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-none">
            <p className="font-medium text-foreground">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col mt-2">
          {items?.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="px-4 py-3 hover:bg-primary/10 text-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border mt-4 pt-4 px-4 flex flex-col gap-2">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              থিম
            </span>
            <Toggle
              pressed={theme === "dark"}
              onPressedChange={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              size="sm"
              variant="outline"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </Toggle>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              ভাষা
            </span>
            <Toggle
              pressed={language === "en"}
              onPressedChange={toggleLanguage}
              size="sm"
              variant="outline"
            >
              {language === "bn" ? "EN" : "বাং"}
            </Toggle>
          </div>

          {/* Profile & Settings */}
          <Link
            href="/dashboard/consumer/local-tasks/profile"
            className="flex items-center gap-2 py-2 hover:bg-primary/10"
          >
            <User className="h-4 w-4" /> প্রোফাইল
          </Link>
          <Link
            href="/dashboard/consumer/local-tasks/payments"
            className="flex items-center gap-2 py-2 hover:bg-primary/10"
          >
            <CreditCard className="h-4 w-4" /> পেমেন্টস
          </Link>
          <Link
            href="/dashboard/consumer/local-tasks/settings"
            className="flex items-center gap-2 py-2 hover:bg-primary/10"
          >
            <Settings className="h-4 w-4" /> সেটিংস
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 py-2 text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" /> লগ আউট
          </button>
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;
