"use client";

import { Button } from "@/components/button";
import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const bulletPoints = [
  "Advanced solar technology and premium materials",
  "Expert installation and engineering team",
  "Locally manufactured solar solutions",
  "Long-term performance and warranty assurance",
];

export default function AboutSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-white/20 shadow-2xl shadow-slate-900/10"
        >
          <Image
            src="/homeabout.jpg"
            alt="Solar panel installation for residential and commercial properties"
            width={1200}
            height={900}
            className="h-full w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="space-y-6 rounded-3xl border border-slate-200/80 bg-white/75 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-sm"
        >
          <p className="text-sm uppercase tracking-wide text-[#f2922A]">About Us</p>

          <h2 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Engineered Solar Systems That Perform for Decades
          </h2>

          <p className="text-lg text-gray-600">
            We help homeowners and businesses transition to clean energy with precision-designed,
            high-efficiency systems that reduce risk and maximize return on investment.
          </p>

          <ul className="space-y-4">
            {bulletPoints.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#f2922A]" aria-hidden="true" />
                <span className="text-base text-slate-700">{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Button
              href="/about"
              className="rounded-full bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800"
            >
              Learn More About Us
            </Button>
            <Button
              href="/contact"
              className="rounded-full bg-[#f2922A] px-6 py-3 font-medium text-white shadow-lg shadow-[#f2922A]/30 hover:bg-[#dd8223]"
            >
              Get Your Savings Plan
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
