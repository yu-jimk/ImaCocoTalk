"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import Link from "next/link";

export default function ModeratorLoginPage() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await fetch("http://localhost:3000/api/moderator/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!res.ok) {
      alert("ログイン失敗");
      return;
    }
    router.push("/moderator/dashboard");
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md py-6">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-800 rounded-full p-3">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            モデレーターログイン
          </CardTitle>
          <p className="text-gray-600 text-sm">店舗運営者専用ページ</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="moderator@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="パスワードを入力"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-900"
            >
              ログイン
            </Button>
          </form>

          <div className="text-center space-y-2">
            <Link
              href="/forgot-password"
              className="text-gray-600 hover:underline text-sm"
            >
              パスワードを忘れた方
            </Link>
          </div>

          <div className="pt-4 border-t">
            <Link href="/moderator/dashboard">
              <Button variant="outline" className="w-full bg-transparent">
                ゲストログイン
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
