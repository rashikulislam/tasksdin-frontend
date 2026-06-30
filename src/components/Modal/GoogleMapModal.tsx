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
type Address = {
  formattedAddress: string;
  houseNo?: string;
  street?: string;
  area?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  locationType?: string;
};

type GoogleMapModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (address: Address, position: LatLng) => void;
  isLoading: boolean;
};

const containerStyle = {
  width: "100%",
  height: "280px",
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  gestureHandling: "greedy",
  clickableIcons: false,
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
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY! || "AIzaSyBZ5cSdOkFQYyo_CH4E_gn8X_WHi3kJ_oE",
  });

  useEffect(() => {
    if (!isOpen) return;
    if (!navigator.geolocation) {
      setPinPosition({ lat: 23.8103, lng: 90.4125 });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setPinPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setPinPosition({ lat: 23.8103, lng: 90.4125 }),
      { enableHighAccuracy: true }
    );
  }, [isOpen]);

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      setLoadingAddress(true);
      const res = await fetch(`/api/google-map?lat=${lat}&lng=${lng}`);
      const data = await res.json();
      setTempAddress(data);
      setInfoOpen(true);
    } catch {
      // silent
    } finally {
      setLoadingAddress(false);
    }
  };

  const handleDragEnd = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setPinPosition({ lat, lng });
    await fetchAddress(lat, lng);
  };

  useEffect(() => {
    if (pinPosition) fetchAddress(pinPosition.lat, pinPosition.lng);
  }, [pinPosition]);

  const addressLabel = tempAddress
    ? `${tempAddress.houseNo ? tempAddress.houseNo + ", " : ""}${tempAddress.formattedAddress}`
    : "";

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="লোকেশন ঠিক করুন" width="xl">
      <div className="bg-white rounded-lg flex flex-col gap-3 p-3">
        {/* Map */}
        <div className="rounded-lg overflow-hidden border border-gray-200">
          {!isLoaded || !pinPosition ? (
            <div className="h-[280px] flex items-center justify-center text-sm text-gray-400">
              Map লোড হচ্ছে...
            </div>
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
                    <div style={{ color: "#111827", fontSize: "13px", maxWidth: "200px", fontFamily: "sans-serif" }}>
                      {addressLabel}
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            </GoogleMap>
          )}
        </div>

        {/* Address preview */}
        <div className="px-1 min-h-[36px] flex items-center">
          <p className="text-sm text-gray-600">
            {loadingAddress
              ? "ঠিকানা খোঁজা হচ্ছে..."
              : addressLabel || "Pin টা সঠিক জায়গায় সরান"}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
          >
            বাতিল
          </button>
          <button
            type="button"
            disabled={!tempAddress || !pinPosition || isLoading}
            onClick={() => {
              if (!tempAddress || !pinPosition) return;
              onConfirm(tempAddress, pinPosition);
            }}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? "সেভ হচ্ছে..." : "লোকেশন নিশ্চিত করুন"}
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default GoogleMapModal;
