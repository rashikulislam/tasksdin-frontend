"use client";

import CommonDashboardFooter from "@/components/Dashboard/Common/CommonDashboardFooter";
import CommonDashboardHeader from "@/components/Dashboard/Common/CommonDashboardHeader";
import { ReactNode } from "react";
import { NotificationProvider } from "@/components/notifications/NotificationManager";
import { UserActivityTracker } from "@/utils/userActivityTracker";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <NotificationProvider>
      <div>
        <UserActivityTracker />
        <CommonDashboardHeader />
        <div>{children}</div>
        <CommonDashboardFooter />
      </div>
    </NotificationProvider>
  );
};

export default DashboardLayout;
