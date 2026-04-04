"use client";

import { Button } from "@/components/button";
import { Leaf, ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const highlights = [
  {
    title: "Certified specialists",
    description: "Licensed engineers and NABCEP-trained installers on every project.",
    icon: ShieldCheck,
  },
  {
    title: "Performance-first systems",
    description: "Premium components tuned for long-term output and reliability.",
    icon: Zap,
  },
  {
    title: "Sustainable commitment",
    description: "Helping communities reduce emissions with measurable impact.",
    icon: Leaf,
  },
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
            alt="Solar team discussing rooftop design plans"
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
            Built to deliver clean energy with confidence.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            We design and install premium solar systems that help homeowners and
            organizations control costs, increase resilience, and move toward a
            smarter energy future.
          </p>

          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li key={item.title} className="flex gap-4 rounded-2xl bg-slate-50 p-4">
                <item.icon className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button
              href="/about"
              className="rounded-full bg-slate-900 px-7 py-3.5 text-white transition data-[hover]:-translate-y-0.5 data-[hover]:bg-slate-800"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
