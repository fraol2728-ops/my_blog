"use client";

import { motion } from "motion/react";

const stats = [
  { value: "12+", label: "Years delivering solar projects" },
  { value: "2,500+", label: "Installations completed" },
  { value: "48 GWh", label: "Clean energy generated annually" },
  { value: "30%", label: "Average client bill reduction" },
];

const partners = ["IEC Certified", "ISO 9001", "NREA Member", "Tier-1 Module Partners"];

export default function TrustSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-sm"
        >
          <p className="text-sm uppercase tracking-[0.18em] text-[#f2922A]">Trusted Performance</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Proven by Real Results, Backed by Recognized Standards
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/80"
              >
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-3xl border border-slate-200/80 bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white shadow-2xl shadow-slate-900/20"
        >
          <h3 className="text-xl font-semibold">Partners & Certifications</h3>
          <p className="mt-2 text-slate-300">
            We collaborate with trusted technology providers and follow internationally recognized
            quality standards.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner) => (
              <div
                key={partner}
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-center text-sm font-medium"
              >
                {partner}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
