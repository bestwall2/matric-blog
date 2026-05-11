"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      toast.success("تم الاشتراك — شكرًا لك!");
      setEmail("");
    } catch {
      toast.error("تعذّر الإرسال. حاول لاحقًا.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="gradient-border relative overflow-hidden rounded-3xl bg-[#141414] px-6 py-16 md:px-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
      <div className="relative mx-auto max-w-xl text-center">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-[#e63946]/10">
          <svg
            className="size-6 text-[#e63946]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e63946]">
          النشرة البريدية
        </p>
        <h2 className="mt-3 font-heading text-3xl text-white md:text-4xl">
          لمحة أسبوعية من أهم الأدلة والتحديثات
        </h2>
        <p className="mt-3 text-sm text-neutral-500">
          بريدك يبقى خاصًا — لا رسائل مزعجة، فقط ملخصات مفيدة.
        </p>
        <form
          onSubmit={submit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <Input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-white/10 bg-[#0a0a0a] text-white placeholder:text-neutral-600 focus-visible:ring-[#e63946]/30"
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#e63946] px-6 text-white shadow-lg shadow-[#e63946]/20 transition-all hover:bg-[#d62f3f] hover:shadow-[#e63946]/30"
          >
            {loading ? "جارٍ..." : "اشترك"}
          </Button>
        </form>
      </div>
    </section>
  );
}
