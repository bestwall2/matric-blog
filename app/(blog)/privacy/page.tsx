import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية لـ MatricBlog وجمع البيانات للإعلانات والنشرة البريدية وفق معايير Google AdSense.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-32 md:px-8">
      <div className="mx-auto max-w-[800px]">
        <header className="space-y-6 text-center animate-fade-in-up mb-20">
          <h1 className="font-heading text-4xl font-black text-[var(--text-primary)] md:text-6xl">سياسة الخصوصية</h1>
          <p className="text-[var(--text-muted)]">آخر تحديث: مايو 2026</p>
          <div className="mx-auto h-1 w-20 bg-[#e63946]" />
        </header>

        <div className="prose prose-invert prose-neutral max-w-none leading-[1.8] text-[var(--text-muted)]">
          <section className="space-y-6 mb-12">
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">1. مقدمة وهويتنا</h2>
            <p>
              مرحباً بكم في <strong>MatricBlog</strong>، المنصة العربية المتخصصة في أدلة البث الرياضي، أخبار كرة القدم، والتقنيات الحديثة. نحن نولي أهمية قصوى لخصوصية زوارنا.
            </p>
          </section>

          <section className="space-y-6 mb-12">
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">2. البيانات التي نجمعها</h2>
            <p>نقوم بجمع أنواع معينة من المعلومات لتحسين تجربتكم، وتشمل:</p>
            <ul className="list-disc pr-6 space-y-2">
              <li><strong>ملفات تعريف الارتباط (Cookies):</strong> لتخصيص المحتوى وتحليل الزيارات.</li>
              <li><strong>بيانات التحليل:</strong> معلومات تقنية مثل نوع المتصفح، نظام التشغيل، وعنوان IP بشكل مجهول.</li>
              <li><strong>بيانات التواصل:</strong> عند الاشتراك في النشرة البريدية، نجمع عنوان البريد الإلكتروني فقط بموافقتك.</li>
            </ul>
          </section>

          <section className="space-y-6 mb-12 rounded-[16px] bg-[var(--bg-card)] p-8 border border-[var(--border)] border-r-4 border-r-[#e63946]">
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">3. Google AdSense وملفات تعريف الارتباط</h2>
            <p>
              تستخدم MatricBlog برنامج <strong>Google AdSense</strong> لعرض الإعلانات. يرجى العلم بما يلي:
            </p>
            <ul className="list-disc pr-6 space-y-2">
              <li>تستخدم شركة Google (كطرف ثالث) ملفات تعريف الارتباط لعرض الإعلانات على موقعنا.</li>
              <li>استخدام Google لملف تعريف الارتباط DART يتيح لها عرض الإعلانات للمستخدمين استناداً إلى زيارتهم لموقعنا.</li>
              <li>يمكنك مراجعة وإدارة إعدادات الإعلانات الخاصة بك عبر <a href="https://adssettings.google.com/" className="text-[#e63946] hover:underline" target="_blank" rel="noopener noreferrer">إعدادات إعلانات Google</a>.</li>
            </ul>
          </section>

          <section className="space-y-6 mb-12">
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">4. حقوق المستخدم</h2>
            <p>بصفتك مستخدماً، لديك الحق في:</p>
            <ul className="list-disc pr-6 space-y-2">
              <li>الوصول إلى بياناتك التي قدمتها لنا.</li>
              <li>طلب حذف بياناتك أو تعديلها في أي وقت.</li>
              <li>تعطيل ملفات تعريف الارتباط من خلال إعدادات متصفحك.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

