"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, DollarSign, Star, HandHeart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Notification {
  id: string;
  type:
    | "task_accepted"
    | "payment_processed"
    | "task_completed"
    | "review_received";
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp" | "isRead">
  ) => void;
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  const addNotification = (
    notification: Omit<Notification, "id" | "timestamp" | "isRead">
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false,
    };

    setNotifications((prev) => [newNotification, ...prev]);

    // Show toast notification
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getIcon = () => {
      switch (notification.type) {
        case "task_accepted":
          return <CheckCircle className="h-4 w-4" />;
        case "payment_processed":
          return <DollarSign className="h-4 w-4" />;
        case "task_completed":
          return <HandHeart className="h-4 w-4" />;
        case "review_received":
          return <Star className="h-4 w-4" />;
      }
    };

    toast({
      title: notification.title,
      description: notification.message,
      duration: 5000,
    });
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        removeNotification,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

interface NotificationListProps {
  onClose?: () => void;
  className?: string;
}

export const NotificationList = ({
  onClose,
  className = "",
}: NotificationListProps) => {
  const { notifications, markAsRead, removeNotification } = useNotifications();

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "task_accepted":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "payment_processed":
        return <DollarSign className="h-5 w-5 text-blue-500" />;
      case "task_completed":
        return <HandHeart className="h-5 w-5 text-purple-500" />;
      case "review_received":
        return <Star className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "task_accepted":
        return "bg-green-50 border-green-200";
      case "payment_processed":
        return "bg-blue-50 border-blue-200";
      case "task_completed":
        return "bg-purple-50 border-purple-200";
      case "review_received":
        return "bg-yellow-50 border-yellow-200";
    }
  };

  return (
    <div className={`space-y-3 max-h-96 overflow-y-auto ${className}`}>
      {notifications.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No notifications yet</p>
        </div>
      ) : (
        notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`transition-all duration-200 ${
              !notification.isRead
                ? getNotificationColor(notification.type)
                : "bg-background border-border"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {getNotificationIcon(notification.type)}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4
                      className={`font-semibold text-sm ${
                        !notification.isRead
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {notification.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      {!notification.isRead && (
                        <div className="h-2 w-2 bg-primary rounded-full" />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => removeNotification(notification.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <p
                    className={`text-sm mt-1 ${
                      !notification.isRead
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {notification.message}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {notification.timestamp.toLocaleTimeString()}
                    </span>

                    {!notification.isRead && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
