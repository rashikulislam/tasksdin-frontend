/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ message: "lat lng missing" }, { status: 400 });
  }
  const MAPBOX_SECRET_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  try {
    const mapboxRes = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_SECRET_TOKEN}`
    );

    const data = await mapboxRes.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Mapbox failed" }, { status: 500 });
  }
}
