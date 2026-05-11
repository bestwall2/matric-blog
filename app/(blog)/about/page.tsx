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
    <div className="mx-auto max-w-4xl space-y-12 px-4 py-16 md:px-6 md:py-24">
      <header className="space-y-4 text-center">
        <h1 className="font-heading text-4xl text-white md:text-6xl">من نحن</h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-400">
          نسعى لتقديم تجربة معرفية فريدة للقارئ العربي في مجالات الرياضة والتقنية، مع التركيز على الدقة والشفافية.
        </p>
      </header>

      <div className="grid gap-12 md:grid-cols-2">
        <section className="space-y-4">
          <h2 className="font-heading text-2xl text-white">رؤيتنا ورسالتنا</h2>
          <p className="leading-relaxed text-neutral-400">
            في <strong>MatricBlog</strong>، نؤمن بأن المحتوى العربي عالي الجودة هو حق لكل مستخدم. نركز جهودنا على تغطية أخبار البث الرياضي، تحليلات كرة القدم العالمية، وأحدث الأدلة التقنية التي تهم المستخدم في المغرب والوطن العربي. رسالتنا هي سد الفجوة المعرفية بتقديم شروحات مبسطة وموثوقة.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl text-white">معاييرنا التحريرية</h2>
          <p className="leading-relaxed text-neutral-400">
            تخضع جميع مقالاتنا لعملية مراجعة دقيقة. نحن نلتزم بالحيادية والمصداقية، ونحرص على أن يكون المحتوى مكتوباً بواسطة خبراء ومراجعاً بشرياً لضمان خلوه من الأخطاء وتوافقه مع متطلبات محركات البحث وسياسات الجودة العالمية. لا نعتمد على المحتوى المولد آلياً دون تدقيق بشري مكثف.
          </p>
        </section>
      </div>

      <section className="rounded-3xl border border-white/10 bg-[#141414] p-8 md:p-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-heading text-3xl text-white">فريق العمل</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center">
            <Avatar className="size-20 border-2 border-[#e63946]">
              <AvatarFallback className="bg-[#0a0a0a] text-2xl font-bold text-white">M</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-heading text-xl text-white">فريق MatricBlog</h3>
              <p className="text-sm text-[#e63946]">هيئة التحرير</p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                مجموعة من المحررين والخبراء التقنيين المهتمين بتطوير المحتوى الرياضي الرقمي وتقديم أدلة استخدام احترافية.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 text-center">
        <h2 className="font-heading text-3xl text-white">تواصل معنا</h2>
        <p className="mx-auto max-w-2xl text-neutral-400">
          نحن نقدر آراء زوارنا ونسعد دائماً بتلقي استفساراتكم واقتراحاتكم لتطوير المحتوى.
        </p>
        <Link 
          href="/contact" 
          className="inline-flex h-12 items-center justify-center rounded-full bg-[#e63946] px-8 font-medium text-white transition-colors hover:bg-[#d62839]"
        >
          انتقل لصفحة الاتصال
        </Link>
      </section>
    </div>
  );
}
