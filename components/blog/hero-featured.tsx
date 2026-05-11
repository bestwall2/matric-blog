import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { PostWithRelations } from "@/lib/types/database";
import { ChevronDown, Clock } from "lucide-react";

export function HeroFeatured({
  post,
}: {
  post: PostWithRelations;
}) {
  const postDescriptions = post as PostWithRelations & {
    description_ar?: string | null;
    excerpt_ar?: string | null;
    arabic_description?: string | null;
  };
  const pickArabicText = (...values: Array<string | null | undefined>) =>
    values
      .map((value) => value?.trim() ?? "")
      .find((value) => /[\u0600-\u06FF]/.test(value)) ?? "";

  const title = pickArabicText(post.title_ar, post.title);
  const excerpt = pickArabicText(
    postDescriptions.description_ar,
    postDescriptions.excerpt_ar,
    postDescriptions.arabic_description
  );

  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-[var(--bg-primary)] flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(230,57,70,0.1),transparent_70%)] animate-pulse" />
        <div 
          className="absolute inset-0 opacity-30 animate-gradientShift bg-mesh-blur"
          style={{
            backgroundImage: "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)",
            backgroundSize: "400% 400%"
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content (Right in RTL) */}
          <div className="flex flex-col items-start text-right animate-fade-in-up">
            <Badge className="mb-6 rounded-full bg-[#e63946] px-4 py-1 text-[12px] font-bold text-white">
              مقال مميز
            </Badge>
            
            <h1 className="font-heading text-4xl font-black leading-[1.2] text-[var(--text-primary)] md:text-5xl lg:text-[56px]">
              {title}
            </h1>
            
            {excerpt && (
              <p className="mt-6 max-w-xl text-lg leading-[1.8] text-[var(--text-muted)]">
                {excerpt}
              </p>
            )}

            <div className="mt-6 flex items-center gap-3 text-[var(--text-muted)]">
              <Clock className="size-4" />
              <span className="text-[14px]">{post.reading_time ?? 7} دقائق قراءة</span>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={`/blog/${post.slug}`}
                className="rounded-xl bg-[#e63946] px-8 py-4 text-[16px] font-bold text-white transition-all hover:bg-[#c1121f] hover:scale-105 active:scale-95 glow-red"
              >
                اقرأ المقال
              </Link>
              <Link
                href="/blog"
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-8 py-4 text-[16px] font-bold text-[var(--text-primary)] transition-all hover:bg-[var(--bg-elevated)]"
              >
                تصفح الأرشيف
              </Link>
            </div>
          </div>

          {/* Image Content (Left in RTL) */}
          <div className="hidden lg:block">
            <Link
              href={`/blog/${post.slug}`}
              className="group relative block aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-[20px] transition-all duration-500 hover:rotate-0 hover:scale-[1.02] glow-red mx-auto"
              style={{ transform: "rotate(-2deg)" }}
            >
              {post.featured_image ? (
                <Image
                  src={post.featured_image}
                  alt={title}
                  fill
                  priority
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-primary)]">
                  <span className="font-heading text-4xl font-black text-white/10">MatricBlog</span>
                </div>
              )}
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="size-8 text-[var(--text-muted)]" />
      </div>
    </section>
  );
}
