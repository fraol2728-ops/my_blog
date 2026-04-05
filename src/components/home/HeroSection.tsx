"use client";

import { Button } from "@/components/button";
import { motion } from "motion/react";
import Image from "next/image";

const TRUST_INDICATORS = [
  "25+ years combined engineering experience",
  "Bankable components and certified workmanship",
  "End-to-end delivery from design to maintenance",
];

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <motion.div
        initial={{ scale: 1.06, opacity: 0.82 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/hero.png"
          alt="Solar installation in South Sudan"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/65 to-[#f2922A]/25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,146,42,0.26),transparent_48%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-10"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffd6aa]">Premium Solar Systems</p>
          <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Turn Sunlight into Long-Term Savings and Energy Security
          </h1>

          <p className="mt-6 text-base leading-relaxed text-slate-100 sm:text-lg lg:text-xl">
            Lower monthly bills, reduce outages, and protect your business with expertly engineered
            solar and storage built for African climates.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              href="/contact"
              className="rounded-full bg-[#f2922A] px-7 py-3.5 text-white shadow-lg shadow-[#f2922A]/35 hover:bg-[#dd8223]"
            >
              Book Free Site Assessment
            </Button>
            <Button
              href="/services"
              variant="outline"
              className="rounded-full border border-white/70 bg-white/5 px-7 py-3.5 text-white backdrop-blur-sm hover:bg-white/15"
            >
              Explore Solutions
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-100 sm:text-base">
            {TRUST_INDICATORS.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-[#f7b067]">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
