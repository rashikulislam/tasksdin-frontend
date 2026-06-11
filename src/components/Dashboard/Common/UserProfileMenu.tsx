"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";

import { useSocketStore } from "@/lib/socketStore";
import { logOutUserFromSystem } from "@/service/logOutUserFromSystem";
import { getUserInformation } from "@/service/auth.services";
import { useGetMyProfileQuery } from "@/redux/features/auth.features";
import { ThemeToggle } from "@/components/Reusable/ThemeToggle";

import { LogOut, User, CreditCard, Settings, Languages } from "lucide-react";
import { FiChevronDown } from "react-icons/fi";
import { IconType } from "react-icons/lib";

type MenuItem = {
  label: string;
  path: string;
  icon: IconType;
};

type UserProfileMenuProps = {
  menuItems?: MenuItem[];
};

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({ menuItems = [] }) => {
  const { disconnect } = useSocketStore();
  const t = useTranslations("Dashboard.NonSkilledProvider.Header.profileOptions");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const userInfo = getUserInformation();
  const { data: profileData } = useGetMyProfileQuery(undefined);

  const name: string = profileData?.data?.full_name ?? userInfo?.email ?? "User";
  const avatar: string = profileData?.data?.profile_img ?? "";

  // Derive base path from role for static links
  const roleBasePath: Record<string, string> = {
    CONSUMER: `/${locale}/dashboard/consumer`,
    NON_SKILL_PROVIDER: `/${locale}/dashboard/general-provider`,
    PROMOTER: `/${locale}/dashboard/agent`,
    ADMIN: `/${locale}/dashboard/admin`,
    SUPER_ADMIN: `/${locale}/dashboard/admin`,
  };
  const basePath = roleBasePath[userInfo?.role ?? ""] ?? `/${locale}/dashboard/consumer`;

  const handleLogout = () => {
    logOutUserFromSystem();
    disconnect();
    setTimeout(() => {
      router.replace("/auth/sign-in");
    }, 500);
  };

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "bn" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <button className="flex items-center px-1 py-1 rounded-md text-sm font-medium text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none transition-colors group">
          <Avatar className="h-7 w-7">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <span className="max-w-[120px] truncate text-[15px] ml-1.5 pt-0.5">
            {name}
          </span>

          <FiChevronDown className="h-4 w-4 text-gray-400 transition-transform group-data-[state=open]:rotate-180 ml-1" />
        </button>
      </DropdownMenuTrigger>

      {/* Content */}
      <DropdownMenuContent align="end" className="w-72 rounded-lg border bg-card p-1 shadow-md">
        {/* User info */}
        <div className="flex items-center gap-3 px-3 py-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">{name}</span>
            <span className="text-xs text-muted-foreground">{userInfo?.email}</span>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Language & Theme toggles — inline, non-dismissing */}
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-sm text-muted-foreground flex items-center gap-2">
            <Languages className="h-4 w-4" />
            {locale === "bn" ? "ভাষা" : "Language"}
          </span>
          <Toggle
            pressed={locale === "bn"}
            onPressedChange={toggleLanguage}
            variant="outline"
            size="sm"
            onClick={(e) => e.stopPropagation()}
            className="h-7 text-xs bg-slate-800/10 hover:bg-slate-800/20 data-[state=on]:bg-slate-800 data-[state=on]:text-white border-slate-300 dark:border-slate-700"
            aria-label="Toggle language"
          >
            {locale === "bn" ? "EN" : "বাং"}
          </Toggle>
        </div>

        <div
          className="flex items-center justify-between px-3 py-2"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-sm text-muted-foreground">
            {locale === "bn" ? "থিম" : "Theme"}
          </span>
          <ThemeToggle />
        </div>

        <DropdownMenuSeparator />

        {/* Dynamic extra items */}
        {menuItems.map(({ label, path, icon: Icon }, idx) => (
          <Link href={path} key={idx}>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm outline-none cursor-pointer">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <span>{label}</span>
            </DropdownMenuItem>
          </Link>
        ))}

        {/* Static: Profile, Payment, Settings */}
        <Link href={`${basePath}/profile`}>
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm outline-none cursor-pointer">
            <User className="h-4 w-4 text-muted-foreground" />
            {t("profile")}
          </DropdownMenuItem>
        </Link>

        <Link href={`${basePath}/payments`}>
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm outline-none cursor-pointer">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            {t("payment")}
          </DropdownMenuItem>
        </Link>

        <Link href={`${basePath}/settings`}>
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm outline-none cursor-pointer">
            <Settings className="h-4 w-4 text-muted-foreground" />
            {t("settings")}
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm outline-none cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileMenu;
