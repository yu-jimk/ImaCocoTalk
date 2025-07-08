import { Badge } from "@/components/ui/badge";
import { DashboardOverview } from "./components/DashboardOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportsTab } from "./components/ReportsTab";
import { PostsTab } from "./components/PostsTab";
import { PinnedTab } from "./components/PinnedTab";
import { SettingsTab } from "./components/SettingsTab";
import { LogoutDialog } from "@/components/LogoutDialog";

// Mock data for moderator
const storeInfo = {
  id: 1,
  name: "カフェ・ド・パリ",
  genres: ["カフェ", "フレンチ", "デザート"],
  description: "パリの雰囲気を楽しめる本格的なカフェです。",
  postalCode: "150-0041",
  address: "東京都渋谷区神南1-1-1",
  openHours: "8:00 - 22:00",
  phone: "03-1234-5678",
  otherInfo: ["WiFi完備", "電源あり", "禁煙", "テイクアウト可"],
  totalPosts: 45,
  totalReports: 3,
  monthlyVisitors: 234,
  qrCodeValue: "https://imacoco-talk.com/checkin/cafe-de-paris",
};

const reportedPosts = [
  {
    id: 1,
    user: { name: "匿名ユーザー", avatar: "/placeholder-user.jpg" },
    content: "この店のサービスは最悪でした。二度と行きません。",
    timestamp: "2時間前",
    reports: 3,
    reportReasons: ["不適切な内容", "誹謗中傷"],
    status: "pending",
    rating: 1.0,
  },
  {
    id: 2,
    user: { name: "田中太郎", avatar: "/placeholder-user.jpg" },
    content: "スタッフの態度が悪い。改善してほしい。",
    timestamp: "5時間前",
    reports: 1,
    reportReasons: ["不適切な内容"],
    status: "pending",
    rating: 2.0,
  },
];

const allPosts = [
  {
    id: 3,
    user: { name: "佐藤花子", avatar: "/placeholder-user.jpg" },
    content:
      "コーヒーがとても美味しかったです！雰囲気も良くて、仕事にも集中できました。",
    timestamp: "1日前",
    likes: 12,
    isLiked: false,
    comments: 3,
    status: "approved",
    rating: 4.5,
    store: {
      name: "カフェ・ド・パリ",
    },
  },
  {
    id: 4,
    user: { name: "山田次郎", avatar: "/placeholder-user.jpg" },
    content: "パンケーキが絶品でした🥞 また来たいと思います！",
    timestamp: "2日前",
    likes: 8,
    isLiked: false,
    comments: 1,
    status: "approved",
    rating: 4.0,
    store: {
      name: "カフェ・ド・パリ",
    },
  },
];

const pinnedPosts = [
  {
    id: 5,
    content:
      "【お知らせ】12月25日はクリスマス特別メニューをご用意しております！",
    timestamp: "3日前",
    isPinned: true,
  },
  {
    id: 6,
    content: "【営業時間変更】12月は22時まで営業いたします。",
    timestamp: "1週間前",
    isPinned: true,
  },
];

export default function ModeratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-gray-800">
              モデレーター管理画面
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-orange-500 text-white">店舗運営者</Badge>
            <LogoutDialog redirectUrl="/moderator/login" />
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* 概要（統計＋QR） */}
        <DashboardOverview storeInfo={storeInfo} />
        {/* タブ */}
        <Tabs defaultValue="reports" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-gray-500 data-[state=active]:text-white"
            >
              違反報告
            </TabsTrigger>
            <TabsTrigger
              value="posts"
              className="data-[state=active]:bg-gray-500 data-[state=active]:text-white"
            >
              投稿管理
            </TabsTrigger>
            <TabsTrigger
              value="pinned"
              className="data-[state=active]:bg-gray-500 data-[state=active]:text-white"
            >
              固定投稿
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gray-500 data-[state=active]:text-white"
            >
              店舗設定
            </TabsTrigger>
          </TabsList>
          <TabsContent value="reports" className="space-y-4">
            <ReportsTab reportedPosts={reportedPosts} />
          </TabsContent>
          <TabsContent value="posts" className="space-y-4">
            <PostsTab posts={allPosts} />
          </TabsContent>
          <TabsContent value="pinned" className="space-y-4">
            <PinnedTab pinnedPosts={pinnedPosts} />
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <SettingsTab storeInfo={storeInfo} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
