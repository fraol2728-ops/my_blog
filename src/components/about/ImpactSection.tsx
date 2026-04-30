"use client";

import { useLocale } from "@/i18n/I18nProvider";

export default function ImpactSection() {
  const isArabic = useLocale() === "ar";

  return (
    <section className="bg-slate-100 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
            {isArabic ? "أثرنا" : "Our Impact"}
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {isArabic
              ? "نحوّل أهداف الاستدامة إلى نتائج طاقة قابلة للقياس"
              : "Turning Sustainability Goals into Measurable Energy Results"}
          </h2>

          <p className="text-lg leading-relaxed text-slate-700">
            {isArabic
              ? "من خلال مشاريع سكنية وتجارية ومؤسسية، ساعدت أنظمتنا العملاء على خفض تكاليف الطاقة، وتقليل الاعتماد على تقلبات أسعار الكهرباء، وخفض الانبعاثات الكربونية عامًا بعد عام. نركز على النتائج العملية: إنتاج موثوق، وعوائد متوقعة، وعمليات أكثر استدامة على نطاق واسع."
              : "Across residential, commercial, and institutional projects, our systems have helped clients cut energy expenses, reduce dependence on volatile utility rates, and lower carbon emissions year after year. We focus on practical outcomes: dependable generation, predictable returns, and cleaner operations at scale."}
          </p>
        </div>
      </div>
    </section>
  );
}
