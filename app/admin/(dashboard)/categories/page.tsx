"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Category } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { slugify } from "@/lib/slug";
import { FolderTree, Hash } from "lucide-react";

export default function AdminCategoriesPage() {
  const [rows, setRows] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#e63946");

  async function refresh() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");
    if (error) {
      toast.error(error.message);
      return;
    }
    setRows((data ?? []) as Category[]);
  }

  useEffect(() => {
    void refresh();
  }, []);

  useEffect(() => {
    if (name.trim() && !slug.trim()) setSlug(slugify(name));
  }, [name, slug]);

  async function createCategory(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createClient();
    const { error } = await supabase.from("categories").insert({
      name,
      name_ar: nameAr || null,
      slug: slug || slugify(name),
      description: description || null,
      color,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("تم إنشاء التصنيف");
    setName("");
    setNameAr("");
    setSlug("");
    setDescription("");
    await refresh();
  }

  return (
    <div className="space-y-10">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e63946]">
          التصنيفات
        </p>
        <h1 className="mt-2 font-heading text-4xl text-white">إدارة الأقسام</h1>
      </header>

      <form
        onSubmit={createCategory}
        className="grid gap-4 rounded-3xl border border-white/10 bg-[#141414] p-6 sm:p-8 md:grid-cols-2"
      >
        <div className="space-y-2 md:col-span-2">
          <Label>الاسم (لاتيني أو إنجليزي)</Label>
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-white/15 bg-[#0a0a0a]"
          />
        </div>
        <div className="space-y-2">
          <Label>الاسم بالعربية</Label>
          <Input
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
            className="border-white/15 bg-[#0a0a0a]"
          />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="border-white/15 bg-[#0a0a0a]"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>الوصف</Label>
          <Textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-white/15 bg-[#0a0a0a]"
          />
        </div>
        <div className="space-y-2">
          <Label>لون الشارة</Label>
          <div className="flex items-center gap-3">
            <Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-12 w-20 border-white/15 bg-[#0a0a0a]"
            />
            <Badge
              style={{ backgroundColor: color }}
              className="border-0 text-white"
            >
              {nameAr || name || "معاينة"}
            </Badge>
          </div>
        </div>
        <div className="flex items-end md:col-span-2">
          <Button type="submit" className="bg-[#e63946] hover:bg-[#c1121f]">
            إضافة تصنيف
          </Button>
        </div>
      </form>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#141414]">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-neutral-400">الاسم</TableHead>
              <TableHead className="hidden text-neutral-400 sm:table-cell">Slug</TableHead>
              <TableHead className="text-neutral-400">المعاينة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow
                key={r.id}
                className="border-white/5 transition-colors hover:bg-white/[0.02]"
              >
                <TableCell className="text-white">
                  <div className="flex items-center gap-2">
                    <FolderTree className="size-4 shrink-0 text-neutral-500" />
                    <span>{r.name_ar || r.name}</span>
                  </div>
                  <div className="mt-0.5 text-xs text-neutral-500 sm:hidden">
                    {r.slug}
                  </div>
                </TableCell>
                <TableCell className="hidden text-neutral-300 sm:table-cell">
                  <span className="inline-flex items-center gap-1.5">
                    <Hash className="size-3.5 text-neutral-500" />
                    {r.slug}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    style={{ backgroundColor: r.color || "#e63946" }}
                    className="border-0 text-white"
                  >
                    {r.name_ar || r.name}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {!rows.length && (
              <TableRow>
                <TableCell colSpan={3} className="py-16 text-center text-neutral-500">
                  لا توجد تصنيفات بعد. أضف تصنيفك الأول أعلاه.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
