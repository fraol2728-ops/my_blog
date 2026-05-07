"use client";

import { useLanguage } from "@/context/language";
import { getTranslation } from "@/lib/translations";

export default function ContactHero() {
  const { lang } = useLanguage();
  const t = getTranslation(lang);

  return (
    <section className={`py-20 ${lang === "ar" ? "text-right" : "text-left"}`}>
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{lang === "ar" ? t.contact.heading : "Contact Master Premier Green Energy — Get a Free Solar Quote"}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">{t.contact.subheading}</p>
      </div>
    </section>
  );
}
