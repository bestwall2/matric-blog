import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { PostWithRelations } from "@/lib/types/database";

function highlightFirstWord(text: string) {
  const space = text.indexOf(" ");
  if (space === -1) {
    return <span className="text-[#e63946]">{text}</span>;
  }
  return (
    <>
      <span className="text-[#e63946]">{text.slice(0, space)}</span>
      <span>{text.slice(space)}</span>
    </>
  );
}

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
    <section className="group relative isolate overflow-hidden rounded-3xl border border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(230,57,70,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(100,20,30,0.25),transparent_40%),linear-gradient(160deg,#0a0a0a 0%,#111 40%,#0a0a0a 100%)]" />
      <div
        className="pointer-events-none absolute inset-0 animate-gradientShift bg-mesh-blur opacity-30 mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(230,57,70,0.4), transparent, rgba(60,10,20,0.4), transparent)",
        }}
      />
      <div className="pointer-events-none absolute -inset-[100%] opacity-[0.04] mix-blend-soft-light bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

      <div className="relative grid gap-8 p-6 md:grid-cols-2 md:gap-12 md:p-14 lg:gap-16">
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap gap-2">
            <Badge className="border-0 bg-[#e63946] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              مميز
            </Badge>
            {post.categories && (
              <Badge
                variant="secondary"
                className="border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-300 backdrop-blur-sm"
              >
                {dir === "rtl" && post.categories.name_ar
                  ? post.categories.name_ar
                  : post.categories.name}
              </Badge>
            )}
            <Badge className="border border-white/10 bg-black/30 px-3 py-1 text-[10px] text-neutral-300 backdrop-blur-sm">
              {post.reading_time ?? 5} دقيقة قراءة
            </Badge>
          </div>
          <h1 className="mt-5 font-heading text-3xl font-bold leading-tight text-white md:mt-6 md:text-4xl lg:text-5xl xl:text-6xl">
            {highlightFirstWord(title)}
          </h1>
          {excerpt ? (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base">
              {excerpt}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center justify-center rounded-full bg-[#e63946] px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#e63946]/25 transition hover:bg-[#c1121f] hover:shadow-[#e63946]/40"
            >
              اقرأ المقال
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-2.5 text-sm font-medium text-neutral-200 backdrop-blur-sm transition hover:bg-white/10"
            >
              تصفح الأرشيف
            </Link>
          </div>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="group/image relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 transition duration-500 hover:shadow-[0_0_50px_-20px_rgba(230,57,70,0.4)] md:aspect-auto md:min-h-[360px]"
        >
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={title}
              fill
              priority
              className="object-cover transition duration-700 group-hover/image:scale-105"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full min-h-[280px] items-center justify-center bg-gradient-to-br from-[#1a0508] to-[#0a0a0a] font-heading text-4xl font-bold text-white/20">
              MatricBlog
            </div>
          )}
        </Link>
      </div>
    </section>
  );
}
