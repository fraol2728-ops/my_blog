"use client";

import { motion } from "motion/react";
import { Building2, Factory, Hospital, Hotel, Landmark, Warehouse } from "lucide-react";
import { useLocale } from "@/i18n/I18nProvider";

const industries = [
  { title: "Commercial Real Estate", icon: Building2 },
  { title: "Manufacturing", icon: Factory },
  { title: "Healthcare", icon: Hospital },
  { title: "Hospitality", icon: Hotel },
  { title: "Public Infrastructure", icon: Landmark },
  { title: "Logistics", icon: Warehouse },
];

export default function IndustriesSection() {
  const isAmharic = useLocale() === ("am" as string);
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {isAmharic ? "የምናገለግላቸው ዘርፎች" : "Industries We Power"}
        </h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.title}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg"
            >
              <industry.icon className="h-8 w-8 text-[#16a34a]" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{industry.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
