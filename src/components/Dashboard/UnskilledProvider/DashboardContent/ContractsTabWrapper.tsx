"use client";

import { useState } from "react";
import UnskilledProviderContracts from "./Contracts";
import CompleteTasksProvider from "./CompleteTasksProvider";

type TTabKey = "active" | "completed";

type TTab = {
  key: TTabKey;
  label: string;
};

const UnskilledContractsTabWrapper = () => {
  const tabs: TTab[] = [
    { key: "active", label: "চলমান কাজ" },
    { key: "completed", label: "সম্পন্ন কাজ" },
  ];

  const [selectedTab, setSelectedTab] = useState<TTabKey>("active");

  let content;
  switch (selectedTab) {
    case "active":
      content = <UnskilledProviderContracts />;
      break;
    case "completed":
      content = <CompleteTasksProvider />;
      break;
    default:
      content = null;
  }

  return (
    <div className="w-full">
      {/* Tabs Header */}
      <div className="sticky top-[64px] z-30 w-full bg-[#F9F9FA] border-b border-gray-300">
        <div className="container mx-auto flex">
          {tabs.map((tab) => (
            <div
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={`relative cursor-pointer flex-1 text-center py-4 px-2 transition-colors
                ${
                  selectedTab === tab.key
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-gray-800"
                }`}
            >
              {tab.label}

              {selectedTab === tab.key && (
                <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-primary rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="pt-5 mx-auto pb-10 lg:pb-0">{content}</div>
    </div>
  );
};

export default UnskilledContractsTabWrapper;
