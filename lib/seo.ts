import { SITE_NAME, SITE_URL } from "@/lib/constants";
import type { PostWithRelations } from "@/lib/types/database";

export function articleUrl(slug: string) {
  return `${SITE_URL}/blog/${slug}`;
}

export function buildArticleJsonLd(post: PostWithRelations, schemaType: string) {
  const url = post.canonical_url || articleUrl(post.slug);
  const authorName = post.authors?.name || SITE_NAME;
  const image =
    post.og_image ||
    post.featured_image ||
    `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}`;

  const base = {
    "@context": "https://schema.org",
    headline: post.title,
    description: post.meta_description || post.excerpt || post.title,
    image: Array.isArray(image) ? image : [image],
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  if (schemaType === "HowTo") {
    return {
      ...base,
      "@type": "HowTo",
      name: post.title,
    };
  }
  if (schemaType === "FAQPage") {
    return {
      ...base,
      "@type": "FAQPage",
      mainEntity: [],
    };
  }
  return {
    ...base,
    "@type": "Article",
    articleSection: post.categories?.name,
    wordCount: stripHtml(post.content).split(/\s+/).filter(Boolean).length,
  };
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function estimateReadingMinutes(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
