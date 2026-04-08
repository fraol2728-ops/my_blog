import CTASection from "@/components/about/CTASection";
import CompanyOverview from "@/components/about/CompanyOverview";
import HeroAbout from "@/components/about/HeroAbout";
import ProjectsSection from "@/components/about/ProjectsSection";
import SustainabilitySection from "@/components/about/SustainabilitySection";
import TeamSection from "@/components/about/TeamSection";
import ValuesGrid from "@/components/about/ValuesGrid";
import VisionMission from "@/components/about/VisionMission";
import { isValidLocale, type AppLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  return pageMetadata({
    locale: locale as AppLocale,
    path: "/about",
    title: "About Xyberosec Cybersecurity Team and Mission",
    description:
      "Learn how Xyberosec secures modern organizations through expert-led threat defense, practical security architecture, and measurable cyber risk reduction programs.",
  });
}

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900">
      <HeroAbout />
      <CompanyOverview />
      <VisionMission />
      <ValuesGrid />
      <TeamSection />
      <ProjectsSection />
      <SustainabilitySection />
      <CTASection />
    </main>
  );
}
