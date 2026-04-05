import DetailedServices from "@/components/services/DetailedServices";
import ProcessSection from "@/components/services/ProcessSection";
import ServicesCTA from "@/components/services/ServicesCTA";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesOverview from "@/components/services/ServicesOverview";
import WhyChooseUs from "@/components/services/WhyChooseUs";

export default function ServicesPage() {
  return (
    <main className="bg-white text-slate-900">
      <ServicesHero />
      <ServicesOverview />
      <DetailedServices />
      <ProcessSection />
      <WhyChooseUs />
      <ServicesCTA />
    </main>
  );
}
