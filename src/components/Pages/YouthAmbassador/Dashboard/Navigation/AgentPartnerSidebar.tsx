"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import {
  BarChart3,
  Users,
  ClipboardList,
  DollarSign,
  Wallet,
  Sun,
  Moon,
  Languages,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";
import { PartnerData } from "../Data/types";
import { useTheme } from "next-themes";
import MobileMenu from "@/components/Dashboard/Consumer/LocalTasks/navigation/MobileMenu";
import { useIsMobile } from "@/hooks/use-mobile";

interface AgentPartnerSidebarProps {
  partnerData: PartnerData;
}

const navigationItems = [
  {
    id: "overview",
    label: "ওভারভিউ",
    icon: BarChart3,
    path: "/dashboard/agent",
  },
  {
    id: "bua-listing",
    label: "বুয়া তালিকা",
    icon: Users,
    path: "/dashboard/agent/bua-list",
  },
  {
    id: "bua-requests",
    label: "বুয়া রিকুয়েস্ট",
    icon: ClipboardList,
    path: "/dashboard/agent/bua-requests",
  },
  {
    id: "bua-contracts",
    label: "বুয়া চুক্তি",
    icon: ClipboardList,
    path: "/dashboard/agent/bua-contracts",
  },
  {
    id: "earnings",
    label: "আয়",
    icon: DollarSign,
    path: "/dashboard/agent/earnings",
  },
  {
    id: "withdraw",
    label: "উইথড্র",
    icon: Wallet,
    path: "/dashboard/agent/withdraw",
  },
];

const AgentPartnerSidebar: React.FC<AgentPartnerSidebarProps> = ({
  partnerData,
}) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  const locale = useLocale() as "en" | "bn";

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "bn" : "en";
    const currentPath = window.location.pathname + window.location.search;
    window.location.href = `/api/set-locale?locale=${newLocale}&redirect=${encodeURIComponent(currentPath)}`;
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div>
      {isMobile ? (
        <MobileMenu items={[]} />
      ) : (
        <div className="hidden lg:flex w-64 h-screen bg-card border-r border-border sticky top-0 flex-col">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
            <div className="mb-8">
              <h1 className="text-xl font-bold text-primary">Agent Partner</h1>
              <p className="text-sm text-muted-foreground">
                ব্যবসায়িক অংশীদার ড্যাশবোর্ড
              </p>
            </div>

            {/* User Info */}
            <div className="mb-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={partnerData.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {partnerData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{partnerData.name}</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                যোগদান: {partnerData.joinDate}
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Toggles */}
            <div className="border-t border-border mt-6 pt-4 flex flex-col gap-2">
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

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Languages className="h-4 w-4" />
                  ভাষা
                </span>
                <Toggle
                  pressed={locale === "bn"}
                  onPressedChange={toggleLanguage}
                  size="sm"
                  variant="outline"
                >
                  {locale === "bn" ? "EN" : "বাং"}
                </Toggle>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentPartnerSidebar;
