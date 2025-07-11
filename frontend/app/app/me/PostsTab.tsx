import { TabsContent } from "@/components/ui/tabs";
import { PostCard } from "@/components/PostCard";
import type { Post } from "@/app/types";

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
      </TabsContent>
    </>
  );
}
