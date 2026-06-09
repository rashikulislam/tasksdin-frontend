"use client";

import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

type LatLng = { lat: number; lng: number };
type Address = { formattedAddress: string; houseNo?: string };

type GoogleMapPickerProps = {
  setLocation: (location: LatLng) => void;
  setAddress?: (address: Address) => void; // optional
};

const containerStyle = {
  width: "100%",
  height: "300px",
};

const mapOptions: google.maps.MapOptions = {
  zoom: 14,
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  gestureHandling: "greedy",
  clickableIcons: false,
};

const GoogleMapPicker: React.FC<GoogleMapPickerProps> = ({
  setLocation,
  setAddress,
}) => {
  const [pinPosition, setPinPosition] = useState<LatLng | null>(null);
  const [tempAddress, setTempAddress] = useState<Address | null>(null);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [infoOpen, setInfoOpen] = useState(true);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  // 📍 Get current location
  useEffect(() => {
    if (!navigator.geolocation) {
      const fallback = { lat: 23.8103, lng: 90.4125 };
      setPinPosition(fallback);
      setLocation(fallback);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setPinPosition(location);
        setLocation(location);
      },
      () => {
        const fallback = { lat: 23.8103, lng: 90.4125 };
        setPinPosition(fallback);
        setLocation(fallback);
      },
      { enableHighAccuracy: true },
    );
  }, [setLocation]);

  // 🔁 Reverse geocode (same API you used)
  const fetchAddress = async (lat: number, lng: number) => {
    try {
      setLoadingAddress(true);
      const res = await fetch(`/api/google-map?lat=${lat}&lng=${lng}`);
      const data = await res.json();

      setTempAddress(data);
      setAddress?.(data);
      setInfoOpen(true);
    } catch (err) {
      console.error("Reverse geocode failed", err);
    } finally {
      setLoadingAddress(false);
    }
  };

  // 📌 Marker drag
  const handleDragEnd = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const location = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    setPinPosition(location);
    setLocation(location); // 🔥 send to parent
    await fetchAddress(location.lat, location.lng);
  };

  // 📍 First load address
  useEffect(() => {
    if (pinPosition) {
      fetchAddress(pinPosition.lat, pinPosition.lng);
    }
  }, [pinPosition]);

  if (!isLoaded || !pinPosition) {
    return <p className="text-sm text-muted-foreground">Map loading...</p>;
  }

  return (
    <div className="w-full rounded-lg bg-white p-4">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={pinPosition}
        zoom={17}
        options={mapOptions}
      >
        <Marker
          position={pinPosition}
          draggable
          onDragEnd={handleDragEnd}
          animation={google.maps.Animation.DROP}
        >
          {infoOpen && tempAddress && (
            <InfoWindow
              position={pinPosition}
              onCloseClick={() => setInfoOpen(false)}
            >
              <div className="text-sm max-w-[220px]">
                {tempAddress.houseNo
                  ? `${tempAddress.houseNo}, ${tempAddress.formattedAddress}`
                  : tempAddress.formattedAddress}
              </div>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>

      <p className="mt-2 text-sm text-muted-foreground">
        {loadingAddress
          ? "ঠিকানা খোঁজা হচ্ছে..."
          : tempAddress
            ? `${tempAddress.houseNo ? tempAddress.houseNo + ", " : ""}${
                tempAddress.formattedAddress
              }`
            : "Pin টা সঠিক জায়গায় নড়ান"}
      </p>
    </div>
  );
};

export default GoogleMapPicker;
