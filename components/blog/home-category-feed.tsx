"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
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
    <section className="space-y-8">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={active ? "outline" : "default"}
          className={
            active
              ? "border-white/15 bg-transparent text-neutral-200 hover:bg-white/10"
              : "bg-[#e11d48] text-white hover:bg-[#be123c]"
          }
          onClick={() => setActive(null)}
        >
          الكل
        </Button>
        {categories.map((c) => (
          <Button
            key={c.id}
            type="button"
            size="sm"
            variant={active === c.slug ? "default" : "outline"}
            className={
              active === c.slug
                ? "bg-[#e11d48] text-white hover:bg-[#be123c]"
                : "border-white/15 bg-transparent text-neutral-200 hover:bg-white/10"
            }
            onClick={() => setActive(c.slug)}
          >
            {c.name_ar?.trim() ? c.name_ar : c.name}
          </Button>
        ))}
      </div>
      <ArticleGrid posts={filtered} />
    </section>
  );
}
