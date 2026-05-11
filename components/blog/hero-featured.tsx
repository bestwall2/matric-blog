import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { PostWithRelations } from "@/lib/types/database";

export function HeroFeatured({
  post,
  dir = "rtl",
}: {
  post: PostWithRelations;
  dir?: "rtl" | "ltr";
}) {
  const title =
    dir === "rtl" && post.title_ar?.trim() ? post.title_ar : post.title;
  const excerpt = post.excerpt ?? "";

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(225,29,72,0.35),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(120,20,40,0.45),transparent_40%),linear-gradient(135deg,#0a0a0a,#141414)]" />
      <div
        className="pointer-events-none absolute inset-0 animate-gradientShift bg-mesh-blur opacity-35 mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(225,29,72,0.45), transparent, rgba(60,10,20,0.5), transparent)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-soft-light bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

      <div className="relative grid gap-10 p-8 md:grid-cols-2 md:p-14 lg:gap-16">
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap gap-2">
            <Badge className="border-0 bg-[#e11d48] text-[11px] font-semibold uppercase tracking-wide text-white">
              Featured
            </Badge>
            {post.categories && (
              <Badge
                variant="secondary"
                className="border-white/10 bg-white/10 text-[11px] uppercase tracking-wide text-neutral-200"
              >
                {dir === "rtl" && post.categories.name_ar
                  ? post.categories.name_ar
                  : post.categories.name}
              </Badge>
            )}
            <Badge className="border-white/10 bg-black/40 text-[11px] text-neutral-200">
              {post.reading_time ?? 5} min read
            </Badge>
          </div>
          <h1 className="mt-6 font-heading text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {excerpt ? (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
              {excerpt}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center justify-center rounded-full bg-[#e11d48] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#be123c]"
            >
              اقرأ المقال
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              تصفح الأرشيف
            </Link>
          </div>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 md:aspect-auto md:min-h-[320px]"
        >
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full min-h-[280px] items-center justify-center bg-[#141414] font-heading text-4xl text-white/25">
              MatricBlog
            </div>
          )}
        </Link>
      </div>
    </section>
  );
}
