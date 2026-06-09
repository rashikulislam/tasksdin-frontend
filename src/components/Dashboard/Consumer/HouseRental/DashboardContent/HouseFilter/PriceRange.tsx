"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useHouseRental } from "../../contexts/HouseRentalContext";

function PriceRange() {
  const { filters, updateFilter } = useHouseRental();

  const [priceRange, setPriceRange] = useState([
    filters.rentRange.min,
    filters.rentRange.max === Infinity ? 150000 : filters.rentRange.max,
  ]);

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    updateFilter("rentRange", { min: values[0], max: values[1] });
  };

  return (
    <div className="space-y-4">
      <Label>ভাড়ার পরিসীমা</Label>
      <Slider
        value={priceRange}
        onValueChange={handlePriceChange}
        min={0}
        max={150000}
        step={1000}
        className="w-full"
      />
      <div className="flex justify-between text-sm">
        <span>৳{priceRange[0].toLocaleString()}</span>
        <span>৳{priceRange[1].toLocaleString()}</span>
      </div>
    </div>
  );
}

export default PriceRange;
