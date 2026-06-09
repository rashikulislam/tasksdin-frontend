"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, CheckCheck, ArrowLeft, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { TMessagePageChatAreaProps } from "@/interfaces";
import { IMessageDetails, useSocketStore } from "@/lib/socketStore";
import { getUserInformation } from "@/service/auth.services";
import { useGetFullConversationQuery } from "@/redux/features/conversation";
import { showToast } from "@/components/Reusable/CustomToast";
import { Skeleton } from "@/components/ui/skeleton";
import MessageSendInputBtn from "./MessageSendInputBtn";
import TypingIndicator from "./TypingIndicator";
import { useUserStatus } from "@/utils/useUserStatusOnline";
import { formatLastSeen } from "@/utils/formatLastSeen";
import { modifyPayload } from "@/utils/modifyPayload";
import { useUploadFileMutation } from "@/redux/features/message.features";
import { toast } from "sonner";
import Image from "next/image";

const MessagePageChatArea: React.FC<TMessagePageChatAreaProps> = ({
  conversationId,
  onBack,
}) => {
  const [input, setInput] = useState("");
  const [isTyping, setTyping] = useState(false);
  const [localMessages, setLocalMessages] = useState<IMessageDetails[]>([]);
  const [selectedFiles, setSelectedMediaFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedMediaFiles] = useState<string[]>([]);
  const user = getUserInformation();
  const ref = useRef<HTMLDivElement>(null);
  const {
    data: conversation,
    isLoading,
    isError,
    refetch,
  } = useGetFullConversationQuery(conversationId, {
    skip: !conversationId,
    refetchOnMountOrArgChange: true,
  });
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const { messages, isConnected, sendMessage, joinRoom, socket } =
    useSocketStore();
  const [uploadFileAsync, { isLoading: uploadLoading }] =
    useUploadFileMutation();

  // ✅ Join room whenever conversationId changes and socket is connected
  useEffect(() => {
    if (isConnected && conversationId) {
      joinRoom(conversationId);
    }
  }, [isConnected, conversationId, joinRoom]);

  // ✅ Reset and load messages when conversation changes
  useEffect(() => {
    if (conversation?.data?.messages) {
      setLocalMessages(conversation.data.messages);
    } else {
      setLocalMessages([]);
    }
  }, [conversationId, conversation]);

  // ✅ Append live messages from socket only if they belong to current conversation
  useEffect(() => {
    if (messages.length === 0) return;
    const latest = messages[messages.length - 1];
    if (latest.conversationId === conversationId) {
      setLocalMessages((prev) => [...prev, latest]);
    }
  }, [messages, conversationId]);

  // ✅ Auto scroll to bottom when messages change
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "instant" });
  }, [localMessages]);

  // ✅ Handle send message
  // const handleSendMessage = async () => {
  //   if (selectedFiles.length) {
  //     const formData = new FormData();
  //     selectedFiles?.forEach((file) => {
  //       formData.append("files", file);
  //     });

  //     try {
  //       const result = await uploadFileAsync(formData).unwrap();
  //       setUploadedMediaFiles(result?.data);
  //       console.log(result);
  //     } catch (error) {
  //       console.log(error);
  //       return toast.error("Unable to sent");
  //     }
  //   }
  //   const info = {
  //     text: input,
  //     conversationId,
  //     senderId: user?.user_id,
  //     files: uploadedFiles,
  //   };
  //   console.log(info);
  //   const formatData = modifyPayload(info);
  //   console.log(formatData);
  //   sendMessage(formatData);
  //   // setReplyingTo(null);
  //   // setInput("");
  //   //  setSelectedFiles([]);
  //   // setFilePreviews([]);
  // };

  const handleSendMessage = async () => {
    let uploadedFilesData = [];

    // 1️⃣ Upload files first (if any)
    if (selectedFiles.length) {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("files", file));

      try {
        const result = await uploadFileAsync(formData).unwrap();
        uploadedFilesData = result?.data; // store locally
      } catch (error) {
        console.log(error);
        return toast.error("Unable to send files");
      }
    }

    const info = {
      text: input,
      conversationId,
      senderId: user?.user_id,
      files: uploadedFilesData,
    };

    const formatData = modifyPayload(info);

    // 3️⃣ Send via socket or API
    sendMessage(formatData);
  };

  // ✅ Socket success/error listeners
  useEffect(() => {
    if (!socket) return;
    const handleSuccess = () => {
      setInput("");
      setSelectedMediaFiles([]);
      setUploadedMediaFiles([]);
    };
    const handleError = (data: { message: string }) =>
      showToast({ type: "error", title: data.message });

    socket.on("message_success", handleSuccess);
    socket.on("message_error", handleError);

    return () => {
      socket.off("message_success", handleSuccess);
      socket.off("message_error", handleError);
    };
  }, [socket]);

  const userId = conversation?.data?.user?.user_id;
  const lastOnlineUser = conversation?.data?.user?.last_online;

  const userOnlineStatus = useUserStatus(
    userId,
    conversation?.data?.user?.is_online ? "online" : "offline",
    lastOnlineUser
  );

  const downloadFile = async (url: string, filename?: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename || url.split("/").pop() || "file";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  // ✅ Loading skeleton
  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-full p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-32 h-4 bg-[#2e2e2e]" />
            <Skeleton className="w-16 h-3 bg-[#2e2e2e]" />
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <Skeleton className="w-1/2 h-8 rounded-lg bg-[#2e2e2e]" />
          <Skeleton className="w-1/2 h-8 rounded-lg bg-[#2e2e2e]" />
          <Skeleton className="w-2/3 h-8 rounded-lg self-end bg-[#2e2e2e]" />
          <Skeleton className="w-2/3 h-8 rounded-lg self-end bg-[#2e2e2e]" />
          <Skeleton className="w-1/3 h-8 rounded-lg bg-[#2e2e2e]" />
          <Skeleton className="w-1/3 h-8 rounded-lg bg-[#2e2e2e]" />
          <Skeleton className="w-2/3 h-8 rounded-lg self-end bg-[#2e2e2e]" />
          <Skeleton className="w-2/3 h-8 rounded-lg self-end bg-[#2e2e2e]" />
        </div>
      </div>
    );
  }

  // ✅ Error handling
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-red-500">
        <p>Failed to load conversation.</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() => refetch()}
        >
          Retry
        </Button>
      </div>
    );
  }

  // Reply handler function
  // const handleReply = (message: IMessageDetails) => {
  //   const senderName =
  //     message.senderId === user?.user_id
  //       ? "You"
  //       : conversation?.data?.user?.full_name || "User";

  //   setReplyingTo({
  //     ...message,
  //     senderName: senderName,
  //   });
  // };

  // Cancel reply handler
  // const cancelReply = () => {
  //   setReplyingTo(null);
  //   setInput("");
  // };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="px-3 md:px-4 py-3 flex items-center gap-3 flex-shrink-0 ">
        <button
          onClick={onBack}
          className="md:hidden text-gray-600 hover:text-blue-500"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <h2 className="font-semibold text-2xl flex items-center gap-1">
            <span> {conversation?.data?.user?.full_name}</span>
            <span>
              {userOnlineStatus?.activeStatus === "online" ? (
                <span className="flex items-center gap-1">
                  <h1 className="h-3 w-3 bg-green-600 rounded-full"> </h1>
                </span>
              ) : (
                <p className="text-sm text-gray-500">
                  {formatLastSeen(userOnlineStatus?.lastOnline)}
                </p>
              )}
            </span>
          </h2>
          <p className="text-xs md:text-sm text-[#938f8f]">
            Home and Washroom Cleaning Service
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 md:p-4 space-y-4  ">
        {localMessages.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-5">
            No messages yet.
          </p>
        )}
        {localMessages.map((msg: IMessageDetails, idx) => {
          const isOwn = msg.senderId === user?.user_id;
          const isHovered = hoveredMessageId === msg.id;

          const messageDate = new Date(msg.created_at).toDateString();
          const prevDate =
            idx > 0
              ? new Date(localMessages[idx - 1].created_at).toDateString()
              : null;
          const showDateHeader = idx === 0 || messageDate !== prevDate;
          const isLastMessage = idx === localMessages.length - 1;

          return (
            <div
              className={cn(
                isLastMessage ? "pb-[22px]" : "pb-0",
                isTyping && isLastMessage && "pb-0"
              )}
              key={idx}
            >
              {/* Date Header */}
              {showDateHeader && (
                <div className="flex justify-center my-3">
                  <span className="px-3 py-1 text-xs text-white font-semibold bg-[#000000] dark:bg-[#22c55e]  rounded-lg">
                    {new Date(msg.created_at).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}

              {/* Message Row */}
              <div
                className={cn(
                  "group relative flex px-3 mt-1",
                  isOwn ? "justify-end" : "justify-start"
                )}
                onMouseEnter={() =>
                  setHoveredMessageId(msg.id || idx.toString())
                }
                onMouseLeave={() => setHoveredMessageId(null)}
              >
                {/* Hover Action Bar */}
                {isHovered && (
                  <div
                    className={cn(
                      "absolute flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg px-3 py-1.5 -top-10 z-10 transition-opacity duration-200",
                      isOwn ? "left-0" : "left-0"
                    )}
                  >
                    {/* Reply */}
                    <button
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
                      // onClick={() => handleReply(msg)}
                      // title="Reply"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h10a8 8 0 018 8v2m-9-16l-9 9 9 9"
                        />
                      </svg>
                    </button>

                    {/* Edit & Delete */}
                    {isOwn && (
                      <>
                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
                        <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
                          <svg
                            className="w-4 h-4 text-gray-600 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full transition">
                          <svg
                            className="w-4 h-4 text-red-600 dark:text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* Message Bubble */}

                <div
                  className={cn(
                    "max-w-[75%] px-3 py-2 rounded-2xl text-[15px] shadow-sm flex flex-wrap gap-1",
                    isOwn
                      ? "bg-[#0062ff] text-white rounded-tr-none"
                      : "bg-white dark:bg-[#1f2937] text-[#000000] dark:text-white rounded-tl-none"
                  )}
                >
                  {/* {msg.replyToId && (
                    <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-xl border-l-4 border-blue-500">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-blue-600 font-medium">
                          Replying to
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 truncate max-w-[150px]">
                          {msg.replyToText}
                        </span>
                      </div>
                    </div>
                  )} */}

                  {msg?.type === "TEXT" ? (
                    <p className="break-words leading-relaxed">{msg.text}</p>
                  ) : msg?.type === "TEXT_FILE" ? (
                    <div>
                      <div className="space-y-2">
                        {msg?.mediaUrl?.map((media: string, idx: number) => {
                          // Determine file type based on extension
                          const isImage = media.match(
                            /\.(jpg|jpeg|png|webp|gif)$/i
                          );
                          const isPDF = media.match(/\.pdf$/i);
                          const isDOCX = media.match(/\.docx$/i);

                          // Determine display text
                          let downloadText = "Download file";
                          if (isImage) downloadText = "Download image";
                          else if (isPDF) downloadText = "Download PDF";
                          else if (isDOCX) downloadText = "Download DOCX";

                          return (
                            <div key={idx} className="max-w-xs">
                              <button
                                onClick={() => downloadFile(media)}
                                className="flex items-center gap-2"
                              >
                                {downloadText} <Download />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {msg.text && (
                        <p className="break-words leading-relaxed mt-2">
                          {msg.text}
                        </p>
                      )}
                    </div>
                  ) : msg?.type === "FILE" ? (
                    <div className="space-y-2">
                      {msg?.mediaUrl?.map((media: string, idx: number) => {
                        // Determine file type based on extension
                        const isImage = media.match(
                          /\.(jpg|jpeg|png|webp|gif)$/i
                        );
                        const isPDF = media.match(/\.pdf$/i);
                        const isDOCX = media.match(/\.docx$/i);

                        // Determine display text
                        let downloadText = "Download file";
                        if (isImage) downloadText = "Download image";
                        else if (isPDF) downloadText = "Download PDF";
                        else if (isDOCX) downloadText = "Download DOCX";

                        return (
                          <div key={idx} className="max-w-xs">
                            <button
                              onClick={() => downloadFile(media)}
                              className="flex items-center gap-2"
                            >
                              {downloadText} <Download />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    ""
                  )}

                  <div
                    className={cn(
                      "text-[10px] whitespace-nowrap self-end space-x-4",
                      isOwn ? "text-[#ebe9e9]" : "text-black dark:text-white"
                    )}
                  >
                    {new Date(msg.created_at).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="px-3">
            <TypingIndicator />
          </div>
        )}
        <div ref={ref} />
      </div>

      {/* Input */}
      <MessageSendInputBtn
        handleSendMessage={handleSendMessage}
        input={input}
        setInput={setInput}
        conversationId={conversationId}
        userId={user?.user_id}
        setTyping={setTyping}
        selectedFiles={selectedFiles}
        setSelectedMediaFiles={setSelectedMediaFiles}
      />
    </div>
  );
};

export default MessagePageChatArea;

export const renderStatus = (s: string) =>
  s === "sent" ? (
    <Check className="w-3.5 h-3.5 text-gray-400" />
  ) : s === "delivered" ? (
    <CheckCheck className="w-3.5 h-3.5 text-gray-400" />
  ) : (
    <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
  );
