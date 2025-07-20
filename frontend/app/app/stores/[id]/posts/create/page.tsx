"use client";

import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  CheckCircle,
  Star,
  Send,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Form from "next/form";
import { StarRating } from "@/components/StarRating";
import { createPostAction } from "./actions";

export default function CreatePostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [rating, setRating] = useState(0);

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/stores/1">
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-600 hover:bg-blue-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              新しい投稿
            </h1>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        {/* Check-in Status */}
        <Card className="mb-4 bg-white border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 rounded-full p-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-blue-900">
                    カフェ・ド・パリ
                  </span>
                  <Badge className="bg-green-500 text-white text-xs font-bold rounded-full">
                    チェックイン済み
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-blue-600">
                  <MapPin className="h-3 w-3" />
                  東京都渋谷区神南1-1-1
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tweet Compose Area */}
        <Card className="bg-white border-blue-200 shadow-lg gap-2">
          <CardHeader className="bg-blue-600 text-white py-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              あなたの体験をシェアしよう
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Form action={createPostAction} className="space-y-6">
              <input type="hidden" name="rating" value={rating} />
              <input type="hidden" name="store_id" value={id} />

              {/* Rating Section */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-blue-800 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  この店舗を評価してください
                </label>
                <div className="flex items-center gap-2">
                  <StarRating value={rating} onChange={setRating} size="lg" />
                  {rating > 0 && (
                    <div className="ml-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        {rating === 5 && "最高！"}
                        {rating >= 4.5 && rating < 5 && "とても良い"}
                        {rating >= 4 && rating < 4.5 && "良い"}
                        {rating >= 3.5 && rating < 4 && "まあまあ良い"}
                        {rating >= 3 && rating < 3.5 && "普通"}
                        {rating >= 2.5 && rating < 3 && "ちょっと不満"}
                        {rating >= 2 && rating < 2.5 && "不満"}
                        {rating >= 1.5 && rating < 2 && "悪い"}
                        {rating >= 1 && rating < 1.5 && "とても悪い"}
                        {rating > 0.0 && rating < 1 && "最悪"}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Text Input Section */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-blue-800">
                  投稿内容
                </label>
                <Textarea
                  name="content"
                  placeholder="この店舗での体験や感想を詳しく教えてください"
                  rows={8}
                  className="resize-none border-blue-200 focus:border-blue-400 bg-blue-50/30"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-blue-100">
                <Button
                  type="submit"
                  disabled={rating === 0}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                >
                  <Send className="h-4 w-4 mr-2" />
                  投稿する
                </Button>
                <Link href="/stores/1">
                  <Button
                    variant="outline"
                    className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    キャンセル
                  </Button>
                </Link>
              </div>
            </Form>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card className="mt-4 bg-white border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3 text-blue-800 flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              投稿ガイドライン
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="font-medium text-blue-700 mb-1">
                  ✓ 実体験を共有
                </div>
                <div className="text-blue-600">
                  実際の体験に基づいた内容を投稿してください
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="font-medium text-green-700 mb-1">
                  ✓ 役立つ情報
                </div>
                <div className="text-green-600">
                  他の利用者に役立つ情報を心がけましょう
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
