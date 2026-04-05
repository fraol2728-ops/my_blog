"use client";

import { Button } from "@/components/button";
import { SunMedium } from "lucide-react";
import { motion } from "motion/react";

const benefits = [
  "Reduce electricity bills",
  "Protect against rising energy costs",
  "Increase property value",
  "Reliable backup with battery integration",
  "Lower emissions and strengthen ESG impact",
];

export default function WhySolarSection() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mx-auto max-w-6xl rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-sm md:p-12"
      >
        <h2 className="text-4xl font-semibold tracking-tight text-slate-900">Why Solar</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
              <SunMedium className="mt-0.5 size-5 shrink-0 text-[#f2922A]" aria-hidden="true" />
              <span className="text-slate-700">{benefit}</span>
            </li>
          ))}
        </ul>
        <Button
          href="/contact"
          className="mt-8 rounded-full bg-slate-900 px-7 py-3 text-white hover:bg-slate-800"
        >
          Calculate My Savings
        </Button>
      </motion.div>
    </section>
  );
}
