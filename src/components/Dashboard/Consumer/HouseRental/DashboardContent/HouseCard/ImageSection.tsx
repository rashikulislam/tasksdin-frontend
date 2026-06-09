"use client";

import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { HouseCardProps } from "../../data/mockHouseData";
import { useHouseRental } from "../../contexts/HouseRentalContext";

function ImageSection({
  house,
}: HouseCardProps) {
  const {toggleFavorite, favorites} = useHouseRental()
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [internalFavorite, setInternalFavorite] = useState(false);
  const isFavorite = favorites.includes(house.id) ?? internalFavorite;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (toggleFavorite) {
      toggleFavorite(house.id);
    } else {
      setInternalFavorite((prev) => !prev);
    }
  };

  const getHouseTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      apartment: "অ্যাপার্টমেন্ট",
      house: "বাড়ি",
      room: "রুম",
      studio: "স্টুডিও",
      duplex: "ডুপ্লেক্স",
    };
    return labels[type] || type;
  };

  return (
    <div className="relative aspect-[4/3] overflow-hidden">
      <Image
        src={house.images[currentImageIndex]}
        alt={house.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Image Navigation Dots */}
      {house.images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {house.images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex
                  ? "bg-primary-foreground w-4"
                  : "bg-primary-foreground/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
      >
        <Heart
          className={`w-5 h-5 ${isFavorite ? "fill-destructive text-destructive" : "text-foreground"}`}
        />
      </button>

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
        {house.isAvailable && (
          <Badge className="bg-success text-success-foreground">খালি আছে</Badge>
        )}
        <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm">
          {getHouseTypeLabel(house.houseType)}
        </Badge>
      </div>
    </div>
  );
}

export default ImageSection;
