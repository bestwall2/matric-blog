import type { PostWithRelations } from "@/lib/types/database";
import { ArticleCard } from "@/components/blog/article-card";

export function ArticleGrid({
  posts,
  dir = "rtl",
}: {
  posts: PostWithRelations[];
  dir?: "rtl" | "ltr";
}) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <ArticleCard key={p.id} post={p} dir={dir} />
      ))}
    </div>
  );
}
