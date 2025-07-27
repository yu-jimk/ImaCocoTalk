import { TabsContent } from "@/components/ui/tabs";
import { MessageCircle } from "lucide-react";
import type { Post } from "@/app/types";
import { PostCard } from "@/components/PostCard";
import { Card, CardContent } from "@/components/ui/card";

export function PostsTab({ posts }: { posts: Post[] }) {
  return (
    <TabsContent value="posts" className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-blue-500" />
        <h2 className="font-semibold text-blue-700">全投稿管理</h2>
      </div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} likeButtonDisabled={true} />
      ))}
      {posts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">投稿がありません</p>
            <p className="text-sm text-gray-400 mt-1">
              ユーザーからの投稿がここに表示されます
            </p>
          </CardContent>
        </Card>
      )}
    </TabsContent>
  );
}
