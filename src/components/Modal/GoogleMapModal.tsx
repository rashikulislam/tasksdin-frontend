"use client";

import React, { useEffect, useState } from "react";
import CustomModal from "../Reusable/CustomModal";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";

type LatLng = { lat: number; lng: number };
type Address = { formattedAddress: string; houseNo?: string };

type GoogleMapModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (address: Address, position: LatLng) => void;
  isLoading: boolean;
};

const containerStyle = {
  width: "100%",
  height: "400px",
};

const mapOptions: google.maps.MapOptions = {
  zoom: 14,
  disableDefaultUI: true, // disable all default UI for cleaner look
  zoomControl: true, // keep zoom control
  streetViewControl: false, // hide Street View for cleaner UI
  mapTypeControl: false, // hide map type control
  fullscreenControl: true, // keep fullscreen option

  gestureHandling: "greedy", // allow better mobile zooming
  clickableIcons: false, // hide default Google POI icons
};

const GoogleMapModal = ({
  isOpen,
  onClose,
  isLoading,
  onConfirm,
}: GoogleMapModalProps) => {
  const [pinPosition, setPinPosition] = useState<LatLng | null>(null);
  const [tempAddress, setTempAddress] = useState<Address | null>(null);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [infoOpen, setInfoOpen] = useState(true);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY! ||
      "AIzaSyBZ5cSdOkFQYyo_CH4E_gn8X_WHi3kJ_oE",
  });

  useEffect(() => {
    if (!isOpen) return;
    if (!navigator.geolocation) {
      setPinPosition({ lat: 23.8103, lng: 90.4125 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        setPinPosition({ lat: latitude, lng: longitude });
      },
      () => {
        setPinPosition({ lat: 23.8103, lng: 90.4125 });
      },
      { enableHighAccuracy: true }
    );
  }, [isOpen]);

  // 🔁 Reverse geocode
  const fetchAddress = async (lat: number, lng: number) => {
    try {
      setLoadingAddress(true);
      const res = await fetch(`/api/google-map?lat=${lat}&lng=${lng}`);
      const data = await res.json();
      console.log(data);
      setTempAddress(data);
      setInfoOpen(true);
    } catch (err) {
      console.error("Reverse geocode failed", err);
    } finally {
      setLoadingAddress(false);
    }
  };

  // 📌 Marker drag handler
  const handleDragEnd = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setPinPosition({ lat, lng });
    await fetchAddress(lat, lng);
  };

  // 📍 Fetch first address when pinPosition ready
  useEffect(() => {
    if (pinPosition) fetchAddress(pinPosition.lat, pinPosition.lng);
  }, [pinPosition]);

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="লোকেশন ঠিক করুন"
      width="xl"
    >
      <div className="w-full rounded-lg bg-white p-4">
        {!isLoaded || !pinPosition ? (
          <p className="text-sm text-muted-foreground">Map loading...</p>
        ) : (
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
                  <div className="text-sm">
                    {tempAddress.houseNo
                      ? `${tempAddress.houseNo}, ${tempAddress.formattedAddress}`
                      : tempAddress.formattedAddress}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          </GoogleMap>
        )}

        <p className="mt-2 text-sm text-muted-foreground">
          {loadingAddress
            ? "ঠিকানা খোঁজা হচ্ছে..."
            : tempAddress
            ? `${tempAddress.houseNo ? tempAddress.houseNo + ", " : ""}${
                tempAddress.formattedAddress
              }`
            : "Pin টা সঠিক জায়গায় নড়ান"}
        </p>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            disabled={!tempAddress || !pinPosition || isLoading}
            onClick={() => {
              if (!tempAddress || !pinPosition) return;
              onConfirm(tempAddress, pinPosition);
            }}
            className="px-4 py-2 text-sm rounded bg-primary text-white disabled:opacity-50"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default GoogleMapModal;
