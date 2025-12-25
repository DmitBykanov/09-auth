import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token =
    req.cookies.get("accessToken")?.value ||
    req.cookies.get("refreshToken")?.value;

  const isPrivate = privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isPublic = publicRoutes.includes(pathname);

  if (!token && isPrivate) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (token && isPublic) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
