import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { authKey } from "./constant";
import { TToken } from "./interfaces";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = intlMiddleware(request);
  const token = request.cookies.get(authKey)?.value;
  const locale = request.cookies.get("NEXT_LOCALE")?.value || "bn";

  // Decode token if exists
  let userinfo: TToken | undefined;
  if (token) {
    try {
      userinfo = jwtDecode(token) as TToken;
    } catch {
      // Invalid token — clear cookie and redirect to home
      const res = NextResponse.redirect(new URL(`/`, request.url));
      res.cookies.delete(authKey);
      return res;
    }
  }

  // --- Access Control Rules ---

  // 🔹 1. If no token and trying to access dashboard → redirect home
  if (!token && pathname.startsWith(`/dashboard`)) {
    return NextResponse.redirect(new URL(`/`, request.url));
  }

  // 🔹 2. If logged in and trying to access home/login/register → redirect to dashboard

  const roleTarget: Record<string, string> = {
    NON_SKILL_PROVIDER: `/dashboard/general-provider`,
    ADMIN: `/dashboard/admin`,
    CONSUMER: `/dashboard/consumer`,
    PROMOTER: "/dashboard/agent",
  };

  const targetUrl = userinfo?.role ? roleTarget[userinfo.role] : undefined;
  // const restrictedPath = [`/${locale}`, `/${locale}/auth/sign-in`];
  // if (token && targetUrl && (pathname === `/${locale}` || pathname === `/`)) {
  //   return NextResponse.redirect(new URL(targetUrl, request.url));
  // }

  // Pages that logged-in users should NOT be able to visit
  const restrictedPaths = [`/`, `/auth/sign-in`, `/`, `/auth/sign-in`];

  // Normalize pathname to avoid trailing slash issues
  const normalizedPath =
    pathname.endsWith("/") && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname;

  // Redirect logged-in users away from restricted public pages
  if (token && targetUrl && restrictedPaths.includes(normalizedPath)) {
    return NextResponse.redirect(new URL(targetUrl, request.url));
  }

  // 🔹 3. If logged in and tries to access another dashboard route → block mismatch
  const isDashboardRoute = pathname.startsWith(`/dashboard`);
  if (
    token &&
    isDashboardRoute &&
    targetUrl &&
    !pathname.startsWith(targetUrl)
  ) {
    return NextResponse.redirect(new URL(targetUrl, request.url));
  }

  // If all checks pass, continue normally
  return response ?? NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/data|models|favicon.ico).*)",
    "/dashboard/:page*",
    "/change-password",
  ],
};
// /:locale
// /:locale
