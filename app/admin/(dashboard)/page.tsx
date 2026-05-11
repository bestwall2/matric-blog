import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Eye, Clock, FileText, PenLine, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

const statusBadge: Record<string, "default" | "secondary" | "outline"> = {
  published: "default",
  draft: "secondary",
  archived: "outline",
};

const statIcons = [FileText, FileText, PenLine, Eye];

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
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e63946]">
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
          <Button asChild className="bg-[#e63946] hover:bg-[#c1121f]">
            <Link href="/admin/posts/new">
              <PenLine className="ml-2 size-4" />
              مقال جديد
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-white/15 bg-transparent">
            <Link href="/admin/ai-generate">
              <Sparkles className="ml-2 size-4" />
              توليد بالـ AI
            </Link>
          </Button>
          <Button asChild variant="outline" className="hidden border-white/15 bg-transparent sm:inline-flex">
            <Link href="/">عرض الموقع</Link>
          </Button>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = statIcons[i];
          return (
            <Card
              key={s.label}
              className="border-white/10 bg-[#141414] transition-colors hover:border-white/20"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  {s.label}
                </CardTitle>
                <Icon className="size-4 text-neutral-600" />
              </CardHeader>
              <CardContent>
                <p className="font-heading text-3xl font-bold text-white">
                  {typeof s.value === "number"
                    ? new Intl.NumberFormat("ar-MA").format(s.value)
                    : s.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-white/10 bg-[#141414]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">آخر المقالات</CardTitle>
            <CardDescription className="text-neutral-500">
              أحدث 8 مقالات
            </CardDescription>
          </div>
          <Button asChild size="sm" variant="ghost" className="text-[#e63946]">
            <Link href="/admin/posts">عرض الكل</Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0 sm:p-4 sm:pt-0">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-neutral-400">العنوان</TableHead>
                <TableHead className="hidden text-neutral-400 sm:table-cell">الحالة</TableHead>
                <TableHead className="hidden text-neutral-400 sm:table-cell">المشاهدات</TableHead>
                <TableHead className="text-neutral-400">تحديث</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-white/5 transition-colors hover:bg-white/[0.02]"
                >
                  <TableCell className="font-medium text-white">
                    <Link
                      href={`/admin/posts/${row.id}/edit`}
                      className="transition-colors hover:text-[#e63946]"
                    >
                      {row.title}
                    </Link>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                      {row.slug}
                      <span className="sm:hidden">
                        <Badge
                          variant={statusBadge[row.status ?? ""] ?? "secondary"}
                          className="text-[10px]"
                        >
                          {row.status}
                        </Badge>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={statusBadge[row.status ?? ""] ?? "secondary"}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden text-neutral-300 sm:table-cell">
                    <span className="inline-flex items-center gap-1.5">
                      <Eye className="size-3.5 text-neutral-500" />
                      {row.view_count ?? 0}
                    </span>
                  </TableCell>
                  <TableCell className="text-neutral-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5 shrink-0 text-neutral-500" />
                      <span className="hidden sm:inline">
                        {row.updated_at
                          ? new Date(row.updated_at).toLocaleString("ar-MA")
                          : ""}
                      </span>
                      <span className="sm:hidden">
                        {row.updated_at
                          ? new Date(row.updated_at).toLocaleDateString("ar-MA")
                          : ""}
                      </span>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
              {!recent.length && (
                <TableRow>
                  <TableCell colSpan={4} className="py-16 text-center text-neutral-500">
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
