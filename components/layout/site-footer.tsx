import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-heading text-2xl font-bold text-white">
              Matric<span className="text-[#e63946]">Blog</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-500">
              محتوى موثوق حول البث الرياضي، كرة القدم، والأدلة التقنية — بجودة
              تناسب القارئ العربي في المغرب ومنطقة الشرق الأوسط وشمال أفريقيا.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              التصفح
            </p>
            <ul className="mt-4 space-y-3 text-sm text-neutral-400">
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-white"
                >
                  جميع المقالات
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-white"
                >
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-white"
                >
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              القانون
            </p>
            <ul className="mt-4 space-y-3 text-sm text-neutral-400">
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-white"
                >
                  الخصوصية
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-white"
                >
                  الشروط
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 border-t border-white/[0.06] pt-8 text-center text-xs text-neutral-600">
          © {new Date().getFullYear()} MatricBlog. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
