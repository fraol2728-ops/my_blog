"use client";

import { Button } from "@/components/button";
import { motion } from "motion/react";

export default function CTASection() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 px-6 py-16 text-center text-white shadow-2xl shadow-slate-900/25 sm:px-12"
      >
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Start Saving with Solar Today
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-200 sm:text-lg">
          Get a custom plan with estimated savings, installation timeline, and a
          transparent quote from our specialists.
        </p>
        <div className="mt-9">
          <Button
            href="/contact"
            className="rounded-full bg-emerald-500 px-8 py-3.5 text-white shadow-lg shadow-emerald-500/30 transition data-[hover]:-translate-y-0.5 data-[hover]:bg-emerald-400"
          >
            Request a Free Quote
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
