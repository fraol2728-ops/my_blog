import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/config";
import type { Post, PostCategory } from "@/types";

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

export const BRAND_KEYWORDS = [
  "Master Premier",
  "Master Premier Green Energy",
  "Master Premier Green Energy Co. Ltd",
  "MPGE",
];

const RELATED_SEO_KEYWORDS = [
  "renewable energy company",
  "solar company South Sudan",
  "energy consulting South Sudan",
];

export const buildKeywordSet = (keywords: Array<string | undefined | null>) =>
  Array.from(
    new Set(
      keywords
        .map((keyword) => keyword?.trim())
        .filter((keyword): keyword is string => Boolean(keyword)),
    ),
  );

export const buildDynamicSeoKeywords = ({
  sanityKeywords = [],
  extraKeywords = [],
}: {
  sanityKeywords?: string[];
  extraKeywords?: string[];
}) =>
  buildKeywordSet([...SEO_KEYWORDS, ...BRAND_KEYWORDS, ...RELATED_SEO_KEYWORDS, ...sanityKeywords, ...extraKeywords]);

export const buildSanityKeywordSignals = ({
  posts,
  categories,
}: {
  posts: Post[];
  categories: PostCategory[];
}) =>
  buildKeywordSet([
    ...posts.flatMap((post) => post.seo?.keywords ?? []),
    ...posts.map((post) => post.author?.name),
    ...categories.map((category) => category.title),
  ]);

const localizedHomeTitle: Record<AppLocale, string> = {
  en: "Renewable Energy Engineering and Advisory Services",
  ar: "Renewable Energy Engineering and Advisory Services",
};

const localizedHomeDescription: Record<AppLocale, string> = {
  en: "Master Premier Green Energy Co. Ltd provides renewable energy engineering, technical support, and clean energy advisory services to expand reliable power access across South Sudan.",
  ar: "Master Premier Green Energy Co. Ltd provides renewable energy engineering, technical support, and clean energy advisory services to expand reliable power access across South Sudan.",
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
  keywords,
}: {
  locale: AppLocale;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
}): Metadata => {
  const canonicalPath = `/${locale}${path === "/" ? "" : path}`;
  const ogImage = ogImageUrl(path, locale, title);

  return {
    title,
    description,
    keywords: buildDynamicSeoKeywords({ sanityKeywords: keywords }),
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `/en${path === "/" ? "" : path}`,
        ar: `/ar${path === "/" ? "" : path}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "ar_SA",
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

export const localizedPath = (locale: AppLocale, path: string) =>
  `/${locale}${path === "/" ? "" : path}`;

export const buildBreadcrumbSchema = ({
  locale,
  items,
}: {
  locale: AppLocale;
  items: Array<{ name: string; path: string }>;
}) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${localizedPath(locale, item.path)}`,
  })),
});

export const buildSiteNavigationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    { name: "Home", path: "/en" },
    { name: "About", path: "/en/about" },
    { name: "Services", path: "/en/services" },
    { name: "News", path: "/en/news" },
    { name: "Contact", path: "/en/contact" },
    { name: "Blog", path: "/en/blog" },
    { name: "الرئيسية", path: "/ar" },
    { name: "من نحن", path: "/ar/about" },
    { name: "الخدمات", path: "/ar/services" },
    { name: "الأخبار", path: "/ar/news" },
    { name: "اتصل بنا", path: "/ar/contact" },
    { name: "المدونة", path: "/ar/blog" },
  ].map((item, index) => ({
    "@type": "SiteNavigationElement",
    position: index + 1,
    name: item.name,
    url: `${SITE_URL}${item.path}`,
  })),
});
