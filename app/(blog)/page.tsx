import { HeroFeatured } from "@/components/blog/hero-featured";
import { NewsletterSection } from "@/components/blog/newsletter-section";
import { StatsBar } from "@/components/blog/stats-bar";
import { HomeCategoryFeed } from "@/components/blog/home-category-feed";
import { createServerSupabase } from "@/lib/supabase/server";
import {
  countCategories,
  countPublicPosts,
  fetchCategories,
  fetchLatestPublished,
  sumPublishedViews,
} from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    const supabase = await createServerSupabase();
    const [categories, latest, articles, catsCount, views] = await Promise.all([
      fetchCategories(supabase),
      fetchLatestPublished(supabase, 13),
      countPublicPosts(supabase),
      countCategories(supabase),
      sumPublishedViews(supabase),
    ]);

    const featured = latest[0];
    const gridPosts = featured ? latest.slice(1, 13) : latest.slice(0, 12);

    return (
      <div className="mx-auto max-w-6xl space-y-16 px-4 pb-20 pt-8 md:px-6 md:pt-12">
        {featured ? <HeroFeatured post={featured} /> : (
          <div className="rounded-3xl border border-white/10 bg-[#141414] p-10 text-center text-neutral-400">
            لا توجد مقالات منشورة بعد. أنشئ محتوى من لوحة الإدارة عند جاهزية Supabase.
          </div>
        )}

        <StatsBar articles={articles} categories={catsCount} views={views} />

        <div className="space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <h2 className="font-heading text-3xl text-white md:text-4xl">
              أحدث المقالات
            </h2>
            <p className="text-sm text-neutral-500">
              تصفّح حسب التصنيف — تصميم شبيه بالمجلات الرياضية الرقمية.
            </p>
          </div>
          <HomeCategoryFeed categories={categories} posts={gridPosts} />
        </div>

        <NewsletterSection />
      </div>
    );
  } catch {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-heading text-4xl text-white">تهيئة المشروع</h1>
        <p className="mt-4 text-neutral-400">
          أضف متغيرات البيئة الخاصة بـ Supabase في{" "}
          <code className="rounded bg-white/10 px-2 py-1 text-sm text-[#e11d48]">
            .env.local
          </code>{" "}
          ثم أعد تشغيل الخادم.
        </p>
      </div>
    );
  }
}
