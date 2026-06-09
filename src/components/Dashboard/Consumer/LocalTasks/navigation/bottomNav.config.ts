export type BottomNavItem = {
  id: string;
  label: string;
  iconName: string;
  href: string;
};

export const bottomNavConfig: Record<string, BottomNavItem[]> = {
  "/dashboard/consumer": [
    {
      id: "home",
      label: "হোম",
      iconName: "User",
      href: "/dashboard/consumer",
    },
    // {
    //   id: "orders",
    //   label: "অর্ডার",
    //   iconName: "Handshake",
    //   href: "/dashboard/consumer",
    // },
    {
      id: "offers",
      label: "অফার",
      iconName: "Gift",
      href: "/dashboard/consumer/offers",
    },
    {
      id: "activity",
      label: "এক্টিভিটি",
      iconName: "Handshake",
      href: "/dashboard/consumer/activity",
    },

    {
      id: "messages",
      label: "বার্তা",
      iconName: "MessageCircle",
      href: "/dashboard/consumer/messages",
    },
  ],

  "/dashboard/consumer/local-tasks": [
    {
      id: "home",
      label: "হোম",
      iconName: "User",
      href: "/dashboard/consumer",
    },
    {
      id: "local",
      label: "লোকাল",
      iconName: "Gift",
      href: "/dashboard/consumer/local-tasks",
    },
    {
      id: "activity",
      label: "চুক্তি",
      iconName: "Gift",
      href: "/dashboard/consumer/local-tasks/contracts",
    },

    {
      id: "posted",
      label: "পোস্টেড",
      iconName: "Gift",
      href: "/dashboard/consumer/local-tasks/posted",
    },

    {
      id: "messages",
      label: "বার্তা",
      iconName: "MessageCircle",
      href: "/dashboard/consumer/local-tasks/messages",
    },
  ],
  "/dashboard/consumer/maid-service": [
    {
      id: "home",
      label: "হোম",
      iconName: "User",
      href: "/dashboard/consumer",
    },

    {
      id: "bookings",
      label: "হায়ার",
      iconName: "ClipboardList",
      href: "/dashboard/consumer/maid-service",
    },
    {
      id: "contract",
      label: "বুকিং",
      iconName: "Gift",
      href: "/dashboard/consumer/maid-service/my-request",
    },
    {
      id: "payment",
      label: "অ্যাসাইন",
      iconName: "DollarSign",
      href: "/dashboard/consumer/maid-service/assigned-maid",
    },
  ],
};
