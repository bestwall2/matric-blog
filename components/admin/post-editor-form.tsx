"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/slug";
import { computeSeoScore } from "@/lib/seo-score";
import { estimateReadingMinutes } from "@/lib/seo";
import type { Category } from "@/lib/types/database";
import type { Post, PostStatus } from "@/lib/types/database";
import { RichEditor } from "@/components/admin/rich-editor";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function PostEditorForm({
  categories,
  initial,
}: {
  categories: Category[];
  initial?: Post | null;
}) {
  const router = useRouter();
  const editing = !!initial?.id;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [titleAr, setTitleAr] = useState(initial?.title_ar ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "<p></p>");
  const [contentAr, setContentAr] = useState(initial?.content_ar ?? "");
  const [featured, setFeatured] = useState(initial?.featured_image ?? "");
  const [categoryId, setCategoryId] = useState<string>(
    initial?.category_id ?? ""
  );
  const [status, setStatus] = useState<PostStatus>(
    (initial?.status as PostStatus) ?? "draft"
  );
  const [scheduledAt, setScheduledAt] = useState<Date | undefined>(
    initial?.scheduled_at ? new Date(initial.scheduled_at) : undefined
  );

  const [metaTitle, setMetaTitle] = useState(initial?.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(
    initial?.meta_description ?? ""
  );
  const [keywords, setKeywords] = useState(
    (initial?.meta_keywords ?? []).join(", ")
  );
  const [ogImage, setOgImage] = useState(initial?.og_image ?? "");
  const [canonical, setCanonical] = useState(initial?.canonical_url ?? "");
  const [robotsNoIndex, setRobotsNoIndex] = useState(
    initial?.robots_meta?.includes("noindex") ?? false
  );
  const [schemaType, setSchemaType] = useState(
    initial?.schema_type ?? "Article"
  );

  const [focusKeyword, setFocusKeyword] = useState(
    (initial?.meta_keywords && initial.meta_keywords[0]) || ""
  );

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("matric_ai_draft");
    if (!raw || editing) return;
    try {
      const data = JSON.parse(raw) as Record<string, unknown>;
      if (typeof data.title === "string") setTitle(data.title);
      if (typeof data.title_ar === "string") setTitleAr(data.title_ar);
      if (typeof data.slug === "string") setSlug(data.slug);
      if (typeof data.excerpt === "string") setExcerpt(data.excerpt);
      if (typeof data.content === "string") setContent(data.content);
      if (typeof data.content_ar === "string") setContentAr(data.content_ar);
      if (typeof data.meta_title === "string") setMetaTitle(data.meta_title);
      if (typeof data.meta_description === "string")
        setMetaDescription(data.meta_description);
      if (Array.isArray(data.meta_keywords))
        setKeywords(data.meta_keywords.join(", "));
      toast.success("تم استيراد مسودة من الذكاء الاصطناعي");
    } catch {
      toast.error("تعذّر قراءة مسودة AI");
    } finally {
      sessionStorage.removeItem("matric_ai_draft");
    }
  }, [editing]);

  useEffect(() => {
    if (!editing && title.trim() && !slug.trim()) {
      setSlug(slugify(title));
    }
  }, [title, editing, slug]);

  const seo = useMemo(() => {
    return computeSeoScore({
      title,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
      focusKeyword,
      htmlContent: `${content} ${contentAr}`,
      featuredImage: featured || ogImage,
    });
  }, [
    title,
    metaTitle,
    metaDescription,
    excerpt,
    focusKeyword,
    content,
    contentAr,
    featured,
    ogImage,
  ]);

  async function onUpload(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(json.error || "Upload failed");
      setFeatured(json.url ?? "");
      toast.success("تم رفع الصورة");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "فشل الرفع");
    } finally {
      setUploading(false);
    }
  }

  function previewArticle() {
    const html = contentAr?.trim() ? contentAr : content;
    const doc = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${escapeHtml(metaTitle || title)}</title><style>body{font-family:system-ui,-apple-system;background:#0a0a0a;color:#f5f5f5;margin:0;padding:32px;line-height:1.75;}article{max-width:760px;margin:0 auto;}img{max-width:100%;border-radius:16px;} a{color:#e11d48}</style></head><body><article><h1>${escapeHtml(titleAr || title)}</h1>${html}</article></body></html>`;
    const w = window.open("", "_blank");
    if (w) {
      w.document.open();
      w.document.write(doc);
      w.document.close();
    }
  }

  async function save(nextStatus?: PostStatus) {
    setSaving(true);
    try {
      const supabase = createClient();
      const kw = keywords
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const reading =
        estimateReadingMinutes(`${content} ${contentAr}`);

      const robots_meta = robotsNoIndex ? "noindex,nofollow" : "index,follow";

      const next = nextStatus ?? status;
      let published_at: string | null = initial?.published_at ?? null;
      if (next === "published") {
        published_at = published_at ?? new Date().toISOString();
      } else if (next === "draft") {
        published_at = null;
      }

      const payload = {
        title,
        title_ar: titleAr || null,
        slug: slug || slugify(title),
        excerpt: excerpt || null,
        content,
        content_ar: contentAr || null,
        featured_image: featured || null,
        category_id: categoryId || null,
        status: nextStatus ?? status,
        meta_title: metaTitle || null,
        meta_description: metaDescription || null,
        meta_keywords: kw.length ? kw : null,
        og_image: ogImage || null,
        canonical_url: canonical || null,
        robots_meta,
        schema_type: schemaType,
        reading_time: reading,
        scheduled_at:
          next === "scheduled" && scheduledAt ?
            scheduledAt.toISOString()
          : null,
        published_at,
      };

      if (editing && initial?.id) {
        const { error } = await supabase
          .from("posts")
          .update(payload)
          .eq("id", initial.id);
        if (error) throw error;
        toast.success("تم حفظ التعديلات");
      } else {
        const { data, error } = await supabase
          .from("posts")
          .insert(payload)
          .select("id")
          .single();
        if (error) throw error;
        toast.success("تم إنشاء المقال");
        router.replace(`/admin/posts/${data.id}/edit`);
      }
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "فشل الحفظ");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-8">
        <Tabs defaultValue="content">
          <TabsList className="border border-white/10 bg-[#141414]">
            <TabsTrigger value="content">المحتوى</TabsTrigger>
            <TabsTrigger value="ar">العربية</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="space-y-6 pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label>العنوان (إنجليزي أو عنوان أساسي)</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-white/15 bg-[#0a0a0a]"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>المقتطف</Label>
                <Textarea
                  rows={3}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="border-white/15 bg-[#0a0a0a]"
                />
              </div>
              <div className="space-y-2">
                <Label>المسار slug</Label>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="border-white/15 bg-[#0a0a0a]"
                />
              </div>
              <div className="space-y-2">
                <Label>التصنيف</Label>
                <Select
                  value={categoryId}
                  onValueChange={(v) => setCategoryId(v ?? "")}
                >
                  <SelectTrigger className="border-white/15 bg-[#0a0a0a]">
                    <SelectValue placeholder="اختر تصنيفًا" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name_ar || c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>المحتوى</Label>
              <RichEditor dir="ltr" value={content} onChange={setContent} />
            </div>

            <Separator className="bg-white/10" />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label>صورة مميزة — رابط أو رفع</Label>
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <Input
                    value={featured}
                    onChange={(e) => setFeatured(e.target.value)}
                    placeholder="https://..."
                    className="border-white/15 bg-[#0a0a0a]"
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    className="cursor-pointer border-white/15 bg-[#0a0a0a]"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) void onUpload(f);
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>الحالة</Label>
                <Select
                  value={status}
                  onValueChange={(v) => setStatus(v as PostStatus)}
                >
                  <SelectTrigger className="border-white/15 bg-[#0a0a0a]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">مسودة</SelectItem>
                    <SelectItem value="published">منشور</SelectItem>
                    <SelectItem value="scheduled">مجدول</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>جدولة النشر</Label>
                <Popover>
                  <PopoverTrigger
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full justify-start border-white/15 bg-[#0a0a0a] text-left font-normal",
                      !scheduledAt && "text-neutral-500"
                    )}
                  >
                    {scheduledAt ?
                      format(scheduledAt, "PPpp")
                    : "اختر تاريخًا"}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto border-white/10 bg-[#141414] p-0 text-white">
                    <Calendar
                      mode="single"
                      selected={scheduledAt}
                      onSelect={(d) => setScheduledAt(d)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ar" className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label>العنوان بالعربية</Label>
              <Input
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                className="border-white/15 bg-[#0a0a0a]"
              />
            </div>
            <div className="space-y-2">
              <Label>المحتوى بالعربية</Label>
              <RichEditor
                dir="rtl"
                value={contentAr || "<p></p>"}
                onChange={setContentAr}
              />
            </div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6 pt-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>كلمة مفتاحية للتحسين</Label>
                <Input
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  className="border-white/15 bg-[#0a0a0a]"
                />
              </div>
              <div className="space-y-2">
                <Label>
                  عنوان الميتا ({metaTitle.length}/60)
                </Label>
                <Input
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  maxLength={90}
                  className="border-white/15 bg-[#0a0a0a]"
                />
              </div>
              <div className="space-y-2">
                <Label>
                  وصف الميتا ({metaDescription.length}/160)
                </Label>
                <Textarea
                  rows={4}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  maxLength={200}
                  className="border-white/15 bg-[#0a0a0a]"
                />
              </div>
              <div className="space-y-2">
                <Label>كلمات مفتاحية (مفصولة بفواصل)</Label>
                <Input
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="border-white/15 bg-[#0a0a0a]"
                />
              </div>
              <div className="space-y-2">
                <Label>صورة OG</Label>
                <Input
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  placeholder={featured || "https://..."}
                  className="border-white/15 bg-[#0a0a0a]"
                />
              </div>
              <div className="space-y-2">
                <Label>رابط كانونيكال</Label>
                <Input
                  value={canonical}
                  onChange={(e) => setCanonical(e.target.value)}
                  className="border-white/15 bg-[#0a0a0a]"
                />
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#141414] px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-white">
                    منع الفهرسة (noindex)
                  </p>
                  <p className="text-xs text-neutral-500">
                    فعّل للمسودات الحساسة أو الصفحات المكررة.
                  </p>
                </div>
                <Switch checked={robotsNoIndex} onCheckedChange={setRobotsNoIndex} />
              </div>
              <div className="space-y-2">
                <Label>نوع المخطط</Label>
                <Select
                  value={schemaType}
                  onValueChange={(v) => v && setSchemaType(v)}
                >
                  <SelectTrigger className="border-white/15 bg-[#0a0a0a]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Article">Article</SelectItem>
                    <SelectItem value="HowTo">HowTo</SelectItem>
                    <SelectItem value="FAQPage">FAQPage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            className="border-white/15 bg-transparent"
            disabled={saving}
            onClick={() => void save("draft")}
          >
            حفظ كمسودة
          </Button>
          <Button
            type="button"
            className="bg-[#e11d48] hover:bg-[#be123c]"
            disabled={saving}
            onClick={() => void save("published")}
          >
            نشر
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="bg-white text-black hover:bg-neutral-200"
            disabled={saving}
            onClick={() => void save("scheduled")}
          >
            حفظ كجدولة
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="text-neutral-300 hover:text-white"
            onClick={previewArticle}
          >
            معاينة
          </Button>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-[#e11d48]">
            SEO Score
          </p>
          <div className="mt-4 flex items-end gap-3">
            <p className="font-heading text-5xl text-white">{seo.score}</p>
            <p className="pb-2 text-sm text-neutral-500">/100</p>
          </div>
          <Separator className="my-4 bg-white/10" />
          <ul className="space-y-2 text-sm">
            {seo.breakdown.map((b) => (
              <li key={b.label} className="flex items-start justify-between gap-3">
                <span className="text-neutral-400">{b.label}</span>
                <Badge variant={b.ok ? "default" : "secondary"}>
                  {b.ok ? "✓" : "–"}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#141414] p-6 text-sm text-neutral-400">
          <p className="font-semibold text-white">
            إرشادات سريعة (AdSense / Search)
          </p>
          <p className="mt-3">• تجنّب النقرات الوهمية أو المحتوى الرقيق.</p>
          <p className="mt-2">• استخدم عناوين وصفية وروابط داخلية حقيقية.</p>
          <p className="mt-2">
            • صور ذات alt نصي، وفقرات طويلة بفائدة واضحة للقارئ.
          </p>
        </div>
      </aside>
    </div>
  );
}
