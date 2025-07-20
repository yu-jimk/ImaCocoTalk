"use client";

import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/StarRating";
import {
  ArrowLeft,
  //   MapPin,
  CheckCircle,
  Star,
  Save,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Form from "next/form";
import { notFound } from "next/navigation";
import { editPostAction } from "./actions";
import type { Post } from "@/app/types";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchPost = async () => {
      const postRes = await fetch(`http://localhost:3000/api/posts/${id}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!postRes.ok) return notFound();
      const post: Post = await postRes.json();
      setPost(post);
      setRating(post.rating);
      setContent(post.content);
    };
    fetchPost();
  }, [id]);

  if (!post) return null;

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/me">
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
              投稿を編集
            </h1>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        {/* Store Info */}
        <Card className="mb-4 bg-white border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 rounded-full p-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-blue-900">
                    {post.store.name}
                  </span>
                  <Badge className="bg-green-500 text-white text-xs font-bold rounded-full">
                    チェックイン済み
                  </Badge>
                </div>
                {/* <div className="flex items-center gap-1 text-sm text-blue-600">
                  <MapPin className="h-3 w-3" />
                  東京都渋谷区神南1-1-1
                </div> */}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="bg-white border-blue-200 shadow-lg gap-2">
          <CardHeader className="bg-blue-600 text-white py-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              あなたの体験を編集
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Form action={editPostAction} className="space-y-6">
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="rating" value={rating} />

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

              {/* Content Section */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-blue-800">
                  投稿内容
                </label>
                <Textarea
                  name="content"
                  placeholder="この店舗での体験や感想を詳しく教えてください"
                  defaultValue={content}
                  rows={8}
                  className="resize-none border-blue-200 focus:border-blue-400 bg-blue-50/30"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-blue-100">
                <Button
                  type="submit"
                  disabled={!post.content.trim() || rating === 0}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                >
                  <Save className="h-4 w-4 mr-2" />
                  変更を保存
                </Button>
                <Link href="/me">
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

        {/* Edit Info */}
        <Card className="mt-4 bg-white border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3 text-blue-800 flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              編集について
            </h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>投稿日時:</strong> {post.timestamp}
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-600">
                  ※ 編集した投稿には「編集済み」のマークが表示されます
                  <br />※
                  編集履歴は保存され、不適切な編集は検出される場合があります
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
