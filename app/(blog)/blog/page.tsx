import { BlogListClient } from "@/components/blog/blog-list-client";
import { BlogToolbar } from "@/components/blog/blog-toolbar";
import { Pagination } from "@/components/blog/pagination";
import { createServerSupabase } from "@/lib/supabase/server";
import {
  fetchCategories,
  fetchPublishedPostsPage,
  type PostSort,
} from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const page = Math.max(1, Number(searchParams.page || "1"));
  const sort: PostSort =
    searchParams.sort === "views" ? "views" : "latest";
  const category = searchParams.category || null;

  const supabase = await createServerSupabase();
  const categories = await fetchCategories(supabase);
  const { posts, total } = await fetchPublishedPostsPage(supabase, {
    page,
    pageSize: 12,
    categorySlug: category,
    sort,
  });

  const totalPages = Math.max(1, Math.ceil(total / 12));

  const query = {
    sort: sort === "latest" ? undefined : "views",
    category: category ?? undefined,
  };

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 md:px-6">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e11d48]">
          الأرشيف
        </p>
        <h1 className="font-heading text-4xl text-white md:text-5xl">
          جميع المقالات
        </h1>
        <p className="max-w-2xl text-neutral-400">
          أدلة تقنية، أخبار البث، وتحليلات كرة القدم بلغة عربية واضحة ومتوافقة مع
          سياسات الإعلانات وجودة البحث.
        </p>
      </header>

      <BlogToolbar
        categories={categories}
        activeCategory={category}
        activeSort={sort}
      />

      <BlogListClient posts={posts} />

      <Pagination
        page={page}
        totalPages={totalPages}
        basePath="/blog"
        query={{
          sort: query.sort,
          category: query.category,
        }}
      />
    </div>
  );
}
