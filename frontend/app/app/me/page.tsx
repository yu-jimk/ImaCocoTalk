import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { MeHeader } from "./MeHeader";
import { PostsTab } from "./PostsTab";
import { CheckinsTab } from "./CheckinsTab";
import { FavoritesTab } from "./FavoritesTab";
import { LikedTab } from "./LikedTab";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import type { Post } from "@/app/types";

export default async function MePage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.get("user_jwt")?.value;
  const meRes = await fetch(`http://backend:3000/api/users/me`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `user_jwt=${cookieHeader}`,
    },
  });
  if (!meRes.ok) return notFound();
  const userData = await meRes.json();

  const myPostsRes = await fetch(`http://backend:3000/api/users/me/posts`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `user_jwt=${cookieHeader}`,
    },
  });
  if (!myPostsRes.ok) return notFound();
  const myPosts: Post[] = await myPostsRes.json();

  const likedPostsRes = await fetch(`http://backend:3000/api/users/me/likes`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `user_jwt=${cookieHeader}`,
    },
  });
  if (!likedPostsRes.ok) return notFound();
  const likedPosts = await likedPostsRes.json();

  const favoriteStoresRes = await fetch(
    `http://backend:3000/api/users/me/favorites`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `user_jwt=${cookieHeader}`,
      },
    }
  );
  if (!favoriteStoresRes.ok) return notFound();
  const favoriteStores = await favoriteStoresRes.json();

  const checkinsRes = await fetch(
    `http://backend:3000/api/users/me/check_ins`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `user_jwt=${cookieHeader}`,
      },
    }
  );
  if (!checkinsRes.ok) return notFound();
  const checkinHistory = await checkinsRes.json();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <MeHeader />

      <div className="p-4">
        {/* Profile Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={userData.avatar || ""} />
                <AvatarFallback>{userData.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  {userData.joinDate}から利用
                </p>
                {/* 自己紹介表示 */}
                <p className="text-sm text-gray-700 leading-relaxed">
                  {userData.bio}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {userData.totalPosts}
                </div>
                <div className="text-xs text-gray-600">投稿数</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {userData.totalCheckins}
                </div>
                <div className="text-xs text-gray-600">チェックイン</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {userData.favoriteStores}
                </div>
                <div className="text-xs text-gray-600">お気に入り</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {userData.likedPostsCount}
                </div>
                <div className="text-xs text-gray-600">いいね</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">投稿</TabsTrigger>
            <TabsTrigger value="checkins">履歴</TabsTrigger>
            <TabsTrigger value="favorites">お気に入り</TabsTrigger>
            <TabsTrigger value="liked">いいね</TabsTrigger>
          </TabsList>

          {/* 投稿タブ（編集・削除機能付き） */}
          <PostsTab posts={myPosts} />

          {/* チェックイン履歴タブ */}
          <CheckinsTab stores={checkinHistory} />

          {/* お気に入りタブ（削除機能付き） */}
          <FavoritesTab stores={favoriteStores} />

          {/* いいねした投稿タブ */}
          <LikedTab posts={likedPosts} />
        </Tabs>
      </div>
    </div>
  );
}
