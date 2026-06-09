"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import useProviderVerified from "@/hooks/useProviderVerified";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import KycBanner from "@/components/Dashboard/Common/KycBanner";

const GeneralProviderLayout = ({ children }: { children: ReactNode }) => {
  const { loading, isVerified, status } = useProviderVerified();
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("con");
  const pathname = usePathname();
  const path = pathname === "/dashboard/general-provider/messages";
  return (
    <div
      className={`container ${isMobile && conversationId ? "" : "pt-[65px]"} ${path ? "" : "pb-10"}`}
    >
      <KycBanner kycPath="/dashboard/general-provider/kyc" />
      {children}
    </div>
  );
};

export default GeneralProviderLayout;
