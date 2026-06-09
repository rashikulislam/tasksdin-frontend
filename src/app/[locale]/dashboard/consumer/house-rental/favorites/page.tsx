"use client";

import { useHouseRental } from "@/components/Dashboard/Consumer/HouseRental/contexts/HouseRentalContext";
import HouseDetails from "@/components/Dashboard/Consumer/HouseRental/HouseDetails/HouseDetails";
import HouseFavorites from "@/components/Dashboard/Consumer/HouseRental/DashboardContent/HouseFavorites";

export default function HouseFavoritesPage() {

  const {
    userLocation,
    selectedHouse,
    handleBookingComplete,
  } = useHouseRental();

  // Details View
  if (selectedHouse) {
    return (
      <HouseDetails
        house={selectedHouse}
        userLocation={userLocation}
        onBookingComplete={(paymentDetails, moveInDate) =>
          handleBookingComplete(
            selectedHouse,
            paymentDetails,
            moveInDate ?? new Date(),
          )
        }
      />
    );
  }

  // Favorites List
  return (
    <div className="container-mobile py-6">
      <HouseFavorites />
    </div>
  );
}
