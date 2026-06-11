"use client";
import { useEffect, useState } from "react";
import {
  House,
  Home,
  Gift,
  Layers,
  Activity,
  ActivityIcon,
} from "lucide-react";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import LocationManage from "@/components/Dashboard/Common/LocationManage";
import MobileMenu from "../LocalTasks/navigation/MobileMenu";
import NavLogo from "@/components/Shared/Navbar/NavLogo";
import { NavigationLinks } from "../LocalTasks/navigation/NavigationLinks";
import UserProfileMenu from "../../Common/UserProfileMenu";
import { ThemeToggle } from "@/components/Reusable/ThemeToggle";
import LanguageSwitcher from "@/components/Reusable/LanguageSwitcher";

interface UserDashboardNavigationProps {
  onSectionChange?: (section: string) => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    activeContracts?: number;
    unreadMessages?: number;
  };
}

const ConsumerHeader = ({
  onSectionChange,
  user = {
    name: "",
    email: "",
    avatar: "",
    activeContracts: 0,
    unreadMessages: 0,
  },
}: UserDashboardNavigationProps) => {
  // ✅ Hydration fix
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navigationItems = [
    {
      id: "home",
      label: "হোম",
      icon: Home,
      href: "/dashboard/consumer",
    },
    {
      id: "offers",
      label: "অফারসমূহ",
      icon: Gift,
      href: "/dashboard/consumer/offers",
    },
    {
      id: "services",
      label: "সার্ভিসসমূহ",
      icon: Layers,
      href: "/dashboard/consumer/services",
    },
    {
      id: "activity",
      label: "কার্যকলাপ",
      icon: ActivityIcon,
      href: "/dashboard/consumer/activity",
    },
  ];

  return (
    <>
      {/* ---------------- Mobile Top Header ---------------- */}
      <div className="md:hidden">
        <MobileMenu user={user} items={[]} />
      </div>

      {/* ---------------- Desktop Header ---------------- */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center  justify-between h-16">
            <NavLogo />
            {navigationItems?.map((item) => (
              <NavigationLinks key={item?.id} item={item} />
            ))}

            <LocationManage />
            <ThemeToggle />
            <LanguageSwitcher />
            <NotificationBell />
            <UserProfileMenu
              menuItems={[
                {
                  icon: House,
                  label: "House Rent",
                  path: "/dashboard/consumer/house-rental",
                },
              ]}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default ConsumerHeader;
