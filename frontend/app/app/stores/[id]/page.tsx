import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { StoreInfo } from "./StoreInfo";
import { AllPosts } from "./AllPosts";
import type { Post, StoreData } from "@/app/types";
import { cookies } from "next/headers";

const POSTS_PER_PAGE = 5;

export default async function StoreDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const storeId = (await params).id;
  const page = parseInt((await searchParams).page || "1", 10);
  if (isNaN(page) || page < 1) return notFound();
  const lat: number = 35.6762;
  const lng: number = 139.6503;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.get("user_jwt")?.value;

  const storeRes = await fetch(
    `http://backend:3000/api/stores/${storeId}?lat=${lat}&lng=${lng}`,
    {
      next: { revalidate: 3600 },
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `user_jwt=${cookieHeader}`,
      },
    }
  );
  if (!storeRes.ok) return notFound();
  const store: StoreData = await storeRes.json();

  const postsRes = await fetch(
    `http://backend:3000/api/stores/${storeId}/posts?page=${page}&limit=${POSTS_PER_PAGE}`,
    {
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `user_jwt=${cookieHeader}`,
      },
    }
  );
  if (!postsRes.ok) return notFound();
  const { posts, totalCount }: { posts: Post[]; totalCount: number } =
    await postsRes.json();

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-white border-b border-blue-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">店舗詳細</h1>
        </div>
      </header>
      <StoreInfo store={store} />
      <AllPosts
        totalCount={totalCount}
        posts={posts}
        currentPage={page}
        totalPages={totalPages}
        storeId={storeId}
      />
    </div>
  );
}
