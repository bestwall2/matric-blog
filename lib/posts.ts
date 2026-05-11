import type { SupabaseClient } from "@supabase/supabase-js";
import type { Category, PostWithRelations } from "@/lib/types/database";

/** Public listing filter — Supabase `.or()` string */
export function publicPostsOrFilter(): string {
  const now = new Date().toISOString();
  return `and(status.eq.published,published_at.lte.${now}),and(status.eq.scheduled,scheduled_at.lte.${now})`;
}

export async function fetchCategories(
  client: SupabaseClient
): Promise<Category[]> {
  const { data, error } = await client
    .from("categories")
    .select("*")
    .order("name");
  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function fetchPostBySlugPublic(
  client: SupabaseClient,
  slug: string
): Promise<PostWithRelations | null> {
  const now = new Date().toISOString();
  const { data, error } = await client
    .from("posts")
    .select(
      `*,
      categories:category_id (*),
      authors:author_id (*)`
    )
    .eq("slug", slug)
    .or(
      `and(status.eq.published,published_at.lte.${now}),and(status.eq.scheduled,scheduled_at.lte.${now})`
    )
    .maybeSingle();
  if (error) throw error;
  return data as PostWithRelations | null;
}

export async function fetchPostBySlugAdmin(
  client: SupabaseClient,
  slug: string
): Promise<PostWithRelations | null> {
  const { data, error } = await client
    .from("posts")
    .select(
      `*,
      categories:category_id (*),
      authors:author_id (*)`
    )
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as PostWithRelations | null;
}

export async function fetchPostByIdAdmin(
  client: SupabaseClient,
  id: string
): Promise<PostWithRelations | null> {
  const { data, error } = await client
    .from("posts")
    .select(
      `*,
      categories:category_id (*),
      authors:author_id (*)`
    )
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as PostWithRelations | null;
}

export async function fetchRelatedPosts(
  client: SupabaseClient,
  categoryId: string | null,
  excludeId: string,
  limit = 3
): Promise<PostWithRelations[]> {
  if (!categoryId) return [];
  const now = new Date().toISOString();
  const q = client
    .from("posts")
    .select(
      `*,
      categories:category_id (*),
      authors:author_id (*)`
    )
    .neq("id", excludeId)
    .eq("category_id", categoryId)
    .or(
      `and(status.eq.published,published_at.lte.${now}),and(status.eq.scheduled,scheduled_at.lte.${now})`
    )
    .order("published_at", { ascending: false })
    .limit(limit);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as PostWithRelations[];
}

export async function countPublicPosts(client: SupabaseClient): Promise<number> {
  const now = new Date().toISOString();
  const { count, error } = await client
    .from("posts")
    .select("*", { count: "exact", head: true })
    .or(
      `and(status.eq.published,published_at.lte.${now}),and(status.eq.scheduled,scheduled_at.lte.${now})`
    );
  if (error) throw error;
  return count ?? 0;
}

export async function countCategories(client: SupabaseClient): Promise<number> {
  const { count, error } = await client
    .from("categories")
    .select("*", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
}

export type PostSort = "latest" | "views";

export async function fetchLatestPublished(
  client: SupabaseClient,
  limit: number
): Promise<PostWithRelations[]> {
  const now = new Date().toISOString();
  const { data, error } = await client
    .from("posts")
    .select(
      `*,
      categories:category_id (*),
      authors:author_id (*)`
    )
    .or(
      `and(status.eq.published,published_at.lte.${now}),and(status.eq.scheduled,scheduled_at.lte.${now})`
    )
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as PostWithRelations[];
}

export async function sumPublishedViews(client: SupabaseClient): Promise<number> {
  const now = new Date().toISOString();
  const { data, error } = await client
    .from("posts")
    .select("view_count")
    .or(
      `and(status.eq.published,published_at.lte.${now}),and(status.eq.scheduled,scheduled_at.lte.${now})`
    );
  if (error) throw error;
  return (data ?? []).reduce((a, r) => a + (Number(r.view_count) || 0), 0);
}

export async function fetchPublishedPostsPage(
  client: SupabaseClient,
  params: {
    page?: number;
    pageSize?: number;
    categorySlug?: string | null;
    sort?: PostSort;
  }
): Promise<{ posts: PostWithRelations[]; total: number }> {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.min(48, Math.max(1, params.pageSize ?? 12));
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const now = new Date().toISOString();

  let categoryId: string | null | "__none__" = null;
  if (params.categorySlug) {
    const { data: cat } = await client
      .from("categories")
      .select("id")
      .eq("slug", params.categorySlug)
      .maybeSingle();
    categoryId = cat?.id ? cat.id : "__none__";
  }

  if (categoryId === "__none__") {
    return { posts: [], total: 0 };
  }

  let query = client
    .from("posts")
    .select(
      `*,
      categories:category_id (*),
      authors:author_id (*)`,
      { count: "exact" }
    )
    .or(
      `and(status.eq.published,published_at.lte.${now}),and(status.eq.scheduled,scheduled_at.lte.${now})`
    );

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const sortField = params.sort === "views" ? "view_count" : "published_at";
  query = query.order(sortField, { ascending: false });

  const { data, error, count } = await query.range(from, to);
  if (error) throw error;
  return { posts: (data ?? []) as PostWithRelations[], total: count ?? 0 };
}
