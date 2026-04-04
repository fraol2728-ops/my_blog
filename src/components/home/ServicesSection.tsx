import { BatteryCharging, Building2, House, Wrench } from "lucide-react";

const services = [
  {
    title: "Residential Solar",
    description:
      "Custom systems that lower utility bills and increase energy independence.",
    icon: House,
  },
  {
    title: "Commercial Solar",
    description:
      "Scalable, high-output solutions for offices, warehouses, and large facilities.",
    icon: Building2,
  },
  {
    title: "Energy Storage",
    description:
      "Battery backup systems to store excess power and protect against outages.",
    icon: BatteryCharging,
  },
  {
    title: "Maintenance & Monitoring",
    description:
      "Proactive support, system checks, and performance optimization year-round.",
    icon: Wrench,
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Solar Services Tailored to You
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Whether you&apos;re powering a home or scaling operations, we design systems
          built for performance and long-term savings.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <service.icon className="size-9 text-emerald-600" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
