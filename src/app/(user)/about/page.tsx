import CTASection from "@/components/about/CTASection";
import CompanyOverview from "@/components/about/CompanyOverview";
import HeroAbout from "@/components/about/HeroAbout";
import ProjectsSection from "@/components/about/ProjectsSection";
import SustainabilitySection from "@/components/about/SustainabilitySection";
import TeamSection from "@/components/about/TeamSection";
import ValuesGrid from "@/components/about/ValuesGrid";
import VisionMission from "@/components/about/VisionMission";

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
