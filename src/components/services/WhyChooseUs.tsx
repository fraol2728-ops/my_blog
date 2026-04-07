"use client";

import { motion } from "motion/react";
import { BadgeCheck, BarChart3, Headphones, ShieldCheck } from "lucide-react";

const reasons = [
  {
    title: "Certified Expertise",
    detail: "Senior engineers and certified technicians on every project.",
    icon: BadgeCheck,
  },
  {
    title: "Performance-First Design",
    detail: "Systems optimized for output, savings, and resilience.",
    icon: BarChart3,
  },
  {
    title: "Quality & Compliance",
    detail: "Strict QA, safety protocols, and regulatory alignment.",
    icon: ShieldCheck,
  },
  {
    title: "Dedicated Support",
    detail: "Rapid response with long-term service continuity.",
    icon: Headphones,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl rounded-xl bg-white p-10 shadow-lg sm:p-12">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Why Leading Organizations Choose Us
        </h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-8 grid gap-6 md:grid-cols-2"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="rounded-xl border border-slate-200 p-6"
            >
              <reason.icon className="h-7 w-7 text-[#16a34a]" />
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{reason.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{reason.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
