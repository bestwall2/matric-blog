"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6">
      <div className="mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-500">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#141414]/95 p-6 backdrop-blur-xl md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="space-y-1">
            <h3 className="font-heading text-lg text-white">إعدادات ملفات تعريف الارتباط</h3>
            <p className="text-sm leading-relaxed text-neutral-400">
              نستخدم ملفات تعريف الارتباط لتحسين تجربتك ولأغراض التحليل والإعلانات (مثل Google AdSense). لمزيد من التفاصيل، راجع{" "}
              <Link href="/privacy" className="text-[#e63946] hover:underline">
                سياسة الخصوصية
              </Link>.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
              className="border-white/10 bg-transparent text-white hover:bg-white/5"
            >
              رفض غير الضروري
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="bg-[#e63946] text-white hover:bg-[#d62839]"
            >
              قبول الكل
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
