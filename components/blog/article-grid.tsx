import type { PostWithRelations } from "@/lib/types/database";
import { ArticleCard } from "@/components/blog/article-card";

export function ArticleGrid({
  posts,
}: {
  posts: PostWithRelations[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <ArticleCard key={p.id} post={p} />
      ))}
    </div>
  );
}

