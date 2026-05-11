export type PostStatus = "draft" | "published" | "scheduled";

export interface Category {
  id: string;
  name: string;
  name_ar: string | null;
  slug: string;
  description: string | null;
  color: string | null;
  created_at: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string | null;
  avatar: string | null;
  email: string | null;
}

export interface Post {
  id: string;
  title: string;
  title_ar: string | null;
  slug: string;
  excerpt: string | null;
  content: string;
  content_ar: string | null;
  featured_image: string | null;
  category_id: string | null;
  author_id: string | null;
  status: PostStatus;
  published_at: string | null;
  scheduled_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[] | null;
  og_image: string | null;
  canonical_url: string | null;
  structured_data: Record<string, unknown> | null;
  robots_meta: string | null;
  schema_type: string | null;
  view_count: number | null;
  reading_time: number | null;
  ai_generated: boolean | null;
  ai_model: string | null;
  ai_prompt: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostWithRelations extends Post {
  categories?: Category | null;
  authors?: Author | null;
}
