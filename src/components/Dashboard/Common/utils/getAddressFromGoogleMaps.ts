/* eslint-disable @typescript-eslint/no-explicit-any */
type GoogleAddress = {
  houseNo?: string;
  road?: string;
  area?: string;
};

export const getAddressFromGoogleMaps = async (
  lat: number,
  lng: number
): Promise<GoogleAddress> => {
  const API_KEY = "AIzaSyC85bYFhPIWhZXwY1CiRp2RdXnvXYpEmJw";

  if (!API_KEY) throw new Error("Google Maps API key missing");

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
  );

  if (!res.ok) throw new Error("Failed to fetch address from Google Maps");

  const data = await res.json();

  if (data.status !== "OK" || !data.results.length)
    throw new Error("No address found");

  const components = data.results[0].address_components;

  // Extract house number, road, and area
  const houseComp = components.find((c: any) =>
    c.types.includes("street_number")
  );
  const roadComp = components.find((c: any) => c.types.includes("route"));
  const areaComp = components.find(
    (c: any) =>
      c.types.includes("sublocality_level_1") ||
      c.types.includes("neighborhood")
  );

  return {
    houseNo: houseComp?.long_name || "",
    road: roadComp?.long_name || "",
    area: areaComp?.long_name || "",
  };
};
