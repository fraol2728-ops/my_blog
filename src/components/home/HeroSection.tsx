"use client";

import { Button } from "@/components/button";
import heroImage from "@/public/hero.webp";
import { motion } from "motion/react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden rounded-2xl">
      <Image
        src={heroImage}
        alt="Solar panels powering a modern home"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-slate-900/20" />

      <div className="relative mx-auto flex min-h-[78vh] w-full max-w-6xl items-center px-6 py-24 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Power Your Future with Clean Solar Energy
          </h1>
          <p className="mt-6 text-base text-slate-100 sm:text-xl">
            Affordable, reliable, and sustainable solar solutions for homes and
            businesses.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              href="/contact"
              className="rounded-full bg-emerald-500 px-6 py-3 text-white data-[hover]:bg-emerald-400"
            >
              Get Free Quote
            </Button>
            <Button
              href="/services"
              variant="outline"
              className="rounded-full border border-white/50 bg-white/10 px-6 py-3 text-white backdrop-blur data-[hover]:bg-white/20"
            >
              Explore Services
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
