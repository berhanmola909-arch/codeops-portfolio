import { NextResponse } from "next/server";

const PROTECTED = ["/checkout", "/orders", "/kitchen"];

export function middleware(request) {
  const session = request.cookies.get("session");
  const pathname = request.nextUrl.pathname;

  const needsAuth = PROTECTED.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (!needsAuth) return NextResponse.next();

  if (!session) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*", "/kitchen/:path*"],
};