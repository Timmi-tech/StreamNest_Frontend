import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/auth/login", "/api/public"];

export function middleware(request: NextRequest) {
  console.log("Middleware is running...");

  const { pathname } = request.nextUrl;

  // Allow public pages and API routes
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    console.log("Public path – allow through");
    return NextResponse.next();
  }

  // Get token from cookies
  const token = request.cookies.get("token")?.value;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // All routes except static files
};
