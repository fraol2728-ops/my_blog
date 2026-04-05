"use client";

import { ClipboardList, Headset, PenTool, Wrench } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    title: "Audit & Consultation",
    description: "We assess your energy demand, site conditions, and project requirements.",
    icon: ClipboardList,
  },
  {
    title: "System Design",
    description: "Our engineers create a tailored solar design for efficient, reliable output.",
    icon: PenTool,
  },
  {
    title: "Installation",
    description: "Our technical team installs and commissions your system to high standards.",
    icon: Wrench,
  },
  {
    title: "Monitoring & Support",
    description: "We provide continuous monitoring and lifecycle support for long-term performance.",
    icon: Headset,
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-semibold tracking-tight text-slate-900">How It Works</h2>

        <div className="relative mt-12">
          <div className="absolute left-1/2 top-8 hidden h-px w-[78%] -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-300 to-transparent lg:block" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="inline-flex rounded-2xl bg-emerald-50 p-3">
                  <step.icon className="size-6 text-[#458137]" aria-hidden="true" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-black">
                  Step {index + 1}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
