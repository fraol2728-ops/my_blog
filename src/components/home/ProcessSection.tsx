"use client";

import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { ClipboardList, Headset, PenTool, Wrench } from "lucide-react";

const steps = [
  {
    title: "Audit & Consultation",
    description: "We assess your energy demand, site conditions, and project requirements.",
    icon: ClipboardList,
  },
  {
    title: "System Design",
    description: "Our engineers create a tailored solar design for efficient, reliable output.",
    icon: PenTool,
  },
  {
    title: "Installation",
    description: "Our technical team installs and commissions your system to high standards.",
    icon: Wrench,
  },
  {
    title: "Monitoring & Support",
    description: "We provide continuous monitoring and lifecycle support for long-term performance.",
    icon: Headset,
  },
];

export default function ProcessSection() {
  return (
    <Section>
      <SectionHeader align="center" title="How It Works" />

      <div className="relative mt-12">
        <div className="absolute left-1/2 top-8 hidden h-px w-[78%] -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-300 to-transparent lg:block" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 0.08}
              className="ui-card ui-card-hover relative p-6"
              viewport={{ once: true, amount: 0.35 }}
            >
              <div className="inline-flex rounded-2xl bg-emerald-50 p-3">
                <step.icon className="size-6 text-emerald-600" aria-hidden="true" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Step {index + 1}</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
