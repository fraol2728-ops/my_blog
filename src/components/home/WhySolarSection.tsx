"use client";

import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { useLocale } from "@/i18n/I18nProvider";
import { SunMedium } from "lucide-react";

const benefits = [
  "Reduce electricity bills",
  "Protect against rising energy costs",
  "Increase property value",
  "Unlimited renewable energy",
  "Environmentally friendly",
];

export default function WhySolarSection() {
  const isAmharic = useLocale() === "ar";
  const localizedBenefits = isAmharic
    ? [
        "خفض فواتير الكهرباء",
        "الحماية من ارتفاع تكاليف الطاقة",
        "زيادة قيمة العقار",
        "طاقة متجددة غير محدودة",
        "حل صديق للبيئة",
      ]
    : benefits;

  return (
    <Section>
      <Reveal className="ui-card mx-auto max-w-6xl p-8 md:p-12">
        <SectionHeader title={isAmharic ? "لماذا الطاقة الشمسية؟" : "Why Solar"} />
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {localizedBenefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 transition hover:bg-emerald-50/70"
            >
              <SunMedium
                className="mt-0.5 size-5 shrink-0 text-emerald-600"
                aria-hidden="true"
              />
              <span className="text-slate-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
