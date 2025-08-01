import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/app/types";
import { PostCard } from "@/components/PostCard";

export function AllPosts({
  totalCount,
  posts,
  currentPage,
  totalPages,
  storeId,
}: {
  totalCount: number;
  posts: Post[];
  currentPage: number;
  totalPages: number;
  storeId: string;
}) {
  const pathname = `/stores/${storeId}`;

  const getPageHref = (page: number) =>
    page === 1 ? pathname : `${pathname}?page=${page}`;

  return (
    <>
      <div className="p-2 sm:p-4">
        <div className="flex justify-between items-center mb-4 gap-2">
          <h3 className="font-semibold text-blue-800 text-base sm:text-lg">
            投稿一覧
          </h3>
          <Badge className="bg-blue-600 text-white text-xs sm:text-sm">
            {totalCount}件の投稿
          </Badge>
        </div>

        <div className="space-y-2 sm:space-y-4 mb-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} showReportMenu={true} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={getPageHref(currentPage - 1)}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href={getPageHref(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href={getPageHref(currentPage + 1)}
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
    </>
  );
}
