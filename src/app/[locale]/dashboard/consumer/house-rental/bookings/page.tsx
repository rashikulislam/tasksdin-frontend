"use client";
import HouseBookings from "@/components/Dashboard/Consumer/HouseRental/DashboardContent/HouseBookings";
import { House } from "@/components/Dashboard/Consumer/HouseRental/data/mockHouseData";
import HouseDetails from "@/components/Dashboard/Consumer/HouseRental/HouseDetails/HouseDetails";
import { useHouseRental } from "@/components/Dashboard/Consumer/HouseRental/contexts/HouseRentalContext";
import { useState } from "react";

const HouseBookingsPage = () => {
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const { userLocation, bookings, handleCancelBooking, handleBookingComplete } =
    useHouseRental();

  if (selectedHouse) {
    return (
      <HouseDetails
        house={selectedHouse}
        userLocation={userLocation}
        onBookingComplete={(paymentDetails, moveInDate) =>
          handleBookingComplete(selectedHouse, paymentDetails, moveInDate)
        }
      />
    );
  }

  return (
    <div className="container-mobile py-6">
      <HouseBookings
        bookings={bookings}
        onViewHouse={setSelectedHouse}
        onCancelBooking={handleCancelBooking}
      />
    </div>
  );
};

export default HouseBookingsPage;
