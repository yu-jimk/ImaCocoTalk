import { TabsContent } from "@/components/ui/tabs";
import { PostCard } from "@/components/PostCard";
import type { Post } from "@/app/types";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export function PostsTab({ posts }: { posts: Post[] }) {
  return (
    <>
      <TabsContent value="posts" className="space-y-3">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            showDeleteMenu={true}
            showEditMenu={true}
            likeButtonDisabled={true}
          />
        ))}
        {posts.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">投稿がありません</p>
              <p className="text-sm text-gray-400 mt-1">
                新しい投稿を作成してみましょう
              </p>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </>
  );
}
