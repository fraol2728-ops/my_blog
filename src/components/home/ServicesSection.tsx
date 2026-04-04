"use client";

import { BatteryCharging, Building2, House, Wrench } from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    title: "Residential Solar",
    description:
      "Custom systems engineered for lower utility bills, long-term value, and energy independence.",
    icon: House,
  },
  {
    title: "Commercial Solar",
    description:
      "High-output arrays designed for businesses focused on operating efficiency and sustainability goals.",
    icon: Building2,
  },
  {
    title: "Battery Storage",
    description:
      "Store excess production and keep essential loads running through outages and peak-rate periods.",
    icon: BatteryCharging,
  },
  {
    title: "Maintenance & Monitoring",
    description:
      "24/7 diagnostics, preventive care, and performance optimization from our expert service team.",
    icon: Wrench,
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          Services
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
          End-to-end solar solutions.
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          We combine strategy, engineering, and white-glove execution to deliver
          systems that perform from day one.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <div className="inline-flex rounded-xl bg-emerald-50 p-3 transition group-hover:bg-emerald-100">
                <service.icon className="size-6 text-emerald-600" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
