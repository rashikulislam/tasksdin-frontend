"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BarChart3, Users, ClipboardList, Wallet } from "lucide-react";

const AgentPartnerBottomNav = () => {
  const navItems = [
    {
      id: "overview",
      label: "ওভারভিউ",
      iconName: BarChart3,
      href: "/dashboard/agent",
    },
    {
      id: "bua-listing",
      label: "বুয়া তালিকা",
      iconName: Users,
      href: "/dashboard/agent/bua-list",
    },
    {
      id: "bua-requests",
      label: "রিকুয়েস্ট",
      iconName: ClipboardList,
      href: "/dashboard/agent/bua-requests",
    },
    {
      id: "withdraw",
      label: "উইথড্র",
      iconName: Wallet,
      href: "/dashboard/agent/withdraw",
    },
  ];

  const pathname = usePathname();

  const restrictedPaths = [
    "/dashboard/general-provider/verification",
    "/dashboard/general-provider/verification",
  ];

  if (restrictedPaths.includes(pathname)) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around px-1 py-1">
        {navItems.map(({ id, label, href, iconName }) => {
          const Icon = iconName;
          const isActive = pathname === href;

          return (
            <Link
              key={id}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg min-w-[60px]",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AgentPartnerBottomNav;
