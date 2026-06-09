"use client"
import UnskilledProviderProfile from "@/components/Dashboard/UnskilledProvider/DashboardContent/Profile";
import { useState } from "react";

export default function ProfilePage() {
const [currentSection, setCurrentSection] = useState<string | null>(null);

  const handleBackToMain = () => {
    setCurrentSection(null);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl pb-[65px]">
      <UnskilledProviderProfile onBack={handleBackToMain}
      />
    </div>
  );
}