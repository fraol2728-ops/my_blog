export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Breadcrumb from "@/components/Breadcrumb";
import ProjectsPageClient from "@/components/projects/ProjectsPageClient";
import { isValidLocale, type AppLocale } from "@/i18n/config";
import { buildBreadcrumbSchema, SITE_URL } from "@/lib/seo";
import { getProjects } from "@/sanity/queries";
import { Project } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  return {
    title: "Solar Projects in South Sudan | Master Premier Green Energy",
    description:
      "Explore completed solar energy projects by Master Premier Green Energy across South Sudan. From off-grid installations to large-scale commercial solar systems in Juba and beyond.",
    keywords:
      "Master Green Energy, Master Premier Green Energy, Master Green, MPGE, Master Green Energy Solar, solar energy South Sudan, solar company South Sudan, solar installation Juba, off-grid solar South Sudan, renewable energy South Sudan",
    alternates: {
      canonical: "https://www.masterpremier.energy/en/projects",
    },
    openGraph: {
      title: "Solar Projects in South Sudan | Master Premier Green Energy",
      description:
        "Explore completed solar energy projects by Master Premier Green Energy across South Sudan. From off-grid installations to large-scale commercial solar systems in Juba and beyond.",
      url: "https://www.masterpremier.energy/en/projects",
      siteName: "Master Premier Green Energy Co. Ltd",
      type: "website",
    },
  };
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
      { name: "Solar Projects South Sudan", path: "/projects" },
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
      <Breadcrumb
        items={[
          { label: "Home", href: "/en" },
          { label: "Solar Projects South Sudan", href: "/en/projects" },
        ]}
      />
      <ProjectsPageClient projects={projects} locale={locale} />
    </>
  );
}
