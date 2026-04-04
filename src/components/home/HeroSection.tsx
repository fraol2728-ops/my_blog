"use client";

import { Button } from "@/components/button";
import { motion } from "motion/react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/hero.webp"
          alt="Solar panels powering a modern property"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-transparent" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.22em] text-emerald-300">
            Premium Solar Solutions
          </p>
          <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Power Your Future with Solar Energy
          </h1>
          <p className="mt-6 max-w-2xl text-base text-slate-100 sm:text-xl">
            Clean, affordable, and reliable energy solutions for modern homes
            and businesses.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              href="/contact"
              className="rounded-full bg-emerald-500 px-7 py-3.5 text-white shadow-lg shadow-emerald-500/30 transition data-[hover]:-translate-y-0.5 data-[hover]:bg-emerald-400"
            >
              Get Free Quote
            </Button>
            <Button
              href="/services"
              variant="outline"
              className="rounded-full border border-white/60 bg-white/5 px-7 py-3.5 text-white backdrop-blur-sm transition data-[hover]:bg-white/15"
            >
              Explore Services
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
