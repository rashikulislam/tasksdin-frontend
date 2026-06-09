"use client";

import { useState } from "react";

const tabs = ["লোকাল কাজ", "বাসাবারা", "ফ্রিল্যান্স", "বুয়া"];

const ConsumerActivityPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <div>এখানে লোকাল কার্যকলাপ দেখানো হবে।</div>;
      case 1:
        return <div>এখানে কাজের কার্যকলাপ দেখানো হবে।</div>;
      case 2:
        return <div>এখানে ফ্রিল্যান্স কার্যকলাপ দেখানো হবে।</div>;
      case 3:
        return <div>এখানে বুয়া বাসাবারার কার্যকলাপ দেখানো হবে।</div>;
      default:
        return null;
    }
  };

  return (
    <div className="px-3 sm:p-4 max-w-3xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-2 sm:gap-3 mb-5 sm:mb-8 justify-center items-center pt-5">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(index)}
            className={`whitespace-nowrap px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-medium sm:font-semibold 
          text-sm transition-all duration-300
          ${
            activeTab === index
              ? "bg-[#3C83F6] text-white shadow-md sm:shadow-lg sm:scale-105"
              : "bg-white border text-gray-700"
          }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div
        className="bg-white shadow-sm sm:shadow-md rounded-lg sm:rounded-xl 
    p-4 sm:p-6 text-center text-gray-700 
    min-h-[140px] sm:min-h-[200px] 
    flex items-center justify-center 
    text-sm sm:text-lg transition-all duration-300"
      >
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ConsumerActivityPage;
