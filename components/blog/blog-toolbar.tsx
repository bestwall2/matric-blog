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
    <div className="flex flex-col gap-6 py-4">
      {/* Category Pills */}
      <div className="flex w-full items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <CategoryPill
          href={`/blog${qs({
            sort: sort === "latest" ? undefined : "views",
          })}`}
          active={!activeCategory}
          label="كل التصنيفات"
        />
        {categories.map((c) => (
          <CategoryPill
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

      {/* Sort Options */}
      <div className="flex items-center gap-6 border-b border-[var(--border)] pb-2">
        <button
          className={cn(
            "relative pb-2 text-[15px] font-bold transition-colors",
            sort === "latest" ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          )}
        >
          <Link
            href={`/blog${qs({
              sort: undefined,
              category: activeCategory ?? undefined,
            })}`}
          >
            الأحدث
          </Link>
          {sort === "latest" && (
            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#e63946]" />
          )}
        </button>
        <button
          className={cn(
            "relative pb-2 text-[15px] font-bold transition-colors",
            sort === "views" ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          )}
        >
          <Link
            href={`/blog${qs({
              sort: "views",
              category: activeCategory ?? undefined,
            })}`}
          >
            الأكثر مشاهدة
          </Link>
          {sort === "views" && (
            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#e63946]" />
          )}
        </button>
      </div>
    </div>
  );
}

function CategoryPill({
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
        "flex h-9 min-w-fit items-center justify-center rounded-full px-6 text-[14px] font-bold transition-all duration-150",
        active
          ? "bg-[#e63946] text-white shadow-[0_2px_10px_rgba(230,57,70,0.3)]"
          : "border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
      )}
    >
      {label}
    </Link>
  );
}

