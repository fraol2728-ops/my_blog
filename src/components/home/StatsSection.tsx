"use client";

import { motion } from "motion/react";

const stats = [
  { value: "1000+", label: "Installations" },
  { value: "10+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction" },
  { value: "24/7", label: "Support" },
];

export default function StatsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl border-t border-slate-200 pt-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              className="text-center"
            >
              <p className="text-5xl font-semibold tracking-tight text-slate-900">
                {stat.value}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.15em] text-slate-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
