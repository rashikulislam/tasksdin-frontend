"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MessagePageChatArea from "./MessagePageChatArea";
import MessagePageSidebar from "./MessagePageSidebar";
import RightSideProfile from "./RightSideProfile";
import { getUserInformation } from "@/service/auth.services";

const DashboardMessagePage = ({
  conversationId,
}: {
  conversationId?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const conFromQuery = searchParams.get("con");
  const finalConversationId = conversationId || conFromQuery || null;

  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  // Load ID from URL
  useEffect(() => {
    if (finalConversationId) {
      setSelectedConversationId(finalConversationId);
    }
  }, [finalConversationId]);

  // FIX: Remove
  const handleBack = () => {
    setSelectedConversationId(null);

    const url = new URL(window.location.href);
    url.searchParams.delete("con");
    router.replace(url.pathname);
  };

  const user = getUserInformation();

  return (
    <div className="flex gap-5 h-screen lg:h-[calc(100vh-65px)] w-full overflow-hidden  md:pb-0 lg:pb-0 ">
      {/* LEFT SIDEBAR */}
      <div
        className={`
          ${selectedConversationId ? "hidden" : "flex"}
          lg:flex
          w-full lg:w-80 h-full flex-col shrink-0  
        `}
      >
        <MessagePageSidebar />
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 h-full flex w-full  ">
        {selectedConversationId ? (
          <MessagePageChatArea
            conversationId={selectedConversationId}
            onBack={handleBack}
          />
        ) : (
          <p className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-300">
            Select a conversation to start messaging
          </p>
        )}
      </div>

      {/* RIGHT PROFILE ONLY DESKTOP */}
      {selectedConversationId && user?.role === "CONSUMER" && (
        <div className="hidden lg:block w-80 shrink-0 ">
          <RightSideProfile conversationId={selectedConversationId} />
        </div>
      )}
    </div>
  );
};

export default DashboardMessagePage;
// onSelect={(id) => {
//             setSelectedConversationId(id);

//             // Update URL
//             const url = new URL(window.location.href);
//             url.searchParams.set("con", id);
//             router.replace(url.toString());
//           }}
