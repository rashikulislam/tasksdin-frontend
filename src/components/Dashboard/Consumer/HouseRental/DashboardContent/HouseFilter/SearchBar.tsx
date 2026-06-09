"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Building2, Search, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import FilterContent from "./FilterContent";
import { useHouseRental } from "../../contexts/HouseRentalContext";

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);

  const { filters, updateFilter, clearFilters, setShowPlaceModal } =
    useHouseRental();

  // const activeFiltersCount = [
  //   filters?.area !== "All Areas",
  //   filters?.houseType !== "All Types",
  //   filters?.rentRange?.min > 0 || filters?.rentRange?.max < Infinity,
  //   filters?.bedrooms !== "any",
  //   filters?.furnished,
  //   filters?.parking,
  //   filters?.petFriendly,
  //   filters?.importantPlace !== null,
  // ].filter(Boolean).length;
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="এলাকা বা শিরোনাম দিয়ে খুঁজুন..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Important Places Button */}
      <Button
        variant={filters.importantPlace ? "default" : "outline"}
        onClick={() => setShowPlaceModal(true)}
        className="hidden sm:flex gap-2"
      >
        <Building2 className="w-4 h-4" />
        <span className="hidden md:inline">গুরুত্বপূর্ণ স্থান</span>
      </Button>

      {/* Filter Button - Mobile */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative lg:hidden">
            <SlidersHorizontal className="w-5 h-5" />
            {/* {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )} */}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:w-[400px] overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              ফিল্টার
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                সব মুছুন
              </Button>
            </SheetTitle>
          </SheetHeader>
          <FilterContent />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SearchBar;
