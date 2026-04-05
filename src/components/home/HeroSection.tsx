"use client";

import { Button } from "@/components/button";
import { motion } from "motion/react";
import Image from "next/image";

const TRUST_INDICATORS = [
  "Trusted Solar Experts",
  "Local Manufacturing",
  "Sustainable Solutions",
];

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.04 }}
        transition={{ duration: 12, ease: "easeOut" }}
        className="fixed inset-0 -z-10"
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

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(176, 95, 22, 0.94) 0%, rgba(176, 95, 22, 0.72) 58%, rgba(176, 95, 22, 0.2) 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Powering South Sudan with Reliable Solar Energy
          </h1>

          <p className="mt-6 text-base leading-relaxed text-slate-100 sm:text-lg lg:text-xl">
            Delivering modern, intelligent renewable energy solutions for homes, businesses, and
            rural communities.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              href="/contact"
              className="rounded-2xl bg-emerald-500 px-7 py-3.5 text-white shadow-lg shadow-emerald-500/30 transition duration-300 data-[hover]:-translate-y-0.5 data-[hover]:bg-emerald-400"
            >
              Get Free Quote
            </Button>
            <Button
              href="/services"
              variant="outline"
              className="rounded-2xl border border-white/70 bg-white/5 px-7 py-3.5 text-white backdrop-blur-sm transition duration-300 data-[hover]:bg-white/15"
            >
              Explore Services
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-100 sm:text-base">
            {TRUST_INDICATORS.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-emerald-300">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
