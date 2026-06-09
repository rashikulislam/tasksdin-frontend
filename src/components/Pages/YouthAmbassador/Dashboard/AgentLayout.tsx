import React, { ReactNode } from "react";
import AgentPartnerSidebar from "./Navigation/AgentPartnerSidebar";
import { mockPartnerData } from "./Data/mockData";
import AgentNavbar from "./Navigation/AgentNavbar";
import AgentPartnerBottomNav from "./Navigation/AgentPartnerBottomNav";
import KycBanner from "@/components/Dashboard/Common/KycBanner";

interface AgentLayoutProps {
  children: ReactNode;
}

const AgentLayout: React.FC<AgentLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AgentPartnerSidebar partnerData={mockPartnerData} />
      <div className="flex-1 flex flex-col overflow-auto">
        <AgentNavbar />
        <main className="flex-1 p-4 bg-gray-50 overflow-auto pt-8 lg:pt-5 pb-20 lg:pb-0">
          <KycBanner kycPath="/dashboard/agent/kyc" />
          {children}
        </main>
      </div>
      <AgentPartnerBottomNav />
    </div>
  );
};

export default AgentLayout;
