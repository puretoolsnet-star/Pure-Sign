import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { DEFAULT_LOCALE, LOCALES } from "@/i18n/locales";
import { applyRateLimit } from "@/lib/bot-protection/rate-limit";
import { localizedPath } from "@/lib/i18n/routing";

const LOCALE_PREFIX = new RegExp(`^/(${LOCALES.join("|")})(/|$)`);

const CRAWLER_PASSTHROUGH = new Set([
  "/ads.txt",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
]);

function isPassthroughPath(pathname: string): boolean {
  return (
    CRAWLER_PASSTHROUGH.has(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/og") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPassthroughPath(pathname)) {
    return NextResponse.next();
  }

  const limited = applyRateLimit(request);
  if (limited) return limited;

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  let response: NextResponse;

  if (pathname === "/") {
    response = NextResponse.redirect(
      new URL(localizedPath(DEFAULT_LOCALE, "/"), request.url),
      308,
    );
  } else if (pathname.startsWith("/tools/")) {
    response = NextResponse.redirect(
      new URL(localizedPath(DEFAULT_LOCALE, pathname), request.url),
      308,
    );
  } else {
    response = NextResponse.next();
  }

  const localeMatch = pathname.match(LOCALE_PREFIX);
  const locale = localeMatch?.[1] ?? DEFAULT_LOCALE;
  response.headers.set("x-puresign-locale", locale);

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mjs|css|woff2?)$).*)",
  ],
};
