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
    <section className="space-y-10">
      <div className="flex w-full items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <button
          type="button"
          onClick={() => setActive(null)}
          className={cn(
            "flex h-9 min-w-fit items-center justify-center rounded-full px-6 text-[14px] font-bold transition-all duration-150",
            active === null
              ? "bg-[#e63946] text-white shadow-[0_2px_10px_rgba(230,57,70,0.3)]"
              : "border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
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
              "flex h-9 min-w-fit items-center justify-center rounded-full px-6 text-[14px] font-bold transition-all duration-150",
              active === c.slug
                ? "bg-[#e63946] text-white shadow-[0_2px_10px_rgba(230,57,70,0.3)]"
                : "border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
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

