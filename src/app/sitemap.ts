import type { MetadataRoute } from "next";
import { defineQuery } from "next-sanity";
import { clientFetch } from "@/sanity/lib/client";

const SITE_URL = "https://www.masterpremier.energy";

type SlugWithUpdatedAt = {
  slug: string;
  updatedAt: string;
};

const POST_SLUGS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)]{
  "slug": slug.current,
  "updatedAt": _updatedAt
}`);

const PROJECT_SLUGS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)]{
  "slug": slug.current,
  "updatedAt": _updatedAt
}`);

const FEASIBILITY_SLUGS_QUERY = defineQuery(`*[_type == "feasibilityPost" && defined(slug.current)]{
  "slug": slug.current,
  "updatedAt": _updatedAt
}`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/en`, lastModified: today, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/en/about`, lastModified: today, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/en/services`, lastModified: today, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/en/projects`, lastModified: today, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/en/news`, lastModified: today, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/en/faq`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/en/contact`, lastModified: today, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/en/kilimanjaro`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
  ];

  const [posts, projects, studies] = await Promise.all([
    clientFetch({ query: POST_SLUGS_QUERY }) as Promise<SlugWithUpdatedAt[]>,
    clientFetch({ query: PROJECT_SLUGS_QUERY, tags: ["project"] }) as Promise<SlugWithUpdatedAt[]>,
    clientFetch({ query: FEASIBILITY_SLUGS_QUERY, tags: ["feasibility-post"] }) as Promise<SlugWithUpdatedAt[]>,
  ]);

  const postPages: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${SITE_URL}/en/post/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const projectPages: MetadataRoute.Sitemap = (projects ?? []).map((project) => ({
    url: `${SITE_URL}/en/projects/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const feasibilityPages: MetadataRoute.Sitemap = (studies ?? []).map((study) => ({
    url: `${SITE_URL}/en/feasibility-study/${study.slug}`,
    lastModified: study.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...postPages, ...projectPages, ...feasibilityPages];
}
