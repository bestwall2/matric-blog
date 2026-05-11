"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import type { PostWithRelations } from "@/lib/types/database";
import { ArticleGrid } from "@/components/blog/article-grid";

export function BlogListClient({ posts }: { posts: PostWithRelations[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return posts;
    return posts.filter((p) => {
      const a = (p.title_ar || p.title).toLowerCase();
      const b = p.title.toLowerCase();
      return a.includes(s) || b.includes(s);
    });
  }, [posts, q]);

  return (
    <div className="space-y-6">
      <div className="max-w-xl">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="بحث ضمن صفحة النتائج الحالية..."
          className="border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
        />
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          البحث يطبّق على المقالات المعروضة في هذه الصفحة فقط. غيّر التصفية أو
          الترتيب من الشريط أعلاه لتوسيع النتائج.
        </p>
      </div>
      <ArticleGrid posts={filtered} />
    </div>
  );
}
