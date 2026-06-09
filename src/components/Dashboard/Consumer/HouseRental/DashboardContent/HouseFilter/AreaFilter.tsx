"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { areas } from "../../data/mockHouseData";
import { useHouseRental } from "../../contexts/HouseRentalContext";

function AreaFilter() {
  const { filters, updateFilter } = useHouseRental();

  return (
    <div className="space-y-2">
      <Label>এলাকা</Label>
      <Select
        value={filters.area}
        onValueChange={(value) => updateFilter("area", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="এলাকা নির্বাচন করুন" />
        </SelectTrigger>
        <SelectContent>
          {areas.map((area) => (
            <SelectItem key={area} value={area}>
              {area}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default AreaFilter;
