"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Handshake, MessageCircle, Home } from "lucide-react";
import { FaTasks } from "react-icons/fa";

const UnskilledProviderBottomNav = () => {
  const navItems = [
    {
      id: "dashboard",
      label: "হোম",
      iconName: Home,
      href: "/dashboard/general-provider",
    },
    {
      id: "tasks",
      label: "তালিকা",
      iconName: FaTasks,
      href: "/dashboard/general-provider/tasks-feed",
    },
    {
      id: "proposals",
      label: "প্রস্তাবনা",
      iconName: Handshake,
      href: "/dashboard/general-provider/proposals",
    },

    {
      id: "contracts",
      label: "চুক্তি",
      iconName: MessageCircle,
      href: "/dashboard/general-provider/contracts",
    },
    {
      id: "message",
      label: "মেসেজ",
      iconName: Handshake,
      href: "/dashboard/general-provider/messages",
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

export default UnskilledProviderBottomNav;
