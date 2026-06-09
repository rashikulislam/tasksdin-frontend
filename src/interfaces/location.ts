export type AddressType =
  | "ROOFTOP"
  | "RANGE_INTERPOLATED"
  | "GEOMETRIC_CENTER"
  | "APPROXIMATE";

export type TUserLocation = {
  location_id: string;
  user_id?: string;

  label?: string;
  street?: string;
  area?: string;
  city?: string;
  postalCode?: string;
  country?: string;

  latitude: number;
  longitude: number;

  address_type?: AddressType;
  is_default: boolean;

  createdAt: string; // ISO string from backend
  updatedAt: string; // ISO string from backend
};
