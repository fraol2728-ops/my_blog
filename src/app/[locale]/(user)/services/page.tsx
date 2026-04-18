import CTASection from "@/components/services/CTASection";
import FeasibilityInsightsSection from "@/components/feasibility/FeasibilityInsightsSection";
import IndustriesSection from "@/components/services/IndustriesSection";
import ProcessSection from "@/components/services/ProcessSection";
import ProjectsSection from "@/components/services/ProjectsSection";
import ServiceBlock, { type ServiceDetail } from "@/components/services/ServiceBlock";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesOverview, {
  type ServiceOverviewItem,
} from "@/components/services/ServicesOverview";
import WhyChooseUs from "@/components/services/WhyChooseUs";
import { isValidLocale, type AppLocale } from "@/i18n/config";
import { buildBreadcrumbSchema, pageMetadata } from "@/lib/seo";
import { getFeasibilityPosts } from "@/sanity/queries";
import type { FeasibilityPost } from "@/types";
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
    path: "/services",
    title: "Solar Engineering, Advisory, and Installation Services",
    description:
      "Explore Master Premier Green Energy services including energy audits, feasibility studies, system design, installation, and after-service support.",
  });
}

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

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const isAmharic = locale === "am";
  const breadcrumbSchema = buildBreadcrumbSchema({
    locale: locale as AppLocale,
    items: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ],
  });

  const localizedServices = isAmharic
    ? services.map((service) => ({
        ...service,
        title:
          {
            "Solar System Installation": "የፀሐይ ስርዓት ተከላ",
            "Solar Equipment Supply": "የፀሐይ መሳሪያ አቅርቦት",
            "Solar Panel Manufacturing": "የፀሐይ ፓነል ማምረት",
            "Maintenance & Lifecycle Support": "ጥገና እና የህይወት ዑደት ድጋፍ",
          }[service.title] ?? service.title,
      }))
    : services;

  const localizedOverviewItems = isAmharic
    ? serviceOverviewItems.map((item) => ({
        ...item,
        title:
          {
            Installation: "ተከላ",
            "Equipment Supply": "መሳሪያ አቅርቦት",
            Manufacturing: "ማምረት",
            Maintenance: "ጥገና",
          }[item.title] ?? item.title,
        summary:
          {
            "Turnkey deployment from design to commissioning.": "ከዲዛይን እስከ ኮሚሽን ድረስ ሙሉ አፈጻጸም።",
            "Premium components with transparent procurement.": "ጥራት ያላቸው ክፍሎች በግልጽ ግዥ ሂደት።",
            "Scalable, QA-driven module production.": "የጥራት ቁጥጥር ያለው ሊስፋፋ የሚችል ምርት።",
            "Proactive support to protect long-term ROI.": "የረጅም ጊዜ ተመላሽን የሚጠብቅ ንቁ ድጋፍ።",
          }[item.summary] ?? item.summary,
      }))
    : serviceOverviewItems;

  let feasibilityPosts: FeasibilityPost[] = [];
  try {
    feasibilityPosts = await getFeasibilityPosts();
  } catch {
    feasibilityPosts = [];
  }

  return (
    <main className="bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesHero />
      <ServicesOverview services={localizedOverviewItems} />

      <section className="px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl space-y-8">
          {localizedServices.map((service, index) => (
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
      <FeasibilityInsightsSection
        kicker={isAmharic ? "ተያያዥ የብቃት ግንዛቤዎች" : "Related Feasibility Insights"}
        title={isAmharic ? "ከአገልግሎቶቻችን ጋር ተያያዥ ጥናቶች" : "Feasibility insights related to your service goals"}
        description={
          isAmharic
            ? "የእርስዎን ኢንቨስትመንት ውሳኔ ለማጠናከር በእኛ የቅርብ ጊዜ ጥናቶች ይጀምሩ።"
            : "Use recent studies to compare scope, ROI expectations, and implementation risks across project types."
        }
        posts={feasibilityPosts.slice(0, 3)}
      />
      <ProjectsSection />
      <WhyChooseUs />
      <CTASection />
    </main>
  );
}
