import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/config";

export const SITE_NAME = "Master Premier Green Energy Co. Ltd";
export const SITE_URL = "https://masterpremiergreenenergy.com";
export const DEFAULT_LOCALE: AppLocale = "en";

export const SEO_KEYWORDS = [
  "Master Premier Green Energy Co. Ltd",
  "South Sudan renewable energy",
  "solar energy company in Juba",
  "solar EPC South Sudan",
  "renewable energy engineering",
  "clean energy advisory",
  "energy audit services",
  "feasibility study for solar projects",
  "solar system design and installation",
  "off-grid solar solutions",
  "commercial solar power systems",
  "industrial solar energy solutions",
  "rural electrification South Sudan",
  "energy management plan",
  "solar maintenance and lifecycle support",
];

const localizedHomeTitle: Record<AppLocale, string> = {
  en: "Renewable Energy Engineering and Advisory Services",
  am: "የታዳሽ ኃይል ምህንድስና እና አማካሪ አገልግሎቶች",
};

const localizedHomeDescription: Record<AppLocale, string> = {
  en: "Master Premier Green Energy Co. Ltd provides renewable energy engineering, technical support, and clean energy advisory services to expand reliable power access across South Sudan.",
  am: "Master Premier Green Energy Co. Ltd በደቡብ ሱዳን የታማኝ ኃይል ተደራሽነትን ለማስፋፋት የታዳሽ ኃይል ምህንድስና፣ ቴክኒካል ድጋፍ እና የንጹህ ኃይል አማካሪ አገልግሎቶችን ይሰጣል።",
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

export const mergeKeywords = (...keywordSets: Array<readonly string[] | string[] | undefined>) => {
  const ordered = new Set<string>();

  for (const keywords of keywordSets) {
    if (!keywords) continue;

    for (const keyword of keywords) {
      const trimmed = keyword.trim();
      if (trimmed.length > 0) {
        ordered.add(trimmed);
      }
    }
  }

  return Array.from(ordered);
};

export const pageMetadata = ({
  locale,
  path,
  title,
  description,
  keywords,
}: {
  locale: AppLocale;
  path: string;
  title: string;
  description: string;
  keywords?: readonly string[];
}): Metadata => {
  const canonicalPath = `/${locale}${path === "/" ? "" : path}`;
  const ogImage = ogImageUrl(path, locale, title);

  return {
    title,
    description,
    keywords: mergeKeywords(SEO_KEYWORDS, keywords),
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
