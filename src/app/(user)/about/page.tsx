import AboutHero from "@/components/about/AboutHero";
import CTASection from "@/components/about/CTASection";
import CompanyOverview from "@/components/about/CompanyOverview";
import ExpertiseSection from "@/components/about/ExpertiseSection";
import ImpactSection from "@/components/about/ImpactSection";
import MissionVision from "@/components/about/MissionVision";
import ValuesSection from "@/components/about/ValuesSection";

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900">
      <AboutHero />
      <CompanyOverview />
      <MissionVision />
      <ValuesSection />
      <ImpactSection />
      <ExpertiseSection />
      <CTASection />
    </main>
  );
}
