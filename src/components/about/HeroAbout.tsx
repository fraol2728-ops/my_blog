"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function HeroAbout() {
  return (
    <section className="relative isolate min-h-[65vh] overflow-hidden">
      <Image
        src="/hero.png"
        alt="Solar panels powering a modern business campus"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-slate-950/70" />

      <div className="relative mx-auto flex min-h-[65vh] max-w-6xl items-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl space-y-6"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-green-300">
            About Solvora Energy
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Building Smarter Energy Futures with Proven Solar Expertise
          </h1>
          <p className="text-base leading-relaxed text-slate-200 sm:text-lg">
            We design, install, and maintain high-performance renewable systems
            for businesses and communities that demand reliability, efficiency,
            and measurable sustainability results.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
