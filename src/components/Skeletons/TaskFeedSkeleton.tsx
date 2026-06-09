import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const TaskFeedSkeleton = () => {
  return (
    <div className="space-y-4 pt-8 pb-24">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="rounded-xl border bg-background">
          <CardContent className="p-6 space-y-4">
            {/* ================= TITLE + BADGE ================= */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-72 rounded-md bg-slate-200" />
              <Skeleton className="h-6 w-14 rounded-full bg-slate-200" />
            </div>

            {/* ================= DESCRIPTION ================= */}
            <Skeleton className="h-4 w-2/3 rounded-md bg-slate-200" />

            {/* ================= META INFO ================= */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full bg-slate-300" />
                <Skeleton className="h-4 w-24 rounded-md bg-slate-200" />
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full bg-slate-300" />
                <Skeleton className="h-4 w-28 rounded-md bg-slate-200" />
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full bg-slate-300" />
                <Skeleton className="h-4 w-32 rounded-md bg-slate-200" />
              </div>
            </div>

            {/* ================= DIVIDER ================= */}
            <div className="h-px w-full bg-slate-200" />

            {/* ================= FOOTER ================= */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Posted time */}
              <Skeleton className="h-4 w-48 rounded-md bg-slate-200" />

              {/* Buttons */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-24 rounded-lg bg-slate-300" />
                <Skeleton className="h-9 w-24 rounded-lg bg-slate-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskFeedSkeleton;
