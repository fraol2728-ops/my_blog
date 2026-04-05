"use client";

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
          className="relative overflow-hidden rounded-2xl shadow-lg"
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="text-sm uppercase tracking-wide text-black">About Us</p>

          <h2 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Powering a Sustainable Future with Reliable Solar Solutions
          </h2>

          <p className="text-lg text-gray-600">
            We are a forward-thinking solar energy provider committed to delivering high-quality,
            efficient, and sustainable power solutions. With a strong focus on innovation and
            reliability, we design and install solar systems tailored to meet residential,
            commercial, and industrial needs.
          </p>

          <ul className="space-y-4">
            {bulletPoints.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#458137]" aria-hidden="true" />
                <span className="text-base text-slate-700">{item}</span>
              </li>
            ))}
          </ul>

          <a
            href="/about"
            className="inline-flex rounded-xl bg-[#458137] px-6 py-3 font-medium text-white transition hover:bg-[#3b6f2f]"
          >
            Learn More About Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
