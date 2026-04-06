"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const NEWS_CARD = {
  title: "National Grid Stabilization Project Announced",
  date: "April 1, 2026",
  excerpt: "A new utility-scale deployment will deliver clean energy resilience.",
};

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background:
            "radial-gradient(40% 40% at 72% 35%, rgba(22, 163, 74, 0.45) 0%, rgba(22, 163, 74, 0) 75%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-4 py-24 md:grid-cols-2 md:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Powering the Future with Intelligent Solar Energy
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-gray-300 md:mx-0">
            Advanced solar solutions for homes, industries, and governments with reliable and
            sustainable energy systems.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <Link
              href="/contact"
              className="rounded-xl bg-green-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-green-700"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/services"
              className="rounded-xl border border-green-600 px-6 py-3 text-center font-semibold text-green-500 transition hover:bg-green-600 hover:text-white"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-[320px] w-full max-w-md items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md md:h-[420px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 via-transparent to-green-500/10" />
            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
              <div className="h-20 w-20 rounded-full border border-green-500/70 bg-green-500/20 shadow-[0_0_60px_rgba(34,197,94,0.45)]" />
              <p className="text-sm uppercase tracking-[0.2em] text-green-300">Solar Animation Placeholder</p>
              <p className="text-xs text-gray-300">Future Lottie / 3D energy visualization area</p>
            </div>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            className="absolute right-10 bottom-[-40px] hidden w-full max-w-sm gap-4 rounded-2xl bg-white p-4 text-black shadow-xl md:flex md:w-auto"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-200">
              <Image
                src="/service1.jpg"
                alt="Solar panel update"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold">{NEWS_CARD.title}</h3>
              <p className="mt-1 text-xs text-gray-500">{NEWS_CARD.date}</p>
              <p className="mt-1 truncate text-xs text-gray-700">{NEWS_CARD.excerpt}</p>
            </div>
          </motion.article>
        </motion.div>
      </div>

      <div className="px-4 pb-10 md:hidden">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="mx-auto mt-8 flex w-full max-w-sm gap-4 rounded-2xl bg-white p-4 text-black shadow-xl"
        >
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-200">
            <Image src="/service1.jpg" alt="Solar panel update" fill sizes="64px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold">{NEWS_CARD.title}</h3>
            <p className="mt-1 text-xs text-gray-500">{NEWS_CARD.date}</p>
            <p className="mt-1 truncate text-xs text-gray-700">{NEWS_CARD.excerpt}</p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
