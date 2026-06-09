"use client";

import BuaAreasWorked from "@/components/Pages/YouthAmbassador/Dashboard/AgentPartnerBuaDetails/BuaAreasWorked";
import BuaAttendance from "@/components/Pages/YouthAmbassador/Dashboard/AgentPartnerBuaDetails/BuaAttendance";
import BuaHeader from "@/components/Pages/YouthAmbassador/Dashboard/AgentPartnerBuaDetails/BuaHeader";
import BuaHousesWorked from "@/components/Pages/YouthAmbassador/Dashboard/AgentPartnerBuaDetails/BuaHousesWorked";
import BuaProfileCard from "@/components/Pages/YouthAmbassador/Dashboard/AgentPartnerBuaDetails/BuaProfileCard";
import BuaSkills from "@/components/Pages/YouthAmbassador/Dashboard/AgentPartnerBuaDetails/BuaSkills";

export default function AgentBuaDetailsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <BuaHeader />

      {/* Profile */}
      <BuaProfileCard />

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <BuaAreasWorked />
          <BuaSkills />
          <BuaAttendance />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <BuaHousesWorked />
        </div>
      </div>
    </div>
  );
}
