import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has("user_jwt");

  const isModerator = request.nextUrl.pathname.startsWith("/moderator");

  if (!isModerator && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// 全てのパスに適用（/moderatorはmiddleware内で除外）
export const config = {
  matcher: [
    // /moderator, /auth/login, /auth/signup 以外の全て
    "/((?!_next|static|favicon.ico|auth/login|auth/signup|moderator).*)",
  ],
};
