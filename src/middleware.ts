// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAdmin = req.cookies.get("portfolio_admin_access")?.value === "true";
  const isProtectedPath = req.nextUrl.pathname.startsWith("/admin/dashboard");

  if (isProtectedPath && !isAdmin) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
