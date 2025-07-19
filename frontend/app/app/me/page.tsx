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

// const userData = {
//   name: "田中太郎",
//   avatar: "",
//   bio: "カフェ巡りが趣味です。美味しいコーヒーを求めて日々探索中！新しいお店を見つけるのが楽しみで、特にこだわりのあるコーヒー豆を使っているお店が好きです。",
//   joinDate: "2024年1月",
//   totalPosts: 15,
//   totalCheckins: 23,
//   favoriteStores: 8,
//   likedPostsCount: 24,
// };
// const posts = [
//   {
//     id: "1",
//     user: { name: "田中太郎", avatar: "" },
//     content:
//       "コーヒーがとても美味しかったです！雰囲気も良くて、仕事にも集中できました。",
//     timestamp: "2時間前",
//     likes: 12,
//     comments: 3,
//     isLiked: false,
//     rating: 4.5,
//     store: { name: "カフェ・ド・パリ" },
//   },
//   {
//     id: "2",
//     user: { name: "田中太郎", avatar: "" },
//     store: { name: "らーめん太郎" },
//     content: "醤油ラーメンが絶品でした。スープが濃厚で麺との相性も抜群です。",
//     timestamp: "1日前",
//     likes: 8,
//     isLiked: false,
//     comments: 1,
//     rating: 4.0,
//   },
//   {
//     id: "3",
//     user: { name: "田中太郎", avatar: "" },
//     store: { name: "イタリアン・ベラ" },
//     content: "パスタが本格的で美味しかったです。また来たいと思います。",
//     timestamp: "3日前",
//     likes: 15,
//     isLiked: false,
//     comments: 4,
//     rating: 5.0,
//   },
// ];

// const likedPosts = [
//   {
//     id: "101",
//     user: { name: "佐藤花子", avatar: "" },
//     store: { name: "スターバックス渋谷店" },
//     content: "新作のフラペチーノが美味しかったです！季節限定なのでお早めに。",
//     timestamp: "1時間前",
//     likes: 25,
//     comments: 8,
//     rating: 4.0,
//     isLiked: true,
//   },
//   {
//     id: "102",
//     user: { name: "山田次郎", avatar: "" },
//     store: { name: "焼肉キング" },
//     content: "お肉が柔らかくて最高でした。コスパも良くておすすめです。",
//     timestamp: "2日前",
//     likes: 18,
//     comments: 5,
//     rating: 4.5,
//     isLiked: true,
//   },
//   {
//     id: "103",
//     user: { name: "鈴木美咲", avatar: "" },
//     store: { name: "和食処 さくら" },
//     content:
//       "お刺身が新鮮で美味しかったです。雰囲気も落ち着いていて良かったです。",
//     timestamp: "4日前",
//     likes: 12,
//     comments: 3,
//     rating: 4.5,
//     isLiked: true,
//   },
// ];

// const favoriteStores = [
//   {
//     id: "1",
//     name: "カフェ・ド・パリ",
//     genre: "カフェ",
//     visits: 5,
//     isFavorite: true,
//   },
//   {
//     id: "2",
//     name: "らーめん太郎",
//     genre: "ラーメン",
//     visits: 3,
//     isFavorite: true,
//   },
//   {
//     id: "3",
//     name: "バー・ムーンライト",
//     genre: "バー",
//     visits: 2,
//     isFavorite: true,
//   },
//   {
//     id: "4",
//     name: "イタリアン・ベラ",
//     genre: "イタリアン",
//     visits: 4,
//     isFavorite: true,
//   },
// ];

// const checkinHistory = [
//   {
//     id: "1",
//     name: "カフェ・ド・パリ",
//     genre: "カフェ",
//     date: "2024/01/15 14:30",
//   },
//   {
//     id: "2",
//     name: "らーめん太郎",
//     genre: "ラーメン",
//     date: "2024/01/14 12:15",
//   },
//   {
//     id: "3",
//     name: "バー・ムーンライト",
//     genre: "バー",
//     date: "2024/01/13 19:45",
//   },
//   {
//     id: "4",
//     name: "イタリアン・ベラ",
//     genre: "イタリアン",
//     date: "2024/01/12 18:30",
//   },
// ];

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
