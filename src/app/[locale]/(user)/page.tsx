import AboutSection from "@/components/home/AboutSection";
import BlogPreview from "@/components/home/BlogPreview";
import HeroSection from "@/components/home/HeroSection";
import ProcessSection from "@/components/home/ProcessSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhySolarSection from "@/components/home/WhySolarSection";
import { isValidLocale, type AppLocale } from "@/i18n/config";
import { buildBreadcrumbSchema, getLocalizedHomeMeta, pageMetadata } from "@/lib/seo";
import { getAllPosts, getFeaturedProjects, getProjects } from "@/sanity/queries";
import type { Post, Project } from "@/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const localized = getLocalizedHomeMeta(locale as AppLocale);

  return pageMetadata({
    locale: locale as AppLocale,
    path: "/",
    title: localized.title,
    description: localized.description,
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema({
    locale: locale as AppLocale,
    items: [{ name: "Home", path: "/" }],
  });

  let latestPosts: Post[] = [];
  let featuredProjects: Project[] = [];
  let latestProjects: Project[] = [];

  try {
    [latestPosts, featuredProjects, latestProjects] = await Promise.all([
      getAllPosts(3),
      getFeaturedProjects(1),
      getProjects(),
    ]);
  } catch {
    latestPosts = [];
    featuredProjects = [];
    latestProjects = [];
  }

  const featuredProject = featuredProjects?.[0] ?? latestProjects?.[0] ?? null;

  return (
    <div className="bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HeroSection featuredProject={featuredProject} />

      <main>
        <AboutSection />
        <BlogPreview posts={latestPosts} />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <WhySolarSection />
      </main>
    </div>
  );
}
