import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "شروط الاستخدام",
  description: "شروط استخدام محتوى MatricBlog وحقوق الملكية الفكرية.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-32 md:px-8">
      <div className="mx-auto max-w-[800px]">
        <header className="space-y-6 text-center animate-fade-in-up mb-20">
          <h1 className="font-heading text-4xl font-black text-[var(--text-primary)] md:text-6xl">شروط الاستخدام</h1>
          <p className="text-[var(--text-muted)]">آخر تحديث: مايو 2026</p>
          <div className="mx-auto h-1 w-20 bg-[#e63946]" />
        </header>

        <div className="space-y-12">
          <section className="space-y-6 rounded-[16px] bg-[var(--bg-card)] p-10 border border-[var(--border)]">
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">1. طبيعة المحتوى</h2>
            <p className="leading-[1.8] text-[var(--text-muted)]">
              المحتوى المعروض في <strong>MatricBlog</strong> مخصص لأغراض معلوماتية وتحليلية عامة. نحن نسعى جاهدين لضمان دقة المعلومات المتعلقة بالبث الرياضي والتقنية، ولكننا لا نقدم ضمانات مطلقة بشأن اكتمالها أو خلوها من الأخطاء التي قد تطرأ نتيجة تغير سياسات الأطراف الخارجية.
            </p>
          </section>

          <section className="space-y-6 rounded-[16px] bg-[var(--bg-card)] p-10 border border-[var(--border)]">
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">2. حقوق الملكية الفكرية</h2>
            <p className="leading-[1.8] text-[var(--text-muted)]">
              جميع المقالات، الصور، والرسومات التوضيحية المنشورة هي ملك لموقع MatricBlog ما لم يُذكر خلاف ذلك. يُمنع منعاً باتاً نسخ أو إعادة نشر المحتوى في منصات أخرى دون الحصول على إذن كتابي مسبق أو الإشارة الصريحة للمصدر مع رابط مباشر.
            </p>
          </section>

          <section className="space-y-6 rounded-[16px] bg-[var(--bg-card)] p-10 border border-[var(--border)]">
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">3. مسؤولية المستخدم</h2>
            <p className="leading-[1.8] text-[var(--text-muted)]">
              يجب على القارئ التحقق من أي خطوات حساسة (خصوصاً المتعلقة بالاشتراكات الرقمية أو الدفع عبر الإنترنت) مع الجهات الرسمية. الموقع غير مسؤول عن أي خسائر مادية أو فنية ناتجة عن سوء استخدام المعلومات المقدمة.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

