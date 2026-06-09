export const getAddressFromMapbox = async (
  lat: number,
  lng: number
): Promise<string> => {
  const MAPBOX_SECRET_TOKEN = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN;

  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_SECRET_TOKEN}`
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Mapbox response:", res.status, text);
    throw new Error("Failed to fetch address from Mapbox");
  }

  return await res.json();
};
