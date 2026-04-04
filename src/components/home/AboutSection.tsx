"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const highlights = [
  "Certified engineering & technical expertise",
  "Full project lifecycle (audit → design → installation → support)",
  "Local solar manufacturing advantage",
  "Focus on rural energy access",
];

export default function AboutSection() {
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative h-[26rem] overflow-hidden rounded-2xl shadow-2xl shadow-slate-900/15"
        >
          <Image
            src="/homeabout.jfif"
            alt="Master Premier Green Energy Co. Ltd team at a solar site"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Who We Are
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Master Premier Green Energy Co. Ltd
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Master Premier Green Energy Co. Ltd is a leading renewable energy company based in
            South Sudan, delivering engineering, technical, and advisory services across the solar
            energy sector. We specialize in designing, installing, and supporting high-performance
            solar systems while promoting sustainable and affordable energy solutions.
          </p>

          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li key={item} className="flex gap-4 rounded-2xl bg-slate-50 p-4 shadow-sm">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden="true" />
                <p className="text-sm font-medium text-slate-700">{item}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
