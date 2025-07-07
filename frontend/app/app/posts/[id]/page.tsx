"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  MessageCircle,
  ThumbsUp,
  Clock,
  Send,
  Star,
  MoreVertical,
  Flag,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import Form from "next/form";
import { addCommentAction } from "./actions";

// Mock data
const postData = {
  id: 1,
  user: { name: "田中太郎", avatar: "/placeholder-user.jpg" },
  content:
    "コーヒーがとても美味しかったです！雰囲気も良くて、仕事にも集中できました。WiFiも快適で電源もあるので、ノマドワークにもおすすめです。",
  timestamp: "2時間前",
  likes: 12,
  isLiked: false,
  rating: 5,
  store: { name: "カフェ・ド・パリ", genre: "カフェ" },
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

// 通報理由の選択肢
const reportReasons = [
  { id: "inappropriate", label: "不適切な内容" },
  { id: "spam", label: "スパム・宣伝" },
  { id: "harassment", label: "誹謗中傷・嫌がらせ" },
  { id: "false_info", label: "虚偽の情報" },
  { id: "copyright", label: "著作権侵害" },
  { id: "other", label: "その他" },
];

export default function PostDetailPage() {
  const [isLiked, setIsLiked] = useState(postData.isLiked);
  const [likes, setLikes] = useState(postData.likes);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [reportComment, setReportComment] = useState("");
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleReportPost = () => {
    setReportDialogOpen(true);
  };

  const handleReasonChange = (reasonId: string, checked: boolean) => {
    if (checked) {
      setSelectedReasons((prev) => [...prev, reasonId]);
    } else {
      setSelectedReasons((prev) => prev.filter((id) => id !== reasonId));
    }
  };

  const handleSubmitReport = async () => {
    if (selectedReasons.length === 0) return;

    setIsSubmittingReport(true);

    // 通報処理をシミュレート
    setTimeout(() => {
      console.log("Report submitted:", {
        postId: postData.id,
        reasons: selectedReasons,
        comment: reportComment,
      });

      setIsSubmittingReport(false);
      setReportDialogOpen(false);
      setSelectedReasons([]);
      setReportComment("");

      // 成功メッセージを表示（実際の実装ではtoastなどを使用）
      alert("通報を受け付けました。内容を確認いたします。");
    }, 1000);
  };

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
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={postData.user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{postData.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{postData.user.name}</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: postData.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {postData.timestamp}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {postData.store.name} • {postData.store.genre}
                </div>
              </div>
              {/* ケバブメニュー */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-gray-600"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={handleReportPost}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Flag className="h-4 w-4" />
                    通報する
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-gray-700 mb-4">{postData.content}</p>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className="flex items-center gap-2"
              >
                <ThumbsUp
                  className={`h-4 w-4 ${
                    isLiked ? "fill-blue-500 text-blue-500" : ""
                  }`}
                />
                {likes}
              </Button>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MessageCircle className="h-4 w-4" />0
              </div>
            </div>
          </CardContent>
        </Card>

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
                  {/* コメントのケバブメニュー */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-gray-600"
                      >
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Flag className="h-3 w-3" />
                        通報する
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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

      {/* 通報ダイアログ */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              投稿を通報
            </DialogTitle>
            <DialogDescription>
              不適切な投稿を通報してください。内容を確認後、適切な対応を行います。
            </DialogDescription>
          </DialogHeader>

          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={postData.user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">
                  {postData.user.name[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{postData.user.name}</span>
              <span className="text-xs text-gray-500">
                {postData.timestamp}
              </span>
            </div>
            <p className="text-sm text-gray-700">{postData.content}</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                通報理由（複数選択可）
              </Label>
              <div className="space-y-2">
                {reportReasons.map((reason) => (
                  <div key={reason.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={reason.id}
                      checked={selectedReasons.includes(reason.id)}
                      onCheckedChange={(checked) =>
                        handleReasonChange(reason.id, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={reason.id}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {reason.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label
                htmlFor="reportComment"
                className="text-sm font-medium text-gray-700"
              >
                詳細（任意）
              </Label>
              <Textarea
                id="reportComment"
                placeholder="通報理由の詳細があれば入力してください..."
                value={reportComment}
                onChange={(e) => setReportComment(e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setReportDialogOpen(false);
                setSelectedReasons([]);
                setReportComment("");
              }}
              disabled={isSubmittingReport}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleSubmitReport}
              disabled={selectedReasons.length === 0 || isSubmittingReport}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmittingReport ? "送信中..." : "通報する"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
