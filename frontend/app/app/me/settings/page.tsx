import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Trash2 } from "lucide-react";
import DeleteAccountForm from "./DeleteAccountForm";
import { updateUserAction } from "./actions";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function SettingsPage() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/me">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">設定</h1>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {/* Profile Settings */}
        <Card className="py-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              プロフィール設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={updateUserAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">名前</Label>
                <Input id="name" name="name" defaultValue={userData.name} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={userData.email}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">自己紹介</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="自己紹介を入力してください..."
                  defaultValue={userData.bio}
                  rows={3}
                />
              </div>

              {/* Save Button */}
              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  設定を保存
                </Button>
                <Link href="/me">
                  <Button variant="outline">キャンセル</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 py-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              危険な操作
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-medium text-red-800 mb-2">
                アカウントを削除
              </h3>
              <p className="text-sm text-red-600 mb-3">
                アカウントを削除すると、すべての投稿とデータが完全に削除されます。この操作は取り消せません。
              </p>
              <DeleteAccountForm />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
