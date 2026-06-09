"use client";

import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

type UserLocation = {
  lat: number;
  lng: number;
};

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const getUserLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      toast({
        title: "সমর্থিত নয়",
        description: "আপনার ব্রাউজার লোকেশন সাপোর্ট করে না",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        toast({
          title: "লোকেশন পাওয়া গেছে",
          description: "আপনার বর্তমান অবস্থান ব্যবহার করা হচ্ছে",
        });

        setIsLoadingLocation(false);
      },
      () => {
        toast({
          title: "লোকেশন পাওয়া যায়নি",
          description: "অনুগ্রহ করে লোকেশন পারমিশন দিন",
          variant: "destructive",
        });

        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }, []);

  return {
    userLocation,
    isLoadingLocation,
    getUserLocation,
    setUserLocation,
  };
}
