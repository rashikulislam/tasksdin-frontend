"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Building2, X } from "lucide-react";
import { useHouseRental } from "../../contexts/HouseRentalContext";

function ImportantPlaceFilter() {
  const { filters, setShowPlaceModal, clearPlaceFilter } = useHouseRental();

  return (
    <div className="space-y-2">
      <Label>গুরুত্বপূর্ণ স্থান থেকে দূরত্ব</Label>
      {filters.importantPlace ? (
        <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
          <Building2 className="w-5 h-5 text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium">{filters.importantPlace.name}</p>
            <p className="text-xs text-muted-foreground">
              {filters.maxDistanceKm} কিমি এর মধ্যে
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={clearPlaceFilter}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setShowPlaceModal(true)}
        >
          <Building2 className="w-4 h-4 mr-2" />
          স্থান খুঁজুন
        </Button>
      )}
    </div>
  );
}

export default ImportantPlaceFilter;
