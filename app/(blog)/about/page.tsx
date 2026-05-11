import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "MatricBlog منصّة عربية متخصصة في البث الرياضي، كرة القدم، والأدلة التقنية.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-16 md:px-6">
      <h1 className="font-heading text-4xl text-white md:text-5xl">من نحن</h1>
      <p className="text-lg leading-relaxed text-neutral-400">
        نؤمن بأن القارئ العربي يستحق محتوى دقيقًا حول البث الرياضي، كرة القدم،
        والأدوات التقنية التي يعتمد عليها يومًا بعد يوم. نعمل وفق معايير الشفافية،
        ونحرص على الالتزام بسياسات الجودة التي تناسب برامج مثل Google AdSense ومتطلبات
        Search Console.
      </p>
      <p className="leading-relaxed text-neutral-400">
        الفريق يجمع بين خلفيات تحريرية وتقنية، بهدف تقديم أدلة عملية، تحليلات رصينة،
        وتجارب مستخدمين حقيقية من المغرب ومنطقة الشرق الأوسط وشمال أفريقيا.
      </p>
    </div>
  );
}
