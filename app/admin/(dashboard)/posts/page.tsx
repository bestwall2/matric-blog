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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e11d48]">
            المحتوى
          </p>
          <h1 className="mt-2 font-heading text-4xl text-white">جميع المقالات</h1>
        </div>
        <Button asChild className="bg-[#e11d48] hover:bg-[#be123c]">
          <Link href="/admin/posts/new">مقال جديد</Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#141414]">
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
            {rows.map((row) => (
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
                <TableCell className="text-neutral-300">{row.view_count ?? 0}</TableCell>
                <TableCell className="text-neutral-400">
                  {row.updated_at ?
                    new Date(row.updated_at).toLocaleString("ar-MA")
                  : ""}
                </TableCell>
              </TableRow>
            ))}
            {!rows.length && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-neutral-500">
                  لا توجد مقالات بعد.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
