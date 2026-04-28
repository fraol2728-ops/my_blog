"use client";

import { useLanguage } from "@/context/language";
import { translations } from "@/lib/translations";

export default function NewsEmptyState() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
      {t.news.empty}
    </div>
  );
}
