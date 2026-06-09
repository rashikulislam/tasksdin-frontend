import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const TaskDetailsSkeleton = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div
      className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-12"} gap-6 pt-6`}
    >
      {/* ================= LEFT ================= */}
      <div className={isMobile ? "col-span-1" : "col-span-8"}>
        <Card className="rounded-xl border bg-background p-6">
          <CardContent className="p-0 space-y-6">
            {/* Title */}
            <Skeleton className="h-8 w-3/4 rounded-md bg-slate-200 dark:bg-slate-700" />

            {/* Description title */}
            <Skeleton className="h-5 w-40 rounded-md bg-slate-200 dark:bg-slate-700" />

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="h-4 w-5/6 rounded-md bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* Price + Deadline */}
            <div className="grid grid-cols-2 gap-4 rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded-md bg-slate-300 dark:bg-slate-700" />
                <Skeleton className="h-6 w-20 rounded-md bg-slate-300 dark:bg-slate-600" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded-md bg-slate-300 dark:bg-slate-700" />
                <Skeleton className="h-6 w-40 rounded-md bg-slate-300 dark:bg-slate-600" />
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded-full bg-slate-300 dark:bg-slate-600" />
              <Skeleton className="h-4 w-32 rounded-md bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* Posted time */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded-full bg-slate-300 dark:bg-slate-600" />
              <Skeleton className="h-4 w-56 rounded-md bg-slate-200 dark:bg-slate-700" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= RIGHT ================= */}
      <div className={isMobile ? "col-span-1" : "col-span-4"}>
        <Card className="rounded-xl border bg-background p-6">
          <CardContent className="p-0 space-y-6">
            {/* Section title */}
            <Skeleton className="h-6 w-32 rounded-md bg-slate-200 dark:bg-slate-700" />

            {/* User box */}
            <div className="flex items-center gap-4 rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
              <Skeleton className="h-12 w-12 rounded-full bg-slate-300 dark:bg-slate-600" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40 rounded-md bg-slate-200 dark:bg-slate-700" />
                <Skeleton className="h-4 w-32 rounded-md bg-slate-200 dark:bg-slate-700" />
                <Skeleton className="h-3 w-24 rounded-md bg-slate-300 dark:bg-slate-600" />
              </div>
            </div>

            {/* About */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-24 rounded-md bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="h-4 w-5/6 rounded-md bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-24 rounded-md bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="h-10 w-full rounded-md bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-28 rounded-md bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="h-10 w-full rounded-md bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="h-10 w-full rounded-md bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* Button */}
            <Skeleton className="h-12 w-full rounded-lg bg-slate-300 dark:bg-slate-600" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskDetailsSkeleton;
