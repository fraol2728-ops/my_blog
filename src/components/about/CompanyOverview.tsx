"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const highlights = [
  "Engineering support from energy audits and feasibility studies to installation and servicing",
  "Clean energy advisory including market analysis, policy development and capacity building",
  "Locally integrated solar solutions designed for reliability, durability and affordability",
];

export default function CompanyOverview() {
  return (
    <section id="company-overview" className="px-6 py-20 scroll-mt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="overflow-hidden rounded-xl shadow-lg"
        >
          <Image
            src="/homeabout.jpg"
            alt="Solar engineers inspecting a utility project"
            width={1200}
            height={900}
            className="h-full w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16a34a]">
            Company Overview
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            A Professional Renewable Energy Partner in South Sudan
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            Master Premier Green Energy Co. Ltd provides technical and advisory services for renewable energy and
            energy access solutions. Our teams plan, design and deliver solar systems that balance quality,
            performance and affordability for communities and institutions.
          </p>

          <ul className="space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-700">
                <CheckCircle2
                  className="mt-0.5 size-5 shrink-0 text-[#16a34a]"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
