import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { PostWithRelations } from "@/lib/types/database";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  editorial: "bg-[#e63946]/15 text-[#e63946] border-[#e63946]/20",
  tech: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  sports: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  news: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  guide: "bg-violet-500/15 text-violet-400 border-violet-500/20",
};

export function ArticleCard({
  post,
  dir = "rtl",
}: {
  post: PostWithRelations;
  dir?: "rtl" | "ltr";
}) {
  const title =
    dir === "rtl" && post.title_ar?.trim() ? post.title_ar : post.title;
  const excerpt = post.excerpt ?? "";
  const category = post.categories;
  const mins = post.reading_time ?? 5;
  const catSlug = category?.slug?.toLowerCase() || "";
  const colorClass = categoryColors[catSlug] || categoryColors.editorial;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#141414] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/15 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#1a0508] to-[#0a0a0a] font-heading text-2xl text-white/40">
            MatricBlog
          </div>
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          {category && (
            <Badge
              className={cn(
                "border text-[11px] font-semibold tracking-wide",
                colorClass
              )}
              variant="secondary"
            >
              {dir === "rtl" && category.name_ar
                ? category.name_ar
                : category.name}
            </Badge>
          )}
          <Badge className="border-0 bg-black/70 text-[11px] text-neutral-300">
            {mins} min
          </Badge>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-heading text-lg leading-snug text-white transition-all duration-200 group-hover:text-[#e63946]">
            {title}
          </h3>
        </Link>
        {excerpt ? (
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-neutral-500">
            {excerpt}
          </p>
        ) : null}
        <div className="mt-4 flex items-center justify-between border-t border-white/[0.04] pt-4 text-xs text-neutral-600">
          <span>{post.authors?.name ?? "Editorial"}</span>
          <span>
            {post.published_at
              ? new Date(post.published_at).toLocaleDateString(
                  dir === "rtl" ? "ar-MA" : "en-US",
                  { month: "short", day: "numeric", year: "numeric" }
                )
              : ""}
          </span>
        </div>
      </div>
    </article>
  );
}
