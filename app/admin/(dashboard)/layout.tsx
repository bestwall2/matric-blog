import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getIsAdmin } from "@/lib/auth";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let supabase;
  try {
    supabase = await createServerSupabase();
  } catch {
    redirect("/admin/login");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  if (!(await getIsAdmin(supabase))) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center text-white">
        <h1 className="font-heading text-3xl">صلاحية مطلوبة</h1>
        <p className="mt-3 text-neutral-400">
          هذا الحساب ليس ضمن فريق المشرفين. حدّث حقل{" "}
          <code className="rounded bg-white/10 px-2 py-1 text-[#e11d48]">
            is_admin
          </code>{" "}
          في جدول profiles عبر SQL في Supabase.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">{children}</div>
      </div>
    </div>
  );
}
