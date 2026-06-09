"use client"
import { mockPartnerData } from "@/components/Pages/YouthAmbassador/Dashboard/Data/mockData";
import ReferralsTab from "@/components/Pages/YouthAmbassador/Dashboard/ReferralsTab";
import React from "react";

function Referral() {
  const partnerData = mockPartnerData;
  return (
    <div>
      <ReferralsTab partnerData={partnerData} />
    </div>
  );
}

export default Referral;
