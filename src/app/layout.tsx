import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import { SEO_KEYWORDS, SITE_NAME, SITE_URL } from "@/lib/seo";

const defaultDescription =
  "Master Premier Green Energy Co. Ltd delivers reliable, modern, and intelligent renewable energy engineering and advisory solutions for institutions and communities across South Sudan.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | Master Premier Green Energy Co. Ltd",
  },
  description: defaultDescription,
  keywords: SEO_KEYWORDS,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: defaultDescription,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: defaultDescription,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [
    "mailto:mpgenergy@gmail.com",
    "tel:+211982004848",
    "tel:+211928004848",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/en/news?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <SessionProvider>
          <AnalyticsProvider />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
