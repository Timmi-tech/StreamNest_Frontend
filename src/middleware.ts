import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  // const refreshToken = req.cookies.get("refreshToken")?.value;

  const userRole = req.cookies.get("user-role")?.value;

  // console.log("Cookies:", accessToken, refreshToken, userRole);

  // set pathname
  const pathname = req.nextUrl.pathname;
  // If user is logged in
  if (accessToken) {
    if (pathname === "/auth/login" || pathname === "/auth/signup") {
      // Already logged in, redirect to role dashboard
      if (userRole === "Creator") {
        return NextResponse.redirect(new URL("/creator", req.url));
      }
      if (userRole === "Consumer") {
        return NextResponse.redirect(new URL("/consumer", req.url));
      }
    }
    // Prevent Consumers from accessing Creator route
    if (pathname.startsWith("/creator") && userRole !== "Creator") {
      return NextResponse.redirect(new URL("/consumer", req.url));
    }

    // Prevent Creators from accessing consumer route
    if (pathname.startsWith("/consumer") && userRole !== "Consumer") {
      return NextResponse.redirect(new URL("/creator", req.url));
    }
  } else {
    // Not logged in, redirect to login for protected pages
    const isProtected =
      pathname.startsWith("/creator") || pathname.startsWith("/consumer");

    if (isProtected) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}
// Add matcher for protected routes
export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};
