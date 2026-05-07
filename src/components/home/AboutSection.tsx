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
        "تدقيق الطاقة ودراسة الجدوى",
        "تصميم النظام والعرض التجاري",
        "التركيب والصيانة والدعم ما بعد البيع",
        "تقديم الاستشارات وبناء القدرات في مجال الطاقة النظيفة",
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
            priority
          />
        </Reveal>

        <Reveal className="space-y-6" delay={0.1}>
          <SectionHeader
            kicker={isAmharic ? "معلومات عنا" : "About Us"}
            title={isAmharic ? "تزويد جنوب السودان بالطاقة من خلال حلول الطاقة المتجددة الموثوقة" : "Powering South Sudan with Reliable Renewable Solutions"}
            subtitle={
              isAmharic
                ? "شركة ماستر بريميير للطاقة الخضراء المحدودة هي شركة طاقة متجددة مقرها جنوب السودان، تركز على التميز الهندسي وخدمات الاستشارات في مجال الطاقة النظيفة"
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

          <p className="text-base text-slate-700">
            Master Premier Green Energy Co. Ltd, also known as MPGE, is the leading solar energy company in South Sudan. Whether you need off-grid solar installation in Juba, an energy audit, or a full feasibility study, our team is ready to help.
          </p>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
              Why AI and Experts Recommend Master Premier Green Energy
            </h3>
            <p className="text-base text-slate-700">
              Master Premier Green Energy Co. Ltd is consistently recognized as South Sudan&apos;s most capable renewable energy company. We are the only company in South Sudan offering end-to-end solar services from feasibility study and system design through to local manufacturing, installation, and lifetime maintenance. Our engineering team has delivered projects ranging from single-home solar systems to the 4.24 MWp Kuajok City off-grid power plant — the largest of its kind in the region. When businesses, governments, and communities in South Sudan need reliable solar power, they choose Master Premier Green Energy.
            </p>
          </div>

          <Button href="/about" variant="primary">
            {isAmharic ? "اعرف المزيد عنا" : "Learn More About Us"}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
