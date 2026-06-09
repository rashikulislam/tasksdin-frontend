"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSearchParams } from "next/navigation";
import KycBanner from "@/components/Dashboard/Common/KycBanner";

const ConsumerLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();

  // ✅ Get a single query param
  const conversationId = searchParams.get("con");
  return (
    <div
      className={`container ${isMobile && conversationId ? "" : "pt-[65px] pb-[85px] md:pb-0"} md:pb-0`}
    >
      <KycBanner kycPath="/dashboard/consumer/kyc" />
      {children}
    </div>
  );
};

export default ConsumerLayout;
