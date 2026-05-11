import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "اتصل بنا",
  description: "تواصل مع فريق MatricBlog للشراكات والإعلان والاقتراحات التحريرية.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-32 md:px-8">
      <header className="space-y-6 text-center animate-fade-in-up">
        <h1 className="font-heading text-4xl font-black text-white md:text-6xl">اتصل بنا</h1>
        <p className="mx-auto max-w-3xl text-lg leading-[1.8] text-[#888888]">
          نحن هنا للإجابة على استفساراتكم. سواء كنت تبحث عن شراكة إعلامية أو ترغب في الإبلاغ عن خطأ تقني، يسعدنا تواصلك معنا.
        </p>
        <div className="mx-auto h-1 w-20 bg-[#e63946]" />
      </header>

      <div className="mt-24 grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="rounded-[16px] bg-[#111111] p-10 border border-white/5">
            <h2 className="font-heading text-2xl font-bold text-white">معلومات التواصل</h2>
            <p className="mt-4 text-[#888888]">
              يمكنك مراسلتنا مباشرة عبر البريد الإلكتروني، وسنقوم بالرد عليك في غضون 24-48 ساعة.
            </p>
            <div className="mt-8 flex items-center gap-4 text-white">
              <div className="flex size-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#e63946]">
                <Mail className="size-6" />
              </div>
              <span className="text-[16px] font-medium">contact@matric-blog.vercel.app</span>
            </div>
          </div>

          <div className="rounded-[16px] bg-[#050505] p-10 border border-white/5">
            <h2 className="font-heading text-xl font-bold text-white">لماذا تتواصل معنا؟</h2>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 size-1.5 rounded-full bg-[#e63946]" />
                <span className="text-[15px] text-[#888888]">طلبات الشراكة والتبادل الإعلاني.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 size-1.5 rounded-full bg-[#e63946]" />
                <span className="text-[15px] text-[#888888]">تقديم اقتراحات لمواضيع تهم القارئ العربي.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 size-1.5 rounded-full bg-[#e63946]" />
                <span className="text-[15px] text-[#888888]">الإبلاغ عن مشاكل تقنية في الموقع.</span>
              </li>
            </ul>
          </div>
        </div>

        <form className="space-y-8 rounded-[16px] bg-[#111111] p-10 border border-white/5">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-[14px] font-bold text-white">الاسم الكامل</Label>
            <Input 
              id="name" 
              placeholder="أدخل اسمك هنا" 
              className="h-[52px] rounded-xl border-white/10 bg-[#0a0a0a] text-white focus-visible:border-[#e63946] focus-visible:ring-0" 
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="email" className="text-[14px] font-bold text-white">البريد الإلكتروني</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="email@example.com" 
              className="h-[52px] rounded-xl border-white/10 bg-[#0a0a0a] text-white focus-visible:border-[#e63946] focus-visible:ring-0" 
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="message" className="text-[14px] font-bold text-white">الرسالة</Label>
            <Textarea 
              id="message" 
              placeholder="كيف يمكننا مساعدتك؟" 
              rows={5}
              className="rounded-xl border-white/10 bg-[#0a0a0a] text-white focus-visible:border-[#e63946] focus-visible:ring-0" 
            />
          </div>
          <Button className="h-[52px] w-full rounded-xl bg-[#e63946] text-[16px] font-bold text-white transition-all hover:bg-[#c1121f] glow-red">
            إرسال الرسالة
          </Button>
        </form>
      </div>
    </div>
  );
}

