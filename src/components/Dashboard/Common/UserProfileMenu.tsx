"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useSocketStore } from "@/lib/socketStore";
import { logOutUserFromSystem } from "@/service/logOutUserFromSystem";

import { Home, LogOut } from "lucide-react";
import { FiChevronDown } from "react-icons/fi";
import { MdSettings } from "react-icons/md";
import { IconType } from "react-icons/lib";

type MenuItem = {
  label: string;
  path: string;
  icon: IconType;
};

type UserProfileMenuProps = {
  menuItems: MenuItem[];
  user?: {
    name: string;
    avatar?: string;
  };
};

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  menuItems,
  user = {
    name: "রহিম আহমেদ",
    avatar: "",
  },
}) => {
  const { disconnect } = useSocketStore();
  const t = useTranslations(
    "Dashboard.NonSkilledProvider.Header.profileOptions"
  );
  const locale = useLocale();
  const router = useRouter();

  const handleLogout = () => {
    logOutUserFromSystem();
    disconnect();
    setTimeout(() => {
      router.replace(`/${locale}/auth/sign-in`);
    }, 500);
  };

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <button
          className="
            flex items-center
            px-1 py-1
            rounded-md
            text-sm font-medium
            text-gray-800
            hover:bg-gray-100
            focus:outline-none
            transition-colors
            group
          "
        >
          <Avatar className="h-7 w-7">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground ">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <span className="max-w-[120px] truncate text-[16px] ml-1 pt-0.5">
            {user.name}
          </span>

          <FiChevronDown
            className="
              h-5 w-5 text-gray-400
              transition-transform
              group-data-[state=open]:rotate-180
            ml-1"
          />
        </button>
      </DropdownMenuTrigger>

      {/* Content */}
      <DropdownMenuContent
        align="start"
        className="w-72 rounded-lg border bg-card p-1 shadow-md"
      >
        {/* User info */}
        <div className="flex items-center gap-3 px-3 py-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">View profile</span>
          </div>
        </div>

        <DropdownMenuSeparator />
        {/* Dynamic menu items */}
        {menuItems.map(({ label, path, icon: Icon }, idx) => (
          <Link href={path} key={idx}>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm outline-none  cursor-pointer">
              <Icon className="h-4 w-4 text-muted-foreground " />
              <span>{label}</span>
            </DropdownMenuItem>
          </Link>
        ))}

        {/* Static actions */}
        <Link href="/dashboard/consumer/local-tasks/profile">
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm  outline-none  cursor-pointer">
            <Home className="h-4 w-4" />
            {t("profile")}
          </DropdownMenuItem>
        </Link>

        <Link href="/dashboard/consumer/local-tasks/payments">
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm outline-none  cursor-pointer">
            <MdSettings className="h-4 w-4" />
            Payments
          </DropdownMenuItem>
        </Link>

        <Link href="/dashboard/consumer/local-tasks/settings">
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm outline-none  cursor-pointer">
            <MdSettings className="h-4 w-4" />
            {t("settings")}
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="
            flex items-center gap-2
            px-3 py-2 text-sm outline-none  cursor-pointer
            text-red-600
            focus:text-red-600
          "
        >
          <LogOut className="h-4 w-4" />
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileMenu;
