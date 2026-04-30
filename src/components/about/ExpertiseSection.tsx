"use client";

import { ChartNoAxesCombined, Cpu, HardHat } from "lucide-react";
import { useLocale } from "@/i18n/I18nProvider";

const expertise = [
  {
    title: "Engineering & Design",
    description:
      "Site-specific design, load analysis, and system architecture tailored for long-term efficiency.",
    icon: Cpu,
  },
  {
    title: "Certified Installation Teams",
    description:
      "Experienced technicians execute projects with strict safety and quality controls.",
    icon: HardHat,
  },
  {
    title: "Performance Optimization",
    description:
      "Continuous monitoring and analytics keep every system operating at peak output.",
    icon: ChartNoAxesCombined,
  },
];

export default function ExpertiseSection() {
  const isAmharic = useLocale() === "ar";

  const localizedExpertise = isAmharic
    ? expertise.map((item) => ({
        ...item,
        title:
          {
            "Engineering & Design": "الهندسة والتصميم",
            "Certified Installation Teams": "فرق تركيب معتمدة",
            "Performance Optimization": "تحسين الأداء",
          }[item.title] ?? item.title,
        description:
          {
            "Site-specific design, load analysis, and system architecture tailored for long-term efficiency.":
              "تصميم مخصص حسب الموقع، وتحليل الأحمال، وبنية نظام مصممة لتحقيق كفاءة طويلة الأمد.",
            "Experienced technicians execute projects with strict safety and quality controls.":
              "ينفذ فنيون ذوو خبرة المشاريع وفق أعلى معايير السلامة والجودة.",
            "Continuous monitoring and analytics keep every system operating at peak output.":
              "تضمن المراقبة المستمرة وتحليل البيانات عمل الأنظمة بأعلى كفاءة ممكنة.",
          }[item.description] ?? item.description,
      }))
    : expertise;

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
            {isAmharic ? "خبراتنا" : "Expertise"}
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {isAmharic
              ? "فرق متخصصة تركز على الأداء والموثوقية"
              : "Specialized Teams Focused on Performance and Reliability"}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {localizedExpertise.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <Icon className="size-7 text-[#458137]" aria-hidden="true" />

              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
