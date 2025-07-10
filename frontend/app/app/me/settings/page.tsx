"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, User, Bell, Shield, Trash2, Camera } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "田中太郎",
    email: "tanaka@example.com",
    bio: "カフェ巡りが趣味です。美味しいコーヒーを求めて日々探索中！",
    avatar: "",
  });

  const [notifications, setNotifications] = useState({
    newPosts: true,
    newComments: true,
    likes: false,
    marketing: false,
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showLocation: true,
    showActivity: true,
  });

  const handleSave = () => {
    console.log("Settings saved:", { profile, notifications, privacy });
  };

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
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile.avatar || ""} />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                写真を変更
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">名前</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">自己紹介</Label>
              <Textarea
                id="bio"
                placeholder="自己紹介を入力してください..."
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="py-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              通知設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>新しい投稿の通知</Label>
                <p className="text-sm text-gray-500">
                  お気に入り店舗の新しい投稿を通知
                </p>
              </div>
              <Switch
                checked={notifications.newPosts}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, newPosts: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>コメントの通知</Label>
                <p className="text-sm text-gray-500">
                  自分の投稿へのコメントを通知
                </p>
              </div>
              <Switch
                checked={notifications.newComments}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, newComments: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>いいねの通知</Label>
                <p className="text-sm text-gray-500">
                  自分の投稿へのいいねを通知
                </p>
              </div>
              <Switch
                checked={notifications.likes}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, likes: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>マーケティング通知</Label>
                <p className="text-sm text-gray-500">
                  キャンペーンやお得情報を通知
                </p>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, marketing: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="py-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              プライバシー設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>プロフィールを公開</Label>
                <p className="text-sm text-gray-500">
                  他のユーザーがプロフィールを閲覧可能
                </p>
              </div>
              <Switch
                checked={privacy.profilePublic}
                onCheckedChange={(checked) =>
                  setPrivacy({ ...privacy, profilePublic: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>位置情報を表示</Label>
                <p className="text-sm text-gray-500">
                  投稿時の位置情報を他のユーザーに表示
                </p>
              </div>
              <Switch
                checked={privacy.showLocation}
                onCheckedChange={(checked) =>
                  setPrivacy({ ...privacy, showLocation: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>アクティビティを表示</Label>
                <p className="text-sm text-gray-500">
                  最終ログイン時間などを表示
                </p>
              </div>
              <Switch
                checked={privacy.showActivity}
                onCheckedChange={(checked) =>
                  setPrivacy({ ...privacy, showActivity: checked })
                }
              />
            </div>
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
              <Button variant="destructive" size="sm">
                アカウントを削除
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex gap-3">
          <Button onClick={handleSave} className="flex-1">
            設定を保存
          </Button>
          <Link href="/me">
            <Button variant="outline">キャンセル</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
