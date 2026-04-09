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
    title: "About Master Premier Green Energy Co. Ltd",
    description:
      "Learn how Master Premier Green Energy Co. Ltd delivers renewable energy engineering, advisory services, and reliable solar access solutions across South Sudan.",
    keywords: [
      "about master premier green energy",
      "renewable energy experts South Sudan",
      "solar mission and vision",
      "clean energy leadership in Juba",
    ],
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
