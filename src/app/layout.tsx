import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import { buildSiteNavigationSchema } from "@/lib/seo";
import { LanguageProvider } from "@/context/language";

export const metadata: Metadata = {
  title: {
    default: "Master Premier Green Energy Co. Ltd | Solar Energy South Sudan",
    template: "%s | Master Premier Green Energy",
  },
  description: "Master Premier Green Energy Co. Ltd (MPGE) — South Sudan's leading renewable energy company. Expert solar installation, off-grid systems, energy audits, and clean energy advisory in Juba and across South Sudan.",
  keywords: ["Master Green Energy", "Master Premier Green Energy", "Master Green", "MPGE", "solar energy South Sudan", "solar installation Juba", "off-grid solar South Sudan", "renewable energy South Sudan", "solar company South Sudan", "clean energy South Sudan", "Master Green Energy Solar", "solar PV South Sudan"],
  metadataBase: new URL("https://www.masterpremier.energy"),
  alternates: { canonical: "https://www.masterpremier.energy/en", languages: { en: "/en", ar: "/ar" } },
  openGraph: {
    type: "website", locale: "en_US", url: "https://www.masterpremier.energy/en", siteName: "Master Premier Green Energy Co. Ltd",
    title: "Master Premier Green Energy Co. Ltd | Solar Energy South Sudan",
    description: "South Sudan's leading solar and renewable energy company. Off-grid solar systems, energy audits, installation and support.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Master Premier Green Energy - Solar Power South Sudan" }],
  },
  twitter: { card: "summary_large_image", title: "Master Premier Green Energy Co. Ltd", description: "South Sudan's leading solar energy company — off-grid systems, energy audits, and clean energy advisory.", images: ["/og-image.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  verification: {
    google: "PASTE_YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE_HERE",
    other: { "msvalidate.01": "PASTE_YOUR_BING_WEBMASTER_VERIFICATION_CODE_HERE" },
  },
};

const siteNavigationSchema = buildSiteNavigationSchema();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
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
