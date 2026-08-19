import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { pretendard } from "./fonts";
import { SITE } from "@/lib/site";
import { TaboolaPlacements } from "@/components/TaboolaPlacements";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  verification: {
    other: {
      "naver-site-verification": "6758176b88a03a977643eceb0784ebcadcdef2fd",
    },
  },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
      inLanguage: "ko",
      description: SITE.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/icon`,
    },
  ];

  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <head>
        <script src="/taboola-init.js" async />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9196149361612087"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <TaboolaPlacements />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
