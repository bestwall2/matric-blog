"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success("تم تسجيل الدخول");
      router.replace(next);
      router.refresh();
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "تعذّر تسجيل الدخول";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#141414] p-8 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e11d48]">
          Admin
        </p>
        <h1 className="mt-2 font-heading text-3xl text-white">
          تسجيل الدخول
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          حسابات مسموحة للمشرفين فقط — راجع سياسات الأمان في Supabase.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-white/15 bg-[#0a0a0a]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-white/15 bg-[#0a0a0a]"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e11d48] hover:bg-[#be123c]"
          >
            دخول
          </Button>
        </form>

        <p className="mt-8 text-center text-xs text-neutral-500">
          <Link href="/" className="underline-offset-4 hover:text-white hover:underline">
            العودة إلى الموقع
          </Link>
        </p>
      </div>
    </div>
  );
}
