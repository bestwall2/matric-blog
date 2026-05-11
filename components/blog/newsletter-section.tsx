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
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#141414] px-6 py-14 md:px-14">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-soft-light bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e11d48]">
          Newsletter
        </p>
        <h2 className="mt-3 font-heading text-3xl text-white md:text-4xl">
          لمحة أسبوعية من أهم الأدلة والتحديثات
        </h2>
        <p className="mt-3 text-sm text-neutral-400">
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
            className="border-white/15 bg-[#0a0a0a] text-white placeholder:text-neutral-600"
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#e11d48] text-white hover:bg-[#be123c]"
          >
            اشترك
          </Button>
        </form>
      </div>
    </section>
  );
}
