import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  // 1. Check if user is authenticated
  if (!token) {
    // If trying to access dashboard without token, redirect to login
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  try {
    // 2. Decode token to get role
    // The token is a base64 encoded JSON string created in authService.ts
    const payload = JSON.parse(atob(token));
    const role = payload.role;

    // 3. Role-based protection
    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }

    if (pathname.startsWith("/dashboard/owner") && role !== "owner") {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }

    if (pathname.startsWith("/dashboard/buyer") && role !== "buyer") {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }

    // 4. Redirect root dashboard to role-specific dashboard
    if (pathname === "/dashboard") {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }

  } catch (error) {
    // If token is invalid, clear it and redirect to login
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("authToken");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
