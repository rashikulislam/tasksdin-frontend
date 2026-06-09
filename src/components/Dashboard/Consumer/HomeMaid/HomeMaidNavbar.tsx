"use client";
import { useEffect, useState } from "react";
import { Handshake, MessageCircle, House, Home } from "lucide-react";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import UserProfileMenu from "@/components/Dashboard/Common/UserProfileMenu";
import NavLogo from "@/components/Shared/Navbar/NavLogo";

import LocationManage from "@/components/Dashboard/Common/LocationManage";
import MobileMenu from "../LocalTasks/navigation/MobileMenu";
import { NavigationLinks } from "../LocalTasks/navigation/NavigationLinks";

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

const HomeMaidNavbar = ({
  user = {
    name: "রহিম আহমেদ",
    email: "rahim@example.com",
    avatar: "",
    activeContracts: 3,
    unreadMessages: 5,
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
      id: "maid-hire",
      label: "বুয়া হায়ার",
      icon: Handshake,
      href: "/dashboard/consumer/maid-service",
    },
    {
      id: "booking-request",
      label: "বুকিং রিকুয়েস্ট",
      icon: Handshake,
      href: "/dashboard/consumer/maid-service/my-request",
    },
    {
      id: "maid-assign",
      label: "বুয়া অ্যাসাইন",
      icon: Handshake,
      href: "/dashboard/consumer/maid-service/assigned-maid",
    },
  ];

  return (
    <>
      {/* ---------------- Mobile Top Header ---------------- */}
      <div className="md:hidden">
        <MobileMenu
          user={user}
          items={[
            {
              id: "home",
              label: "হোম",
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
            {/* <PostTaskButton onClick={() => setIsPostTaskOpen(true)} /> */}
            {/* <ThemeToggle /> */}
            {/* <LanguageSwitcher /> */}
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

export default HomeMaidNavbar;
