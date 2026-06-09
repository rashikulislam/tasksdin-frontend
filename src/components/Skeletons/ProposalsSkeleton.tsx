import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ProposalsSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="rounded-xl border bg-background">
          <CardContent className="p-6 space-y-6">
            {/* ================= TITLE + STATUS ================= */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-7 w-72 rounded-md bg-slate-200" />
              <Skeleton className="h-6 w-20 rounded-full bg-slate-200" />
            </div>

            {/* ================= DESCRIPTION ================= */}
            <Skeleton className="h-4 w-2/3 rounded-md bg-slate-200" />

            {/* ================= PRICE / DISTANCE BOX ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl bg-slate-100 p-5">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-slate-200" />
                <Skeleton className="h-6 w-20 bg-slate-300" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-slate-200" />
                <Skeleton className="h-6 w-24 bg-slate-300" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-slate-200" />
                <Skeleton className="h-6 w-16 bg-slate-300" />
              </div>
            </div>

            {/* ================= YOUR PROPOSAL ================= */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-32 bg-slate-200" />
              <Skeleton className="h-24 w-full rounded-xl bg-slate-200" />
            </div>

            {/* ================= SUBMITTED DATE ================= */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full bg-slate-300" />
              <Skeleton className="h-4 w-48 bg-slate-200" />
            </div>

            {/* ================= BUTTON ================= */}
            <Skeleton className="h-12 w-full rounded-xl bg-slate-300" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProposalsSkeleton;
