"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MessageCircle,
  Clock,
  ThumbsUp,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/star-rating";
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

const myPosts = [
  {
    id: 1,
    store: { name: "カフェ・ド・パリ", genre: "カフェ" },
    content:
      "コーヒーがとても美味しかったです！雰囲気も良くて、仕事にも集中できました。",
    timestamp: "2時間前",
    likes: 12,
    comments: 3,
    rating: 4.5,
  },
  {
    id: 2,
    store: { name: "らーめん太郎", genre: "ラーメン" },
    content: "醤油ラーメンが絶品でした。スープが濃厚で麺との相性も抜群です。",
    timestamp: "1日前",
    likes: 8,
    comments: 1,
    rating: 4.0,
  },
  {
    id: 3,
    store: { name: "イタリアン・ベラ", genre: "イタリアン" },
    content: "パスタが本格的で美味しかったです。また来たいと思います。",
    timestamp: "3日前",
    likes: 15,
    comments: 4,
    rating: 5.0,
  },
];

export function PostsTab() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handleDeletePost = (postId: number) => {
    setSelectedPostId(postId);
    setDeleteDialogOpen(true);
  };

  const confirmDeletePost = () => {
    if (selectedPostId) {
      // 実際の削除処理をここに実装
      console.log("Delete post:", selectedPostId);
      setDeleteDialogOpen(false);
      setSelectedPostId(null);
    }
  };

  return (
    <>
      <TabsContent value="posts" className="space-y-3">
        {myPosts.map((post) => (
          <Card
            key={post.id}
            className="hover:shadow-md transition-shadow relative"
          >
            <CardContent className="p-4 sm:p-5 relative">
              {/* 右上メニューを固定配置 */}
              <div className="absolute right-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/posts/${post.id}/edit`}
                        className="flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        編集
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeletePost(post.id)}
                      className="flex items-center gap-2 text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      削除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* 投稿内容 */}
              <div className="flex flex-col gap-1 mb-2 pr-12">
                {" "}
                {/* pr-12でメニュー分の余白を確保 */}
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-medium text-sm sm:text-base">
                    {post.store.name}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {post.store.genre}
                  </Badge>
                  <StarRating value={post.rating} readOnly size="sm" />
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {post.timestamp}
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-700 mb-3">
                {post.content}
              </p>

              <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                  {post.likes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />0
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      {/* 投稿削除確認ダイアログ */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>投稿を削除しますか？</DialogTitle>
            <DialogDescription>
              この操作は取り消すことができません。投稿とそのコメントがすべて削除されます。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              キャンセル
            </Button>
            <Button variant="destructive" onClick={confirmDeletePost}>
              削除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
