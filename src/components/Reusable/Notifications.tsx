"use client"

import { Card, CardContent } from "@/components/ui/card";
import { mockNotifications } from "../Dashboard/UnskilledProvider/Data/mockData";


const UnskilledNotifications = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">নোটিফিকেশন</h3>
      
      <div className="space-y-3">
        {mockNotifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`hover:shadow-md transition-shadow ${
              notification.unread ? "border-l-4 border-l-primary bg-primary/5" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="text-2xl">{notification.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    {notification.unread && (
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                    {notification.message}
                  </p>
                  <span className="text-xs text-muted-foreground font-medium">
                    {notification.time}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UnskilledNotifications;
