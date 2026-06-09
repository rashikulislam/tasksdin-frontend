"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSocketStore } from "@/lib/socketStore";
import { Paperclip, SendHorizontal, Smile, UserPlus, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useTheme } from "next-themes";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

// Emoji Picker (SSR Safe)
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

type TInputBtn = {
  input: string;
  selectedFiles: File[];
  setInput: Dispatch<SetStateAction<string>>;
  setTyping: Dispatch<SetStateAction<boolean>>;
  setSelectedMediaFiles: Dispatch<SetStateAction<File[]>>;
  handleSendMessage: () => void;
  conversationId: string;
  userId: string;
};

const MessageSendInputBtn = ({
  input,
  setInput,
  setTyping,
  handleSendMessage,
  selectedFiles,
  conversationId,
  setSelectedMediaFiles,
  userId,
}: // replyingTo,
// cancelReply,
TInputBtn) => {
  const { socket } = useSocketStore();

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const [inputFocused, setInputFocused] = useState(false);

  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [showEmoji, setShowEmoji] = useState(false);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  // Close emoji picker on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target as Node)
      ) {
        setShowEmoji(false);
      }
    };

    if (showEmoji) document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmoji]);

  // File selection handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setSelectedMediaFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreviews((prev) => [...prev, ""]);
      }
    });
    setSelectedMediaFiles(files);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Remove a file
  const removeFile = (index: number) => {
    setSelectedMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Send message
  const sendMessage = () => {
    handleSendMessage();
  };

  // Listen to typing events
  useEffect(() => {
    if (!socket) return;

    socket.on("user_typing", ({ conversationId: id, userId: senderId }) => {
      if (id === conversationId && senderId !== userId) setTyping(true);
    });

    socket.on(
      "user_stop_typing",
      ({ conversationId: id, userId: senderId }) => {
        if (id === conversationId && senderId !== userId) setTyping(false);
      }
    );

    return () => {
      socket.off("user_typing");
      socket.off("user_stop_typing");
    };
  }, [socket, conversationId, userId, setTyping]);

  const handleTyping = (value: string) => {
    setInput(value);
    if (!socket) return;
    socket.emit("typing", { conversationId, userId });

    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit("stop_typing", { conversationId, userId });
    }, 2000);
  };

  return (
    <div
      className="
    px-3 md:px-4
    py-2 md:py-3
    border md:border-b-0
    rounded-lg
    md:rounded-t-lg
    md:rounded-b-none
    md:mb-0
    mb-1
    relative"
    >
      {/* File Previews */}
      {selectedFiles?.length > 0 && (
        <div className="mb-3 space-y-2 max-h-48 overflow-y-auto">
          {selectedFiles?.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              {file.type.startsWith("image/") && filePreviews[index] ? (
                <Image
                  src={filePreviews[index]}
                  alt="Preview"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded-md"
                />
              ) : (
                <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                  <Paperclip className="w-8 h-8 text-gray-500" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <button
                onClick={() => removeFile(index)}
                className="text-gray-500 hover:text-red-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Box */}
      <div className="relative flex-1">
        <textarea
          placeholder="Send message..."
          value={input}
          onChange={(e) => handleTyping(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => {
            if (!input) setInputFocused(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          className="w-full resize-none bg-transparent outline-none text-[#3d3d3d] dark:text-[#dad8d8] text-base placeholder:text-[#938f8f] pr-12
               min-h-[44px] max-h-32 
               scrollbar-hide 
               overflow-y-auto 
               scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600"
          style={{
            height: input ? "auto" : "44px",
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
          }}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-5">
        <div className="flex gap-5">
          {/* Upload */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Paperclip
                  className="w-5 h-5 text-black dark:text-gray-400 cursor-pointer hover:text-blue-500 transition"
                  onClick={() => fileInputRef.current?.click()}
                />
              </TooltipTrigger>
              <TooltipContent>Upload Files</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt,.zip"
          />

          {/* Hire */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  // onClick={sendMessage}
                  className="md:hidden lg:hidden text-black dark:text-gray-400 flex"
                >
                  <UserPlus className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Hire</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Emoji */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Smile
                  className={`w-5 h-5 hidden lg:block md:block cursor-pointer transition ${
                    showEmoji
                      ? "text-[#3c83f6]"
                      : "text-black dark:text-gray-400 hover:text-blue-500"
                  }`}
                  onClick={() => setShowEmoji(!showEmoji)}
                />
              </TooltipTrigger>
              <TooltipContent>Emoji</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Send */}
        <Button
          onClick={sendMessage}
          disabled={!input.trim() && selectedFiles?.length === 0}
          className="group disabled:opacity-50 bg-transparent hover:bg-transparent"
        >
          <SendHorizontal className="!w-6 !h-6 text-black group-hover:text-[#3c83f6] dark:text-gray-400 cursor-pointer" />
        </Button>
      </div>

      {/* Emoji Picker */}
      {showEmoji && (
        <div
          ref={emojiPickerRef}
          className="absolute bottom-[120px] left-0 z-50 custom-emoji"
        >
          <EmojiPicker
            onEmojiClick={(e) => setInput((prev) => prev + e.emoji)}
            width={360}
            height={420}
            lazyLoadEmojis
            skinTonesDisabled={false}
            style={{
              background: isDarkMode ? "#1a1a1a" : "#ffffff",
              border: `1px solid ${isDarkMode ? "#333" : "#e0e0e0"}`,
              borderRadius: "12px",
              boxShadow: isDarkMode
                ? "0 10px 30px rgba(0,0,0,0.5)"
                : "0 10px 30px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MessageSendInputBtn;
