"use client";

import LiveInPlan from "@/components/Dashboard/Consumer/HomeMaid/HomeMaidHireForom/LiveInPlan";
import MonthlyForm from "@/components/Dashboard/Consumer/HomeMaid/HomeMaidHireForom/MonthlyForm";
import CustomTabs from "@/components/Reusable/CustomTabs";
import React, { ReactNode, useState } from "react";

function MaidHireForm() {
  const tabs = [
    { key: "monthly", label: "মাসিক" },
    { key: "livein", label: "লাইভ-ইন" },
  ];

  type ContractTabType = (typeof tabs)[number]["key"];
  const [selectedTab, setSelectedTab] = useState<ContractTabType>("monthly");

  let content: ReactNode;
  switch (selectedTab) {
    case "monthly":
      content = <MonthlyForm />;
      break;
    case "livein":
      content = <LiveInPlan />;
      break;
    default:
      break;
  }
  return (
    <div className="container">
      <CustomTabs
        tabs={tabs}
        selectedTab={selectedTab}
        onChange={setSelectedTab}
      />

      <div className="pt-5">{content}</div>
    </div>
  );
}

export default MaidHireForm;
