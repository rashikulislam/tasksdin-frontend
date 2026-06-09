import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const HomeMaidSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="rounded-2xl border bg-background">
          <CardContent className="p-4 space-y-4">
            {/* ================= IMAGE ================= */}
            <Skeleton className="h-40 w-full rounded-xl bg-slate-200" />

            {/* ================= NAME & GENDER ================= */}
            <div className="space-y-1">
              <Skeleton className="h-5 w-32 rounded-md bg-slate-200" />
              <Skeleton className="h-4 w-20 rounded-md bg-slate-200" />
            </div>

            {/* ================= PHONE ================= */}
            <Skeleton className="h-4 w-28 rounded-md bg-slate-200" />

            {/* ================= SKILLS ================= */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20 rounded-full bg-slate-200" />
              <Skeleton className="h-6 w-20 rounded-full bg-slate-200" />
              <Skeleton className="h-6 w-20 rounded-full bg-slate-200" />
            </div>

            {/* ================= WORK HOURS & SALARY ================= */}
            <div className="space-y-1">
              <Skeleton className="h-4 w-32 rounded-md bg-slate-200" />
              <Skeleton className="h-4 w-24 rounded-md bg-slate-200" />
            </div>

            {/* ================= LOCATION ================= */}
            <Skeleton className="h-4 w-36 rounded-md bg-slate-200" />

            {/* ================= BUTTON ================= */}
            <Skeleton className="h-10 w-full rounded-xl bg-slate-200" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HomeMaidSkeleton;
