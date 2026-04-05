"use client";

import { SunMedium } from "lucide-react";
import { motion } from "motion/react";

const benefits = [
  "Reduce electricity bills",
  "Protect against rising energy costs",
  "Increase property value",
  "Unlimited renewable energy",
  "Environmentally friendly",
];

export default function WhySolarSection() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12"
      >
        <h2 className="text-4xl font-semibold tracking-tight text-slate-900">Why Solar</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
 main
              <span className="text-slate-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
