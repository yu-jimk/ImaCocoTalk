"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Clock,
  ThumbsUp,
  MoreVertical,
  Flag,
} from "lucide-react";
import { ReportDialog } from "@/components/ReportDialog";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/star-rating";
import type { Post } from "@/app/types";
import { handleOpenReport } from "@/utils/handleOpenReport";

const POSTS_PER_PAGE = 3;

type PostLikeState = {
  [postId: number]: {
    likes: number;
    isLiked: boolean;
  };
};

export function AllPosts({ posts }: { posts: Post[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postLikes, setPostLikes] = useState<PostLikeState>(
    posts.reduce<PostLikeState>(
      (acc, post) => ({
        ...acc,
        [post.id]: { likes: post.likes, isLiked: post.isLiked },
      }),
      {}
    )
  );
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [targetPostId, setTargetPostId] = useState<number | null>(null);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePostLike = (postId: number) => {
    setPostLikes((prev) => ({
      ...prev,
      [postId]: {
        likes: prev[postId].isLiked
          ? prev[postId].likes - 1
          : prev[postId].likes + 1,
        isLiked: !prev[postId].isLiked,
      },
    }));
  };

  return (
    <>
      <div className="p-2 sm:p-4">
        <div className="flex justify-between items-center mb-4 gap-2">
          <h3 className="font-semibold text-blue-800 text-base sm:text-lg">
            投稿一覧
          </h3>
          <Badge className="bg-blue-600 text-white text-xs sm:text-sm">
            {posts.length}件の投稿
          </Badge>
        </div>

        <div className="space-y-2 sm:space-y-4 mb-6">
          {currentPosts.map((post) => (
            <Card
              key={post.id}
              className="hover:shadow-md transition-shadow bg-white border-l-4 border-l-blue-500 rounded-md sm:rounded-lg"
            >
              <CardContent className="p-2 sm:p-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                    <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                      <span className="font-medium text-xs sm:text-sm">
                        {post.user.name}
                      </span>
                      <StarRating value={post.rating} readOnly size="sm" />
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {post.timestamp}
                      </div>
                    </div>
                    <Link href={`/posts/${post.id}`}>
                      <p className="text-xs sm:text-sm text-gray-700 mb-2 hover:text-blue-600 cursor-pointer break-words">
                        {post.content}
                      </p>
                    </Link>
                    <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-500">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handlePostLike(post.id);
                        }}
                        className="flex items-center gap-1 hover:text-blue-500"
                      >
                        <ThumbsUp
                          className={`h-4 w-4 ${
                            postLikes[post.id]?.isLiked
                              ? "fill-blue-500 text-blue-500"
                              : ""
                          }`}
                        />
                        {postLikes[post.id]?.likes}
                      </button>
                      <Link
                        href={`/posts/${post.id}`}
                        className="flex items-center gap-1 hover:text-blue-500"
                      >
                        <MessageCircle className="h-4 w-4 text-blue-500" />0
                      </Link>
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
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      setCurrentPage(currentPage + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      {/* 通報ダイアログ */}
      {targetPostId !== null && (
        <ReportDialog
          postId={targetPostId}
          open={reportDialogOpen}
          onOpenChange={setReportDialogOpen}
        />
      )}
    </>
  );
}
