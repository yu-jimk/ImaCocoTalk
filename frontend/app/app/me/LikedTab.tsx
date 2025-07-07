"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageCircle,
  Clock,
  ThumbsUp,
  MoreVertical,
  Flag,
} from "lucide-react";
import { StarRating } from "@/components/star-rating";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ReportDialog } from "@/components/ReportDialog";
import { handleOpenReport } from "@/utils/handleOpenReport";

const likedPosts = [
  {
    id: 101,
    user: { name: "佐藤花子", avatar: "/placeholder-user.jpg" },
    store: { name: "スターバックス渋谷店", genre: "カフェ" },
    content: "新作のフラペチーノが美味しかったです！季節限定なのでお早めに。",
    timestamp: "1時間前",
    likes: 25,
    comments: 8,
    rating: 4.0,
    isLiked: true,
  },
  {
    id: 102,
    user: { name: "山田次郎", avatar: "/placeholder-user.jpg" },
    store: { name: "焼肉キング", genre: "焼肉" },
    content: "お肉が柔らかくて最高でした。コスパも良くておすすめです。",
    timestamp: "2日前",
    likes: 18,
    comments: 5,
    rating: 4.5,
    isLiked: true,
  },
  {
    id: 103,
    user: { name: "鈴木美咲", avatar: "/placeholder-user.jpg" },
    store: { name: "和食処 さくら", genre: "和食" },
    content:
      "お刺身が新鮮で美味しかったです。雰囲気も落ち着いていて良かったです。",
    timestamp: "4日前",
    likes: 12,
    comments: 3,
    rating: 4.5,
    isLiked: true,
  },
];

export function LikedTab() {
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [targetPostId, setTargetPostId] = useState<number | null>(null);

  return (
    <TabsContent value="liked" className="space-y-3">
      {likedPosts.map((post) => (
        <Card key={post.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Avatar */}
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                <AvatarImage
                  src={post.user.avatar || "/placeholder.svg"}
                  alt={post.user.name}
                />
                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              </Avatar>

              {/* Post Content */}
              <div className="flex-1 min-w-0">
                {/* Header: name, store, rating, time */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 justify-between">
                  <div className="flex items-center gap-x-2 gap-y-1 min-w-0">
                    <span className="font-medium text-sm sm:text-base truncate">
                      {post.user.name}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 truncate">
                      @{post.store.name}
                    </span>
                  </div>
                  {/* ケバブメニュー 右寄せ */}
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-gray-600"
                          onClick={(e) => e.preventDefault()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            handleOpenReport(
                              post.id,
                              setTargetPostId,
                              setReportDialogOpen
                            )
                          }
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Flag className="h-4 w-4" />
                          通報する
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                  <StarRating value={post.rating} readOnly size="sm" />
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {post.timestamp}
                  </div>
                </div>

                {/* Content（本文のみリンク） */}
                <Link href={`/posts/${post.id}`} className="block mt-1">
                  <p className="text-sm sm:text-base text-gray-700 mb-3 break-words hover:text-blue-600 cursor-pointer">
                    {post.content}
                  </p>
                </Link>

                {/* Reactions */}
                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 fill-blue-500 text-blue-500" />
                    {post.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />0
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {likedPosts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <ThumbsUp className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">いいねした投稿がありません</p>
            <p className="text-sm text-gray-400 mt-1">
              気に入った投稿にいいねしてみましょう
            </p>
          </CardContent>
        </Card>
      )}
      {/* 通報ダイアログ */}
      {targetPostId !== null && (
        <ReportDialog
          postId={targetPostId}
          open={reportDialogOpen}
          onOpenChange={setReportDialogOpen}
        />
      )}
    </TabsContent>
  );
}
