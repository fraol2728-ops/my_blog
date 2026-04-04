import Container from "@/components/container";
import {
  BatteryCharging,
  ClipboardCheck,
  Sun,
  Wrench,
  Zap,
} from "lucide-react";

const services = [
  {
    title: "Solar Installation",
    description:
      "End-to-end system design and installation for residential and commercial properties.",
    icon: Sun,
  },
  {
    title: "Preventive Maintenance",
    description:
      "Routine checks and performance audits to keep your solar system operating at peak output.",
    icon: Wrench,
  },
  {
    title: "Energy Consultation",
    description:
      "Detailed analysis of your usage profile with recommendations to maximize long-term savings.",
    icon: ClipboardCheck,
  },
  {
    title: "Battery Storage",
    description:
      "Backup storage solutions that improve energy reliability and reduce grid dependency.",
    icon: BatteryCharging,
  },
  {
    title: "System Upgrades",
    description:
      "Expand or modernize existing systems with newer, more efficient solar technologies.",
    icon: Zap,
  },
];

export default function ServicesPage() {
  return (
    <div className="pb-24">
      <Container className="mt-16">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Services
        </p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight text-gray-950 sm:text-6xl">
          Comprehensive solar services for every stage of your energy journey.
        </h1>
        <p className="mt-6 max-w-3xl text-base text-gray-600 sm:text-lg">
          Whether you are planning your first solar project or optimizing an
          existing setup, our specialists provide practical solutions tailored
          to your property and budget.
        </p>

        <section className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <service.icon className="size-8 text-emerald-600" />
              <h2 className="mt-4 text-xl font-medium text-gray-950">
                {service.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{service.description}</p>
            </article>
          ))}
        </section>
      </Container>
    </div>
  );
}
