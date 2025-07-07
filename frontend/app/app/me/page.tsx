import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { MeHeader } from "./MeHeader";
import { PostsTab } from "./PostsTab";
import { CheckinsTab } from "./CheckinsTab";
import { FavoritesTab } from "./FavoritesTab";
import { LikedTab } from "./LikedTab";

const userData = {
  name: "田中太郎",
  avatar: "/placeholder-user.jpg",
  bio: "カフェ巡りが趣味です。美味しいコーヒーを求めて日々探索中！新しいお店を見つけるのが楽しみで、特にこだわりのあるコーヒー豆を使っているお店が好きです。",
  joinDate: "2024年1月",
  totalPosts: 15,
  totalCheckins: 23,
  favoriteStores: 8,
  likedPostsCount: 24,
};

export default function MePage() {
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
                <AvatarImage src={userData.avatar || "/placeholder.svg"} />
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
          <PostsTab />

          {/* チェックイン履歴タブ */}
          <CheckinsTab />

          {/* お気に入りタブ（削除機能付き） */}
          <FavoritesTab />

          {/* いいねした投稿タブ */}
          <LikedTab />
        </Tabs>
      </div>
    </div>
  );
}
