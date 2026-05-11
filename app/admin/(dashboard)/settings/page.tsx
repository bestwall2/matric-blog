import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e11d48]">
          الإعدادات
        </p>
        <h1 className="mt-2 font-heading text-4xl text-white">تهيئة المنصّة</h1>
      </header>

      <div className="space-y-4 rounded-3xl border border-white/10 bg-[#141414] p-8 text-sm text-neutral-400">
        <p>
          استخدم جدول <code className="text-[#e11d48]">settings</code> في Supabase
          لتخزين أزواج المفتاح/القيمة (JSON). يمكنك إضافة مفاتيح مثل{" "}
          <code className="text-white">adsense_client</code> أو{" "}
          <code className="text-white">social_links</code> ثم قراءتها لاحقًا من واجهات
          Next.js عبر استعلام خادمي.
        </p>
        <p>
          عنوان الموقع العام الحالي المشتق من البيئة:
          <span className="mt-2 block rounded-xl bg-[#0a0a0a] px-4 py-3 text-white">
            {SITE_URL}
          </span>
        </p>
        <p>
          بعد ربط النطاق على Vercel، حدّث{" "}
          <code className="text-[#e11d48]">NEXT_PUBLIC_SITE_URL</code> ليطابق النطاق
          الكامل لضمان صحة الـ canonical، الـ OG، وملفات{" "}
          <code className="text-white">robots.txt</code> و{" "}
          <code className="text-white">sitemap.xml</code>.
        </p>
      </div>
    </div>
  );
}
