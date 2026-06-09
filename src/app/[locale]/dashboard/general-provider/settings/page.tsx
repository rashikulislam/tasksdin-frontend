"use client"
import UnskilledProviderSettings from "@/components/Dashboard/UnskilledProvider/DashboardContent/Settings";
import { useState } from "react";

export default function Page() {

  const [currentSection, setCurrentSection] = useState<string | null>(null);
  
    const handleBackToMain = () => {
      setCurrentSection(null);
    };
  return (
    <div className="pb-[65px]">
      <UnskilledProviderSettings onBack={handleBackToMain} />
    </div>
  );
}
