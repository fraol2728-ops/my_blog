"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function ServicesHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/hero.png"
        alt="Commercial solar farm at sunrise"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-slate-950/70" />

      <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl space-y-6"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-300">
            Enterprise Solar Services
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            End-to-End Energy Solutions Built to Scale
          </h1>
          <p className="max-w-2xl text-base text-slate-200 sm:text-lg">
            We design, deploy, and maintain high-performance solar systems for
            commercial, industrial, and utility clients with clear ROI and
            long-term reliability.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-[#16a34a] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-600"
            >
              Request Proposal
            </Link>
            <Link
              href="#services-overview"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
