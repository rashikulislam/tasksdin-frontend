import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { areas, houseTypes, rentRanges } from "../../data/mockHouseData";
import { useHouseRental } from "../../contexts/HouseRentalContext";

function QuickFilters() {
  const { filters, updateFilter, clearFilters } = useHouseRental();

  const activeFiltersCount = [
    filters?.area !== "All Areas",
    filters?.houseType !== "All Types",
    filters?.rentRange?.min > 0 || filters?.rentRange?.max < Infinity,
    filters?.bedrooms !== "any",
    filters?.furnished,
    filters?.parking,
    filters?.petFriendly,
    filters?.importantPlace !== null,
  ].filter(Boolean).length;

  return (
    <div className="hidden lg:flex flex-wrap gap-3 items-center">
      <Select
        onValueChange={(value) => updateFilter("area", value)}
      >
        <SelectTrigger className="w-[160px]">
          <MapPin className="w-4 h-4 mr-2" />
          <SelectValue placeholder="এলাকা" />
        </SelectTrigger>
        <SelectContent>
          {areas.map((area) => (
            <SelectItem key={area} value={area}>
              {area}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => updateFilter("houseType", value)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="ধরন" />
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

      <Select
        value={`${filters?.rentRange.min}-${filters?.rentRange.max}`}
        onValueChange={(value) => {
          const range = rentRanges.find((r) => `${r.min}-${r.max}` === value);
          if (range)
            updateFilter("rentRange", { min: range.min, max: range.max });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="বাজেট" />
        </SelectTrigger>
        <SelectContent>
          {rentRanges.map((range) => (
            <SelectItem key={range.label} value={`${range.min}-${range.max}`}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters?.bedrooms}
        onValueChange={(value) => updateFilter("bedrooms", value)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="বেডরুম" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">যেকোনো</SelectItem>
          <SelectItem value="1">১ বেডরুম</SelectItem>
          <SelectItem value="2">২ বেডরুম</SelectItem>
          <SelectItem value="3">৩ বেডরুম</SelectItem>
          <SelectItem value="4">৪+ বেডরুম</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-4 ml-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={filters?.furnished}
            onCheckedChange={(checked) =>
              updateFilter("furnished", checked as boolean)
            }
          />
          <span className="text-sm">ব্যাচেলর</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={filters?.parking}
            onCheckedChange={(checked) =>
              updateFilter("parking", checked as boolean)
            }
          />
          <span className="text-sm">ফ্যামিলি</span>
        </label>
      </div>

      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-destructive"
        >
          <X className="w-4 h-4 mr-1" />
          সব মুছুন
        </Button>
      )}
    </div>
  );
}

export default QuickFilters;
