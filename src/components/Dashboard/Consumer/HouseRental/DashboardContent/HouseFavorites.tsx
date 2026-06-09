"use client";

import HouseCard from "./HouseCard/HouseCard";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHouseRental } from "../contexts/HouseRentalContext";
import { useRouter } from "next/navigation";
export default function HouseFavorites() {

  const router = useRouter();
  const { favoriteHouses } = useHouseRental();

  if (favoriteHouses.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="w-20 h-20 mx-auto text-muted-foreground/30 mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          পছন্দের তালিকা খালি
        </h3>
        <p className="text-muted-foreground mb-6">
          আপনি এখনো কোনো বাসা পছন্দ করেননি। বাসা খুঁজে হার্ট আইকনে ক্লিক করুন।
        </p>
        <Button onClick={() => router.push("/dashboard/consumer/house-rental")}>
          বাসা খুঁজুন
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          পছন্দের বাসা ({favoriteHouses.length}টি)
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {favoriteHouses.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
    </div>
  );
}
