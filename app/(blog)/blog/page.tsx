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
    <div className="mx-auto w-full max-w-7xl px-4 py-32 md:px-8">
      <header className="space-y-6">
        <div>
          <h1 className="font-heading text-4xl font-black text-white md:text-5xl">
            جميع المقالات
          </h1>
          <div className="mt-2 h-1 w-20 bg-[#e63946]" />
        </div>
        <p className="max-w-2xl text-[16px] leading-relaxed text-[#888888]">
          أدلة تقنية، أخبار البث، وتحليلات كرة القدم بلغة عربية واضحة ومتوافقة مع
          سياسات الإعلانات وجودة البحث.
        </p>
      </header>

      <div className="mt-12">
        <BlogToolbar
          categories={categories}
          activeCategory={category}
          activeSort={sort}
        />
      </div>

      <div className="mt-10">
        <BlogListClient posts={posts} />
      </div>

      <div className="mt-16">
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
    </div>
  );
}

