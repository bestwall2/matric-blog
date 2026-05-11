import { notFound } from "next/navigation";
import { PostEditorForm } from "@/components/admin/post-editor-form";
import { fetchCategories, fetchPostByIdAdmin } from "@/lib/posts";
import { createServerSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createServerSupabase();
  const [post, categories] = await Promise.all([
    fetchPostByIdAdmin(supabase, params.id),
    fetchCategories(supabase),
  ]);

  if (!post) notFound();

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e11d48]">
          تحرير
        </p>
        <h1 className="mt-2 font-heading text-4xl text-white">{post.title}</h1>
        <p className="mt-2 text-sm text-neutral-500">{post.slug}</p>
      </header>
      <PostEditorForm categories={categories} initial={post} />
    </div>
  );
}
