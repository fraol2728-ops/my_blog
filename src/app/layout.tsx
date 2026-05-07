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
    images: [{ url: "https://www.masterpremier.energy/og-image.jpg", width: 1200, height: 630, alt: "Master Premier Green Energy - Solar Power South Sudan" }],
  },
  twitter: { card: "summary_large_image", title: "Master Premier Green Energy Co. Ltd", description: "South Sudan's leading solar energy company — off-grid systems, energy audits, and clean energy advisory.", images: ["https://www.masterpremier.energy/og-image.jpg"], site: "https://www.masterpremier.energy/en" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  verification: {
    google: "PASTE_YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE_HERE",
    other: { "msvalidate.01": "PASTE_YOUR_BING_WEBMASTER_VERIFICATION_CODE_HERE" },
  },
};

const siteNavigationSchema = buildSiteNavigationSchema();
const structuredDataGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.masterpremier.energy/#organization",
      name: "Master Premier Green Energy Co. Ltd",
      alternateName: ["Master Green Energy", "Master Green", "MPGE", "Master Premier", "Master Green Energy Solar"],
      url: "https://www.masterpremier.energy/en",
      logo: {
        "@type": "ImageObject",
        url: "https://www.masterpremier.energy/logo.png",
        width: 400,
        height: 100,
      },
      description:
        "Master Premier Green Energy Co. Ltd (MPGE) is South Sudan's leading renewable energy company. We provide solar installation, off-grid solar systems, energy audits, feasibility studies, and clean energy advisory services in Juba and across South Sudan.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Thongping, Florian Road, Block 3, Plot No. 258",
        addressLocality: "Juba",
        addressRegion: "Central Equatoria",
        addressCountry: "SS",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+211982004848",
        contactType: "customer service",
        availableLanguage: ["English", "Arabic"],
      },
      email: "mpgenergy@gmail.com",
      telephone: "+211982004848",
      areaServed: {
        "@type": "Country",
        name: "South Sudan",
      },
      foundingLocation: {
        "@type": "Place",
        name: "Juba, South Sudan",
      },
      knowsAbout: [
        "Solar Energy",
        "Renewable Energy",
        "Off-grid Solar Systems",
        "Energy Audits",
        "Feasibility Studies",
        "Solar Panel Installation",
        "Clean Energy Advisory",
        "Solar Manufacturing",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.masterpremier.energy/#localbusiness",
      name: "Master Premier Green Energy Co. Ltd",
      image: "https://www.masterpremier.energy/logo.png",
      telephone: "+211982004848",
      email: "mpgenergy@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Thongping, Florian Road, Block 3, Plot No. 258",
        addressLocality: "Juba",
        addressRegion: "Central Equatoria",
        addressCountry: "SS",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 4.8594,
        longitude: 31.5713,
      },
      url: "https://www.masterpremier.energy/en",
      priceRange: "$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      currenciesAccepted: "USD",
      paymentAccepted: "Cash, Bank Transfer",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.masterpremier.energy/#website",
      url: "https://www.masterpremier.energy/en",
      name: "Master Premier Green Energy Co. Ltd",
      alternateName: ["Master Green Energy", "MPGE", "Master Green"],
      description: "South Sudan's leading solar and renewable energy company.",
      publisher: {
        "@id": "https://www.masterpremier.energy/#organization",
      },
      inLanguage: ["en", "ar"],
    },
  ],
};

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }} />
      </body>
    </html>
  );
}
