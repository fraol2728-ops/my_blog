"use client";

import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { useLocale } from "@/i18n/I18nProvider";
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
  const isAmharic = useLocale() === ("am" as string);
  const localizedSteps = isAmharic
    ? steps.map((step) => ({
        ...step,
        title:
          {
            "Audit & Consultation": "ኦዲት እና ምክክር",
            "System Design": "የስርዓት ንድፍ",
            Installation: "ተከላ",
            "Monitoring & Support": "ክትትል እና ድጋፍ",
          }[step.title] ?? step.title,
        description:
          {
            "We assess your energy demand, site conditions, and project requirements.":
              "የኃይል ፍላጎቶትን፣ የቦታ ሁኔታን እና የፕሮጀክት መስፈርቶትን እንገመግማለን።",
            "Our engineers create a tailored solar design for efficient, reliable output.":
              "መሐንዲሶቻችን ለተሻለ እና ታማኝ አፈጻጸም ተስማሚ የፀሐይ ኃይል ንድፍ ይዘጋጃሉ።",
            "Our technical team installs and commissions your system to high standards.":
              "ቴክኒካል ቡድናችን ስርዓቶን በከፍተኛ ደረጃ ይጫናል እና ወደ ስራ ያስገባል።",
            "We provide continuous monitoring and lifecycle support for long-term performance.":
              "ረጅም ጊዜ አፈጻጸምን ለማረጋገጥ ቀጣይ ክትትል እና የሕይወት ዑደት ድጋፍ እንሰጣለን።",
          }[step.description] ?? step.description,
      }))
    : steps;
  return (
    <Section>
      <SectionHeader align="center" title={isAmharic ? "እንዴት እንደሚሰራ" : "How It Works"} />

      <div className="relative mt-12">
        <div className="absolute left-1/2 top-8 hidden h-px w-[78%] -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-300 to-transparent lg:block" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {localizedSteps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 0.08}
              className="ui-card ui-card-hover relative p-6"
              viewport={{ once: true, amount: 0.35 }}
            >
              <div className="inline-flex rounded-2xl bg-emerald-50 p-3">
                <step.icon className="size-6 text-emerald-600" aria-hidden="true" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {isAmharic ? `ደረጃ ${index + 1}` : `Step ${index + 1}`}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
