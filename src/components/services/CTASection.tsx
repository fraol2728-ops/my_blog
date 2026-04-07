"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-7xl rounded-xl bg-[#16a34a] px-8 py-16 text-center text-white shadow-lg"
      >
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Ready to Turn Energy Costs Into Competitive Advantage?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-green-50 sm:text-lg">
          Partner with our team for a strategic solar roadmap tailored to your
          operations, budget, and sustainability targets.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#16a34a] transition hover:bg-green-50"
          >
            Get Free Consultation
          </Link>
          <Link
            href="/about"
            className="inline-flex rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Learn About Our Team
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
