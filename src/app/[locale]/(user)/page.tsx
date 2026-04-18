import AboutSection from "@/components/home/AboutSection";
import BlogPreview from "@/components/home/BlogPreview";
import FeasibilityInsightsSection from "@/components/feasibility/FeasibilityInsightsSection";
import HeroSection from "@/components/home/HeroSection";
import PartnersSection from "@/components/home/PartnersSection";
import ProcessSection from "@/components/home/ProcessSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhySolarSection from "@/components/home/WhySolarSection";
import { isValidLocale, type AppLocale } from "@/i18n/config";
import { buildBreadcrumbSchema, getLocalizedHomeMeta, pageMetadata } from "@/lib/seo";
import {
  getAllPosts,
  getFeaturedProjects,
  getFeasibilityPosts,
  getProjects,
} from "@/sanity/queries";
import type { FeasibilityPost, Post, Project } from "@/types";
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
  const isAmharic = locale === "am";

  const breadcrumbSchema = buildBreadcrumbSchema({
    locale: locale as AppLocale,
    items: [{ name: "Home", path: "/" }],
  });

  let latestPosts: Post[] = [];
  let featuredProjects: Project[] = [];
  let latestProjects: Project[] = [];
  let latestFeasibilityPosts: FeasibilityPost[] = [];

  try {
    [latestPosts, featuredProjects, latestProjects, latestFeasibilityPosts] = await Promise.all([
      getAllPosts(3),
      getFeaturedProjects(1),
      getProjects(),
      getFeasibilityPosts(),
    ]);
  } catch {
    latestPosts = [];
    featuredProjects = [];
    latestProjects = [];
    latestFeasibilityPosts = [];
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
        <PartnersSection locale={locale} />
        <AboutSection />
        <BlogPreview posts={latestPosts} />
        <FeasibilityInsightsSection
          kicker={isAmharic ? "የፕሮጀክት ብቃት ጥናቶች" : "Feasibility Studies"}
          title={
            isAmharic
              ? "የቅርብ ጊዜ 3 የፀሐይ ፕሮጀክት የብቃት ጥናቶች"
              : "Latest 3 feasibility studies from our engineering team"
          }
          description={
            isAmharic
              ? "የቴክኒክ እና ፋይናንስ ግምገማዎችን በፍጥነት ይመልከቱ እና ነፃ ጥናት ይጠይቁ።"
              : "Review data-backed technical and financial assessments before starting your next solar project."
          }
          posts={latestFeasibilityPosts.slice(0, 3)}
        />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <WhySolarSection />
      </main>
    </div>
  );
}
