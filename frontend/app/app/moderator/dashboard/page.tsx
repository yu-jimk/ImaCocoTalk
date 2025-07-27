import { Badge } from "@/components/ui/badge";
import { DashboardOverview } from "./components/DashboardOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportsTab } from "./components/ReportsTab";
import { PostsTab } from "./components/PostsTab";
import { PinnedTab } from "./components/PinnedTab";
import { SettingsTab } from "./components/SettingsTab";
import { LogoutDialog } from "@/components/LogoutDialog";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function ModeratorPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.get("moderator_jwt")?.value;

  const storeRes = await fetch(
    `http://backend:3000/api/moderator/dashboard/summary`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `moderator_jwt=${cookieHeader}`,
      },
    }
  );
  if (!storeRes.ok) return notFound();
  const storeInfo = await storeRes.json();

  const reportRes = await fetch(`http://backend:3000/api/moderator/reports`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `moderator_jwt=${cookieHeader}`,
    },
  });
  if (!reportRes.ok) return notFound();
  const reportedPosts = await reportRes.json();

  const postRes = await fetch(`http://backend:3000/api/moderator/store/posts`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `moderator_jwt=${cookieHeader}`,
    },
  });
  if (!postRes.ok) return notFound();
  const allPosts = await postRes.json();

  const pinnedPostRes = await fetch(
    `http://backend:3000/api/moderator/announcements`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `moderator_jwt=${cookieHeader}`,
      },
    }
  );
  if (!pinnedPostRes.ok) return notFound();
  const pinnedPosts = await pinnedPostRes.json();

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
            <LogoutDialog />
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
              通報管理
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
