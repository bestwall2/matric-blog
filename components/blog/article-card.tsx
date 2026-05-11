import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { PostWithRelations } from "@/lib/types/database";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

const categoryColors: Record<string, string> = {
  editorial: "bg-[#e63946] text-white",
  tech: "bg-blue-600 text-white",
  football: "bg-emerald-600 text-white",
  sports: "bg-emerald-600 text-white",
};

export function ArticleCard({
  post,
}: {
  post: PostWithRelations;
}) {
  const title = post.title_ar?.trim() ? post.title_ar : post.title;
  const excerpt = post.excerpt ?? "";
  const category = post.categories;
  const mins = post.reading_time ?? 5;
  const catSlug = category?.slug?.toLowerCase() || "";
  const colorClass = categoryColors[catSlug] || categoryColors.editorial;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[16px] bg-[#111111] border border-white/5 transition-all duration-300 hover:-translate-y-[6px] hover:card-shadow-hover">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/9] overflow-hidden"
      >
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#1a0a0a] to-[#0a0a0a]">
            <span className="font-heading text-xl font-black text-white/10">MatricBlog</span>
          </div>
        )}
      </Link>
      
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          {category && (
            <Badge className={cn("rounded-full border-0 px-3 py-0.5 text-[10px] font-bold uppercase", colorClass)}>
              {category.name_ar || category.name}
            </Badge>
          )}
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="line-clamp-2 font-heading text-[18px] font-bold leading-tight text-white transition-colors group-hover:text-[#e63946]">
            {title}
          </h3>
        </Link>
        
        {excerpt && (
          <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-[#888888]">
            {excerpt}
          </p>
        )}

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-[#1a1a1a] text-[10px] font-bold text-white border border-white/10">
              {post.authors?.name?.charAt(0) || "M"}
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-medium text-white">{post.authors?.name || "المحرر"}</span>
              <span className="text-[10px] text-[#888888]">
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString("ar-MA", {
                      month: "short",
                      day: "numeric",
                    })
                  : ""}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#888888]">
            <Clock className="size-3" />
            <span className="text-[11px] font-medium">{mins} دقائق</span>
          </div>
        </div>
      </div>
    </article>
  );
}

