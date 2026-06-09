"use client";

import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Maximize, Star } from "lucide-react";
import { HouseCardProps } from "../../data/mockHouseData";
import { useHouseRental } from "../../contexts/HouseRentalContext";

function ImportantLocation({
  house,
}: HouseCardProps) {

  const {selectedImportantPlace, showDistanceOnCards = false, userLocation, setSelectedHouse} = useHouseRental()

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Distance from user location (only when showDistanceFromUser is true)
  const distanceFromUser =
    showDistanceOnCards && userLocation
      ? calculateDistance(
          userLocation.lat,
          userLocation.lng,
          house.coordinates.lat,
          house.coordinates.lng,
        )
      : null;

  // Distance from selected important place
  const distanceFromImportantPlace = selectedImportantPlace
    ? calculateDistance(
        selectedImportantPlace.lat,
        selectedImportantPlace.lng,
        house.coordinates.lat,
        house.coordinates.lng,
      )
    : null;

  const formatRent = (rent: number) => {
    return new Intl.NumberFormat("bn-BD").format(rent);
  };

  return (
    <div>
      <CardContent className="p-4 space-y-3">
        {/* Location & Distance */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="truncate">
              {house.area}, {house.city}
            </span>
          </div>
          {/* Show distance from important place first, then user location */}
          {distanceFromImportantPlace !== null ? (
            <span className="text-primary font-medium text-xs">
              {distanceFromImportantPlace < 1
                ? `${(distanceFromImportantPlace * 1000).toFixed(0)}m`
                : `${distanceFromImportantPlace.toFixed(1)}km`}{" "}
              দূরে
            </span>
          ) : distanceFromUser !== null ? (
            <span className="text-primary font-medium">
              {distanceFromUser < 1
                ? `${(distanceFromUser * 1000).toFixed(0)}m`
                : `${distanceFromUser.toFixed(1)}km`}
            </span>
          ) : null}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {house.title}
        </h3>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{house.bedrooms} বেড</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{house.bathrooms} বাথ</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4" />
            <span>{house.size} বর্গফুট</span>
          </div>
        </div>

        {/* Rating & Price */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="font-medium text-foreground">{house.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({house.totalReviews})
            </span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-primary">
              ৳{formatRent(house.rent)}
            </span>
            <span className="text-sm text-muted-foreground">
              /
              {house.rentType === "monthly"
                ? "মাস"
                : house.rentType === "yearly"
                  ? "বছর"
                  : "সপ্তাহ"}
            </span>
          </div>
        </div>

        {/* View Details Button */}
        <Button
          onClick={() => setSelectedHouse(house)}
          className="w-full"
          variant="outline"
        >
          বিস্তারিত দেখুন
        </Button>
      </CardContent>
    </div>
  );
}

export default ImportantLocation;
