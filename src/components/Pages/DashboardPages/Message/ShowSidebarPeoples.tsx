"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IConversation } from "./MessagePageSidebar";
import { Check, CheckCheck } from "lucide-react";
import { formatChatTime } from "@/utils/formatChatTime ";
import { useUserStatus } from "@/utils/useUserStatusOnline";

const ShowSidebarPeoples = ({
  conversation,
}: {
  conversation: IConversation;
}) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const handleSetIdToQuery = async (id: string) => {
    const params = new URLSearchParams(
      searchParams as
        | string[][]
        | Record<string, string>
        | string
        | URLSearchParams
    );

    if (id) {
      params.set("con", `${id}`);
    } else {
      params.delete("con");
    }
    router.replace(`${pathName}?${params.toString()}`);
  };
  const userId = conversation?.conversation?.user_id;
  const lastOnlineUser = conversation?.conversation?.last_online;
  const userOnlineStatus = useUserStatus(
    userId,
    conversation?.conversation?.is_online ? "online" : "offline",
    lastOnlineUser
  );
  const showOnlineDot =
    userOnlineStatus?.userId === userId &&
    userOnlineStatus?.activeStatus === "online";

  return (
    <div
      className="flex items-center p-3 rounded-2xl mx-2 hover:bg-[#f9f9fa] dark:hover:bg-[#374151] cursor-pointer"
      onClick={() => handleSetIdToQuery(conversation?.conversation_id)}
    >
      <div className="relative w-fit">
        <Avatar className="w-11 h-11 border border-gray-200 dark:border-white shadow-sm dark:shadow-none flex items-center justify-center rounded-full overflow-hidden">
          <AvatarImage
            src={conversation?.conversation?.profile_img}
            alt={conversation?.conversation?.full_name || "User"}
            className="object-cover"
          />
          <AvatarFallback className="text-gray-700 dark:text-white font-semibold">
            {conversation?.conversation?.full_name?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        {/* 🟢 Online Indicator */}
        {showOnlineDot && (
          <span className="absolute -bottom-1 right-2 h-3 w-3 bg-green-500 border-2 border-white dark:border-[#0f172a] rounded-full" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-900 dark:text-white truncate">
            {conversation.conversation.full_name}
          </span>
          <span className="text-xs text-[#938f8f]">
            {formatChatTime(conversation?.last_message?.created_at)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            {renderStatus("delivered")}
            <p
              className="
    text-sm text-[#938f8f] font-semibold
    max-w-[200px] 
    overflow-hidden
    whitespace-nowrap
    text-ellipsis
  "
            >
              {conversation.last_message?.text || "No message yet"}
            </p>
          </div>

          {/* {3 > 0 && (
            <Badge
              variant="destructive"
              className="w-5 h-5 flex items-center justify-center rounded-full text-[10px] p-0"
            >
              3
            </Badge>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ShowSidebarPeoples;
const renderStatus = (status?: string) => {
  switch (status) {
    case "sent":
      return <Check className="w-4 h-4 text-gray-400" />;
    case "delivered":
      return <CheckCheck className="w-4 h-4 text-gray-400" />;
    case "seen":
      return <CheckCheck className="w-4 h-4 text-blue-500" />;
    default:
      return null;
  }
};
