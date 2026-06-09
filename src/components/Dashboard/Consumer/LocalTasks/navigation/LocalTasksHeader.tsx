"use client";
import { useEffect, useState } from "react";
import { Handshake, MessageCircle, House, Home } from "lucide-react";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { NavigationLinks } from "./NavigationLinks";
import { PostTaskButton } from "./PostTaskButton";
import { ThemeToggle } from "@/components/Reusable/ThemeToggle";
import UserProfileMenu from "@/components/Dashboard/Common/UserProfileMenu";
import NavLogo from "@/components/Shared/Navbar/NavLogo";
import MobileMenu from "./MobileMenu";
import LocationManage from "@/components/Dashboard/Common/LocationManage";

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

const LocalTasksHeader = ({
  user = {
    name: "রহিম আহমেদ",
    email: "rahim@example.com",
    avatar: "",
    activeContracts: 3,
    unreadMessages: 5,
  },
}: UserDashboardNavigationProps) => {
  const [isPostTaskOpen, setIsPostTaskOpen] = useState(false);

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
      id: "local",
      label: "লোকাল হেল্পার",
      icon: Handshake,
      href: "/dashboard/consumer/local-tasks",
    },
    {
      id: "contracts",
      label: "চুক্তি",
      icon: Handshake,
      href: "/dashboard/consumer/local-tasks/contracts",
    },
    {
      id: "posted",
      label: "পোস্টেড",
      icon: Handshake,
      href: "/dashboard/consumer/local-tasks/posted",
    },
    {
      id: "messages",
      label: "বার্তা",
      icon: MessageCircle,
      badge: user.unreadMessages,
      href: "/dashboard/consumer/local-tasks/messages",
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

      {/* ---------------- Post Task Modal ---------------- */}
      {/* <PostTaskModal
        isOpen={isPostTaskOpen}
        onClose={() => setIsPostTaskOpen(false)}
      /> */}

      {/* ---------------- Mobile Bottom Menu ---------------- */}
    </>
  );
};

export default LocalTasksHeader;
