import CTASection from "@/components/services/CTASection";
import IndustriesSection from "@/components/services/IndustriesSection";
import ProcessSection from "@/components/services/ProcessSection";
import ProjectsSection from "@/components/services/ProjectsSection";
import ServiceBlock, { type ServiceDetail } from "@/components/services/ServiceBlock";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesOverview, {
  type ServiceOverviewItem,
} from "@/components/services/ServicesOverview";
import WhyChooseUs from "@/components/services/WhyChooseUs";

const services: ServiceDetail[] = [
  {
    id: "solar-installation",
    title: "Solar System Installation",
    description:
      "From feasibility to commissioning, we deliver high-performance deployments with enterprise-grade project control and safety standards.",
    bullets: [
      "Custom engineering for commercial and industrial facilities",
      "Certified installers with strict QA checklists",
      "Turnkey commissioning and performance validation",
    ],
    image: "/service1.jpg",
    imageAlt: "Technician installing a rooftop solar array",
  },
  {
    id: "equipment-supply",
    title: "Solar Equipment Supply",
    description:
      "We source premium components that optimize lifetime performance while reducing procurement and compatibility risk across your system.",
    bullets: [
      "Tier-1 modules, inverters, and storage systems",
      "Supply chain visibility with predictable lead times",
      "Component matching for maximum energy yield",
    ],
    image: "/service2.jpg",
    imageAlt: "Stacked solar modules prepared for project delivery",
  },
  {
    id: "panel-manufacturing",
    title: "Solar Panel Manufacturing",
    description:
      "Our manufacturing network combines scalable output with strict quality controls to support projects of any size.",
    bullets: [
      "Rigorous module testing and quality assurance",
      "Scalable production for growing project pipelines",
      "Reliable output with consistent performance metrics",
    ],
    image: "/service3.jpg",
    imageAlt: "Automated solar panel manufacturing line",
  },
  {
    id: "maintenance-support",
    title: "Maintenance & Lifecycle Support",
    description:
      "Keep systems operating at peak performance through proactive service programs, intelligent monitoring, and rapid issue response.",
    bullets: [
      "Preventive inspections and health diagnostics",
      "Rapid-response field maintenance and repairs",
      "Continuous optimization and output reporting",
    ],
    image: "/service4.png",
    imageAlt: "Engineer performing maintenance on solar infrastructure",
  },
];

const serviceOverviewItems: ServiceOverviewItem[] = [
  {
    id: "solar-installation",
    title: "Installation",
    summary: "Turnkey deployment from design to commissioning.",
    iconName: "installation",
  },
  {
    id: "equipment-supply",
    title: "Equipment Supply",
    summary: "Premium components with transparent procurement.",
    iconName: "supply",
  },
  {
    id: "panel-manufacturing",
    title: "Manufacturing",
    summary: "Scalable, QA-driven module production.",
    iconName: "manufacturing",
  },
  {
    id: "maintenance-support",
    title: "Maintenance",
    summary: "Proactive support to protect long-term ROI.",
    iconName: "maintenance",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-white text-slate-900">
      <ServicesHero />
      <ServicesOverview services={serviceOverviewItems} />

      <section className="px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl space-y-8">
          {services.map((service, index) => (
            <ServiceBlock
              key={service.id}
              service={service}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </section>

      <ProcessSection />
      <IndustriesSection />
      <ProjectsSection />
      <WhyChooseUs />
      <CTASection />
    </main>
  );
}
