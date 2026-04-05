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
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-16 text-center text-white shadow-2xl shadow-slate-900/25 sm:px-12"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(242,146,42,0.30),transparent_44%)]" />
        <h2 className="relative text-4xl font-semibold tracking-tight sm:text-5xl">
          Stop Renting Power from the Grid. Own It.
        </h2>
        <p className="relative mx-auto mt-5 max-w-2xl text-slate-200">
          Talk to our experts today and get a customized solar plan designed to lower your costs in
          year one.
        </p>
        <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button
            href="/contact"
            className="rounded-full bg-[#f2922A] px-8 py-3.5 text-white shadow-lg shadow-[#f2922A]/30 hover:bg-[#dd8223]"
          >
            Claim Free Consultation
          </Button>
          <Button
            href="/services"
            className="rounded-full bg-white/10 px-8 py-3.5 text-white ring-1 ring-white/30 hover:bg-white/20"
          >
            Compare Packages
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
