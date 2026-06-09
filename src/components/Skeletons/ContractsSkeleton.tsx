import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ContractsSkeleton = () => {
  return (
    <div className="space-y-4 pt-8 pb-24">
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index} className="rounded-2xl border bg-background">
          <CardContent className="p-6 space-y-5">
            {/* ================= TITLE + STATUS ================= */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-64 rounded-md bg-slate-200" />
              <Skeleton className="h-6 w-16 rounded-full bg-slate-200" />
            </div>

            {/* ================= USER ROW ================= */}
            <div className="flex items-center gap-3 bg-muted/40 p-3 rounded-xl">
              <Skeleton className="h-10 w-10 rounded-full bg-slate-200" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-28 rounded-md bg-slate-200" />
                <Skeleton className="h-3 w-16 rounded-md bg-slate-200" />
              </div>
            </div>

            {/* ================= PRICE & COMPLETION ================= */}
            <div className="flex items-center justify-between bg-muted/30 p-4 rounded-xl">
              <div className="space-y-2">
                <Skeleton className="h-3 w-12 rounded-md bg-slate-200" />
                <Skeleton className="h-5 w-20 rounded-md bg-slate-200" />
              </div>

              <div className="space-y-2 text-right">
                <Skeleton className="h-3 w-20 rounded-md bg-slate-200" />
                <Skeleton className="h-4 w-28 rounded-md bg-slate-200" />
              </div>
            </div>

            {/* ================= LOCATION ================= */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full bg-slate-200" />
              <Skeleton className="h-4 w-40 rounded-md bg-slate-200" />
            </div>

            {/* ================= DIVIDER ================= */}
            <div className="h-px w-full bg-border" />

            {/* ================= FOOTER BUTTONS ================= */}
            <div className="flex items-center gap-4 ">
              <Skeleton className="h-10 flex-1 rounded-xl bg-slate-200" />
              <Skeleton className="h-10 flex-1 rounded-xl bg-slate-200" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContractsSkeleton;
