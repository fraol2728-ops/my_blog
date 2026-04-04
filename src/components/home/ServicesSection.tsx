"use client";

import { ClipboardCheck, ClipboardPenLine, LineChart, Wrench } from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    title: "Energy Audit & Feasibility Study",
    description:
      "Technical site assessment and feasibility review to define the right solar strategy for your location.",
    icon: ClipboardCheck,
  },
  {
    title: "Energy Management Planning",
    description:
      "Data-driven planning to optimize power usage, improve reliability, and lower long-term operating costs.",
    icon: LineChart,
  },
  {
    title: "System Design & Commercial Proposal",
    description:
      "Engineered solar system design with a clear commercial proposal tailored to your energy needs.",
    icon: ClipboardPenLine,
  },
  {
    title: "Installation & Maintenance",
    description:
      "Professional installation plus ongoing maintenance support to keep your system running at peak performance.",
    icon: Wrench,
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Services</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
          End-to-end solar services
        </h2>

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
              <div className="inline-flex rounded-2xl bg-emerald-50 p-3 transition group-hover:bg-emerald-100">
                <service.icon className="size-6 text-emerald-600" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
