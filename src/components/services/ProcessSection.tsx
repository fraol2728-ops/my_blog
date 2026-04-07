"use client";

import { motion } from "motion/react";
import { ClipboardCheck, HardHat, Leaf, Settings, Wrench } from "lucide-react";

const processSteps = [
  { title: "Discovery", icon: ClipboardCheck, detail: "Energy audit, goals, and viability analysis." },
  { title: "Engineering", icon: Settings, detail: "Detailed design, permits, and production modeling." },
  { title: "Installation", icon: HardHat, detail: "Safe deployment by certified field teams." },
  { title: "Optimization", icon: Wrench, detail: "Commissioning, testing, and performance tuning." },
  { title: "Lifecycle Care", icon: Leaf, detail: "Monitoring and proactive maintenance support." },
];

export default function ProcessSection() {
  return (
    <section className="bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Our Proven Delivery Process
        </h2>
        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="mt-10 grid gap-8 lg:grid-cols-5"
        >
          {processSteps.map((step, idx) => (
            <motion.li
              key={step.title}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="relative rounded-xl bg-white p-6 shadow-lg"
            >
              <step.icon className="h-8 w-8 text-[#16a34a]" />
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-green-700">
                Step {idx + 1}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.detail}</p>
              {idx < processSteps.length - 1 ? (
                <span className="absolute -right-4 top-1/2 hidden h-px w-8 bg-green-300 lg:block" />
              ) : null}
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
