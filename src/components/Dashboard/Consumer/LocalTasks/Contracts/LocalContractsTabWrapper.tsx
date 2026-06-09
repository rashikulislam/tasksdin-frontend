"use client";
import { useState } from "react";
import ActiveContracts from "./ContractsTab/ActiveContracts";
import CompleteContracts from "./ContractsTab/CompleteContracts";

type TTab = {
  key: string;
  label: string;
};

export default function LocalContractsTabWrapper() {
  const tabs = [
    { key: "active", label: "চলমান কাজ" },
    { key: "completed", label: "সম্পন্ন কাজ" },
  ];

  const [selectedTab, setSelectedTab] = useState<"active" | "completed">(
    "active",
  );

  let content;
  switch (selectedTab) {
    case "active":
      content = <ActiveContracts />;
      break;
    case "completed":
      content = <CompleteContracts />;
      break;
    default:
      content = null;
  }

  return (
    <div className="w-full">
      {/* Fixed Tabs Header */}
      <div className="sticky top-[64px] z-30 w-full bg-[#F9F9FA] border-b border-gray-300 ">
        <div className="container mx-auto flex">
          {tabs.map((tab: TTab) => (
            <div
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as "active" | "completed")}
              className={`relative cursor-pointer flex-1 text-center py-4 px-2 sm:px-4 transition-colors duration-200
                ${selectedTab === tab.key ? "text-primary font-semibold" : "text-gray-600 hover:text-gray-800"}`}
            >
              {tab.label}

              {/* Active underline */}
              {selectedTab === tab.key && (
                <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-primary rounded-full"></span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="pt-5  mx-auto space-y-6 pb-0 md:pb-10">{content}</div>
    </div>
  );
}
