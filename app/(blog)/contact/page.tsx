import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "اتصل بنا",
  description: "تواصل مع فريق MatricBlog للشراكات والإعلان والاقتراحات التحريرية.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 px-4 py-16 md:px-6 md:py-24">
      <header className="space-y-4 text-center">
        <h1 className="font-heading text-4xl text-white md:text-6xl">اتصل بنا</h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-400">
          نحن هنا للإجابة على استفساراتكم. سواء كنت تبحث عن شراكة إعلامية أو ترغب في الإبلاغ عن خطأ تقني، يسعدنا تواصلك معنا.
        </p>
      </header>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <div className="rounded-3xl border border-white/10 bg-[#141414] p-8">
            <h2 className="font-heading text-2xl text-white">معلومات التواصل</h2>
            <p className="mt-4 text-neutral-400">
              يمكنك مراسلتنا مباشرة عبر البريد الإلكتروني، وسنقوم بالرد عليك في غضون 24-48 ساعة.
            </p>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center gap-4 text-neutral-300">
                <div className="flex size-10 items-center justify-center rounded-full bg-[#e63946]/10 text-[#e63946]">
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>contact@matric-blog.vercel.app</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
            <h2 className="font-heading text-xl text-white">لماذا تتواصل معنا؟</h2>
            <ul className="mt-4 space-y-3 text-sm text-neutral-500">
              <li className="flex gap-2">
                <span className="text-[#e63946]">✦</span>
                طلبات الشراكة والتبادل الإعلاني.
              </li>
              <li className="flex gap-2">
                <span className="text-[#e63946]">✦</span>
                تقديم اقتراحات لمواضيع تهم القارئ العربي.
              </li>
              <li className="flex gap-2">
                <span className="text-[#e63946]">✦</span>
                الإبلاغ عن مشاكل تقنية في الموقع.
              </li>
            </ul>
          </div>
        </div>

        <form className="space-y-6 rounded-3xl border border-white/10 bg-[#141414] p-8">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">الاسم الكامل</Label>
            <Input 
              id="name" 
              placeholder="أدخل اسمك هنا" 
              className="border-white/10 bg-[#0a0a0a] text-white focus-visible:ring-[#e63946]/30" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">البريد الإلكتروني</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="email@example.com" 
              className="border-white/10 bg-[#0a0a0a] text-white focus-visible:ring-[#e63946]/30" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">الرسالة</Label>
            <Textarea 
              id="message" 
              placeholder="كيف يمكننا مساعدتك؟" 
              rows={5}
              className="border-white/10 bg-[#0a0a0a] text-white focus-visible:ring-[#e63946]/30" 
            />
          </div>
          <Button className="w-full bg-[#e63946] text-white hover:bg-[#d62839]">
            إرسال الرسالة
          </Button>
        </form>
      </div>
    </div>
  );
}
