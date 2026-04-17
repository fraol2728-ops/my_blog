"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useLocale } from "@/i18n/I18nProvider";

export default function CTASection() {
  const isAmharic = useLocale() === ("am" as string);

  return (
    <section className="bg-slate-900 px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-4xl rounded-xl bg-slate-800 px-8 py-14 text-center shadow-lg"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-300">
          {isAmharic ? "ወደፊቱን እንገንባ" : "Let&apos;s Build the Future"}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {isAmharic ? "ቀጣይ የኃይል ፕሮጀክትዎን ከእኛ ጋር ይጀምሩ" : "Start Your Next Energy Project with Solvora Energy"}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          {isAmharic
            ? "ግቦትዎን ለመገምገም እና ለድርጅትዎ የሚስማማ የታዳሽ ኃይል ስትራቴጂክ የመንገድ ካርታ ለመፍጠር ከባለሙያዎቻችን ጋር ይገናኙ።"
            : "Connect with our specialists to evaluate your goals and create a strategic renewable roadmap tailored to your organization."}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-xl bg-[#16a34a] px-6 py-3 font-semibold text-white transition hover:bg-green-600"
          >
            {isAmharic ? "ምክክር ያስይዙ" : "Schedule a Consultation"}
          </Link>
          <Link
            href="/services"
            className="rounded-xl border border-slate-400 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            {isAmharic ? "አገልግሎቶችን ይመልከቱ" : "Explore Services"}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
