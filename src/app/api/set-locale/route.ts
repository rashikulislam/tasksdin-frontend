import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["en", "bn"];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale");
  const redirect = searchParams.get("redirect") || "/";

  const safeLocale =
    locale && SUPPORTED_LOCALES.includes(locale) ? locale : "bn";

  const response = NextResponse.redirect(new URL(redirect, request.url));
  response.cookies.set("NEXT_LOCALE", safeLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}
