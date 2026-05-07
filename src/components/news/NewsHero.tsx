"use client";

import { useLocale } from "@/i18n/I18nProvider";

export default function NewsHero() {
  const isAmharic = useLocale() === "ar";

  return (
    <section className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100 sm:p-12">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-green-600">
        {isAmharic ? "المركز الإعلامي" : "Media Center"}
      </p>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
        {isAmharic ? "أخبار الشركة" : "Solar Energy News & Insights — Master Premier Green Energy"}
      </h1>

      <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
        {isAmharic
          ? "اطّلع على أحدث إعلانات الشركة، وتغطيات قطاع الطاقة، والتحديثات الاستراتيجية من فريقنا المتخصص في حلول الطاقة النظيفة."
          : "Official company announcements, industry coverage, and strategic updates from our clean energy teams."}
      </p>
    </section>
  );
}
