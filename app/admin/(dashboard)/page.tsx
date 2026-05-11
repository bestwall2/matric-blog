import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { PostWithRelations } from "@/lib/types/database";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabase();

  const [{ count: totalPosts }, { count: published }, { count: drafts }, postsRes] =
    await Promise.all([
      supabase.from("posts").select("*", { count: "exact", head: true }),
      supabase
        .from("posts")
        .select("*", { count: "exact", head: true })
        .eq("status", "published"),
      supabase
        .from("posts")
        .select("*", { count: "exact", head: true })
        .eq("status", "draft"),
      supabase
        .from("posts")
        .select(
          "id,title,slug,status,published_at,view_count,updated_at,categories:category_id(name)"
        )
        .order("updated_at", { ascending: false })
        .limit(8),
    ]);

  const recent = (postsRes.data ?? []) as unknown as PostWithRelations[];

  const { data: viewRows } = await supabase.from("posts").select("view_count");
  const totalViews = (viewRows ?? []).reduce(
    (a, r) => a + (Number(r.view_count) || 0),
    0
  );

  const stats = [
    { label: "إجمالي المقالات", value: totalPosts ?? 0 },
    { label: "منشور", value: published ?? 0 },
    { label: "مسودّات", value: drafts ?? 0 },
    { label: "المشاهدات", value: totalViews },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e11d48]">
            نظرة عامة
          </p>
          <h1 className="mt-2 font-heading text-4xl text-white">
            لوحة التحكم
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            تتبّع الأداء، ثم انتقل بسرعة إلى التحرير أو التوليد بالذكاء الاصطناعي.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="bg-[#e11d48] hover:bg-[#be123c]">
            <Link href="/admin/posts/new">مقال جديد</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/15 bg-transparent">
            <Link href="/admin/ai-generate">توليد بالـ AI</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/15 bg-transparent">
            <Link href="/">عرض الموقع</Link>
          </Button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-white/10 bg-[#141414]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wider text-neutral-500">
                {s.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-heading text-3xl text-white">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-white/10 bg-[#141414]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">آخر المقالات</CardTitle>
          <Button asChild size="sm" variant="ghost" className="text-[#e11d48]">
            <Link href="/admin/posts">عرض الكل</Link>
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-neutral-400">العنوان</TableHead>
                <TableHead className="text-neutral-400">الحالة</TableHead>
                <TableHead className="text-neutral-400">المشاهدات</TableHead>
                <TableHead className="text-neutral-400">تحديث</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((row) => (
                <TableRow key={row.id} className="border-white/10">
                  <TableCell className="font-medium text-white">
                    <Link
                      href={`/admin/posts/${row.id}/edit`}
                      className="hover:text-[#e11d48]"
                    >
                      {row.title}
                    </Link>
                    <div className="text-xs text-neutral-500">{row.slug}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{row.status}</Badge>
                  </TableCell>
                  <TableCell className="text-neutral-300">
                    {row.view_count ?? 0}
                  </TableCell>
                  <TableCell className="text-neutral-400">
                    {row.updated_at ?
                      new Date(row.updated_at).toLocaleString("ar-MA")
                    : ""}
                  </TableCell>
                </TableRow>
              ))}
              {!recent.length && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-neutral-500">
                    لا توجد مقالات بعد.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
