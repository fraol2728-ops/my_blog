import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/config";

export const SITE_NAME = "Xyberosec";
export const SITE_URL = "https://www.xyberosec.com";
export const DEFAULT_LOCALE: AppLocale = "en";

export const SEO_KEYWORDS = [
  "Xyberosec",
  "cybersecurity",
  "managed security services",
  "security operations",
  "threat detection",
  "incident response",
  "penetration testing",
  "cloud security",
  "zero trust",
  "security consulting",
];

const localizedHomeTitle: Record<AppLocale, string> = {
  en: "Cybersecurity Services and Managed SOC Solutions",
  am: "የሳይበር ደህንነት አገልግሎቶች እና የSOC መፍትሄዎች",
};

const localizedHomeDescription: Record<AppLocale, string> = {
  en: "Xyberosec helps organizations prevent attacks with managed SOC, cloud security, and incident response services designed for fast, measurable risk reduction.",
  am: "Xyberosec ድርጅቶችን ከጥቃቶች ለመከላከል የተቀናጀ SOC፣ cloud ደህንነት እና incident response አገልግሎቶችን ይሰጣል።",
};

export const getLocalizedHomeMeta = (locale: AppLocale) => ({
  title: localizedHomeTitle[locale],
  description: localizedHomeDescription[locale],
});

export const ogImageUrl = (path: string, locale: AppLocale, title: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const search = new URLSearchParams({
    locale,
    path: normalizedPath,
    title,
  });

  return `${SITE_URL}/api/og?${search.toString()}`;
};

export const pageMetadata = ({
  locale,
  path,
  title,
  description,
}: {
  locale: AppLocale;
  path: string;
  title: string;
  description: string;
}): Metadata => {
  const canonicalPath = `/${locale}${path === "/" ? "" : path}`;
  const ogImage = ogImageUrl(path, locale, title);

  return {
    title,
    description,
    keywords: SEO_KEYWORDS,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `/en${path === "/" ? "" : path}`,
        am: `/am${path === "/" ? "" : path}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "am_ET",
      url: canonicalPath,
      title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} | ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
};
