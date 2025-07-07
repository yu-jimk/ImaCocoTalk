import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ArrowLeft, Clock, Send } from "lucide-react";
import Link from "next/link";
import Form from "next/form";
import { addCommentAction } from "./actions";
import { PostCard } from "@/components/PostCard";

// Mock data
const post = {
  id: 1,
  user: { name: "田中太郎", avatar: "/placeholder-user.jpg" },
  content:
    "コーヒーがとても美味しかったです！雰囲気も良くて、仕事にも集中できました。WiFiも快適で電源もあるので、ノマドワークにもおすすめです。",
  timestamp: "2時間前",
  likes: 12,
  isLiked: false,
  rating: 5,
  store: { name: "カフェ・ド・パリ" },
  comments: 0,
};

const comments = [
  {
    id: 1,
    user: { name: "佐藤花子", avatar: "/placeholder-user.jpg" },
    content: "私もここのコーヒー大好きです！",
    timestamp: "1時間前",
  },
  {
    id: 2,
    user: { name: "山田次郎", avatar: "/placeholder-user.jpg" },
    content: "WiFi情報ありがとうございます。今度利用してみます。",
    timestamp: "30分前",
  },
];

export default function PostDetailPage() {
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
        <PostCard post={post} showReportMenu={true} />

        {/* Comments */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">コメント ({comments.length})</h3>

            <div className="space-y-4 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={comment.user.avatar || "/placeholder.svg"}
                    />
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
