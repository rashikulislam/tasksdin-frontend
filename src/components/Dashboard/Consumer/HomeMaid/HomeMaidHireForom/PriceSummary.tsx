"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";

function PriceSummary() {
  const [wantTrial, setWantTrial] = useState(false);
  const [numPeople, setNumPeople] = useState("4");
  const [cookingTimes, setCookingTimes] = useState("2");
  const [clothesWashing, setClothesWashing] = useState(false);
  const [clothesWashingFreq, setClothesWashingFreq] = useState("2");
  const [toiletCleaning, setToiletCleaning] = useState(false);
  const [toiletCleaningFreq, setToiletCleaningFreq] = useState("2");
  const [childCare, setChildCare] = useState(false);
  const [childCareHours, setChildCareHours] = useState("2");
  const [familyType, setFamilyType] = useState<"bachelor" | "family">("family");

  // Price calculation
  const calculatePrice = () => {
    const people = parseInt(numPeople) || 4;
    const times = parseInt(cookingTimes);
    let basePrice = 0;

    // Base cooking price
    if (times === 1) {
      basePrice = people <= 6 ? 2500 : 2500 + (people - 6) * 400;
    } else if (times === 2) {
      basePrice = people <= 6 ? 4680 : 4680 + (people - 6) * 700;
    } else if (times === 3) {
      basePrice = people <= 6 ? 6630 : 6630 + (people - 6) * 1000;
    }

    // Additional services
    if (clothesWashing) {
      const washPrice = clothesWashingFreq === "2" ? 350 : 500;
      basePrice += washPrice * people;
    }

    if (toiletCleaning) {
      basePrice += toiletCleaningFreq === "2" ? 500 : 1000;
    }

    if (childCare && familyType === "family") {
      const hours = parseInt(childCareHours) || 2;
      basePrice += hours * 500; // ৫০০ টাকা/ঘণ্টা
    }

    // Trial cost
    if (wantTrial) {
      basePrice += 100;
    }

    return basePrice;
  };
  return (
    <div>
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">মোট মাসিক খরচ</span>
            <span className="text-2xl font-bold text-primary">
              ৳{calculatePrice().toLocaleString()}
            </span>
          </div>
          {wantTrial && (
            <p className="text-sm text-muted-foreground">
              (ট্রায়াল ফি ৳১০০ সহ)
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default PriceSummary;
