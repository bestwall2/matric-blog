import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية لـ MatricBlog وجمع البيانات للإعلانات والنشرة البريدية.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-16 md:px-6">
      <h1 className="font-heading text-4xl text-white md:text-5xl">
        سياسة الخصوصية
      </h1>
      <p className="leading-relaxed text-neutral-400">
        نحترم خصوصيتك. قد نجمع بيانات استخدام مجهولة المصدر عبر أدوات تحليل معتمدة،
        وأدوات إعلانات تابعة لجهات خارجية مثل Google عند تفعيلها، وفقًا لإعدادات حسابك في
        AdSense وAnalytics.
      </p>
      <ul className="space-y-3">
        <li className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-neutral-400">
          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e63946]/10 text-xs text-[#e63946]">✓</span>
          نستخدم النشرة البريدية لتخزين عنوان البريد فقط ولأغراض الإرسال الدوري.
        </li>
        <li className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-neutral-400">
          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e63946]/10 text-xs text-[#e63946]">✓</span>
          يمكنك طلب حذف بياناتك عبر مراسلتنا من البريد الرسمي للموقع.
        </li>
        <li className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-neutral-400">
          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e63946]/10 text-xs text-[#e63946]">✓</span>
          قد يستخدم الطرف الثالث ملفات تعريف الارتباط لقياس الأداء والعرض الإعلاني.
        </li>
      </ul>
    </div>
  );
}
