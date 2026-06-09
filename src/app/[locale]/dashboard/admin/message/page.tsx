import DashboardMessagePage from "@/components/Pages/DashboardPages/Message/DashboardMessagePage";
import React from "react";
interface SearchParams {
  con?: string;
}

interface MessengerPageProps {
  searchParams: Promise<SearchParams>;
}
const page = async ({ searchParams }: MessengerPageProps) => {
  const { con } = await searchParams;
  return (
    <div>
      <DashboardMessagePage conversationId={con!} />
    </div>
  );
};

export default page;
