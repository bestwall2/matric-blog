import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

const heading = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-heading",
  weight: ["400", "600", "700", "900"],
});

const body = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-body",
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: safeUrl(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ar_MA",
    siteName: SITE_NAME,
    images: [{ url: `${SITE_URL}/api/og?title=${encodeURIComponent(SITE_NAME)}` }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

function safeUrl(url: string) {
  try {
    return new URL(url);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${heading.variable} ${body.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var theme = localStorage.getItem('matric-theme') || 'dark';
              document.documentElement.className = theme + ' no-transition';
              setTimeout(function() {
                document.documentElement.classList.remove('no-transition');
              }, 100);
            })();
          `
        }} />
      </head>
      <body
        className="min-h-screen bg-[var(--bg-primary)] antialiased text-[var(--text-primary)] selection:bg-[#e63946]/30"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
