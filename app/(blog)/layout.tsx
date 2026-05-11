import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CookieConsent } from "@/components/layout/cookie-consent";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-primary)]" dir="rtl">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CookieConsent />
    </div>
  );
}

