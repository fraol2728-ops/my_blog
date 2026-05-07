import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllPosts, getFeasibilityPosts, getProjects } from "@/sanity/queries";
import type { Post, Project, FeasibilityPost } from "@/types";

const staticPages = ["/en", "/en/about", "/en/services", "/en/projects", "/en/news", "/en/contact", "/en/kilimanjaro"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString();
  const entries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: path === "/en" ? 1 : ["/en/about", "/en/services"].includes(path) ? 0.9 : 0.8,
  }));

  try {
    const [posts, projects, studies]: [Post[], Project[], FeasibilityPost[]] = await Promise.all([getAllPosts(1000), getProjects(), getFeasibilityPosts()]);

    posts?.forEach((post) => {
      if (post?.slug) {
        entries.push({
          url: `${SITE_URL}/en/post/${post.slug}`,
          lastModified: post.updatedAt ?? today,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    });

    projects?.forEach((project) => {
      if (project?.slug) {
        entries.push({
          url: `${SITE_URL}/en/projects/${project.slug}`,
          lastModified: today,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    });

    studies?.forEach((study) => {
      if (study?.slug) {
        entries.push({
          url: `${SITE_URL}/en/feasibility-study/${study.slug}`,
          lastModified: today,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    });
  } catch {
    // do nothing
  }

  return entries;
}
