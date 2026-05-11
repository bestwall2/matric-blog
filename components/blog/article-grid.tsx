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
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((p) => (
        <ArticleCard key={p.id} post={p} dir={dir} />
      ))}
    </div>
  );
}
