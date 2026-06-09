"use client";

import { Building2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHouseRental } from "../../contexts/HouseRentalContext";

function ImportantPlaceBadge() {
  const { filters, clearPlaceFilter } = useHouseRental();

  return (
    <div>
      {filters?.importantPlace && (
        <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
          <Building2 className="w-5 h-5 text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium">
              {filters?.importantPlace.name} থেকে
            </p>
            <p className="text-xs text-muted-foreground">
              {filters.maxDistanceKm} কিমি এর মধ্যে বাসা দেখাচ্ছে
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={clearPlaceFilter}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default ImportantPlaceBadge;
