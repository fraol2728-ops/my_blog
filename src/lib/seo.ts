import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/config";

export const SITE_NAME = "Master Premier Green Energy Co. Ltd";
export const SITE_URL = "https://masterpremiergreenenergy.com";
export const DEFAULT_LOCALE: AppLocale = "en";

export const SEO_KEYWORDS = [
  "Master Premier Green Energy Co. Ltd",
  "South Sudan renewable energy",
  "solar energy solutions",
  "clean energy advisory",
  "energy audit",
  "feasibility study",
  "solar system design",
  "solar installation",
  "energy management plan",
  "rural energy access",
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
