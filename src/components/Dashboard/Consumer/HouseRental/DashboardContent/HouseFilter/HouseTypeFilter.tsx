"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { houseTypes } from "../../data/mockHouseData";
import { useHouseRental } from "../../contexts/HouseRentalContext";

function HouseTypeFilter() {
  const { filters, updateFilter } = useHouseRental();

  return (
    <div className="space-y-2">
      <Label>বাসার ধরন</Label>
      <Select
        value={filters.houseType}
        onValueChange={(value) => updateFilter("houseType", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="ধরন নির্বাচন করুন" />
        </SelectTrigger>
        <SelectContent>
          {houseTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type === "All Types"
                ? "সব ধরন"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default HouseTypeFilter;
