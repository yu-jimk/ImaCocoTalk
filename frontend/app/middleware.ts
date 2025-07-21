import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // /moderator配下の認証（moderator_jwt）
  if (pathname.startsWith("/moderator")) {
    // /moderator/loginは除外
    if (pathname !== "/moderator/login") {
      const moderatorJwt = request.cookies.get("moderator_jwt");
      if (!moderatorJwt) {
        return NextResponse.redirect(new URL("/moderator/login", request.url));
      }
    }
    // /moderatorはuser_jwt不要
    return NextResponse.next();
  }
  // それ以外はuser_jwt認証
  const isAuthenticated = request.cookies.has("user_jwt");
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  return NextResponse.next();
}

// /moderator配下とそれ以外で認証分岐
export const config = {
  matcher: [
    "/moderator/:path*",
    "/((?!_next|static|favicon.ico|auth/login|auth/signup|moderator).*)",
  ],
};
