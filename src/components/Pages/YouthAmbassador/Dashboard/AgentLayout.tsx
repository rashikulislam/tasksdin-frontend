"use client";
import React, { ReactNode } from "react";
import AgentPartnerSidebar from "./Navigation/AgentPartnerSidebar";
import { mockPartnerData } from "./Data/mockData";
import AgentNavbar from "./Navigation/AgentNavbar";
import AgentPartnerBottomNav from "./Navigation/AgentPartnerBottomNav";
import KycBanner from "@/components/Dashboard/Common/KycBanner";
import { useGetMyProfileQuery } from "@/redux/features/auth.features";

const BENGALI_MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল",
  "মে", "জুন", "জুলাই", "আগস্ট",
  "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

const toBengaliDigits = (n: number) =>
  n.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

function formatBengaliDate(iso: string) {
  const d = new Date(iso);
  return `${toBengaliDigits(d.getDate())} ${BENGALI_MONTHS[d.getMonth()]}, ${toBengaliDigits(d.getFullYear())}`;
}

interface AgentLayoutProps {
  children: ReactNode;
}

const AgentLayout: React.FC<AgentLayoutProps> = ({ children }) => {
  const { data } = useGetMyProfileQuery(undefined);
  const profile = data?.data;

  const partnerData = {
    ...mockPartnerData,
    name: profile?.full_name ?? mockPartnerData.name,
    avatar: profile?.profile_img ?? mockPartnerData.avatar,
    joinDate: profile?.created_at
      ? formatBengaliDate(profile.created_at)
      : mockPartnerData.joinDate,
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AgentPartnerSidebar partnerData={partnerData} />
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
