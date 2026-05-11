import { PostEditorForm } from "@/components/admin/post-editor-form";
import { fetchCategories } from "@/lib/posts";
import { createServerSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const supabase = await createServerSupabase();
  const categories = await fetchCategories(supabase);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e11d48]">
          محرر
        </p>
        <h1 className="mt-2 font-heading text-4xl text-white">مقال جديد</h1>
      </header>
      <PostEditorForm categories={categories} />
    </div>
  );
}
