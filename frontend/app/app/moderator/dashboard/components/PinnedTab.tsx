"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pin, MoreVertical, Edit3, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PinnedPost = {
  id: number;
  content: string;
  timestamp: string;
  isPinned: boolean;
};

type PinnedTabProps = {
  pinnedPosts: PinnedPost[];
};

export function PinnedTab({ pinnedPosts: initialPinnedPosts }: PinnedTabProps) {
  const [pinnedPosts, setPinnedPosts] = useState(initialPinnedPosts);
  const [newPinnedPost, setNewPinnedPost] = useState("");
  const [editingPinnedPost, setEditingPinnedPost] = useState<number | null>(
    null
  );
  const [editPinnedContent, setEditPinnedContent] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleCreatePinnedPost = () => {
    if (newPinnedPost.trim()) {
      const newPost = {
        id: Date.now(),
        content: newPinnedPost,
        timestamp: "今",
        isPinned: true,
      };
      setPinnedPosts([newPost, ...pinnedPosts]);
      setNewPinnedPost("");
      // API連携等はここで
    }
  };

  const handleEditPinnedPost = (postId: number, content: string) => {
    setEditingPinnedPost(postId);
    setEditPinnedContent(content);
  };

  const handleSavePinnedPost = () => {
    if (editingPinnedPost && editPinnedContent.trim()) {
      setPinnedPosts((prev) =>
        prev.map((post) =>
          post.id === editingPinnedPost
            ? { ...post, content: editPinnedContent }
            : post
        )
      );
      setEditingPinnedPost(null);
      setEditPinnedContent("");
      // API連携等はここで
    }
  };

  // 削除ボタン押下時
  const handleDeletePinnedPost = (postId: number) => {
    setSelectedItemId(postId);
    setDeleteDialogOpen(true);
  };

  // ダイアログで削除確定時
  const confirmDelete = () => {
    if (selectedItemId) {
      setPinnedPosts((prev) =>
        prev.filter((post) => post.id !== selectedItemId)
      );
      setDeleteDialogOpen(false);
      setSelectedItemId(null);
    }
  };

  return (
    <TabsContent value="pinned" className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Pin className="h-5 w-5 text-green-500" />
        <h2 className="font-semibold text-green-700">固定投稿管理</h2>
      </div>
      {/* Create New Pinned Post */}
      <Card className="border-l-4 border-l-green-500 bg-green-50/30 py-6 gap-2">
        <CardHeader>
          <CardTitle className="text-lg text-green-700">
            新しいお知らせを作成
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="お客様へのお知らせを入力してください..."
            value={newPinnedPost}
            onChange={(e) => setNewPinnedPost(e.target.value)}
            rows={3}
          />
          <Button
            onClick={handleCreatePinnedPost}
            disabled={!newPinnedPost.trim()}
            className="bg-green-500 hover:bg-green-600"
          >
            <Pin className="h-4 w-4 mr-2" />
            固定投稿を作成
          </Button>
        </CardContent>
      </Card>
      {/* Existing Pinned Posts */}
      {pinnedPosts.map((post) => (
        <Card
          key={post.id}
          className="border-l-4 border-l-yellow-500 bg-yellow-50/30"
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Pin className="h-4 w-4 text-yellow-600" />
                  <Badge className="bg-yellow-500 text-white text-xs">
                    固定投稿
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {post.timestamp}
                  </span>
                </div>
                {editingPinnedPost === post.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editPinnedContent}
                      onChange={(e) => setEditPinnedContent(e.target.value)}
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleSavePinnedPost}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        保存
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingPinnedPost(null)}
                      >
                        キャンセル
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700">{post.content}</p>
                )}
              </div>
              {editingPinnedPost !== post.id && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        handleEditPinnedPost(post.id, post.content)
                      }
                      className="flex items-center gap-2"
                    >
                      <Edit3 className="h-4 w-4" />
                      編集
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeletePinnedPost(post.id)}
                      className="flex items-center gap-2 text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      削除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>固定投稿を削除しますか？</DialogTitle>
            <DialogDescription>
              この操作は取り消すことができません。固定投稿が完全に削除されます。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              キャンセル
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              削除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TabsContent>
  );
}
