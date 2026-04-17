export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectsPageClient from "@/components/projects/ProjectsPageClient";
import { isValidLocale, type AppLocale } from "@/i18n/config";
import { buildBreadcrumbSchema, pageMetadata, SITE_URL } from "@/lib/seo";
import { getProjects } from "@/sanity/queries";
import { Project } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  return pageMetadata({
    locale: locale as AppLocale,
    path: "/projects",
    title: "Our Projects & Impact | Master Premier Green Energy",
    description:
      "Explore residential, commercial, and government solar case studies with proven energy output and measurable savings.",
    keywords: ["solar projects", "solar case studies", "commercial solar", "residential solar"],
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const projects: Project[] = ((await getProjects()) ?? []) as Project[];

  const breadcrumbSchema = buildBreadcrumbSchema({
    locale: locale as AppLocale,
    items: [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
    ],
  });

  const projectCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Solar Projects and Case Studies",
    url: `${SITE_URL}/${locale}/projects`,
    inLanguage: locale,
    hasPart: projects.map((project, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      name: project.title,
      url: `${SITE_URL}/${locale}/projects/${project.slug}`,
      datePublished: project.date,
      locationCreated: project.location,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectCollectionSchema) }}
      />
      <ProjectsPageClient projects={projects} locale={locale} />
    </>
  );
}
