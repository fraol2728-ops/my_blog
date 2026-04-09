import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllPosts, getCategories } from "@/sanity/queries";
import type { Post, PostCategory } from "@/types";

const locales = ["en", "am"] as const;
const localizedStaticPaths = ["", "/about", "/services", "/news", "/blog", "/contact"];

type SupportedLocale = (typeof locales)[number];

const normalizeSegment = (segment: string): string => segment.replace(/^\/+|\/+$/g, "");

const withLocalePath = (locale: SupportedLocale, path: string) => {
  const normalized = normalizeSegment(path);
  return normalized.length > 0 ? `/${locale}/${normalized}` : `/${locale}`;
};

const buildLanguageAlternates = (path: string) => {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${SITE_URL}${withLocalePath(locale, path)}`]),
  ) as Record<SupportedLocale, string>;

  return {
    ...languages,
    "x-default": languages.en,
  };
};

const isValidSlug = (value: string | undefined | null): value is string =>
  Boolean(value && normalizeSegment(value).length > 0);

const staticPathPriority = (path: string) => {
  switch (path) {
    case "":
      return 1;
    case "/services":
      return 0.9;
    case "/news":
    case "/blog":
      return 0.8;
    default:
      return 0.7;
  }
};

const resolvePostChangeFrequency = (lastModified: Date): MetadataRoute.Sitemap[number]["changeFrequency"] => {
  const daysSinceUpdate = Math.floor((Date.now() - lastModified.getTime()) / (1000 * 60 * 60 * 24));

  if (daysSinceUpdate <= 14) {
    return "daily";
  }

  if (daysSinceUpdate <= 60) {
    return "weekly";
  }

  return "monthly";
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries = new Map<string, MetadataRoute.Sitemap[number]>();

  const addEntry = (entry: MetadataRoute.Sitemap[number]) => {
    entries.set(entry.url, entry);
  };

  addEntry({
    url: SITE_URL,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.9,
    alternates: {
      languages: {
        "x-default": `${SITE_URL}/en`,
      },
    },
  });

  for (const path of localizedStaticPaths) {
    for (const locale of locales) {
      addEntry({
        url: `${SITE_URL}${withLocalePath(locale, path)}`,
        lastModified: now,
        changeFrequency: path === "" ? "daily" : "weekly",
        priority: staticPathPriority(path),
        alternates: {
          languages: buildLanguageAlternates(path),
        },
      });
    }
  }

  let posts: Post[] = [];
  let categories: PostCategory[] = [];

  try {
    posts = (await getAllPosts(1000)) ?? [];
  } catch {
    posts = [];
  }

  try {
    categories = (await getCategories()) ?? [];
  } catch {
    categories = [];
  }

  const indexablePosts = posts.filter((post) => isValidSlug(post.slug) && !post.seo?.noIndex);

  for (const post of indexablePosts) {
    const slug = normalizeSegment(post.slug);
    const lastModified = new Date(post.updatedAt ?? post.publishedAt ?? now.toISOString());

    for (const locale of locales) {
      addEntry({
        url: `${SITE_URL}${withLocalePath(locale, `/post/${slug}`)}`,
        lastModified,
        changeFrequency: resolvePostChangeFrequency(lastModified),
        priority: 0.7,
        alternates: {
          languages: buildLanguageAlternates(`/post/${slug}`),
        },
      });
    }
  }

  const validCategorySlugs = Array.from(
    new Set(
      categories
        .map((category) => normalizeSegment(category.slug))
        .filter((slug) => slug.length > 0),
    ),
  );

  for (const categorySlug of validCategorySlugs) {
    for (const locale of locales) {
      addEntry({
        url: `${SITE_URL}${withLocalePath(locale, `/category/${categorySlug}`)}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
        alternates: {
          languages: buildLanguageAlternates(`/category/${categorySlug}`),
        },
      });
    }
  }

  return Array.from(entries.values());
}
