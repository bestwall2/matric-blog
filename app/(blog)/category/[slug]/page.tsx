import { BlogListClient } from "@/components/blog/blog-list-client";
import { Pagination } from "@/components/blog/pagination";
import { createServerSupabase } from "@/lib/supabase/server";
import { fetchCategories, fetchPublishedPostsPage, type PostSort } from "@/lib/posts";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | undefined>;
}) {
  const supabase = await createServerSupabase();
  const categories = await fetchCategories(supabase);
  const cat = categories.find((c) => c.slug === params.slug);
  if (!cat) notFound();

  const page = Math.max(1, Number(searchParams.page || "1"));
  const sort: PostSort =
    searchParams.sort === "views" ? "views" : "latest";

  const { posts, total } = await fetchPublishedPostsPage(supabase, {
    page,
    pageSize: 12,
    categorySlug: params.slug,
    sort,
  });

  const totalPages = Math.max(1, Math.ceil(total / 12));

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 md:px-6">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
          تصنيف
        </p>
        <h1 className="font-heading text-4xl text-[var(--text-primary)] md:text-5xl">
          {cat.name_ar?.trim() ? cat.name_ar : cat.name}
        </h1>
        {cat.description ?
          <p className="max-w-2xl text-neutral-400">{cat.description}</p>
        : (
          <p className="max-w-2xl text-neutral-400">
            جميع المقالات ضمن هذا القسم.
          </p>
        )}
      </header>

      <BlogListClient posts={posts} />

      <Pagination
        page={page}
        totalPages={totalPages}
        basePath={`/category/${params.slug}`}
        query={{
          sort: sort === "latest" ? undefined : "views",
        }}
      />
    </div>
  );
}
