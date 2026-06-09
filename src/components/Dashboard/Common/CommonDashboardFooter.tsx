"use client";

import { useEffect, useState } from "react";
import SkilledProviderFooter from "../SkilledProvider/SkilledProviderFooter";
import UnskilledProviderBottomNav from "../UnskilledProvider/Navigation/BottomNav";
import { getUserInformation } from "@/service/auth.services";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSearchParams } from "next/navigation";
import MobileBottomMenu from "../Consumer/LocalTasks/navigation/MobileBottomMenu";

enum USER_ROLE {
  NON_SKILL_PROVIDER = "NON_SKILL_PROVIDER",
  STANDARD_PROVIDER = "STANDARD_PROVIDER",
  CONSUMER = "CONSUMER",
}
const CommonDashboardFooter = () => {
  const [role, setRole] = useState<USER_ROLE | null>(null);
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();

  // ✅ Get a single query param
  const conversationId = searchParams.get("con");
  useEffect(() => {
    const fetchUserRole = async () => {
      const user = getUserInformation();
      setRole(user?.role as USER_ROLE);
    };

    fetchUserRole();
  }, []);

  if (!role) return null;

  let content;

  switch (role) {
    case USER_ROLE.NON_SKILL_PROVIDER:
      content = isMobile ? <UnskilledProviderBottomNav /> : null;
      break;
    case USER_ROLE.STANDARD_PROVIDER:
      content = <SkilledProviderFooter />;
      break;
    case USER_ROLE.CONSUMER:
      content = <MobileBottomMenu />;
      break;
    default:
      content = null;
      break;
  }
  if (isMobile && conversationId) return;
  return <>{content}</>;
};

export default CommonDashboardFooter;
