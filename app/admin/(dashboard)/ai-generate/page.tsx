"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Category } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function AiGeneratePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);

  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState<"Arabic" | "English" | "Both">(
    "Arabic"
  );
  const [type, setType] = useState<
    "Guide" | "News" | "Review" | "Comparison" | "HowTo"
  >("Guide");
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [tone, setTone] = useState<
    "Educational" | "Conversational" | "Technical" | "Journalistic"
  >("Educational");
  const [keyword, setKeyword] = useState("");
  const [instructions, setInstructions] = useState("");
  const [includeFAQ, setIncludeFAQ] = useState(true);
  const [includeTOC, setIncludeTOC] = useState(true);
  const [categoryId, setCategoryId] = useState<string>("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (!error) setCategories((data ?? []) as Category[]);
      setLoadingCats(false);
    })();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          language,
          type,
          length,
          tone,
          keyword,
          includeFAQ,
          includeTOC,
          instructions,
          categoryId: categoryId || undefined,
        }),
      });
      const json = (await res.json()) as {
        success?: boolean;
        data?: Record<string, unknown>;
        error?: string;
      };
      if (!res.ok) throw new Error(json.error || "فشل التوليد");

      const payload = json.data ?? {};
      sessionStorage.setItem("matric_ai_draft", JSON.stringify(payload));
      toast.success("تم التوليد — جاري فتح المحرر");
      router.push("/admin/posts/new");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "خطأ غير متوقع");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e11d48]">
          الذكاء الاصطناعي
        </p>
        <h1 className="mt-2 font-heading text-4xl text-white">
          توليد مقال بالكامل
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          يعتمد على Gemini (Google) ويعيد JSON منظمًا يتم استيراده تلقائيًا في محرر
          المقالات.
        </p>
      </header>

      <form
        onSubmit={onSubmit}
        className="space-y-6 rounded-3xl border border-white/10 bg-[#141414] p-8"
      >
        <div className="space-y-2">
          <Label>الموضوع / الكلمة الرئيسية</Label>
          <Input
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border-white/15 bg-[#0a0a0a]"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>اللغة</Label>
            <Select
              value={language}
              onValueChange={(v) =>
                setLanguage(v as typeof language)
              }
            >
              <SelectTrigger className="border-white/15 bg-[#0a0a0a]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Arabic">العربية</SelectItem>
                <SelectItem value="English">الإنجليزية</SelectItem>
                <SelectItem value="Both">كلاهما</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>نوع المقال</Label>
            <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
              <SelectTrigger className="border-white/15 bg-[#0a0a0a]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Guide">دليل</SelectItem>
                <SelectItem value="News">خبر</SelectItem>
                <SelectItem value="Review">مراجعة</SelectItem>
                <SelectItem value="Comparison">مقارنة</SelectItem>
                <SelectItem value="HowTo">HowTo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>الطول</Label>
            <Select
              value={length}
              onValueChange={(v) => setLength(v as typeof length)}
            >
              <SelectTrigger className="border-white/15 bg-[#0a0a0a]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">قصير (~500)</SelectItem>
                <SelectItem value="medium">متوسط (~1000)</SelectItem>
                <SelectItem value="long">طويل (~2000)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>الأسلوب</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as typeof tone)}>
              <SelectTrigger className="border-white/15 bg-[#0a0a0a]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Educational">تعليمي</SelectItem>
                <SelectItem value="Conversational">محادثة</SelectItem>
                <SelectItem value="Technical">تقني</SelectItem>
                <SelectItem value="Journalistic">صحفي</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>كلمة SEO مركّز عليها</Label>
          <Input
            required
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border-white/15 bg-[#0a0a0a]"
          />
        </div>

        <div className="space-y-2">
          <Label>التصنيف</Label>
          <Select
            disabled={loadingCats}
            value={categoryId}
            onValueChange={(v) => setCategoryId(v ?? "")}
          >
            <SelectTrigger className="border-white/15 bg-[#0a0a0a]">
              <SelectValue placeholder="اختياري" />
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

        <div className="space-y-2">
          <Label>تعليمات إضافية</Label>
          <Textarea
            rows={4}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="border-white/15 bg-[#0a0a0a]"
          />
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0a0a0a] p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between gap-4 md:justify-start">
            <div>
              <p className="text-sm font-medium text-white">قسم أسئلة شائعة</p>
              <p className="text-xs text-neutral-500">5 أسئلة وأجوبة</p>
            </div>
            <Switch checked={includeFAQ} onCheckedChange={setIncludeFAQ} />
          </div>
          <div className="flex items-center justify-between gap-4 md:justify-start">
            <div>
              <p className="text-sm font-medium text-white">جدول المحتويات</p>
              <p className="text-xs text-neutral-500">روابط داخلية للأقسام</p>
            </div>
            <Switch checked={includeTOC} onCheckedChange={setIncludeTOC} />
          </div>
        </div>

        <Button
          type="submit"
          disabled={busy}
          className="w-full bg-[#e11d48] hover:bg-[#be123c]"
        >
          {busy ? "جارٍ التوليد..." : "إنشاء المقال"}
        </Button>
      </form>
    </div>
  );
}
