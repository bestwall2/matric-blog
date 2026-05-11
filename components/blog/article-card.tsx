import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { PostWithRelations } from "@/lib/types/database";
import { cn } from "@/lib/utils";

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

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition duration-300 hover:-translate-y-1 hover:border-[#e11d48]/40 hover:shadow-[0_20px_60px_-30px_rgba(225,29,72,0.35)]"
      )}
    >
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#1a0508] to-[#0a0a0a] font-heading text-2xl text-white/40">
            MatricBlog
          </div>
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          {category && (
            <Badge
              className="border-0 bg-black/70 text-[11px] font-semibold uppercase tracking-wide text-[#e11d48]"
              variant="secondary"
            >
              {dir === "rtl" && category.name_ar ? category.name_ar : category.name}
            </Badge>
          )}
          <Badge className="border-0 bg-black/70 text-[11px] text-neutral-200">
            {mins} min read
          </Badge>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-heading text-xl leading-snug text-white transition group-hover:text-[#e11d48]">
            {title}
          </h3>
        </Link>
        {excerpt ? (
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-400">
            {excerpt}
          </p>
        ) : null}
        <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
          <span>{post.authors?.name ?? "Editorial"}</span>
          <span>
            {post.published_at
              ? new Date(post.published_at).toLocaleDateString(
                  dir === "rtl" ? "ar-MA" : "en-US"
                )
              : ""}
          </span>
        </div>
      </div>
    </article>
  );
}
