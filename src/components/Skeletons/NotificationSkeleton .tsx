import React from "react";
import { Skeleton } from "../ui/skeleton";

const NotificationSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex items-start gap-3 p-4 border rounded-lg bg-background shadow-sm"
        >
          {/* Icon Circle */}
          <Skeleton className="h-8 w-8 rounded-full bg-slate-200" />

          <div className="flex-1 space-y-2">
            {/* Title */}
            <Skeleton className="h-5 w-48 rounded-md bg-slate-200" />

            {/* Description */}
            <Skeleton className="h-4 w-52 rounded-md bg-slate-200" />

            {/* Date */}
            <Skeleton className="h-3 w-32 rounded-md bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;
