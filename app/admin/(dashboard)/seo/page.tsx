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
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e63946]">
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
          className="bg-[#e63946] hover:bg-[#c1121f]"
        >
          {busy ? "جارٍ المعالجة..." : "تحسين بالذكاء الاصطناعي"}
        </Button>
        {notes.length ?
          <div className="space-y-2 rounded-xl border border-white/5 bg-black/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              ملاحظات التحسين
            </p>
            <ul className="space-y-2">
              {notes.map((n) => (
                <li
                  key={n}
                  className="flex items-start gap-2 text-sm text-neutral-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e63946]" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        : null}
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#141414] p-8 space-y-4">
        <h2 className="font-heading text-2xl text-white">روابط مفيدة</h2>
        <ul className="space-y-2">
          <li>
            <Link
              className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-neutral-300 transition-all hover:border-white/10 hover:bg-white/5 hover:text-white"
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noreferrer"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-neutral-500">
                G
              </span>
              <span className="flex-1">Google Search Console</span>
              <svg className="size-4 text-neutral-500 transition group-hover:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-neutral-300 transition-all hover:border-white/10 hover:bg-white/5 hover:text-white"
              href="https://developers.google.com/search/docs/appearance/structured-data/article"
              target="_blank"
              rel="noreferrer"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-neutral-500">
                SD
              </span>
              <span className="flex-1">Structured Data — Article</span>
              <svg className="size-4 text-neutral-500 transition group-hover:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-neutral-300 transition-all hover:border-white/10 hover:bg-white/5 hover:text-white"
              href="https://support.google.com/adsense/answer/48182"
              target="_blank"
              rel="noreferrer"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-neutral-500">
                A
              </span>
              <span className="flex-1">سياسات جودة AdSense</span>
              <svg className="size-4 text-neutral-500 transition group-hover:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
