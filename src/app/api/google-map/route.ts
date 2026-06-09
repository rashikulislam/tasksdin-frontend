/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json(
      { message: "Latitude or Longitude missing" },
      { status: 400 }
    );
  }

  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!GOOGLE_API_KEY) {
    return NextResponse.json(
      { message: "Google API key missing" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`,
      { cache: "no-store" }
    );

    const data = await res.json();

    if (data.status !== "OK" || !data.results?.length) {
      return NextResponse.json(
        { message: "No address found" },
        { status: 404 }
      );
    }

    // Pick best result
    const bestResult =
      data.results.find(
        (r: any) =>
          r.types.includes("street_address") || r.types.includes("premise")
      ) || data.results[0];

    // Helper to get component
    const getComp = (types: string | string[]) =>
      bestResult.address_components.find((c: any) =>
        Array.isArray(types)
          ? types.some((t) => c.types.includes(t))
          : c.types.includes(types)
      )?.long_name || "";

    // Build address object
    const house = getComp("street_number");
    const road = getComp("route");
    const address = {
      street: house || road, // Foodpanda style: house if exists, otherwise road
      area: getComp(["sublocality", "sublocality_level_1"]),
      city: getComp(["locality", "administrative_area_level_2"]),
      postalCode: getComp("postal_code"),
      country: getComp("country"),
      formattedAddress: bestResult.formatted_address,
      locationType: bestResult.geometry.location_type,
    };

    return NextResponse.json(address);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Google reverse geocoding failed" },
      { status: 500 }
    );
  }
}
