import { useSocketStore } from "@/lib/socketStore";
import { useEffect, useState } from "react";

interface UserStatusPayload {
  userId: string;
  status: "online" | "offline";
  last_online?: Date;
}

export const useUserStatus = (
  targetUserId?: string,
  currentStatus: "online" | "offline" = "offline",
  lastOnlineUser?: Date
) => {
  const { socket } = useSocketStore();

  const [activeStatus, setActiveStatus] = useState<"online" | "offline">(
    currentStatus
  );

  const [lastOnline, setLastOnline] = useState<Date | null>(
    lastOnlineUser ?? null
  );

  /* 🔹 Sync API changes */
  useEffect(() => {
    setActiveStatus(currentStatus);
    setLastOnline(lastOnlineUser ?? null);
  }, [currentStatus, lastOnlineUser]);

  /* 🔹 Socket listener */
  useEffect(() => {
    if (!socket || !targetUserId) return;

    const handleStatusUpdate = (payload: UserStatusPayload) => {
      if (payload.userId !== targetUserId) return;

      setActiveStatus(payload.status);
      if (payload.last_online) {
        setLastOnline(payload.last_online);
      }
    };

    socket.on("user-status", handleStatusUpdate);

    return () => {
      socket.off("user-status", handleStatusUpdate);
    };
  }, [socket, targetUserId]);

  return {
    activeStatus,
    lastOnline,
    userId: targetUserId,
  };
};
