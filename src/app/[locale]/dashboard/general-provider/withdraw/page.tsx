import UnskilledQuickWithdraw from "@/components/Dashboard/UnskilledProvider/DashboardContent/QuickWithdraw";
import { mockStats } from "@/components/Dashboard/UnskilledProvider/Data/mockData";
import React from "react";

function Page() {
  return <UnskilledQuickWithdraw stats={mockStats} />;
}

export default Page;
