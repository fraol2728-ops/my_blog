"use client";

import { BarChart3, Handshake, Leaf, Lightbulb, ShieldCheck, Users } from "lucide-react";
import { motion } from "motion/react";

const values = [
  {
    title: "Integrity",
    description: "Transparent processes, clear pricing, and accountable project delivery.",
    icon: ShieldCheck,
  },
  {
    title: "Innovation",
    description: "Continuous adoption of smarter technologies and proven methods.",
    icon: Lightbulb,
  },
  {
    title: "Sustainability",
    description: "Solutions designed for environmental and long-term economic impact.",
    icon: Leaf,
  },
  {
    title: "Partnership",
    description: "Collaborative planning with clients, communities, and stakeholders.",
    icon: Handshake,
  },
  {
    title: "Performance",
    description: "Data-led optimization to maximize energy output and ROI.",
    icon: BarChart3,
  },
  {
    title: "People First",
    description: "A safety-focused culture that supports teams and clients alike.",
    icon: Users,
  },
];

export default function ValuesGrid() {
  return (
    <section className="bg-slate-50 px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16a34a]">
            Core Values
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Principles That Guide Every Project
          </h2>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {values.map(({ title, description, icon: Icon }) => (
            <motion.article
              key={title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-xl bg-white p-6 shadow-lg"
            >
              <Icon className="size-8 text-[#16a34a]" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
