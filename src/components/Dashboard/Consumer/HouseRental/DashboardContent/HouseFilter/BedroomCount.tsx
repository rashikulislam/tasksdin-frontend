"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHouseRental } from "../../contexts/HouseRentalContext";

function BedroomCount() {
  const { filters, updateFilter } = useHouseRental();

  return (
    <div className="space-y-2">
      <Label>বেডরুম</Label>
      <Select
        value={filters.bedrooms}
        onValueChange={(value) => updateFilter("bedrooms", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="বেডরুম সংখ্যা" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">যেকোনো</SelectItem>
          <SelectItem value="1">১ বেডরুম</SelectItem>
          <SelectItem value="2">২ বেডরুম</SelectItem>
          <SelectItem value="3">৩ বেডরুম</SelectItem>
          <SelectItem value="4">৪+ বেডরুম</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default BedroomCount;
