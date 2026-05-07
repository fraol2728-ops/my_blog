import CTASection from "@/components/about/CTASection";
import Breadcrumb from "@/components/Breadcrumb";
import CompanyOverview from "@/components/about/CompanyOverview";
import HeroAbout from "@/components/about/HeroAbout";
import LegalDocumentsSection from "@/components/about/LegalDocumentsSection";
import ProjectsSection from "@/components/about/ProjectsSection";
import SustainabilitySection from "@/components/about/SustainabilitySection";
import TeamSection from "@/components/about/TeamSection";
import ValuesGrid from "@/components/about/ValuesGrid";
import VisionMission from "@/components/about/VisionMission";
import { isValidLocale, type AppLocale } from "@/i18n/config";
import { buildBreadcrumbSchema } from "@/lib/seo";
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
    title: "About Master Premier Green Energy | Solar Experts in South Sudan",
    description:
      "Learn about Master Premier Green Energy Co. Ltd — South Sudan's trusted renewable energy company. Our team delivers solar installation, energy audits, and clean energy advisory services across Juba and South Sudan.",
    keywords:
      "Master Green Energy, Master Premier Green Energy, Master Green, MPGE, Master Green Energy Solar, solar energy South Sudan, solar company South Sudan, solar installation Juba, off-grid solar South Sudan, renewable energy South Sudan",
    alternates: {
      canonical: "https://www.masterpremier.energy/en/about",
    },
    openGraph: {
      title: "About Master Premier Green Energy | Solar Experts in South Sudan",
      description:
        "Learn about Master Premier Green Energy Co. Ltd — South Sudan's trusted renewable energy company. Our team delivers solar installation, energy audits, and clean energy advisory services across Juba and South Sudan.",
      url: "https://www.masterpremier.energy/en/about",
      siteName: "Master Premier Green Energy Co. Ltd",
      type: "website",
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema({
    locale: locale as AppLocale,
    items: [
      { name: "Home", path: "/" },
      { name: "About Master Premier Green Energy", path: "/about" },
    ],
  });

  return (
    <main className="bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/en" },
          { label: "About Master Premier Green Energy", href: "/en/about" },
        ]}
      />
      <HeroAbout />
      <CompanyOverview />
      <VisionMission />
      <ValuesGrid />
      <TeamSection />
      <ProjectsSection />
      <SustainabilitySection />
      <LegalDocumentsSection />
      <CTASection />
    </main>
  );
}
