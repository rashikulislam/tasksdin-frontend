"use client"
import { mockPartnerData, mockReferralHistory } from "@/components/Pages/YouthAmbassador/Dashboard/Data/mockData";
import EarningsTab from "@/components/Pages/YouthAmbassador/Dashboard/EarningsTab";
import React from "react";

function Earnings() {
  const partnerData = mockPartnerData;
  const referralHistory = mockReferralHistory;
  return (
    <div>
      <EarningsTab
        partnerData={partnerData}
        referralHistory={referralHistory}
      />
    </div>
  );
}

export default Earnings;
