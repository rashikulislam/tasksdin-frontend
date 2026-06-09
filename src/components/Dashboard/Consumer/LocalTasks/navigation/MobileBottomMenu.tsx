"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { User, Handshake, Gift, MessageCircle, LucideIcon } from "lucide-react";
import { bottomNavConfig } from "./bottomNav.config";

const iconMap: Record<string, LucideIcon> = {
  User,
  Handshake,
  Gift,
  MessageCircle,
};

const MobileBottomMenu = () => {
  const pathname = usePathname();

  // 🔑 match parent route
  const matchedKey = Object.keys(bottomNavConfig)
    .sort((a, b) => b.length - a.length)
    .find((route) => pathname === route || pathname.startsWith(route + "/"));
  if (!matchedKey) return null;
  const navItems = bottomNavConfig[matchedKey];
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around px-1 py-1">
        {navItems.map(({ id, label, href, iconName }) => {
          const Icon = iconMap[iconName] || User;
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

export default MobileBottomMenu;
