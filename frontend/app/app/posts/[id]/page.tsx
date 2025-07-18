import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ArrowLeft, Clock, Send } from "lucide-react";
import Link from "next/link";
import Form from "next/form";
import { addCommentAction } from "./actions";
import { PostCard } from "@/components/PostCard";
import { notFound } from "next/navigation";
import { Post } from "@/app/types";
import { cookies } from "next/headers";

const comments = [
  {
    id: 1,
    user: { name: "佐藤花子", avatar: "" },
    content: "コメント機能は実装中...",
    timestamp: "1時間前",
  },
  {
    id: 2,
    user: { name: "山田次郎", avatar: "" },
    content: "あったら便利ですね！",
    timestamp: "30分前",
  },
];

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const postId = (await params).id;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.get("user_jwt")?.value;
  const postRes = await fetch(`http://backend:3000/api/posts/${postId}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `user_jwt=${cookieHeader}`,
    },
  });
  if (!postRes.ok) return notFound();
  const post: Post = await postRes.json();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/stores/1">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">投稿詳細</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Main Post */}
        <PostCard
          post={post}
          showReportMenu={true}
          contentLinkEnabled={false}
        />

        {/* Comments */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">コメント ({comments.length})</h3>

            <div className="space-y-4 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.user.avatar || ""} />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">
                        {comment.user.name}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {comment.timestamp}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Form */}
            <Form action={addCommentAction} className="flex gap-2">
              <Input
                name="comment"
                placeholder="コメントを入力..."
                className="flex-1"
                required
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
