"use client";
import { useSocketStore } from "@/lib/socketStore";
import { getUserInformation } from "@/service/auth.services";
import { useEffect } from "react";

export const UserActivityTracker = () => {
  const user = getUserInformation();
  const { socket } = useSocketStore();
  const user_id = user?.user_id;

  useEffect(() => {
    if (!user_id) return;

    // Notify backend that user joined
    socket?.emit("user-join", user_id);

    // Function to send user activity to backend
    const handleActivity = () => {
      socket?.emit("user-activity", user_id);
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      // DON'T disconnect socket here, we want live updates for friends
    };
  }, [user_id, socket]);

  return null;
};
