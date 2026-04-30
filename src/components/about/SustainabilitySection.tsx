"use client";

import Image from "next/image";
import { Leaf, Recycle, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useLocale } from "@/i18n/I18nProvider";

const pillars = [
  {
    key: "carbon",
    title: "Carbon Reduction",
    description:
      "We design systems that measurably reduce emissions and support science-based climate targets.",
    icon: Leaf,
  },
  {
    key: "circular",
    title: "Circular Practices",
    description:
      "We prioritize responsible sourcing, lifecycle planning, and equipment recycling pathways.",
    icon: Recycle,
  },
  {
    key: "efficiency",
    title: "Energy Efficiency",
    description:
      "Integrated optimization ensures every watt produced contributes to long-term operational value.",
    icon: Zap,
  },
];

export default function SustainabilitySection() {
  const isArabic = useLocale() === "ar";

  const localizedPillars = pillars.map((pillar) => {
    if (!isArabic) return pillar;

    return {
      ...pillar,
      title:
        pillar.key === "carbon"
          ? "خفض الانبعاثات"
          : pillar.key === "circular"
          ? "الممارسات الدائرية"
          : "كفاءة الطاقة",

      description:
        pillar.key === "carbon"
          ? "نقوم بتصميم أنظمة تقلل الانبعاثات بشكل ملموس وتدعم أهداف المناخ المعتمدة على أسس علمية."
          : pillar.key === "circular"
          ? "نركز على التوريد المسؤول، وتخطيط دورة الحياة، وإعادة تدوير المعدات بشكل مستدام."
          : "نضمن من خلال التحسين المتكامل أن كل واط من الطاقة المنتجة يساهم في تحقيق قيمة تشغيلية طويلة الأمد.",
    };
  });

  return (
    <section
      id="sustainability"
      className={`px-6 py-20 scroll-mt-24 ${
        isArabic ? "text-right" : ""
      }`}
    >
      <div
        className={`mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 ${
          isArabic ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16a34a]">
            {isArabic ? "الاستدامة" : "Sustainability Commitment"}
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {isArabic
              ? "تحويل أهداف المناخ إلى حلول طاقة عملية"
              : "Turning Climate Goals into Practical Energy Outcomes"}
          </h2>

          <p className="leading-relaxed text-slate-600">
            {isArabic
              ? "نُدمج الاستدامة في كل مرحلة من مراحل تنفيذ مشاريعنا، بدءًا من التصميم وحتى ما بعد التشغيل. نساعد عملاءنا على بناء بنية تحتية جاهزة للمستقبل تحقق عوائد بيئية واقتصادية قوية."
              : "Sustainability is built into every stage of our delivery model—from design assumptions to post-installation optimization. We help clients build future-ready infrastructure with strong environmental and economic returns."}
          </p>

          <div className="space-y-4">
            {localizedPillars.map(({ key, title, description, icon: Icon }) => (
              <div
                key={key}
                className="rounded-xl bg-white p-5 shadow-lg transition hover:shadow-xl hover:-translate-y-1"
              >
                <div
                  className={`flex items-start gap-3 ${
                    isArabic ? "flex-row-reverse text-right" : ""
                  }`}
                >
                  <Icon
                    className="mt-0.5 size-5 text-[#16a34a]"
                    aria-hidden="true"
                  />

                  <div>
                    <h3 className="font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
          className="overflow-hidden rounded-xl shadow-lg"
        >
          <Image
            src="/solarimage.webp"
            alt={
              isArabic
                ? "البنية التحتية للطاقة المستدامة"
                : "Sustainable energy infrastructure"
            }
            width={1200}
            height={900}
            className="h-full w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
