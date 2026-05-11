import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock } from "lucide-react";

const statusBadge: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  published: "default",
  draft: "secondary",
  archived: "outline",
};

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("posts")
    .select("id,title,slug,status,view_count,updated_at,published_at")
    .order("updated_at", { ascending: false });

  const rows = data ?? [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e63946]">
            المحتوى
          </p>
          <h1 className="mt-2 font-heading text-4xl text-white">جميع المقالات</h1>
        </div>
        <Button asChild className="bg-[#e63946] hover:bg-[#c1121f]">
          <Link href="/admin/posts/new">مقال جديد</Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#141414]">
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
            {rows.map((row) => (
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
                    <span className="truncate max-w-[200px]">{row.slug}</span>
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
                  <Badge
                    variant={statusBadge[row.status ?? ""] ?? "secondary"}
                  >
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
            {!rows.length && (
              <TableRow>
                <TableCell colSpan={4} className="py-16 text-center text-neutral-500">
                  <div className="mx-auto max-w-sm space-y-2">
                    <p>لا توجد مقالات بعد.</p>
                    <Button asChild size="sm" className="bg-[#e63946] hover:bg-[#c1121f]">
                      <Link href="/admin/posts/new">أنشئ أول مقال</Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
