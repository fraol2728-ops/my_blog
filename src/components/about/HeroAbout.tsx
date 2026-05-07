"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useLocale } from "@/i18n/I18nProvider";

export default function HeroAbout() {
  const isAmharic = useLocale() === "ar";

  return (
    <section className="relative isolate min-h-[65vh] overflow-hidden">
      <Image
        src="/hero.png"
        alt="Solar panels powering a modern business campus"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-slate-950/70" />

      <div className="relative mx-auto flex min-h-[65vh] max-w-6xl items-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl space-y-6"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-green-300">
            {isAmharic
              ? "عن ماستر بريميير للطاقة الخضراء"
              : "About Master Premier Green Energy"}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {isAmharic
              ? "نبني مستقبلًا أكثر ذكاءً للطاقة بخبرة موثوقة في الطاقة الشمسية"
              : "About Master Premier Green Energy Co. Ltd"}
          </h1>

          <p className="text-base leading-relaxed text-slate-200 sm:text-lg">
            {isAmharic
              ? "نقوم بتصميم وتركيب وصيانة أنظمة طاقة متجددة عالية الأداء للشركات والمجتمعات التي تسعى إلى الموثوقية والكفاءة وتحقيق نتائج مستدامة قابلة للقياس."
              : "We design, install, and maintain high-performance renewable systems for businesses and communities that demand reliability, efficiency, and measurable sustainability results."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
