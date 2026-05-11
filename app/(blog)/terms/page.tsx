import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "شروط الاستخدام",
  description: "شروط استخدام محتوى MatricBlog وحقوق الملكية الفكرية.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-16 md:px-6">
      <h1 className="font-heading text-4xl text-white md:text-5xl">
        شروط الاستخدام
      </h1>
      <p className="leading-relaxed text-neutral-400">
        المحتوى المعروض لأغراض معلوماتية عامة. لا يقدّم الموقع ضمانات قانونية أو فنية
        خارج نطاق التحرير، ويجب على القارئ التحقق من أي خطوات حساسة (خصوصًا المتعلقة
        بالاشتراكات أو الدفع عبر الإنترنت) مع الجهات المختصة.
      </p>
      <p className="leading-relaxed text-neutral-400">
        يُمنع إعادة نشر المواد دون الإشارة إلى المصدر. يحتفظ الفريق بحق تحديث هذه الشروط
        متى لزم الأمر مع الإعلان عن التاريخ داخل هذه الصفحة.
      </p>
    </div>
  );
}
