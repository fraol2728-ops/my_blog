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
          Build a Sustainable Future with Solar Energy
        </h2>
        <div className="mt-9">
          <Button
            href="/contact"
 main
          >
            Request a Free Quote
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
