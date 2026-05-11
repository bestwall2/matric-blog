import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية لـ MatricBlog وجمع البيانات للإعلانات والنشرة البريدية وفق معايير Google AdSense.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-16 md:px-6 md:py-24">
      <div className="space-y-4 text-center">
        <h1 className="font-heading text-4xl text-white md:text-6xl">
          سياسة الخصوصية
        </h1>
        <p className="text-neutral-500">آخر تحديث: مايو 2026</p>
      </div>

      <div className="prose prose-invert prose-neutral max-w-none leading-relaxed text-neutral-400">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">1. مقدمة وهويتنا</h2>
          <p>
            مرحباً بكم في <strong>MatricBlog</strong>، المنصة العربية المتخصصة في أدلة البث الرياضي، أخبار كرة القدم، والتقنيات الحديثة. نحن نولي أهمية قصوى لخصوصية زوارنا، وتوضح هذه السياسة كيفية جمع واستخدام وحماية بياناتكم عند تصفح موقعنا (https://matric-blog.vercel.app/).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">2. البيانات التي نجمعها</h2>
          <p>نقوم بجمع أنواع معينة من المعلومات لتحسين تجربتكم، وتشمل:</p>
          <ul className="list-disc pr-6">
            <li><strong>ملفات تعريف الارتباط (Cookies):</strong> لتخصيص المحتوى وتحليل الزيارات.</li>
            <li><strong>بيانات التحليل:</strong> معلومات تقنية مثل نوع المتصفح، نظام التشغيل، وعنوان IP بشكل مجهول.</li>
            <li><strong>بيانات التواصل:</strong> عند الاشتراك في النشرة البريدية، نجمع عنوان البريد الإلكتروني فقط بموافقتك.</li>
          </ul>
        </section>

        <section className="space-y-4 border-l-2 border-[#e63946] bg-white/[0.02] p-6 rounded-r-xl">
          <h2 className="text-2xl font-bold text-white">3. Google AdSense وملفات تعريف الارتباط</h2>
          <p>
            تستخدم MatricBlog برنامج <strong>Google AdSense</strong> لعرض الإعلانات. يرجى العلم بما يلي:
          </p>
          <ul className="list-disc pr-6">
            <li>تستخدم شركة Google (كطرف ثالث) ملفات تعريف الارتباط لعرض الإعلانات على موقعنا.</li>
            <li>استخدام Google لملف تعريف الارتباط DART يتيح لها عرض الإعلانات للمستخدمين استناداً إلى زيارتهم لموقعنا ومواقع أخرى على الإنترنت.</li>
            <li>يمكن للمستخدمين اختيار تعطيل استخدام ملف تعريف الارتباط DART عن طريق زيارة سياسة الخصوصية الخاصة بإعلانات Google وشبكة المحتوى.</li>
            <li>يمكنك مراجعة وإدارة إعدادات الإعلانات الخاصة بك عبر <a href="https://adssettings.google.com/" className="text-[#e63946] hover:underline" target="_blank" rel="noopener noreferrer">إعدادات إعلانات Google</a>.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. Google Analytics</h2>
          <p>
            نستخدم <strong>Google Analytics</strong> لفهم كيفية تفاعل الزوار مع المحتوى. يتم جمع هذه البيانات بشكل مجهول ولا نربطها بأي معلومات تحديد هوية شخصية. تساعدنا هذه البيانات في تحسين جودة المحتوى الرياضي والتقني الذي نقدمه.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. روابط الطرف الثالث</h2>
          <p>
            قد يحتوي موقعنا على روابط لمواقع خارجية. نحن غير مسؤولين عن ممارسات الخصوصية أو محتوى تلك المواقع، وننصحك بقراءة سياسة الخصوصية لكل موقع تزوره.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">6. حقوق المستخدم</h2>
          <p>بصفتك مستخدماً، لديك الحق في:</p>
          <ul className="list-disc pr-6">
            <li>الوصول إلى بياناتك التي قدمتها لنا (مثل البريد الإلكتروني في النشرة البريدية).</li>
            <li>طلب حذف بياناتك أو تعديلها في أي وقت.</li>
            <li>الاعتراض على معالجة بياناتك لأغراض تسويقية.</li>
            <li>تعطيل ملفات تعريف الارتباط من خلال إعدادات متصفحك.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">7. التواصل معنا</h2>
          <p>
            إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو كنت ترغب في ممارسة حقوقك، يرجى زيارة <a href="/contact" className="text-[#e63946] hover:underline">صفحة اتصل بنا</a> ومراسلتنا عبر النموذج الرسمي.
          </p>
        </section>
      </div>
    </div>
  );
}
