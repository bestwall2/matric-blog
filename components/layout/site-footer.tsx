import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-heading text-2xl text-white">
              Matric<span className="text-[#e11d48]">Blog</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-400">
              محتوى موثوق حول البث الرياضي، كرة القدم، والأدلة التقنية — بجودة
              تناسب القارئ العربي في المغرب ومنطقة الشرق الأوسط وشمال أفريقيا.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
              Explore
            </p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/blog" className="hover:text-white">
                  جميع المقالات
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
              Legal
            </p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/privacy" className="hover:text-white">
                  الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  الشروط
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-10 bg-white/10" />
        <p className="text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} MatricBlog. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
