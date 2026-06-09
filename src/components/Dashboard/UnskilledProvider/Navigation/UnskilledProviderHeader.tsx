"use client";
import { useEffect, useState } from "react";
import { Home, Handshake, MessageCircle } from "lucide-react";

import { NotificationBell } from "@/components/notifications/NotificationBell";
import { usePathname } from "next/navigation";
import UserProfileMenu from "../../Common/UserProfileMenu";
import LocationManage from "../../Common/LocationManage";
import { FaTasks } from "react-icons/fa";
import { NavigationLinks } from "../../Consumer/LocalTasks/navigation/NavigationLinks";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileMenu from "../../Consumer/LocalTasks/navigation/MobileMenu";

const navigationItems = [
  {
    id: "dashboard",
    label: "হোম",
    icon: Home,
    href: "/dashboard/general-provider",
  },
  {
    id: "tasks",
    label: "কাজের তালিকা",
    icon: FaTasks,
    href: "/dashboard/general-provider/tasks-feed",
  },
  {
    id: "pros",
    label: "প্রস্তাবনা",
    icon: Handshake,
    href: "/dashboard/general-provider/proposals",
  },
  {
    id: "contracts",
    label: "চুক্তি",
    icon: Handshake,
    href: "/dashboard/general-provider/contracts",
  },

  {
    id: "messages",
    label: "মেসেজবক্স",
    icon: MessageCircle,
    href: "/dashboard/general-provider/messages",
  },
];

export default function UnskilledProviderHeader() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Restrict header on certain paths
  const restrictedPaths = [
    "/dashboard/general-provider/verification",
    "/dashboard/general-provider/verification",
  ];
  if (restrictedPaths.includes(pathname)) return null;

  return (
    <div>
      {isMobile ? (
        <MobileMenu
          items={[
            {
              id: "home",
              label: "PROVIDER",
              href: "/dashboard/consumer/local-tasks",
            },
            {
              id: "contracts",
              label: "চুক্তি",
              href: "/dashboard/consumer/local-tasks/contracts",
            },
            {
              id: "messages",
              label: "বার্তা",
              href: "/dashboard/consumer/local-tasks/messages",
            },
            {
              id: "notifications",
              label: "বিজ্ঞপ্তি",
              href: "/dashboard/consumer/local-tasks/notifications",
            },
          ]}
        />
      ) : (
        <div className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between p-4 container">
            <h1 className="text-2xl font-semibold">Logo</h1>

            {navigationItems?.map((item) => (
              <NavigationLinks key={item?.id} item={item} />
            ))}
            <LocationManage />
            <NotificationBell />
            <UserProfileMenu menuItems={[]} />
          </div>
        </div>
      )}
    </div>
  );
}
