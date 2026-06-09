"use client";

import HouseRentalHeader from "@/components/Dashboard/Consumer/HouseRental/DashboardContent/Navigation/HouseRentalHeader";
import { HouseRentalProvider } from "@/components/Dashboard/Consumer/HouseRental/contexts/HouseRentalContext";

export default function HouseRentalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HouseRentalProvider>
      <div className="min-h-screen bg-background">
        <HouseRentalHeader />

        {/* page content */}
        <div className="pt-20">{children}</div>
      </div>
    </HouseRentalProvider>
  );
}
