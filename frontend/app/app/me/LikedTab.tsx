import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { ThumbsUp } from "lucide-react";
import { PostCard } from "@/components/PostCard";
import type { Post } from "@/app/types";

export function LikedTab({ posts }: { posts: Post[] }) {
  return (
    <TabsContent value="liked" className="space-y-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} showReportMenu={true} />
      ))}

      {posts.length === 0 && (
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
    </TabsContent>
  );
}
