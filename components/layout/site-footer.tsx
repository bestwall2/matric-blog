import Link from "next/link";
import { Send, Play, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#050505]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Col 1: Brand */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-3 bg-[#e63946]" />
              <span className="font-heading text-2xl font-black text-white">MatricBlog</span>
            </Link>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-[#888888]">
              محتوى موثوق حول البث الرياضي، كرة القدم، والأدلة التقنية — بجودة تناسب القارئ العربي.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialIcon href="#" icon={<Send className="size-4" />} />
              <SocialIcon href="#" icon={<Play className="size-4" />} />
              <SocialIcon href="#" icon={<MessageCircle className="size-4" />} />
            </div>
          </div>

          {/* Col 2: Explore */}
          <div>
            <h4 className="font-heading text-[16px] font-bold text-white">استكشف</h4>
            <ul className="mt-6 space-y-4">
              <li>
                <FooterLink href="/blog">المقالات</FooterLink>
              </li>
              <li>
                <FooterLink href="/about">من نحن</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">اتصل بنا</FooterLink>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div>
            <h4 className="font-heading text-[16px] font-bold text-white">قانوني</h4>
            <ul className="mt-6 space-y-4">
              <li>
                <FooterLink href="/privacy">الخصوصية</FooterLink>
              </li>
              <li>
                <FooterLink href="/terms">الشروط</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 text-center">
          <p className="text-[13px] text-[#555555]">
            © {new Date().getFullYear()} MatricBlog. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="flex size-9 items-center justify-center rounded-full bg-[#1a1a1a] text-white transition-all hover:bg-[#e63946]"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[14px] text-[#888888] transition-colors hover:text-white"
    >
      {children}
    </Link>
  );
}

