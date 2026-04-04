"use client";

import { Factory } from "lucide-react";
import { motion } from "motion/react";

export default function UniqueSection() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-6xl rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 text-white shadow-2xl shadow-emerald-900/30 md:p-12"
      >
        <div className="inline-flex rounded-2xl bg-white/15 p-3">
          <Factory className="size-7" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-4xl font-semibold tracking-tight">Local Manufacturing Advantage</h2>
        <p className="mt-4 max-w-4xl text-lg text-emerald-50">
          We are proud to be the only solar provider in the region with a local solar panel
          manufacturing plant — ensuring quality, affordability, and faster delivery.
        </p>
      </motion.div>
    </section>
  );
}
