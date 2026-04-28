"use client";

import { Button } from "@/components/button";
import { useLocale } from "@/i18n/I18nProvider";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  const isAmharic = useLocale() === "ar";
  const bulletPoints = isAmharic
    ? [
        "نص عربي",
        "نص عربي",
        "نص عربي",
        "نص عربي",
      ]
    : [
        "Energy audit and feasibility study",
        "System design and commercial proposal",
        "Installation, servicing, and after-service support",
        "Clean energy advisory and capacity building",
      ];

  return (
    <Section>
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <Reveal className="ui-card relative overflow-hidden">
          <Image
            src="/homeabout.jpg"
            alt="Solar panel installation for residential and commercial properties"
            width={1200}
            height={900}
            className="h-full w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Reveal>

        <Reveal className="space-y-6" delay={0.1}>
          <SectionHeader
            kicker={isAmharic ? "نص عربي" : "About Us"}
            title={isAmharic ? "نص عربي" : "Powering South Sudan with Reliable Renewable Solutions"}
            subtitle={
              isAmharic
                ? "نص عربي"
                : "Master Premier Green Energy Co. Ltd is a South Sudan based renewable energy company focused on engineering excellence and clean energy advisory services."
            }
          />

          <ul className="space-y-4">
            {bulletPoints.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span className="text-base text-slate-700">{item}</span>
              </li>
            ))}
          </ul>

          <Button href="/about" variant="primary">
            {isAmharic ? "نص عربي" : "Learn More About Us"}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
