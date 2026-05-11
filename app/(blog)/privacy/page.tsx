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
      <ul className="list-disc space-y-3 pr-6 text-neutral-400">
        <li>نستخدم النشرة البريدية لتخزين عنوان البريد فقط ولأغراض الإرسال الدوري.</li>
        <li>يمكنك طلب حذف بياناتك عبر مراسلتنا من البريد الرسمي للموقع.</li>
        <li>قد يستخدم الطرف الثالث ملفات تعريف الارتباط لقياس الأداء والعرض الإعلاني.</li>
      </ul>
    </div>
  );
}
