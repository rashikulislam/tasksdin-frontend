"use client";

import React, { useState } from "react";
import { MapPin, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import GoogleMapModal from "@/components/Modal/GoogleMapModal";
import {
  useChangeLocationMutation,
  useCreateNewLocationMutation,
  useFindLocationQuery,
} from "@/redux/features/location.feature";
import { getUserInformation } from "@/service/auth.services";
import { useAlert } from "@/components/Reusable/AlertModal";
import { TUserLocation } from "@/interfaces/location";

type Address = {
  formattedAddress: string;
};

type LocationData = {
  address: Address;
  position: { lat: number; lng: number };
};

const LocationManage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bgLoading, setBgLoading] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const { data, isLoading: getLoading } = useFindLocationQuery(undefined);
  const { showAlert } = useAlert();
  const [mutateAsync, { isLoading }] = useCreateNewLocationMutation();
  const [changeLocationAsync, { isLoading: changeLoading }] =
    useChangeLocationMutation();
  const user = getUserInformation();
  // Function to get user's current location
  const fetchCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject("Geolocation not supported");

      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => reject("Permission denied"),
        { enableHighAccuracy: true, maximumAge: 0 },
      );
    });
  };

  const handleOpenModal = async () => {
    setBgLoading(true);
    try {
      const position = await fetchCurrentLocation();
      setLocation({
        position,
        address: { formattedAddress: "" },
      });
    } catch (err) {
      console.warn("Could not get location:", err);
    } finally {
      setIsModalOpen(true);
      setBgLoading(false);
    }
  };

  const handleSendDataToBackend = async (loc: LocationData) => {
    if (!loc?.address) return;

    try {
      const data = {
        location: loc,
        user_id: user?.user_id,
      };

      const result = await mutateAsync(data).unwrap();
      if (result?.success) {
        setIsModalOpen(false);
        return showAlert({
          title: result?.message,
          type: "success",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsModalOpen(false);
      return showAlert({
        title: error?.data?.message || "Something went wrong.",
        type: "error",
      });
    }
  };

  const locations = (data?.data as TUserLocation[]) || [];
  const filterDefault = locations?.find(
    (l: TUserLocation) => l.is_default === true,
  );

  const handleLocationChange = async (id: string) => {
    try {
      const result = await changeLocationAsync(id).unwrap();
      if (result?.success) {
        setIsModalOpen(false);
        return showAlert({
          title: result?.message,
          type: "success",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsModalOpen(false);
      return showAlert({
        title: error?.data?.message || "Something went wrong.",
        type: "error",
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 font-medium text-muted-foreground dark:text-slate-200 hover:text-foreground hover:bg-muted/50 outline-none">
            <MapPin className="h-4 w-4 " />
            {getLoading || changeLoading ? (
              <span className="truncate">Loading...</span>
            ) : (
              <span className="truncate">
                {filterDefault
                  ? filterDefault?.label?.split(",")[0]
                  : "Location"}
              </span>
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuLabel>Your Location</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!locations?.length ? (
            ""
          ) : (
            <>
              {locations?.map((l) => (
                <DropdownMenuItem
                  onClick={() => handleLocationChange(l?.location_id)}
                  key={l?.location_id}
                  className="flex justify-between cursor-pointer"
                >
                  <span className="truncate">{l?.label}</span>
                  {l.is_default === true && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </DropdownMenuItem>
              ))}
            </>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleOpenModal}
            className="text-primary font-medium cursor-pointer border-none outline-none"
          >
            Change location
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isModalOpen && location?.position && (
        <GoogleMapModal
          isOpen={isModalOpen}
          isLoading={isLoading}
          onClose={() => setIsModalOpen(false)}
          onConfirm={(address, position) => {
            const newLocation = { address, position };
            setLocation(newLocation);
            handleSendDataToBackend(newLocation);
          }}
        />
      )}

      {bgLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
        </div>
      )}
    </>
  );
};

export default LocationManage;
