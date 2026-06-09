import { createContext, useContext, useState, ReactNode } from "react";

import { toast } from "@/hooks/use-toast";
import {
  Booking,
  FilterState,
  House,
  mockHouses,
  PaymentDetails,
} from "@/components/Dashboard/Consumer/HouseRental/data/mockHouseData";

interface HouseRentalContextType {
  // Location
  userLocation: { lat: number; lng: number } | null;
  isLoadingLocation: boolean;
  getUserLocation: () => void;
  showDistanceOnCards: boolean;
  // Important Place for distance calculation
  selectedImportantPlace: { lat: number; lng: number; name: string } | null;
  setSelectedImportantPlace: (
    place: { lat: number; lng: number; name: string } | null,
  ) => void;
  selectedHouse: House | null;
  setSelectedHouse: React.Dispatch<React.SetStateAction<House | null>>;
  // Favorites
  favorites: string[];
  toggleFavorite: (houseId: string) => void;
  favoriteHouses: House[];
  // Bookings
  bookings: Booking[];
  handleBookingComplete: (
    house: House,
    paymentDetails: PaymentDetails,
    moveInDate: Date,
  ) => void;
  handleCancelBooking: (bookingId: string) => void;
  // Filters
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  clearFilters: () => void;
  filteredHouses: House[];
  sortedHouses: House[];
  // Update Filters
  updateFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  clearPlaceFilter: () => void;
  showPlaceModal: boolean;
  setShowPlaceModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const HouseRentalContext = createContext<HouseRentalContextType | undefined>(
  undefined,
);

export const useHouseRental = () => {
  const context = useContext(HouseRentalContext);
  if (!context) {
    throw new Error("useHouseRental must be used within HouseRentalProvider");
  }
  return context;
};

const defaultFilters: FilterState = {
  search: "",
  area: "All Areas",
  houseType: "All Types",
  rentRange: { min: 0, max: Infinity },
  bedrooms: "any",
  furnished: false,
  parking: false,
  petFriendly: false,
  importantPlace: null,
  maxDistanceKm: 5,
};

// Haversine formula to calculate distance in km
const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number => {
  const R = 6371; // Earth's radius in km
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

export const HouseRentalProvider = ({ children }: { children: ReactNode }) => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showDistanceOnCards, setShowDistanceOnCards] = useState(false);
  const [selectedImportantPlace, setSelectedImportantPlace] = useState<{
    lat: number;
    lng: number;
    name: string;
  } | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "booking-demo-1",
      house: mockHouses[0],
      bookingDate: new Date(Date.now() - 86400000 * 5),
      moveInDate: new Date(Date.now() + 86400000 * 10),
      status: "confirmed",
      paymentStatus: "paid",
      paymentMethod: "bkash",
      amount: mockHouses[0].rent * 0.1 + 500,
      transactionId: "TXN123456789",
      createdAt: new Date(Date.now() - 86400000 * 5),
    },
    {
      id: "booking-demo-2",
      house: mockHouses[1],
      bookingDate: new Date(Date.now() - 86400000 * 2),
      moveInDate: new Date(Date.now() + 86400000 * 15),
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: "nagad",
      amount: mockHouses[1].rent * 0.1 + 500,
      transactionId: "",
      createdAt: new Date(Date.now() - 86400000 * 2),
    },
  ]);

  // Update the filters data
  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearPlaceFilter = () => {
    updateFilter("importantPlace", null);
    updateFilter("maxDistanceKm", 5);
    setSelectedImportantPlace(null);
  };

  const clearFilters = () => setFilters(defaultFilters);

  const getUserLocation = () => {
    setIsLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setShowDistanceOnCards(true);
          toast({
            title: "লোকেশন পাওয়া গেছে",
            description: "হাউস কার্ডে আপনার অবস্থান থেকে দূরত্ব দেখানো হচ্ছে",
          });
          setIsLoadingLocation(false);
        },
        () => {
          toast({
            title: "লোকেশন ত্রুটি",
            description: "লোকেশন পেতে পারিনি।",
            variant: "destructive",
          });
          setIsLoadingLocation(false);
        },
      );
    } else {
      toast({
        title: "সমর্থিত নয়",
        description: "আপনার ব্রাউজার লোকেশন সমর্থন করে না।",
        variant: "destructive",
      });
      setIsLoadingLocation(false);
    }
  };

  const toggleFavorite = (houseId: string) => {
    if (favorites.includes(houseId)) {
      setFavorites(favorites.filter((id) => id !== houseId));
      toast({ title: "পছন্দ থেকে সরানো হয়েছে" });
    } else {
      setFavorites([...favorites, houseId]);
      toast({ title: "পছন্দের তালিকায় যোগ করা হয়েছে" });
    }
  };

  const handleBookingComplete = (
    house: House,
    paymentDetails: PaymentDetails,
    moveInDate: Date,
  ) => {
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      house,
      bookingDate: new Date(),
      moveInDate,
      status: "confirmed",
      paymentStatus: "paid",
      paymentMethod: paymentDetails.method,
      amount: paymentDetails.amount,
      transactionId: paymentDetails.transactionId,
      createdAt: new Date(),
    };
    setBookings([newBooking, ...bookings]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(bookings.filter((b) => b.id !== bookingId));
    toast({ title: "বুকিং বাতিল হয়েছে" });
  };

  const filteredHouses = mockHouses.filter((house) => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        house.title.toLowerCase().includes(searchLower) ||
        house.location.toLowerCase().includes(searchLower) ||
        house.area.toLowerCase().includes(searchLower) ||
        house.city.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    if (filters.area !== "All Areas" && house.area !== filters.area)
      return false;
    if (
      filters.houseType !== "All Types" &&
      house.houseType !== filters.houseType
    )
      return false;
    if (
      house.rent < filters.rentRange.min ||
      house.rent > filters.rentRange.max
    )
      return false;
    if (filters.bedrooms !== "any") {
      const bedroomCount = parseInt(filters.bedrooms);
      if (
        filters.bedrooms === "4"
          ? house.bedrooms < 4
          : house.bedrooms !== bedroomCount
      )
        return false;
    }
    if (filters.furnished && !house.furnished) return false;
    if (filters.parking && !house.parking) return false;
    if (filters.petFriendly && !house.petFriendly) return false;

    // Filter by important place distance
    if (filters.importantPlace) {
      const distanceToPlace = calculateDistance(
        filters.importantPlace.coordinates.lat,
        filters.importantPlace.coordinates.lng,
        house.coordinates.lat,
        house.coordinates.lng,
      );
      if (distanceToPlace > filters.maxDistanceKm) return false;
    }

    return true;
  });

  // Sort houses based on important place or user location
  const sortedHouses = (() => {
    if (filters.importantPlace) {
      // Sort by distance from important place (closest first)
      return [...filteredHouses].sort((a, b) => {
        const distA = calculateDistance(
          filters.importantPlace!.coordinates.lat,
          filters.importantPlace!.coordinates.lng,
          a.coordinates.lat,
          a.coordinates.lng,
        );
        const distB = calculateDistance(
          filters.importantPlace!.coordinates.lat,
          filters.importantPlace!.coordinates.lng,
          b.coordinates.lat,
          b.coordinates.lng,
        );
        return distA - distB;
      });
    } else if (userLocation) {
      // Sort by distance from user location
      return [...filteredHouses].sort((a, b) => {
        const distA = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          a.coordinates.lat,
          a.coordinates.lng,
        );
        const distB = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          b.coordinates.lat,
          b.coordinates.lng,
        );
        return distA - distB;
      });
    }
    return filteredHouses;
  })();

  const favoriteHouses = mockHouses.filter((h) => favorites.includes(h.id));

  return (
    <HouseRentalContext.Provider
      value={{
        userLocation,
        isLoadingLocation,
        getUserLocation,
        showDistanceOnCards,
        selectedImportantPlace,
        setSelectedImportantPlace,
        favorites,
        toggleFavorite,
        favoriteHouses,
        bookings,
        handleBookingComplete,
        handleCancelBooking,
        filters,
        setFilters,
        updateFilter,
        clearFilters,
        filteredHouses,
        sortedHouses,
        clearPlaceFilter,
        showPlaceModal,
        setShowPlaceModal,
        selectedHouse,
        setSelectedHouse,
      }}
    >
      {children}
    </HouseRentalContext.Provider>
  );
};
