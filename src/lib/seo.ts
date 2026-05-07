import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/config";
import type { Post, PostCategory } from "@/types";

export const SITE_NAME = "Master Premier Green Energy Co. Ltd";
export const SITE_URL = "https://www.masterpremier.energy";
export const DEFAULT_LOCALE: AppLocale = "en";

export const SEO_KEYWORDS = [
  "Master Green Energy",
  "Master Premier Green Energy",
  "Master Green",
  "MPGE",
  "solar energy South Sudan",
  "solar installation Juba",
  "off-grid solar South Sudan",
  "renewable energy South Sudan",
  "solar company South Sudan",
  "clean energy South Sudan",
  "Master Green Energy Solar",
  "solar PV South Sudan",
];

export const BRAND_KEYWORDS = ["Master Premier", "Master Premier Green Energy", "Master Premier Green Energy Co. Ltd", "MPGE"];
const RELATED_SEO_KEYWORDS = ["renewable energy company", "solar company South Sudan", "energy consulting South Sudan"];
export const buildKeywordSet = (keywords: Array<string | undefined | null>) => Array.from(new Set(keywords.map((k) => k?.trim()).filter((k): k is string => Boolean(k))));
export const buildDynamicSeoKeywords = ({ sanityKeywords = [], extraKeywords = [] }: { sanityKeywords?: string[]; extraKeywords?: string[] }) => buildKeywordSet([...SEO_KEYWORDS, ...BRAND_KEYWORDS, ...RELATED_SEO_KEYWORDS, ...sanityKeywords, ...extraKeywords]);
export const buildSanityKeywordSignals = ({ posts, categories }: { posts: Post[]; categories: PostCategory[] }) => buildKeywordSet([...posts.flatMap((p) => p.seo?.keywords ?? []), ...posts.map((p) => p.author?.name), ...categories.map((c) => c.title)]);

const localizedHomeTitle: Record<AppLocale, string> = {
  en: "Master Premier Green Energy Co. Ltd | Solar Energy South Sudan",
  ar: "ماستر بريميير للطاقة الخضراء | الطاقة الشمسية في جنوب السودان",
};
const localizedHomeDescription: Record<AppLocale, string> = {
  en: "Master Premier Green Energy Co. Ltd (MPGE) — South Sudan's leading renewable energy company. Expert solar installation, off-grid systems, energy audits, and clean energy advisory in Juba and across South Sudan.",
  ar: "شركة ماستر بريميير للطاقة الخضراء — حلول الطاقة الشمسية والطاقة المتجددة في جوبا وجنوب السودان.",
};
export const getLocalizedHomeMeta = (locale: AppLocale) => ({ title: localizedHomeTitle[locale], description: localizedHomeDescription[locale] });
export const ogImageUrl = (path: string, locale: AppLocale, title: string) => `${SITE_URL}/api/og?${new URLSearchParams({ locale, path: path.startsWith("/") ? path : `/${path}`, title }).toString()}`;

export const pageMetadata = ({ locale, path, title, description, keywords }: { locale: AppLocale; path: string; title: string; description: string; keywords?: string[]; }): Metadata => {
  const canonicalPath = `/${locale}${path === "/" ? "" : path}`;
  const absoluteCanonical = `${SITE_URL}${canonicalPath}`;
  const ogImage = ogImageUrl(path, locale, title);
  return {
    title,
    description,
    keywords: buildDynamicSeoKeywords({ sanityKeywords: keywords }),
    alternates: { canonical: absoluteCanonical, languages: { en: `${SITE_URL}/en${path === "/" ? "" : path}`, ar: `${SITE_URL}/ar${path === "/" ? "" : path}` } },
    openGraph: { type: "website", locale: locale === "ar" ? "ar" : "en_US", url: absoluteCanonical, title, description, siteName: SITE_NAME, images: [{ url: ogImage, width: 1200, height: 630, alt: `${title} | ${SITE_NAME}` }] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
};

export const localizedPath = (locale: AppLocale, path: string) => `/${locale}${path === "/" ? "" : path}`;
export const buildBreadcrumbSchema = ({ locale, items }: { locale: AppLocale; items: Array<{ name: string; path: string }>; }) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${SITE_URL}${localizedPath(locale, item.path)}` })) });
export const buildSiteNavigationSchema = () => ({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: [{ name: "Home", path: "/en" }, { name: "About", path: "/en/about" }, { name: "Services", path: "/en/services" }, { name: "News", path: "/en/news" }, { name: "Contact", path: "/en/contact" }, { name: "Blog", path: "/en/blog" }].map((item, index) => ({ "@type": "SiteNavigationElement", position: index + 1, name: item.name, url: `${SITE_URL}${item.path}` })) });
