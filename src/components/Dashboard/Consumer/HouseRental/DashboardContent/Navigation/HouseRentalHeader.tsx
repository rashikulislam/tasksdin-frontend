"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MapPin,
  MessageCircle,
  Locate,
  Home,
  Calendar,
  Heart,
} from "lucide-react";

import { NotificationBell } from "@/components/notifications/NotificationBell";
import { ThemeToggle } from "@/components/Reusable/ThemeToggle";
import LanguageSwitcher from "@/components/Reusable/LanguageSwitcher";
import UserProfileMenu from "@/components/Dashboard/Common/UserProfileMenu";
import NavLogo from "@/components/Shared/Navbar/NavLogo";
import MobileMenu from "../../../LocalTasks/navigation/MobileMenu";
import { NavigationLinks } from "../../../LocalTasks/navigation/NavigationLinks";
import MobileBottomMenu from "../../../LocalTasks/navigation/MobileBottomMenu";
import { Button } from "@/components/ui/button";
import { useHouseRental } from "@/components/Dashboard/Consumer/HouseRental/contexts/HouseRentalContext";
import LocationManage from "@/components/Dashboard/Common/LocationManage";
import { FaTasks } from "react-icons/fa";

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

const HouseRentalHeader = ({
  onSectionChange,
  user = {
    name: "রহিম আহমেদ",
    email: "rahim@example.com",
    avatar: "",
    activeContracts: 3,
    unreadMessages: 5,
  },
}: UserDashboardNavigationProps) => {
  const pathname = usePathname();
  const { userLocation, isLoadingLocation, getUserLocation } = useHouseRental();

  // ✅ Hydration fix
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navigationItems = [
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
      href: "/dashboard/consumer/house-rental/bookings",
    },
    {
      id: "favourites",
      label: "পছন্দের তালিকা",
      icon: Heart,
      href: "/dashboard/consumer/house-rental/favorites",
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageCircle,
      badge: user.unreadMessages,
      href: "/dashboard/consumer/local-tasks/messages",
    },
  ];

  const currentItem = navigationItems.find((item) =>
    pathname.startsWith(item.href),
  );

  const activeSection = currentItem?.id || "find";

  return (
    <>
      {/* ---------------- Mobile Top Header ---------------- */}
      <div className="md:hidden">
        <MobileMenu user={user} items={[]} />
      </div>

      {/* ---------------- Desktop Header ---------------- */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <NavLogo />
            {navigationItems?.map((item) => (
              <NavigationLinks key={item?.id} item={item} />
            ))}

            {/* <Button
                variant="outline"
                size="sm"
                onClick={getUserLocation}
                disabled={isLoadingLocation}
                className="gap-2"
              >
                {isLoadingLocation ? (
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : userLocation ? (
                  <MapPin className="w-4 h-4 text-green-500" />
                ) : (
                  <Locate className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">
                  {userLocation ? "লোকেশন পাওয়া গেছে" : "লোকেশন নিন"}
                </span>
              </Button> */}
            <LocationManage />
            <ThemeToggle />
            {/* <LanguageSwitcher /> */}
            <NotificationBell />
            <UserProfileMenu
              menuItems={[
                {
                  icon: FaTasks,
                  label: "Local Tasks",
                  path: "/dashboard/consumer/local-tasks",
                },
              ]}
            />
          </div>
        </div>
      </nav>

      {/* ---------------- Mobile Bottom Menu ---------------- */}
      <div className="md:hidden">
        <MobileBottomMenu />
      </div>
    </>
  );
};

export default HouseRentalHeader;
