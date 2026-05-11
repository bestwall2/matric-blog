"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminSeoToolsPage() {
  const [html, setHtml] = useState("<p></p>");
  const [notes, setNotes] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  async function improve() {
    setBusy(true);
    try {
      const res = await fetch("/api/ai/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html }),
      });
      const json = (await res.json()) as {
        success?: boolean;
        data?: { content?: string; seo_notes?: string[] };
        error?: string;
      };
      if (!res.ok) throw new Error(json.error || "فشل التحسين");
      if (json.data?.content) setHtml(json.data.content);
      setNotes(json.data?.seo_notes ?? []);
      toast.success("تم تحسين المسودة");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "خطأ");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e11d48]">
          SEO Lab
        </p>
        <h1 className="mt-2 font-heading text-4xl text-white">أدوات تحسين المقالات</h1>
        <p className="mt-3 text-sm text-neutral-400">
          تحسين HTML للقابلية للقراءة وSEO مع Gemini، ثم انسخ الناتج إلى المحرّر.
        </p>
      </header>

      <section className="rounded-3xl border border-white/10 bg-[#141414] p-8 space-y-4">
        <Label htmlFor="seo-html">HTML المحتوى</Label>
        <Textarea
          id="seo-html"
          rows={14}
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          className="border-white/15 bg-[#0a0a0a] font-mono text-sm"
        />
        <Button
          type="button"
          disabled={busy}
          onClick={() => void improve()}
          className="bg-[#e11d48] hover:bg-[#be123c]"
        >
          {busy ? "جارٍ المعالجة..." : "تحسين بالذكاء الاصطناعي"}
        </Button>
        {notes.length ?
          <ul className="list-disc space-y-2 pr-6 text-sm text-neutral-300">
            {notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        : null}
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#141414] p-8 space-y-4 text-sm text-neutral-400">
        <h2 className="font-heading text-2xl text-white">روابط مفيدة</h2>
        <ul className="space-y-3">
          <li>
            <Link
              className="text-[#e11d48] hover:underline"
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noreferrer"
            >
              Google Search Console
            </Link>
          </li>
          <li>
            <Link
              className="text-[#e11d48] hover:underline"
              href="https://developers.google.com/search/docs/appearance/structured-data/article"
              target="_blank"
              rel="noreferrer"
            >
              Structured Data — Article
            </Link>
          </li>
          <li>
            <Link
              className="text-[#e11d48] hover:underline"
              href="https://support.google.com/adsense/answer/48182"
              target="_blank"
              rel="noreferrer"
            >
              سياسات جودة AdSense
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
