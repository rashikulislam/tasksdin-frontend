"use client";

import React from "react";

export type TabItem<T extends string> = {
  key: T;
  label: string;
};

type Props<T extends string> = {
  tabs: TabItem<T>[];
  selectedTab: T;
  onChange: (key: T) => void;
};

export default function CustomTabs<T extends string>({
  tabs,
  selectedTab,
  onChange,
}: Props<T>) {
  return (
    <div className="w-full sticky top-[64px] z-30 ">
      <div className="w-full bg-[#F9F9FA] border-b border-gray-300">
        <div className="container mx-auto flex">
          {tabs.map((tab) => (
            <div
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`relative cursor-pointer flex-1 text-center py-4 px-2 sm:px-4 transition-colors duration-200
                ${
                  selectedTab === tab.key
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-gray-800"
                }`}
            >
              {tab.label}

              {selectedTab === tab.key && (
                <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-primary rounded-full"></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
