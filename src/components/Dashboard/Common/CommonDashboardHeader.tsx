"use client";
import UnskilledProviderHeader from "../UnskilledProvider/Navigation/UnskilledProviderHeader";
import SkilledProviderHeader from "../SkilledProvider/SkilledProviderHeader";
import { getUserInformation } from "@/service/auth.services";
import { useSearchParams } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import ConsumerHeader from "../Consumer/ConsumerComponents/ConsumerHeader";

enum USER_ROLE {
  NON_SKILL_PROVIDER = "NON_SKILL_PROVIDER",
  STANDARD_PROVIDER = "STANDARD_PROVIDER",
  CONSUMER = "CONSUMER",
}

const CommonDashboardHeader = () => {
  const user = getUserInformation();
  const searchParams = useSearchParams();

  // ✅ Get a single query param
  const conversationId = searchParams.get("con");

  const isMobile = useIsMobile();

  if (!user?.role) return null;
  let content;
  switch (user?.role) {
    case USER_ROLE.NON_SKILL_PROVIDER:
      content = <UnskilledProviderHeader />;
      break;
    case USER_ROLE.STANDARD_PROVIDER:
      content = <SkilledProviderHeader />;
      break;
    case USER_ROLE.CONSUMER:
      content = <ConsumerHeader />;
      break;
    default:
      content = null;
      break;
  }
  if (isMobile && conversationId) return;
  return <>{content}</>;
};

export default CommonDashboardHeader;
