"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageCircle,
  Clock,
  ThumbsUp,
  MoreVertical,
  Flag,
  Edit,
  Trash2,
} from "lucide-react";
import { StarRating } from "@/components/star-rating";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ReportDialog } from "./ReportDialog/index";
import { DeleteDialog } from "./DeleteDialog/index";
import type { Post } from "@/app/types";

type PostCardProps = {
  post: Post;
  showEditMenu?: boolean;
  showDeleteMenu?: boolean;
  showReportMenu?: boolean;
};

export function PostCard({
  post,
  showEditMenu = false,
  showDeleteMenu = false,
  showReportMenu = false,
}: PostCardProps) {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isReportDialogOpen, setReportDialogOpen] = useState(false);
  return (
    <>
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
                      {showReportMenu && (
                        <DropdownMenuItem
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setReportDialogOpen(true)}
                        >
                          <Flag className="h-4 w-4" />
                          通報する
                        </DropdownMenuItem>
                      )}

                      {showEditMenu && (
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/posts/${post.id}/edit`}
                            className="flex items-center gap-2"
                          >
                            <Edit className="h-4 w-4" />
                            編集
                          </Link>
                        </DropdownMenuItem>
                      )}

                      {showDeleteMenu && (
                        <DropdownMenuItem
                          className="flex items-center gap-2 text-red-600"
                          onClick={() => setDeleteDialogOpen(true)}
                        >
                          <Trash2 className="h-4 w-4" />
                          削除
                        </DropdownMenuItem>
                      )}
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
                  <ThumbsUp
                    className={`h-3 w-3 sm:h-4 sm:w-4 ${
                      post.isLiked && "fill-blue-500 text-blue-500"
                    }`}
                  />
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

      {/* 投稿削除確認ダイアログ */}
      {showDeleteMenu && (
        <DeleteDialog
          postId={post.id}
          isDeleteDialogOpen={isDeleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
        />
      )}

      {/* 通報ダイアログ */}
      {showReportMenu && (
        <ReportDialog
          postId={post.id}
          isReportDialogOpen={isReportDialogOpen}
          setReportDialogOpen={setReportDialogOpen}
        />
      )}
    </>
  );
}
