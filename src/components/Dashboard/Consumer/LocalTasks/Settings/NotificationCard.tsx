import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetNotificationQuery } from "@/redux/features/notofication.features";
import { INotification } from "@/interfaces";

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetNotificationQuery(undefined);

  const unreadCount = 15;
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center"
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
              {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
            </p>
          )}
        </div>
        <div className="p-4 max-h-96 overflow-y-auto space-y-2">
          {/* {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No notifications yet
            </p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border ${
                  !notification.is_read
                    ? "bg-muted/20 border-muted"
                    : "bg-background border-border"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium mb-1">
                      {notification.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {notification.message}
                    </p>
                  </div>
                  {!notification.is_read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      // onClick={() => markAsRead(notification.id)}
                      className="text-xs"
                    >
                      Mark Read
                    </Button>
                  )}
                </div>
              </div>
            ))
          )} */}
        </div>
      </PopoverContent>
    </Popover>
  );
};
