import type { Post } from "@/types";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllPosts, getCategories } from "@/sanity/queries";
import type { PostCategory } from "@/types";

const locales = ["en", "am"] as const;
const staticPaths = ["", "/about", "/services", "/blog", "/news", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? "daily" : "weekly",
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${path}`,
          am: `${SITE_URL}/am${path}`,
        },
      },
    })),
  );

  let posts: Post[] = [];
  let categories: PostCategory[] = [];

  try {
    posts = (await getAllPosts(500)) ?? [];
  } catch {
    posts = [];
  }

  try {
    categories = (await getCategories()) ?? [];
  } catch {
    categories = [];
  }

  const blogEntries: MetadataRoute.Sitemap = posts.flatMap((post) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/post/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/post/${post.slug}`,
          am: `${SITE_URL}/am/post/${post.slug}`,
        },
      },
    })),
  );

  const categoryEntries: MetadataRoute.Sitemap = categories.flatMap((category) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/category/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/category/${category.slug}`,
          am: `${SITE_URL}/am/category/${category.slug}`,
        },
      },
    })),
  );

  return [...staticEntries, ...blogEntries, ...categoryEntries];
}
