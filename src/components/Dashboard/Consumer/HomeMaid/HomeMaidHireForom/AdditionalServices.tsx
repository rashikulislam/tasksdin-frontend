"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import { useState } from "react";

export default function AdditionalServices() {
    
  const [familyType, setFamilyType] = useState<"bachelor" | "family">("family");

  // Additional services
  const [clothesWashing, setClothesWashing] = useState(false);
  const [clothesWashingFreq, setClothesWashingFreq] = useState("2");
  const [toiletCleaning, setToiletCleaning] = useState(false);
  const [toiletCleaningFreq, setToiletCleaningFreq] = useState("2");
  const [childCare, setChildCare] = useState(false);
  const [childAge, setChildAge] = useState("2");
  const [childCareHours, setChildCareHours] = useState("2");
  const [elderlyCare, setElderlyCare] = useState(false);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">অতিরিক্ত সেবা</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Clothes Washing */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="clothes"
              checked={clothesWashing}
              onCheckedChange={(c) => setClothesWashing(c as boolean)}
            />
            <Label htmlFor="clothes" className="cursor-pointer">
              কাপড় ধোয়া লাগবে?
            </Label>
          </div>
          {clothesWashing && (
            <div className="ml-6 p-3 bg-muted rounded-lg space-y-2">
              <Label>মাসে কতবার?</Label>
              <RadioGroup
                value={clothesWashingFreq}
                onValueChange={setClothesWashingFreq}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="cw2" />
                  <Label htmlFor="cw2" className="cursor-pointer">
                    ২ বার
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4" id="cw4" />
                  <Label htmlFor="cw4" className="cursor-pointer">
                    ৪ বার
                  </Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Info className="w-3 h-3" />
                {clothesWashingFreq === "2"
                  ? "৳৩৫০/জন যোগ হবে"
                  : "৳৫০০/জন যোগ হবে"}
              </p>
            </div>
          )}
        </div>

        {/* Toilet Cleaning */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="toilet"
              checked={toiletCleaning}
              onCheckedChange={(c) => setToiletCleaning(c as boolean)}
            />
            <Label htmlFor="toilet" className="cursor-pointer">
              টয়লেট পরিষ্কার লাগবে?
            </Label>
          </div>
          {toiletCleaning && (
            <div className="ml-6 p-3 bg-muted rounded-lg space-y-2">
              <Label>মাসে কতবার?</Label>
              <RadioGroup
                value={toiletCleaningFreq}
                onValueChange={setToiletCleaningFreq}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="tc2" />
                  <Label htmlFor="tc2" className="cursor-pointer">
                    ২ বার
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4" id="tc4" />
                  <Label htmlFor="tc4" className="cursor-pointer">
                    ৪ বার
                  </Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Info className="w-3 h-3" />
                {toiletCleaningFreq === "2" ? "৳৫০০ যোগ হবে" : "৳১,০০০ যোগ হবে"}
              </p>
            </div>
          )}
        </div>

        {/* Child Care - Family Only */}
        {familyType === "family" && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="child"
                checked={childCare}
                onCheckedChange={(c) => setChildCare(c as boolean)}
              />
              <Label htmlFor="child" className="cursor-pointer">
                শিশু যত্ন লাগবে?
              </Label>
            </div>
            {childCare && (
              <div className="ml-6 p-3 bg-muted rounded-lg space-y-3">
                <div>
                  <Label>শিশুর বয়স</Label>
                  <Select value={childAge} onValueChange={setChildAge}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((age) => (
                        <SelectItem key={age} value={age.toString()}>
                          {age} বছর
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>দৈনিক কত ঘণ্টা?</Label>
                  <Select
                    value={childCareHours}
                    onValueChange={setChildCareHours}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((h) => (
                        <SelectItem key={h} value={h.toString()}>
                          {h} ঘণ্টা
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Info className="w-3 h-3" />৳{parseInt(childCareHours) * 500}{" "}
                  যোগ হবে (৳৫০০/ঘণ্টা)
                </p>
              </div>
            )}
          </div>
        )}

        {/* Elderly Care - Family Only */}
        {familyType === "family" && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="elderly"
                checked={elderlyCare}
                onCheckedChange={(c) => setElderlyCare(c as boolean)}
              />
              <Label htmlFor="elderly" className="cursor-pointer">
                বয়স্ক সেবা লাগবে?
              </Label>
            </div>
            {elderlyCare && (
              <div className="ml-6 p-3 bg-accent/20 border border-accent rounded-lg">
                <p className="text-sm flex items-center gap-2">
                  <Info className="w-4 h-4 text-accent" />
                  আমরা বিস্তারিত জানতে আপনার সাথে যোগাযোগ করব।
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
