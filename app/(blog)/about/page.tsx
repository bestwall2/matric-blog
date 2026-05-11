import type { Metadata } from "next";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرف على MatricBlog، المنصة الرائدة في تحليل البث الرياضي والتقنية للقارئ العربي.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-32 md:px-8">
      <header className="space-y-6 text-center animate-fade-in-up">
        <h1 className="font-heading text-4xl font-black text-[var(--text-primary)] md:text-6xl">من نحن</h1>
        <p className="mx-auto max-w-3xl text-lg leading-[1.8] text-[var(--text-muted)]">
          نسعى لتقديم تجربة معرفية فريدة للقارئ العربي في مجالات الرياضة والتقنية، مع التركيز على الدقة والشفافية.
        </p>
        <div className="mx-auto h-1 w-20 bg-[#e63946]" />
      </header>

      <div className="mt-24 grid gap-12 md:grid-cols-2">
          <section className="space-y-6 rounded-[16px] bg-[var(--bg-card)] p-10 border border-[var(--border)]">
          <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">رؤيتنا ورسالتنا</h2>
          <p className="leading-[1.8] text-[var(--text-muted)]">
            في <strong>MatricBlog</strong>، نؤمن بأن المحتوى العربي عالي الجودة هو حق لكل مستخدم. نركز جهودنا على تغطية أخبار البث الرياضي، تحليلات كرة القدم العالمية، وأحدث الأدلة التقنية التي تهم المستخدم في المغرب والوطن العربي. رسالتنا هي سد الفجوة المعرفية بتقديم شروحات مبسطة وموثوقة.
          </p>
        </section>

        <section className="space-y-6 rounded-[16px] bg-[var(--bg-card)] p-10 border border-[var(--border)]">
          <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">معاييرنا التحريرية</h2>
          <p className="leading-[1.8] text-[var(--text-muted)]">
            تخضع جميع مقالاتنا لعملية مراجعة دقيقة. نحن نلتزم بالحيادية والمصداقية، ونحرص على أن يكون المحتوى مكتوباً بواسطة خبراء ومراجعاً بشرياً لضمان خلوه من الأخطاء وتوافقه مع متطلبات محركات البحث وسياسات الجودة العالمية.
          </p>
        </section>
      </div>

      <section className="mt-24 rounded-[16px] bg-[var(--footer-bg)] p-10 md:p-16 border border-[var(--border)] mesh-gradient">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-black text-[var(--text-primary)]">فريق العمل</h2>
          <p className="mt-2 text-[var(--text-muted)]">نخبة من المحررين المتميزين</p>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-6 max-w-sm text-center">
            <Avatar className="size-24 border-2 border-[#e63946] glow-red">
              <AvatarFallback className="bg-[var(--bg-elevated)] text-3xl font-black text-[var(--text-primary)]">M</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">فريق MatricBlog</h3>
              <p className="text-[14px] font-bold uppercase tracking-wider text-[#e63946]">هيئة التحرير</p>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-muted)]">
                مجموعة من المحررين والخبراء التقنيين المهتمين بتطوير المحتوى الرياضي الرقمي وتقديم أدلة استخدام احترافية.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24 space-y-8 text-center">
        <h2 className="font-heading text-3xl font-black text-[var(--text-primary)]">تواصل معنا</h2>
        <p className="mx-auto max-w-2xl text-[var(--text-muted)]">
          نحن نقدر آراء زوارنا ونسعد دائماً بتلقي استفساراتكم واقتراحاتكم لتطوير المحتوى.
        </p>
        <Link 
          href="/contact" 
          className="inline-flex h-[52px] items-center justify-center rounded-xl bg-[#e63946] px-10 text-[16px] font-bold text-white transition-all hover:bg-[#c1121f] hover:scale-105 active:scale-95 glow-red"
        >
          انتقل لصفحة الاتصال
        </Link>
      </section>
    </div>
  );
}

