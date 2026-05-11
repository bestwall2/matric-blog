"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, Lock } from "lucide-react";

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
    <section className="relative w-full overflow-hidden mesh-gradient py-20">
      {/* Decorative Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <div className="size-[400px] rounded-full bg-[#e63946] opacity-[0.05] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[560px] px-6 text-center">
        <div className="mx-auto mb-8 flex size-[80px] items-center justify-center rounded-full bg-white/5 border border-white/10">
          <Mail className="size-10 text-[#e63946]" />
        </div>
        
        <h2 className="font-heading text-[28px] font-bold text-white">
          لمحة أسبوعية من أهم الأدلة والتحديثات
        </h2>
        <p className="mt-3 text-[15px] text-[#888888]">
          انضم إلى أكثر من 5000 قارئ مهتم بجديد التقنية والرياضة.
        </p>

        <form
          onSubmit={submit}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Input
            type="email"
            required
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[52px] rounded-xl border-white/10 bg-[#0a0a0a] text-white placeholder:text-[#888888] focus-visible:border-[#e63946] focus-visible:ring-0"
          />
          <Button
            type="submit"
            disabled={loading}
            className="h-[52px] rounded-xl bg-[#e63946] px-8 text-[16px] font-bold text-white transition-all hover:bg-[#c1121f] sm:w-fit w-full"
          >
            {loading ? "جارٍ..." : "اشترك"}
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 text-[12px] text-[#888888]">
          <Lock className="size-3" />
          <span>بريدك يبقى خاصًا — لا رسائل مزعجة.</span>
        </div>
      </div>
    </section>
  );
}

