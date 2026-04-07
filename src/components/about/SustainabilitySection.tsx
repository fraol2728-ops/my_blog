"use client";

import Image from "next/image";
import { Leaf, Recycle, Zap } from "lucide-react";
import { motion } from "motion/react";

const pillars = [
  {
    title: "Carbon Reduction",
    description: "We design systems that measurably reduce emissions and support science-based climate targets.",
    icon: Leaf,
  },
  {
    title: "Circular Practices",
    description: "We prioritize responsible sourcing, lifecycle planning, and equipment recycling pathways.",
    icon: Recycle,
  },
  {
    title: "Energy Efficiency",
    description: "Integrated optimization ensures every watt produced contributes to long-term operational value.",
    icon: Zap,
  },
];

export default function SustainabilitySection() {
  return (
    <section id="sustainability" className="px-6 py-20 scroll-mt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16a34a]">
            Sustainability Commitment
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Turning Climate Goals into Practical Energy Outcomes
          </h2>
          <p className="leading-relaxed text-slate-600">
            Sustainability is built into every stage of our delivery model—from
            design assumptions to post-installation optimization. We help
            clients build future-ready infrastructure with strong environmental
            and economic returns.
          </p>

          <div className="space-y-4">
            {pillars.map(({ title, description, icon: Icon }) => (
              <div key={title} className="rounded-xl bg-white p-5 shadow-lg">
                <div className="flex items-start gap-3">
                  <Icon className="mt-0.5 size-5 text-[#16a34a]" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
          className="overflow-hidden rounded-xl shadow-lg"
        >
          <Image
            src="/solarimage.webp"
            alt="Sustainable energy infrastructure"
            width={1200}
            height={900}
            className="h-full w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
