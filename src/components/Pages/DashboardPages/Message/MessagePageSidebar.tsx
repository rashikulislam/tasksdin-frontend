"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetConversationsQuery } from "@/redux/features/conversation";
import { Skeleton } from "@/components/ui/skeleton";
import ShowSidebarPeoples from "./ShowSidebarPeoples";
import { useEffect, useState } from "react";
import { useSocketStore } from "@/lib/socketStore";

/* ================= TYPES ================= */

export interface IUserInfo {
  full_name: string;
  profile_img: string;
  email: string;
  role?: string;
  is_online: boolean;
  last_online: Date;
  user_id: string;
}

export interface IMessage {
  text: string;
  created_at?: string;
}

export interface IConversation {
  conversation_id: string;
  last_message: IMessage;
  conversation: IUserInfo;
}

/* ================= COMPONENT ================= */

const MessagePageSidebar = () => {
  const { isLoading, data } = useGetConversationsQuery(undefined);
  const { messages } = useSocketStore();
  const [search, setSearch] = useState<string>("");
  const [conversations, setConversations] = useState<IConversation[]>([]);

  /* ================= 1️⃣ INITIAL LOAD FROM API ================= */
  useEffect(() => {
    if (!data?.data) return;

    const sorted = [...data.data].sort((a, b) => {
      const tA = new Date(a?.last_message?.created_at || 0).getTime();
      const tB = new Date(b?.last_message?.created_at || 0).getTime();
      return tB - tA;
    });

    setConversations(sorted);
  }, [data]);

  /* ================= 2️⃣ SOCKET MESSAGE UPDATE ================= */
  useEffect(() => {
    if (!messages?.length) return;

    const lastMessage = messages[messages.length - 1];

    setConversations((prev) => {
      if (!prev.length) return prev;

      const index = prev.findIndex(
        (c) => c.conversation_id === lastMessage.conversationId
      );

      // If conversation not found, keep state as is
      if (index === -1) return prev;

      const updatedConversation: IConversation = {
        ...prev[index],
        last_message: {
          text: lastMessage.text,
          created_at: lastMessage.created_at,
        },
      };

      // Remove old item and move updated one to top
      const rest = prev.filter((_, i) => i !== index);

      return [updatedConversation, ...rest];
    });
  }, [messages?.length, messages]);

  /* ================= UI ================= */
  const filtering = conversations?.filter((item) =>
    item?.conversation?.full_name?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div
      className="
        flex flex-col h-screen bg-card
        overflow-y-scroll custom-scrollbar
        md:mb-[30px] lg:mb-0
        md:rounded-b-xl lg:rounded-b-xl
        shadow-[10px_10px_30px_rgba(0,0,0,0.02)]
        dark:shadow-[inset_0_10px_100px_rgba(255,255,255,0.06)]
        backdrop-blur-sm
      "
    >
      {/* Search */}
      <div className="p-3 flex-shrink-0">
        <Input
          placeholder="Search chats..."
          className="w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Conversation list */}
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {isLoading
            ? [...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3">
                  <Skeleton className="w-11 h-11 rounded-full bg-[#2e2e2e]" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-2/3 bg-[#2e2e2e]" />
                    <Skeleton className="h-3 w-1/2 bg-[#2e2e2e]" />
                  </div>
                </div>
              ))
            : filtering?.map((conversation) => (
                <ShowSidebarPeoples
                  key={conversation.conversation_id}
                  conversation={conversation}
                />
              ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessagePageSidebar;
