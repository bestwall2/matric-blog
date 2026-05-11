import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types/database";

export function BlogToolbar({
  categories,
  activeCategory,
  activeSort,
}: {
  categories: Category[];
  activeCategory?: string | null;
  activeSort?: "latest" | "views";
}) {
  function qs(params: Record<string, string | undefined>) {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v) sp.set(k, v);
    });
    const s = sp.toString();
    return s ? `?${s}` : "";
  }

  const sort = activeSort ?? "latest";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <SortChip
          href={`/blog${qs({
            sort: undefined,
            category: activeCategory ?? undefined,
          })}`}
          active={sort === "latest"}
          label="الأحدث"
        />
        <SortChip
          href={`/blog${qs({
            sort: "views",
            category: activeCategory ?? undefined,
          })}`}
          active={sort === "views"}
          label="الأكثر مشاهدة"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <CategoryChip
          href={`/blog${qs({
            sort: sort === "latest" ? undefined : "views",
          })}`}
          active={!activeCategory}
          label="كل التصنيفات"
        />
        {categories.map((c) => (
          <CategoryChip
            key={c.id}
            href={`/blog${qs({
              category: c.slug,
              sort: sort === "latest" ? undefined : "views",
            })}`}
            active={activeCategory === c.slug}
            label={c.name_ar?.trim() ? c.name_ar : c.name}
          />
        ))}
      </div>
    </div>
  );
}

function SortChip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "bg-[#e63946] text-white shadow-sm"
          : "border border-white/10 bg-white/5 text-neutral-400 hover:border-white/20 hover:text-white"
      )}
    >
      {label}
    </Link>
  );
}

function CategoryChip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all duration-200",
        active
          ? "bg-white text-black"
          : "border border-white/10 bg-transparent text-neutral-500 hover:border-white/20 hover:text-white"
      )}
    >
      {label}
    </Link>
  );
}
