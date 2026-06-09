"use client";
import { useSocketStore } from "@/lib/socketStore";
import { getUserInformation } from "@/service/auth.services";
import { ReactNode, useEffect } from "react";

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { connect } = useSocketStore();
  const user = getUserInformation();
  useEffect(() => {
    if (user?.user_id) {
      connect(user?.user_id);
    } else {
    }
  }, [connect, user?.user_id]);

  return <>{children}</>;
};

export default SocketProvider;
