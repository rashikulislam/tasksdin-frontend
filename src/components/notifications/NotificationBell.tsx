"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSocketStore } from "@/lib/socketStore";
import {
  useGetNotificationQuery,
  useReadNotificationMutation,
} from "@/redux/features/notofication.features";
import moment from "moment";
import { INotification } from "@/interfaces";
import NotificationSkeleton from "../Skeletons/NotificationSkeleton ";
import Link from "next/link";

interface NotificationBellProps {
  className?: string;
}

export const NotificationBell = ({ className = "" }: NotificationBellProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetNotificationQuery(undefined);
  const [readNotification] = useReadNotificationMutation();
  const notifications = data?.data;
  // Real-time notifications from Socket.IO
  const socketNotifications = useSocketStore((state) => state.notifications);

  // Merge backend + socket notifications safely
  const allNotifications = [
    ...(Array.isArray(notifications) ? notifications : []),
    ...(Array.isArray(socketNotifications) ? socketNotifications : []),
  ];

  // Track unread notifications
  const unreadCount = allNotifications.filter((n) => !n.is_read).length;
  // Track previous unread count to alert new notifications
  const [prevUnread, setPrevUnread] = useState(unreadCount);

  useEffect(() => {
    if (unreadCount > prevUnread) {
      if (socketNotifications.length) {
        const notificationSound = new Audio(
          "https://orangefreesounds.com/wp-content/uploads/2023/04/Soft-bell-notification-tone.mp3",
        );

        notificationSound
          .play()
          .catch((err) => console.error("Play failed:", err));
      }
    }
    setPrevUnread(unreadCount);
  }, [unreadCount, prevUnread, socketNotifications.length]);

  const handleRedNotification = async (id: string) => {
    try {
      await readNotification({ id }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={`relative ${className}`}>
          <Bell className="h-10 w-10" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        <div className="p-4 max-h-96 overflow-y-auto">
          {isLoading ? (
            <>
              <NotificationSkeleton />
            </>
          ) : allNotifications?.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No notifications yet
            </p>
          ) : (
            <div className="space-y-2">
              {allNotifications?.map((notification: INotification) => (
                <div
                  key={notification?.id}
                  className={`p-3 rounded-lg border ${
                    !notification?.is_read ? "bg-muted/50" : "bg-background"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium mb-1">
                        {notification?.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {notification?.message}
                      </p>
                      <div className="flex items-center justify-between pt-0.5">
                        <p className="text-xs text-muted-foreground">
                          {moment(notification?.createdAt).format("lll")}
                        </p>
                        <Link
                          href={notification?.route as string}
                          className="text-xs underline"
                          onClick={() =>
                            handleRedNotification(notification?.id)
                          }
                        >
                          View
                        </Link>
                      </div>
                    </div>
                    {/* <div className="flex items-center space-x-1 ml-2">
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs"
                        >
                          Mark Read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeNotification(notification.id)}
                        className="text-xs text-destructive"
                      >
                        ×
                      </Button>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
