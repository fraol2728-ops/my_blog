"use client";

import { Eye, Target } from "lucide-react";
import { useLocale } from "@/i18n/I18nProvider";

const cards = [
  {
    key: "mission",
    title: "Mission",
    description:
      "Provide reliable, modern and intelligent renewable energy solutions to build green economies, create sustainable living and promote rural access.",
    icon: Target,
  },
  {
    key: "vision",
    title: "Vision",
    description:
      "Be a trusted leader in South Sudan's renewable transition through world-class engineering, advisory excellence and customer-focused delivery.",
    icon: Eye,
  },
];

export default function MissionVision() {
  const isArabic = useLocale() === "ar";

  const localizedCards = cards.map((card) => {
    if (!isArabic) return card;

    return {
      ...card,
      title:
        card.key === "mission"
          ? "مهمتنا"
          : "رؤيتنا",
      description:
        card.key === "mission"
          ? "تقديم حلول طاقة متجددة موثوقة وحديثة وذكية، لدعم بناء اقتصاد أخضر، وتعزيز الحياة المستدامة، وتوسيع الوصول إلى الطاقة في المناطق الريفية."
          : "أن نكون جهة رائدة وموثوقة في التحول نحو الطاقة المتجددة في جنوب السودان، من خلال هندسة عالمية المستوى، وخدمات استشارية متميزة، وتركيز قوي على رضا العملاء.",
    };
  });

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2">
          {localizedCards.map(({ key, title, description, icon: Icon }) => (
            <article
              key={key}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <Icon className="size-9 text-[#458137]" aria-hidden="true" />

              <h3 className="mt-5 text-2xl font-semibold text-slate-900">
                {title}
              </h3>

              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
