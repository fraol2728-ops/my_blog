import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import { buildSiteNavigationSchema, SEO_KEYWORDS, SITE_NAME, SITE_URL } from "@/lib/seo";

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
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      "x-default": "/en",
    },
  },
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
  icons: {
    icon: [
      { url: "/fav.jpg", type: "image/jpeg" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/fav.jpg",
    apple: "/fav.jpg",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: "mailto:mpgenergy@gmail.com",
  telephone: "+211982004848",
  areaServed: "SS",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "mpgenergy@gmail.com",
      telephone: "+211982004848",
      areaServed: "SS",
      availableLanguage: ["en"],
    },
  ],
  knowsAbout: [
    "Renewable energy engineering",
    "Solar system design",
    "Energy audits",
    "Clean energy advisory",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ["en"],
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/en/news?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const siteNavigationSchema = buildSiteNavigationSchema();

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
        />
        <SessionProvider>
          <AnalyticsProvider />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
