"use client";
import LocalTasksHeader from "@/components/Dashboard/Consumer/LocalTasks/navigation/LocalTasksHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSearchParams } from "next/navigation";

import { ReactNode } from "react";

const LocalTaskLayout = ({ children }: { children: ReactNode }) => {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();

  // ✅ Get a single query param
  const conversationId = searchParams.get("con");

  return (
    <>
      {isMobile && conversationId ? "" : <LocalTasksHeader />}

      {children}
    </>
  );
};

export default LocalTaskLayout;
