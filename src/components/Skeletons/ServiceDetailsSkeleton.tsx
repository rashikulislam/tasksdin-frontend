import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ServiceDetailsSkeleton = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div
      className={`grid ${
        isMobile ? "grid-cols-1" : "grid-cols-12"
      } gap-6 pt-5 lg:pt-16`}
    >
      {/* Left side - service info */}
      <div className={isMobile ? "col-span-1" : "col-span-8 space-y-6"}>
        {/* Service Card */}
        <Card className="bg-transparent shadow-none border-0 p-4">
          <CardContent className="space-y-4 p-0">
            {/* Tags */}
            <div className="flex gap-2">
              <Skeleton className="w-20 h-5 rounded bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="w-20 h-5 rounded bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="w-28 h-5 rounded bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* Title */}
            <Skeleton className="w-3/4 h-8 rounded bg-slate-200 dark:bg-slate-700" />

            {/* Rating & providers */}
            <div className="flex gap-4">
              <Skeleton className="w-16 h-5 rounded bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="w-20 h-5 rounded bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* Description */}
            <Skeleton className="w-full h-5 rounded bg-slate-200 dark:bg-slate-700" />
            <Skeleton className="w-full h-5 rounded bg-slate-200 dark:bg-slate-700" />
          </CardContent>
        </Card>

        {/* What's Included */}
        <Card className="bg-transparent shadow-none border-0 p-4">
          <CardContent className="space-y-3 p-0">
            <Skeleton className="w-1/3 h-6 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="flex flex-col gap-2 mt-2">
              <Skeleton className="w-1/2 h-5 rounded bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="w-1/2 h-5 rounded bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="w-1/2 h-5 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          </CardContent>
        </Card>

        {/* Service Guidelines */}
        <Card className="bg-transparent shadow-none border-0 p-4">
          <CardContent className="space-y-3 p-0">
            <Skeleton className="w-1/3 h-6 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="flex flex-col gap-2 mt-2">
              <Skeleton className="w-full h-4 rounded bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="w-full h-4 rounded bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="w-full h-4 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side - create task form */}
      <div className={isMobile ? "col-span-1" : "col-span-4 space-y-4"}>
        <Card className="bg-transparent shadow-none border-0 p-4">
          <CardContent className="space-y-3 p-0">
            <Skeleton className="w-1/2 h-6 rounded bg-slate-200 dark:bg-slate-700" />{" "}
            {/* Form Title */}
            <Skeleton className="w-full h-10 rounded bg-slate-200 dark:bg-slate-700" />{" "}
            {/* Task Title Input */}
            <Skeleton className="w-full h-24 rounded bg-slate-200 dark:bg-slate-700" />{" "}
            {/* Requirements Textarea */}
            <Skeleton className="w-full h-10 rounded bg-slate-200 dark:bg-slate-700" />{" "}
            {/* Budget */}
            <Skeleton className="w-full h-10 rounded bg-slate-200 dark:bg-slate-700" />{" "}
            {/* Deadline */}
            {/* Urgency buttons */}
            <div className="flex flex-col gap-2 mt-2">
              <Skeleton className="w-full h-10 rounded bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="w-full h-10 rounded bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="w-full h-10 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceDetailsSkeleton;
