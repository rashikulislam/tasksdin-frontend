import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const NonSkillCategorySkeleton = ({ isMobile }: { isMobile: boolean }) => {
  const skeletonArray = [1, 2, 3]; // array of 3 items

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {skeletonArray.map((item) => (
        <Card
          key={item}
          className={`overflow-hidden border-0 p-4 bg-transparent shadow-none ${
            isMobile ? "h-[300px]" : "h-[350px]"
          }`}
        >
          <CardContent className="space-y-4 p-0">
            {/* Image placeholder */}
            <Skeleton className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700" />

            {/* Title placeholder */}
            <Skeleton className="w-3/4 h-6 rounded bg-slate-200 dark:bg-slate-700" />

            {/* Tags placeholder */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="w-16 h-4 rounded bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="w-12 h-4 rounded bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="w-20 h-4 rounded bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* Button placeholder */}
            <Skeleton className="w-full h-10 rounded bg-slate-300 dark:bg-slate-600" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NonSkillCategorySkeleton;
