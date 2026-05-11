import { HeroFeatured } from "@/components/blog/hero-featured";
import { NewsletterSection } from "@/components/blog/newsletter-section";
import { HomeCategoryFeed } from "@/components/blog/home-category-feed";
import { createServerSupabase } from "@/lib/supabase/server";
import {
  fetchCategories,
  fetchLatestPublished,
} from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    const supabase = await createServerSupabase();
    const [categories, latest] = await Promise.all([
      fetchCategories(supabase),
      fetchLatestPublished(supabase, 13),
    ]);

    const featured = latest[0];
    const gridPosts = featured ? latest.slice(1, 13) : latest.slice(0, 12);

    return (
      <main className="w-full pb-20">
        {featured ? (
          <HeroFeatured post={featured} />
        ) : (
          <div className="mx-auto max-w-7xl px-4 pt-32">
            <div className="rounded-3xl border border-white/10 bg-[#111111] p-20 text-center text-[#888888]">
              لا توجد مقالات منشورة بعد.
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mt-20 space-y-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-heading text-3xl font-black text-white md:text-[32px]">
                  أحدث المقالات
                </h2>
                <div className="mt-2 h-1 w-20 bg-[#e63946]" />
              </div>
              <p className="text-[15px] text-[#888888]">
                تصفّح حسب التصنيف — تجربة تحريرية متميزة.
              </p>
            </div>
            
            <HomeCategoryFeed categories={categories} posts={gridPosts} />
          </div>

          <div className="mt-32">
            <NewsletterSection />
          </div>
        </div>
      </main>
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

