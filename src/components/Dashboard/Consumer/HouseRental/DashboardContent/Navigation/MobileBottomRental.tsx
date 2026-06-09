"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { MessageCircle, Bell, Calendar, Heart, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { HouseRentalNavigationProps } from "../../data/mockHouseData";

const MobileBottomRental = ({
  activeTab: externalActiveTab,
  onTabChange,
  onPostTaskClick,
}: HouseRentalNavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [internalActiveTab, setInternalActiveTab] = useState("dashboard");

  const activeTab = externalActiveTab || internalActiveTab;

  const navItems = [
    {
      id: "find",
      label: "বাসা খুঁজুন",
      icon: Home,
      href: "/dashboard/consumer/house-rental",
    },
    {
      id: "bookings",
      label: "আমার বুকিং",
      icon: Calendar,
      href: "/dashboard/consumer/local-tasks/contracts",
    },
    {
      id: "favorites",
      label: "পছন্দের তালিকা",
      icon: Heart,
      href: "/dashboard/consumer/freelancer",
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageCircle,
      href: "/dashboard/consumer/local-tasks/messages",
    },
    { id: "notifications", label: "Notifications", icon: Bell, href: "" },
  ];

  const handleTabChange = (tabId: string, href?: string) => {
    setInternalActiveTab(tabId);
    onTabChange?.(tabId);

    if (tabId === "post" && onPostTaskClick) {
      onPostTaskClick();
      return;
    }

    if (href) {
      router.push(href);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab === item.id ||
            (item.href && pathname.startsWith(item.href));

          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id, item.href)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[60px]",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                item.id === "post" &&
                  "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 mb-1",
                  isActive ? "text-primary" : "",
                  item.id === "post" && "text-primary-foreground"
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive ? "text-primary" : "",
                  item.id === "post" && "text-primary-foreground"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomRental;
