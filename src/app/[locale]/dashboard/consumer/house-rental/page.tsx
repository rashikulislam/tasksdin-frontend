"use client";

import { MapPin } from "lucide-react";
import HouseDetails from "@/components/Dashboard/Consumer/HouseRental/HouseDetails/HouseDetails";
import HouseFilters from "@/components/Dashboard/Consumer/HouseRental/DashboardContent/HouseFilter/HouseFilters";
import HouseCard from "@/components/Dashboard/Consumer/HouseRental/DashboardContent/HouseCard/HouseCard";
import { useHouseRental } from "@/components/Dashboard/Consumer/HouseRental/contexts/HouseRentalContext";

const HouseFindPage = () => {
  const { userLocation, sortedHouses, handleBookingComplete, selectedHouse } =
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
    <>
      <div className="bg-background border-b border-border">
        <div className="container-mobile py-4">
          {/* House Filters */}
          <HouseFilters />
        </div>
      </div>
      <div className="container-mobile py-6">
        {sortedHouses.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              কোনো বাসা পাওয়া যায়নি
            </h3>
            <p className="text-muted-foreground mb-4">
              ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {sortedHouses.map((house) => (
              <HouseCard key={house.id} house={house} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HouseFindPage;
