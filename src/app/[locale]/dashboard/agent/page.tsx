"use client";
import {
  mockBuaHireRequests,
  mockListedBuas,
  mockPartnerData,
} from "@/components/Pages/YouthAmbassador/Dashboard/Data/mockData";
import { BuaHireRequestData, ListedBua } from "@/components/Pages/YouthAmbassador/Dashboard/Data/types";
import OverviewTab from "@/components/Pages/YouthAmbassador/Dashboard/OverviewTab";
import React, { useState } from "react";

function Overview() {
  const [listedBuas, setListedBuas] = useState<ListedBua[]>(mockListedBuas);
  const [buaHireRequests] = useState<BuaHireRequestData[]>(mockBuaHireRequests);
  const [showBuaListingForm, setShowBuaListingForm] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<BuaHireRequestData | null>(null);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
  const partnerData = mockPartnerData;

  const openAssignModal = (request: BuaHireRequestData) => {
    setSelectedRequest(request);
    setShowAssignModal(true);
  };
  return (
    <div>
      <OverviewTab
        partnerData={partnerData}
        listedBuas={listedBuas}
        buaHireRequests={buaHireRequests}
        setActiveTab={setActiveTab}
        setShowBuaListingForm={setShowBuaListingForm}
        openAssignModal={openAssignModal}
      />
    </div>
  );
}

export default Overview;
