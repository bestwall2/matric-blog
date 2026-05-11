import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleGrid } from "@/components/blog/article-grid";
import { BackToTop } from "@/components/blog/back-to-top";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareButtons } from "@/components/blog/share-buttons";
import { TocSidebar } from "@/components/blog/toc-sidebar";
import { ViewTracker } from "@/components/blog/view-tracker";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/constants";
import {
  fetchPostBySlugPublic,
  fetchRelatedPosts,
} from "@/lib/posts";
import { articleUrl, buildArticleJsonLd } from "@/lib/seo";
import { createServerSupabase } from "@/lib/supabase/server";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = await createServerSupabase();
  const post = await fetchPostBySlugPublic(supabase, params.slug);
  if (!post) return { title: "غير موجود" };

  const title = post.meta_title?.trim() || post.title;
  const description =
    post.meta_description?.trim() || post.excerpt || post.title;
  const canonical = post.canonical_url?.trim() || articleUrl(post.slug);
  
  let og = post.featured_image?.trim();
  if (!og || og.includes("mrkehel.com")) {
    og = post.og_image?.trim();
  }
  if (!og || og.includes("mrkehel.com")) {
    og = `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}`;
  }

  const robots =
    post.robots_meta?.includes("noindex") ?
      ({ index: false, follow: false } as const)
    : ({ index: true, follow: true } as const);

  return {
    title,
    description,
    alternates: { canonical },
    robots,
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [{ url: og }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og],
    },
    keywords: post.meta_keywords ?? undefined,
  };
}

export default async function ArticlePage({ params }: Props) {
  const supabase = await createServerSupabase();
  const post = await fetchPostBySlugPublic(supabase, params.slug);
  if (!post) notFound();

  const related = await fetchRelatedPosts(
    supabase,
    post.category_id,
    post.id,
    3
  );

  const schemaType = post.schema_type?.trim() || "Article";
  const jsonLd =
    post.structured_data && typeof post.structured_data === "object" ?
      post.structured_data
    : buildArticleJsonLd(post, schemaType);

  const url = articleUrl(post.slug);
  const displayTitle =
    post.title_ar?.trim() ? post.title_ar : post.title;
  const html =
    post.content_ar?.trim() ? post.content_ar : post.content;

  return (
    <>
      <JsonLd data={jsonLd as Record<string, unknown>} />
      <ReadingProgress />
      <ViewTracker slug={post.slug} />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] w-full flex-col justify-end pb-20 pt-32 md:min-h-[100vh]">
        {post.featured_image && (
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${post.featured_image})` }}
          />
        )}
        <div 
          className="absolute inset-0 z-10 backdrop-blur-[1px]"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.88) 42%, rgba(0,0,0,0.42) 72%, rgba(0,0,0,0.08) 100%)" }}
        />
        
        <div className="container relative z-20 mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-[720px]">
            <div className="mb-6">
              <Breadcrumbs
                items={[
                  { label: "الرئيسية", href: "/" },
                  { label: "المقالات", href: "/blog" },
                  ...(post.categories ?
                    [
                      {
                        label: post.categories.name_ar || post.categories.name,
                        href: `/blog?category=${post.categories.slug}`,
                      },
                    ]
                  : []),
                ]}
              />
            </div>

            <h1 className="font-heading text-3xl font-black leading-[1.3] text-[var(--text-primary)] md:text-[40px] lg:text-[48px]">
              {displayTitle}
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <Avatar className="size-8 border border-white/10">
                  <AvatarFallback className="bg-[var(--bg-elevated)] text-[10px] text-[var(--text-primary)]">M</AvatarFallback>
                </Avatar>
                <span className="text-[14px] font-medium text-[var(--text-primary)]">{post.authors?.name || "المحرر"}</span>
              </div>
              <span className="text-[var(--text-faint)]">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                <span className="text-[14px]">
                  {post.published_at ?
                    new Date(post.published_at).toLocaleDateString("ar-MA", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : ""}
                </span>
              </div>
              <span className="text-[var(--text-faint)]">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="size-4" />
                <span className="text-[14px]">{post.reading_time ?? 7} دقائق قراءة</span>
              </div>
            </div>

            {post.categories && (
              <div className="mt-6">
                <Badge className="rounded-full bg-[#e63946] px-4 py-1 text-[11px] font-bold text-white">
                  {post.categories.name_ar || post.categories.name}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </section>

      <article className="mx-auto w-full max-w-7xl px-4 py-20 md:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full max-w-[720px]">
            <div
              className="article-html"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            
            <div className="mt-16 flex flex-col gap-6">
              <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">شارك هذا المقال</h3>
              <ShareButtons url={url} title={displayTitle} />
            </div>

            {related.length > 0 && (
              <section className="mt-24 space-y-10">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-2xl font-black text-[var(--text-primary)] md:text-3xl">اقرأ أيضاً</h2>
                  <div className="h-0.5 flex-1 bg-[var(--border)] mx-6" />
                </div>
                <ArticleGrid posts={related} />
              </section>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TocSidebar />
            </div>
          </aside>
        </div>
      </article>
      <BackToTop />
    </>
  );
}
