import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, Trash2 } from "lucide-react";
import { StarRating } from "@/components/star-rating";
import React, { useState } from "react";

type Post = {
  id: number;
  user: { name: string; avatar: string };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  status: string;
  rating: number;
};

type PostsTabProps = {
  allPosts: Post[];
};

export function PostsTab({ allPosts: initialAllPosts }: PostsTabProps) {
  const [allPosts, setAllPosts] = useState(initialAllPosts);

  const handleDeletePost = (postId: number) => {
    setAllPosts((prev) => prev.filter((post) => post.id !== postId));
    // API連携等はここで
  };

  return (
    <TabsContent value="posts" className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-blue-500" />
        <h2 className="font-semibold text-blue-700">全投稿管理</h2>
      </div>
      {allPosts.map((post) => (
        <Card
          key={post.id}
          className="border-l-4 border-l-blue-500 bg-blue-50/30"
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{post.user.name}</span>
                  <StarRating value={post.rating} readOnly size="sm" />
                  <span className="text-xs text-gray-500">
                    {post.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{post.content}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                    {post.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    {post.comments}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:bg-red-50"
                onClick={() => handleDeletePost(post.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </TabsContent>
  );
}
