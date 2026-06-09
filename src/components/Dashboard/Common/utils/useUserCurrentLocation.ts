"use client";
import { TUserLocation } from "@/interfaces/location";
import { useFindLocationQuery } from "@/redux/features/location.feature";

const useUserCurrentLocation = () => {
  const { data, isLoading: getLoading } = useFindLocationQuery(undefined);
  const locations = (data?.data as TUserLocation[]) || [];
  const filterDefault = locations?.find(
    (l: TUserLocation) => l.is_default === true
  );

  return {
    location: filterDefault,
    loading: getLoading,
  };
};

export default useUserCurrentLocation;
