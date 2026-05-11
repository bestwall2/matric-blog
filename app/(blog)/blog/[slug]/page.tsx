import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleGrid } from "@/components/blog/article-grid";
import { BackToTop } from "@/components/blog/back-to-top";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareButtons } from "@/components/blog/share-buttons";
import { TocSidebar } from "@/components/blog/toc-sidebar";
import { ViewTracker } from "@/components/blog/view-tracker";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import {
  fetchPostBySlugPublic,
  fetchRelatedPosts,
} from "@/lib/posts";
import { articleUrl, buildArticleJsonLd } from "@/lib/seo";
import { createServerSupabase } from "@/lib/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
  const og =
    post.og_image?.trim() ||
    post.featured_image?.trim() ||
    `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}`;

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
      <article className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
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
            { label: displayTitle },
          ]}
        />

        <header className="mt-8 space-y-4">
          <div className="flex flex-wrap gap-2">
            {post.categories && (
              <Badge className="bg-[#e11d48]/15 text-[11px] uppercase tracking-wide text-[#e11d48]">
                {post.categories.name_ar || post.categories.name}
              </Badge>
            )}
            <Badge variant="secondary" className="text-[11px]">
              {post.reading_time ?? 5} دقيقة قراءة
            </Badge>
            <Badge variant="outline" className="border-white/15 text-[11px]">
              {post.view_count ?? 0} مشاهدة
            </Badge>
          </div>
          <h1 className="font-heading text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
            {displayTitle}
          </h1>
          {post.excerpt ? (
            <p className="max-w-3xl text-lg text-neutral-400">{post.excerpt}</p>
          ) : null}
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
            <span>{post.authors?.name ?? SITE_NAME}</span>
            <span>
              {post.published_at ?
                new Date(post.published_at).toLocaleDateString("ar-MA")
              : ""}
            </span>
          </div>
        </header>

        {post.featured_image ?
          <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={post.featured_image}
              alt={displayTitle}
              fill
              priority
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 1024px"
            />
          </div>
        : null}

        <Separator className="my-10 bg-white/10" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <div
              className="article-html"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <Separator className="my-12 bg-white/10" />
            <section className="space-y-4">
              <h2 className="font-heading text-2xl text-white">شارك المقال</h2>
              <ShareButtons url={url} title={displayTitle} />
            </section>
          </div>
          <TocSidebar />
        </div>

        <section className="mt-16 rounded-3xl border border-white/10 bg-[#141414] p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <Avatar className="size-20 border border-white/10">
              {post.authors?.avatar ?
                <AvatarImage src={post.authors.avatar} alt={post.authors.name} />
              : null}
              <AvatarFallback className="bg-[#0a0a0a] text-lg text-white">
                {(post.authors?.name || "M").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500">
                عن الكاتب
              </p>
              <p className="mt-1 font-heading text-2xl text-white">
                {post.authors?.name ?? "Editorial"}
              </p>
              {post.authors?.bio ?
                <p className="mt-2 max-w-2xl text-neutral-400">
                  {post.authors.bio}
                </p>
              : (
                <p className="mt-2 max-w-2xl text-neutral-400">
                  فريق تحرير MatricBlog يركّز على دقة المعلومات وتجربة القارئ.
                </p>
              )}
            </div>
          </div>
        </section>

        {related.length ?
          <section className="mt-16 space-y-6">
            <h2 className="font-heading text-3xl text-white">مقالات ذات صلة</h2>
            <ArticleGrid posts={related} />
          </section>
        : null}
      </article>
      <BackToTop />
    </>
  );
}
