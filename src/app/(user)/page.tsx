import AboutSection from "@/components/home/AboutSection";
import CTASection from "@/components/home/CTASection";
import HeroSection from "@/components/home/HeroSection";
import ProcessSection from "@/components/home/ProcessSection";
import ServicesSection from "@/components/home/ServicesSection";
import UniqueSection from "@/components/home/UniqueSection";
import WhySolarSection from "@/components/home/WhySolarSection";

export default function Home() {
  return (
    <div className="bg-white text-slate-900">
      <HeroSection />

      <main className="px-6">
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <WhySolarSection />
        <UniqueSection />
        <CTASection />
      </main>
    </div>
  );
}
