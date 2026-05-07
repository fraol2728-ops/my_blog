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
import { buildBreadcrumbSchema } from "@/lib/seo";
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

  return {
    title: "Master Premier Green Energy | #1 Solar Company in South Sudan",
    description:
      "Master Premier Green Energy Co. Ltd (MPGE) is South Sudan's leading solar energy company. Expert solar installation, off-grid systems, energy audits and clean energy advisory in Juba and across South Sudan. Get a free quote today.",
    keywords:
      "Master Green Energy, Master Premier Green Energy, Master Green, MPGE, Master Green Energy Solar, solar energy South Sudan, solar company South Sudan, solar installation Juba, off-grid solar South Sudan, renewable energy South Sudan, solar panel installation, energy audit South Sudan, feasibility study solar",
    alternates: {
      canonical: "https://www.masterpremier.energy/en",
    },
    openGraph: {
      title: "Master Premier Green Energy | #1 Solar Company in South Sudan",
      description:
        "Master Premier Green Energy Co. Ltd (MPGE) is South Sudan's leading solar energy company. Expert solar installation, off-grid systems, energy audits and clean energy advisory in Juba and across South Sudan. Get a free quote today.",
      url: "https://www.masterpremier.energy/en",
      siteName: "Master Premier Green Energy Co. Ltd",
      type: "website",
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const isArabic = locale === "ar";


  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {"@type":"Organization","@id":"https://www.masterpremier.energy/#organization","name":"Master Premier Green Energy Co. Ltd","alternateName":["Master Green Energy","MPGE","Master Green","Master Premier"],"url":"https://www.masterpremier.energy/en","logo":{"@type":"ImageObject","url":"https://www.masterpremier.energy/logo.png"}},
      {"@type":"WebSite","@id":"https://www.masterpremier.energy/#website","url":"https://www.masterpremier.energy/en","name":"Master Premier Green Energy Co. Ltd","publisher":{"@id":"https://www.masterpremier.energy/#organization"}},
      {"@type":"LocalBusiness","@id":"https://www.masterpremier.energy/#localbusiness","name":"Master Premier Green Energy Co. Ltd","telephone":"+211982004848","email":"support@masterpremier.energy","url":"https://www.masterpremier.energy/en"}
    ]
  };

  const breadcrumbSchema = buildBreadcrumbSchema({
    locale: locale as AppLocale,
    items: [{ name: "Home", path: "/" }],
  });

  let latestPosts: Post[] = [];
  let featuredProjects: Project[] = [];
  let latestProjects: Project[] = [];
  let latestFeasibilityPosts: FeasibilityPost[] = [];

  try {
    [latestPosts, featuredProjects, latestProjects, latestFeasibilityPosts] =
      await Promise.all([
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

  const featuredProject =
    featuredProjects?.[0] ?? latestProjects?.[0] ?? null;

  return (
    <div className="bg-white text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <HeroSection featuredProject={featuredProject} />

      <main>
        <PartnersSection locale={locale} />
        <AboutSection />
        <BlogPreview posts={latestPosts} />

        <FeasibilityInsightsSection
          kicker={isArabic ? "دراسات الجدوى" : "Feasibility Studies"}
          title={
            isArabic
              ? "أحدث 3 دراسات جدوى لمشاريع الطاقة الشمسية"
              : "Latest 3 feasibility studies from our engineering team"
          }
          description={
            isArabic
              ? "اطّلع على تقييمات فنية ومالية دقيقة مبنية على البيانات قبل البدء في مشروعك الشمسي القادم."
              : "Review data-backed technical and financial assessments before starting your next solar project."
          }
          posts={latestFeasibilityPosts.slice(0, 3)}
          locale={locale}
        />

        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <WhySolarSection />
      </main>
    </div>
  );
}
