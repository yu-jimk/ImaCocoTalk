import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
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

  // /stores/:storeId/posts/create のパスにマッチするか確認
  const postCreateMatch = pathname.match(/^\/stores\/(\d+)\/posts\/create$/);
  if (postCreateMatch) {
    const storeId = postCreateMatch[1];

    try {
      // チェックイン有効判定APIへcookie付きでリクエスト
      const apiUrl = new URL(
        `http://backend:3000/api/check_ins/valid?store_id=${storeId}`,
        request.url
      );
      const apiRes = await fetch(apiUrl.toString(), {
        headers: {
          cookie: request.headers.get("cookie") ?? "",
        },
      });
      if (!apiRes.ok) {
        // APIがエラーなら投稿画面に入れないようリダイレクト
        return NextResponse.redirect(
          new URL(`/stores/${storeId}`, request.url)
        );
      }
      const data = await apiRes.json();
      if (!data.valid) {
        // チェックインしていなければリダイレクト
        return NextResponse.redirect(
          new URL(`/stores/${storeId}`, request.url)
        );
      }
    } catch {
      // 通信失敗時もリダイレクト
      return NextResponse.redirect(new URL(`/stores/${storeId}`, request.url));
    }
  }

  return NextResponse.next();
}

// /moderator配下とそれ以外で認証分岐
export const config = {
  matcher: [
    "/moderator/:path*",
    "/((?!_next|static|favicon.ico|auth/login|auth/signup|forgot-password|moderator).*)",
  ],
};
