import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import { buildSiteNavigationSchema } from "@/lib/seo";
import { LanguageProvider } from "@/context/language";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.masterpremier.energy"),
  title: {
    default: "Solar Company in South Sudan | Master Premier Green Energy",
    template: "%s | Master Premier Green Energy",
  },
  description:
    "We provide solar installation, off-grid systems, and renewable energy solutions in South Sudan for homes and businesses.",
  openGraph: {
    type: "website",
    url: "https://www.masterpremier.energy",
    siteName: "Master Premier Green Energy",
    title: "Solar Company in South Sudan | Master Premier Green Energy",
    description:
      "We provide solar installation, off-grid systems, and renewable energy solutions in South Sudan for homes and businesses.",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Solar installation services in South Sudan by Master Premier Green Energy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Company in South Sudan | Master Premier Green Energy",
    description:
      "We provide solar installation, off-grid systems, and renewable energy solutions in South Sudan for homes and businesses.",
    images: ["/hero.jpg"],
  },
};

const siteNavigationSchema = buildSiteNavigationSchema();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="antialiased overflow-x-hidden font-sans transition-all duration-300">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }} />
        <SessionProvider>
          <LanguageProvider>
            <AnalyticsProvider />
            {children}
          </LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
