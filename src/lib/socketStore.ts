import { INotification } from "@/interfaces";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IMessagePayload {
  text?: string;
  conversationId: string;
  senderId: string;
  mediaUrl?: string[];
  type: string;
}
export interface IMessageDetails {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  type: "TEXT_LINK_FILE" | "TEXT_FILE" | "FILE" | "LINK" | "TEXT";
  mediaUrl: string[];
  isDeleted: string;
  seenAt: string;
  created_at: string;
  replyToId?: string | null;
  replyToText?: string | null;
  senderName?: string;
}

// type IMessage = IMessageDetails | IMessagePayload;

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  messages: IMessageDetails[];
  notifications: INotification[];
  connect: (userId: string) => void;
  disconnect: () => void;
  sendMessage: (payload: IMessagePayload) => void;
  addMessage: (payload: IMessageDetails) => void;
  joinRoom: (conversationId: string) => void;
  addNotification: (payload: INotification) => void;
}

export const useSocketStore = create<SocketState>()(
  devtools((set, get) => {
    let socket: Socket | null = null;

    return {
      socket: null,
      isConnected: false,
      messages: [],
      notifications: [],
      connect: (userId: string) => {
        if (!socket && userId) {
          socket = io(process.env.NEXT_PUBLIC_SOCKET_API as string, {
            transports: ["websocket"],
            path: "/api/socket/io",
            withCredentials: true,
          });

          // socket.on("connect", () => set({ isConnected: true },),);

          // here change
          socket.on("connect", () => {
            set({ isConnected: true, notifications: [] });

            // 🔥 JOIN USER ROOM
            socket?.emit("join_user", userId);
          });

          socket.on("welcome", (msg) => {
            console.log(msg);
          });

          socket.on("disconnect", () => set({ isConnected: false }));

          socket.on("message", (payload: IMessagePayload) =>
            get().addMessage(payload as IMessageDetails)
          );

          socket.on("notification", (notif: INotification) => {
            console.log("📩 Notification received:", notif);
            get().addNotification(notif);
          });
        }

        set({ socket });
      },

      disconnect: () => {
        if (socket) {
          socket.disconnect();
          socket = null;
          set({ isConnected: false });
        }
      },

      sendMessage: (payload: IMessagePayload) => {
        if (socket && get().isConnected) {
          socket.emit("message", payload);
          // get().addMessage(payload as IMessageDetails);
        }
      },

      addMessage: (payload: IMessageDetails) => {
        set((state) => ({
          messages: [...state.messages, payload],
        }));
      },

      addNotification: (payload: INotification) => {
        set((state) => ({
          notifications: Array.isArray(state.notifications)
            ? [payload, ...state.notifications]
            : [payload],
        }));
      },

      // ✅ join specific conversation room
      joinRoom: (conversationId: string) => {
        const socket = get().socket;
        if (socket && get().isConnected && conversationId) {
          socket.emit("join_conversation", conversationId);
          // console.log("✅ Joined room:", `conversation_${conversationId}`);
        }
      },
    };
  })
);
