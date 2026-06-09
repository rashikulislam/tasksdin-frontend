"use client";
import LocationManage from "@/components/Dashboard/Common/LocationManage";
import { logOutUserFromSystem } from "@/service/logOutUserFromSystem";
import { useRouter } from "next/navigation";
import React from "react";

const AgentNavbar = () => {
  const router = useRouter();
  const handleLogout = () => {
    logOutUserFromSystem();
    router.push("/");
  };
  return (
    <div className="bg-white py-3 pr-5 w-full shadow-lg border-b flex items-center justify-between">
      <LocationManage />
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-5 py-1.5 rounded text-sm font-medium hover:bg-white hover:text-red-500 duration-500 border-2 border-red-500"
      >
        Logout
      </button>
    </div>
  );
};

export default AgentNavbar;
