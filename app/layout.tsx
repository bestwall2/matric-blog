import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

const heading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"],
});

const body = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
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
      className={`dark ${heading.variable} ${body.variable}`}
    >
      <body className="min-h-screen bg-[#0a0a0a] antialiased text-neutral-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
