"use client";

import { motion } from "motion/react";

const steps = ["Planning", "Installation", "Deployment", "Results"];

export default function ProjectTimeline() {
  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-slate-900">Project Timeline</h2>
      <div className="relative mt-8 pl-6">
        <div className="absolute left-[11px] top-1 h-[calc(100%-20px)] w-px bg-gradient-to-b from-green-300 to-emerald-600" />
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              className="relative"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
              <span className="absolute -left-6 top-1.5 size-3 rounded-full bg-green-600 ring-4 ring-green-100" />
              <p className="text-sm uppercase tracking-[0.15em] text-slate-400">Step {index + 1}</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{step}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
