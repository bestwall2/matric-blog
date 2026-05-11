"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types/database";
import type { PostWithRelations } from "@/lib/types/database";
import { ArticleGrid } from "@/components/blog/article-grid";

export function HomeCategoryFeed({
  categories,
  posts,
}: {
  categories: Category[];
  posts: PostWithRelations[];
}) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!active) return posts;
    return posts.filter((p) => p.categories?.slug === active);
  }, [posts, active]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive(null)}
          className={cn(
            "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
            active === null
              ? "bg-[#e63946] text-white shadow-sm"
              : "border border-white/10 bg-white/5 text-neutral-400 hover:border-white/20 hover:text-white"
          )}
        >
          الكل
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c.slug)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
              active === c.slug
                ? "bg-[#e63946] text-white shadow-sm"
                : "border border-white/10 bg-white/5 text-neutral-400 hover:border-white/20 hover:text-white"
            )}
          >
            {c.name_ar?.trim() ? c.name_ar : c.name}
          </button>
        ))}
      </div>
      <ArticleGrid posts={filtered} />
    </section>
  );
}
