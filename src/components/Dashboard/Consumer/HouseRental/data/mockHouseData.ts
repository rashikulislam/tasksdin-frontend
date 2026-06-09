export interface HouseRentalNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onPostTaskClick?: () => void;
  onSectionChange?: (section: string) => void;
  userLocation: { lat: number; lng: number } | null;
  isLoadingLocation: boolean;
  onGetLocation: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    activeContracts?: number;
    unreadMessages?: number;
  };
}

export interface House {
  id: string;
  title: string;
  description: string;
  location: string;
  area: string;
  city: string;
  rent: number;
  rentType: "monthly" | "yearly" | "weekly";
  bedrooms: number;
  bathrooms: number;
  size: number;
  images: string[];
  facilities: string[];
  rules: string[];
  availableFrom: string;
  isAvailable: boolean;
  providerId: string;
  providerName: string;
  providerPhone: string;
  providerPhoto: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  totalReviews: number;
  houseType: "apartment" | "house" | "room" | "studio" | "duplex";
  furnished: boolean;
  parking: boolean;
  petFriendly: boolean;
  createdAt: string;
}

export interface HouseCardProps {
  house: House;
}

export type PaymentMethod = "bkash" | "nagad" | "card" | "cash";

export interface Booking {
  id: string;
  house: House;
  bookingDate: Date;
  moveInDate: Date;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "pending" | "paid";
  paymentMethod: PaymentMethod;
  amount: number;
  transactionId?: string;
  createdAt: Date;
}

export interface HouseBookingsProps {
  bookings: Booking[];
  onCancelBooking?: (bookingId: string) => void;
  onViewHouse: React.Dispatch<React.SetStateAction<House | null>>;
}

export interface PaymentDetails {
  amount: number;
  method: "bkash" | "nagad" | "card" | "cash";
  transactionId?: string;
  paidAt?: Date;
}

export interface HouseDistanceSearchProps {
  open: boolean;
  onClose: () => void;
  house: House;
  userLocation?: { lat: number; lng: number } | null;
}

// export interface HouseFavoritesProps {
//   favorites: House[];
//   onViewDetails: (house: House) => void;
//   onRemoveFavorite: (houseId: string) => void;
//   userLocation?: { lat: number; lng: number } | null;
//   onGoToSearch: () => void;
// }

export interface SearchResult {
  name: string;
  type: string;
  distance: string;
  duration: string;
}

export interface ImportantPlace {
  id: string;
  name: string;
  type: string;
  icon: React.ReactNode;
  coordinates: { lat: number; lng: number };
}

export interface FilterState {
  search: string;
  area: string;
  houseType: string;
  rentRange: { min: number; max: number };
  bedrooms: string;
  furnished: boolean;
  parking: boolean;
  petFriendly: boolean;
  importantPlace: ImportantPlace | null;
  maxDistanceKm: number;
}

export interface HouseFiltersProps {
  filters: FilterState;
  priceRange: number[];
  handlePriceChange: (values: number[]) => void;
  onClearPlaceFilter: () => void;
  onClearFilters: () => void;
  totalResults: number;
  showPlaceModal: boolean;
  onShowPlaceModal: () => void;
  setShowPlaceModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
}

export interface GooglePlacePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export const mockHouses: House[] = [
  {
    id: "1",
    title: "Modern 3 Bedroom Apartment in Gulshan",
    description:
      "Beautiful modern apartment with all amenities. Spacious living room, fully equipped kitchen, and private balcony with city view. Located in a prime area with easy access to markets, restaurants, and transportation.",
    location: "Road 12, Gulshan 1",
    area: "Gulshan",
    city: "Dhaka",
    rent: 45000,
    rentType: "monthly",
    bedrooms: 3,
    bathrooms: 2,
    size: 1800,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    ],
    facilities: [
      "WiFi",
      "AC",
      "Generator Backup",
      "Lift",
      "Security Guard",
      "CCTV",
      "Gym Access",
      "Swimming Pool",
    ],
    rules: [
      "No smoking inside",
      "No loud music after 10 PM",
      "Guests allowed with prior notice",
    ],
    availableFrom: "2024-02-01",
    isAvailable: true,
    providerId: "p1",
    providerName: "Rahman Properties",
    providerPhone: "+8801712345678",
    providerPhoto:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    coordinates: { lat: 23.7925, lng: 90.4078 },
    rating: 4.8,
    totalReviews: 24,
    houseType: "apartment",
    furnished: true,
    parking: true,
    petFriendly: false,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Cozy Studio Near University",
    description:
      "Perfect for students! Compact but well-designed studio apartment near Dhaka University. Includes study desk, kitchen space, and attached bathroom. Very affordable rent with all utilities included.",
    location: "Shahbagh, Near TSC",
    area: "Shahbagh",
    city: "Dhaka",
    rent: 12000,
    rentType: "monthly",
    bedrooms: 1,
    bathrooms: 1,
    size: 450,
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
    ],
    facilities: ["WiFi", "AC", "Study Desk", "24/7 Water Supply"],
    rules: ["Students only", "No pets", "Quiet hours 10 PM - 8 AM"],
    availableFrom: "2024-01-25",
    isAvailable: true,
    providerId: "p2",
    providerName: "Student Housing BD",
    providerPhone: "+8801898765432",
    providerPhoto:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    coordinates: { lat: 23.7337, lng: 90.3958 },
    rating: 4.5,
    totalReviews: 56,
    houseType: "studio",
    furnished: true,
    parking: false,
    petFriendly: false,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Family House with Garden in Uttara",
    description:
      "Spacious family home with private garden and garage. Perfect for families looking for a peaceful environment. 4 bedrooms, modern kitchen, and large dining area. Close to schools and shopping malls.",
    location: "Sector 7, Uttara",
    area: "Uttara",
    city: "Dhaka",
    rent: 65000,
    rentType: "monthly",
    bedrooms: 4,
    bathrooms: 3,
    size: 2500,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    ],
    facilities: [
      "Garden",
      "Garage",
      "Generator",
      "Rooftop Access",
      "Servant Room",
      "Store Room",
    ],
    rules: ["Family preferred", "Long-term lease minimum 1 year"],
    availableFrom: "2024-03-01",
    isAvailable: true,
    providerId: "p3",
    providerName: "Ahmed Real Estate",
    providerPhone: "+8801555123456",
    providerPhoto:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    coordinates: { lat: 23.8759, lng: 90.3795 },
    rating: 4.9,
    totalReviews: 12,
    houseType: "house",
    furnished: false,
    parking: true,
    petFriendly: true,
    createdAt: "2024-01-20",
  },
  {
    id: "4",
    title: "Bachelor Friendly Room in Mirpur",
    description:
      "Affordable single room for bachelors. Shared kitchen and bathroom facilities. Located in a residential building with good security. Close to Mirpur 10 metro station.",
    location: "Mirpur 10, Block D",
    area: "Mirpur",
    city: "Dhaka",
    rent: 6000,
    rentType: "monthly",
    bedrooms: 1,
    bathrooms: 1,
    size: 200,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
    ],
    facilities: ["Shared Kitchen", "WiFi", "Common Area", "Laundry"],
    rules: ["Bachelors only", "No guests overnight", "Keep common areas clean"],
    availableFrom: "2024-01-20",
    isAvailable: true,
    providerId: "p4",
    providerName: "Karim Housing",
    providerPhone: "+8801612345678",
    providerPhoto:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200",
    coordinates: { lat: 23.8069, lng: 90.3687 },
    rating: 4.2,
    totalReviews: 89,
    houseType: "room",
    furnished: true,
    parking: false,
    petFriendly: false,
    createdAt: "2024-01-18",
  },
  {
    id: "5",
    title: "Luxury Duplex in Banani",
    description:
      "Premium duplex apartment with stunning city views. Features high-end finishes, smart home technology, and private terrace. Perfect for professionals seeking luxury living.",
    location: "Banani DOHS, Road 4",
    area: "Banani",
    city: "Dhaka",
    rent: 120000,
    rentType: "monthly",
    bedrooms: 4,
    bathrooms: 4,
    size: 3500,
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800",
    ],
    facilities: [
      "Smart Home",
      "Private Terrace",
      "Jacuzzi",
      "Home Theater",
      "Wine Cellar",
      "24/7 Concierge",
    ],
    rules: ["Corporate tenants preferred", "Security deposit 3 months"],
    availableFrom: "2024-02-15",
    isAvailable: true,
    providerId: "p5",
    providerName: "Elite Properties BD",
    providerPhone: "+8801911234567",
    providerPhoto:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200",
    coordinates: { lat: 23.7937, lng: 90.4066 },
    rating: 5.0,
    totalReviews: 8,
    houseType: "duplex",
    furnished: true,
    parking: true,
    petFriendly: true,
    createdAt: "2024-01-22",
  },
  {
    id: "6",
    title: "2 Bedroom Flat in Dhanmondi",
    description:
      "Well-maintained 2 bedroom apartment in the heart of Dhanmondi. Close to Dhanmondi Lake, restaurants, and shopping centers. Ideal for small families or couples.",
    location: "Dhanmondi Road 27",
    area: "Dhanmondi",
    city: "Dhaka",
    rent: 35000,
    rentType: "monthly",
    bedrooms: 2,
    bathrooms: 2,
    size: 1200,
    images: [
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800",
    ],
    facilities: ["AC", "Gas Connection", "Lift", "Security", "Intercom"],
    rules: ["Family or couples only", "2 months advance required"],
    availableFrom: "2024-01-28",
    isAvailable: true,
    providerId: "p1",
    providerName: "Rahman Properties",
    providerPhone: "+8801712345678",
    providerPhoto:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    coordinates: { lat: 23.7461, lng: 90.3742 },
    rating: 4.6,
    totalReviews: 34,
    houseType: "apartment",
    furnished: false,
    parking: true,
    petFriendly: false,
    createdAt: "2024-01-12",
  },
];

export const areas = [
  "All Areas",
  "Gulshan",
  "Banani",
  "Dhanmondi",
  "Uttara",
  "Mirpur",
  "Shahbagh",
  "Mohakhali",
  "Bashundhara",
];

export const houseTypes = [
  "All Types",
  "apartment",
  "house",
  "room",
  "studio",
  "duplex",
];

export const rentRanges = [
  { label: "Any Budget", min: 0, max: Infinity },
  { label: "Under ৳10,000", min: 0, max: 10000 },
  { label: "৳10,000 - ৳25,000", min: 10000, max: 25000 },
  { label: "৳25,000 - ৳50,000", min: 25000, max: 50000 },
  { label: "৳50,000 - ৳100,000", min: 50000, max: 100000 },
  { label: "Above ৳100,000", min: 100000, max: Infinity },
];

export const DEFAULT_BOOKINGS: Booking[] = [
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
];
