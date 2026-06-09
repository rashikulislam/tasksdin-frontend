"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { House } from "../data/mockHouseData";

interface HouseNavigationSectionProps {
  house: House;
  userLocation?: { lat: number; lng: number } | null;
}

const HouseNavigationSection = ({
  house,
  userLocation,
}: HouseNavigationSectionProps) => {

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) => {
    const R = 6371; // Earth radius (km)
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

  const distanceFromUser = userLocation
    ? calculateDistance(
        userLocation.lat,
        userLocation.lng,
        house.coordinates.lat,
        house.coordinates.lng
      )
    : null;

  const openGoogleMapsNavigation = () => {
    if (typeof window === "undefined") return;

    const destination = `${house.coordinates.lat},${house.coordinates.lng}`;
    const origin = userLocation
      ? `${userLocation.lat},${userLocation.lng}`
      : "";

    const url = origin
      ? `https://www.google.com/maps/dir/${origin}/${destination}`
      : `https://www.google.com/maps/search/?api=1&query=${destination}`;

    window.open(url, "_blank");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-primary" />
          দূরত্ব ও নেভিগেশন
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {distanceFromUser !== null && (
          <div
            className="flex items-center justify-between p-3 bg-primary/10 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors"
            onClick={openGoogleMapsNavigation}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <span className="font-medium">আপনার অবস্থান থেকে</span>
                <p className="text-xs text-muted-foreground">
                  ট্যাপ করে দিকনির্দেশনা পান
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-primary">
                {distanceFromUser < 1
                  ? `${(distanceFromUser * 1000).toFixed(0)} মিটার`
                  : `${distanceFromUser.toFixed(1)} কিমি`}
              </span>
              <ExternalLink className="w-4 h-4 text-primary" />
            </div>
          </div>
        )}

        <Button
          variant="outline"
          className="w-full"
          onClick={openGoogleMapsNavigation}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          ম্যাপে দেখুন ও নেভিগেট করুন
        </Button>
      </CardContent>
    </Card>
  );
};

export default HouseNavigationSection;
