"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { logOutUserFromSystem } from "@/service/logOutUserFromSystem";
import { useLocale } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Moon,
  Sun,
  Languages,
  User,
  CreditCard,
  Settings,
  LogOut,
  MapPin,
  Locate,
} from "lucide-react";
import { useSocketStore } from "@/lib/socketStore";
import { HouseRentalNavigationProps } from "../../data/mockHouseData";

const MobileMenuRental = ({
  user = {
    name: "রহিম আহমেদ",
    email: "rahim@example.com",
    avatar: "",
  },
  userLocation,
  isLoadingLocation,
  onGetLocation,
}: HouseRentalNavigationProps) => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [language, setLanguage] = useState<"en" | "bn">("bn");
  const { disconnect } = useSocketStore();
  const locale = useLocale();
  const handleLogout = () => {
    logOutUserFromSystem();
    disconnect();
    setTimeout(() => {
      router.replace(`/${locale}/auth/sign-in`);
    }, 500);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "bn" ? "en" : "bn"));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-80 bg-card border-border"
            align="start"
            forceMount
          >
            <div className="flex items-center justify-start gap-2 p-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium text-foreground">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link
                href={"/dashboard/consumer/local-tasks/profile"}
                className="flex items-center"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link
                href={"/dashboard/consumer/local-tasks/payments"}
                className="flex items-center"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Payments</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Theme Toggle */}
            <DropdownMenuItem asChild>
              <div className="flex items-center justify-between w-full px-2 py-2">
                <span className="flex items-center">
                  {theme === "dark" ? (
                    <Sun className="mr-2 h-4 w-4" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4" />
                  )}
                  Theme
                </span>
                <Toggle
                  pressed={theme === "dark"}
                  onPressedChange={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  }
                  variant="outline"
                  size="sm"
                >
                  {theme === "dark" ? "Light" : "Dark"}
                </Toggle>
              </div>
            </DropdownMenuItem>

            {/* Language Toggle */}
            <DropdownMenuItem asChild>
              <div className="flex items-center justify-between w-full px-2 py-2">
                <span className="flex items-center">
                  <Languages className="mr-2 h-4 w-4" />
                  Language
                </span>
                <Toggle
                  pressed={language === "en"}
                  onPressedChange={toggleLanguage}
                  variant="outline"
                  size="sm"
                >
                  {language === "bn" ? "EN" : "বাং"}
                </Toggle>
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="flex items-center">
              <Link
                href={"/dashboard/consumer/local-tasks/settings"}
                className="flex items-center"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Local Tasks / Freelancer Link */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onGetLocation}
            disabled={isLoadingLocation}
            className="gap-2"
          >
            {isLoadingLocation ? (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : userLocation ? (
              <MapPin className="w-4 h-4 text-success" />
            ) : (
              <Locate className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {userLocation ? "লোকেশন পাওয়া গেছে" : "লোকেশন নিন"}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MobileMenuRental;
