import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اتصل بنا",
  description: "تواصل مع فريق MatricBlog للشراكات والإعلان والاقتراحات التحريرية.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-16 md:px-6">
      <h1 className="font-heading text-4xl text-white md:text-5xl">اتصل بنا</h1>
      <p className="leading-relaxed text-neutral-400">
        للاستفسارات الإعلامية، الشراكات، أو الإبلاغ عن خطأ تحريري، يُرجى مراسلتنا عبر
        البريد الإلكتروني الرسمي للموقع بعد إطلاقه على نطاقك الخاص. يمكنك أيضًا استخدام
        نموذج النشرة البريدية في الصفحة الرئيسية لتلقي التحديثات الدورية.
      </p>
      <div className="rounded-3xl border border-white/10 bg-[#141414] p-8 text-sm text-neutral-400">
        نصيحة تشغيلية: أنشئ عنوانًا عامًا مثل{" "}
        <span className="text-white">contact@yourdomain.com</span> ووجّهه إلى صندوق فريق
        التحرير، ثم أضف نفس العنوان ضمن صفحة سياسة الخصوصية لطلبات GDPR / أدوات إعلانية.
      </div>
    </div>
  );
}
