import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./auth";
import { defaultLocale, isValidLocale } from "@/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

function withLocale(pathname: string) {
  const normalizedPathname = pathname.startsWith("/") ? pathname : `/${pathname}`;

  return `/${defaultLocale}${normalizedPathname === "/" ? "" : normalizedPathname}`;
}

export default auth((req: NextRequest) => {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/login") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const [, maybeLocale] = pathname.split("/");

  if (!isValidLocale(maybeLocale)) {
    const url = req.nextUrl.clone();
    url.pathname = withLocale(pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
