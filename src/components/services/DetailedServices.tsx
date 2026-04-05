import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const detailedServices = [
  {
    title: "Solar System Installation",
    description:
      "We engineer and deploy high-efficiency solar systems with precision planning, safety-first execution, and clear project governance from start to finish.",
    bullets: [
      "Custom engineering for residential and commercial properties",
      "Certified installation teams with strict quality controls",
      "Commissioning, testing, and performance handover",
    ],
    image: "/service1.jpg",
    alt: "Technicians installing premium solar modules",
  },
  {
    title: "Solar Equipment Supply",
    description:
      "Our procurement team sources and delivers premium-grade components that maximize reliability, output, and long-term return on your solar investment.",
    bullets: [
      "Tier-1 solar panels, inverters, and storage systems",
      "Transparent supply chain and lead-time management",
      "Component matching for optimal system compatibility",
    ],
    image: "/service2.jpg",
    alt: "Solar equipment inventory prepared for deployment",
  },
  {
    title: "Solar Panel Manufacturing",
    description:
      "Through advanced manufacturing partnerships and QA-driven production workflows, we provide scalable module solutions built for consistent performance.",
    bullets: [
      "Rigorous quality assurance and performance validation",
      "Scalable output for utility, commercial, and residential needs",
      "Reduced procurement risk through controlled production",
    ],
    image: "/service3.jpg",
    alt: "Solar panel production line in a manufacturing facility",
  },
  {
    title: "Maintenance & Support",
    description:
      "Protect system uptime and output with proactive maintenance programs, responsive troubleshooting, and expert support tailored to your operating profile.",
    bullets: [
      "Scheduled preventive inspections and diagnostics",
      "Rapid corrective maintenance and technical interventions",
      "Long-term performance tracking and optimization guidance",
    ],
    image: "/service4.png",
    alt: "Engineer performing maintenance checks on solar infrastructure",
  },
];

export default function DetailedServices() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-24">
        {detailedServices.map((service, index) => {
          const imageFirst = index % 2 === 0;

          return (
            <article
              key={service.title}
              className="grid items-center gap-12 md:grid-cols-2"
            >
              <div className={imageFirst ? "order-1" : "order-1 md:order-2"}>
                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    width={1200}
                    height={900}
                    className="h-[360px] w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className={imageFirst ? "order-2" : "order-2 md:order-1"}>
                <h3 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">
                  {service.description}
                </p>

                <ul className="mt-7 space-y-3">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#f2922a]"
                        aria-hidden="true"
                      />
                      <span className="text-base text-slate-700">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
