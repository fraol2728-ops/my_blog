"use client";

import { Award, Factory, ShieldCheck, SunMedium } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  {
    title: "12-Year Warranty",
    description: "Guaranteed long-term performance and reliability",
    icon: ShieldCheck,
  },
  {
    title: "Tier 1 Materials",
    description: "Built using premium-grade solar components",
    icon: Award,
  },
  {
    title: "Proven Installations",
    description: "Successfully delivered solar projects across regions",
    icon: SunMedium,
  },
  {
    title: "Local Manufacturing",
    description: "Unique advantage with local solar panel production",
    icon: Factory,
  },
];

export default function StatsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl border-t border-slate-200 pt-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.article
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Icon
                  aria-hidden="true"
                  className="mx-auto mb-4 h-10 w-10 text-amber-500"
                />
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
                  {stat.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600">{stat.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
