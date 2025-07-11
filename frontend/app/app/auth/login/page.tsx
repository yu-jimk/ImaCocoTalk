import Link from "next/link";
import Form from "next/form";

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { loginAction } from "./actions";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md py-6">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 rounded-full p-3">
              <MapPin className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-blue-600">
            イマココトーク
          </CardTitle>
          <p className="text-gray-600 text-sm">位置連動型口コミアプリ</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form action={loginAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
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
            <Button type="submit" className="w-full">
              ログイン
            </Button>
          </Form>

          <div className="text-center space-y-2">
            <Link
              href="/auth/signup"
              className="text-blue-600 hover:underline text-sm"
            >
              新規登録はこちら
            </Link>
            <br />
            <Link
              href="/forgot-password"
              className="text-gray-500 hover:underline text-sm"
            >
              パスワードを忘れた方
            </Link>
          </div>

          <div className="pt-4 border-t">
            <Link href="/">
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
