"use client";

import { Eye, Target } from "lucide-react";
import { motion } from "motion/react";
import { useLocale } from "@/i18n/I18nProvider";

const cards = [
  {
    title: "Our Mission",
    description:
      "To provide high-impact renewable energy systems that lower energy costs, improve resilience, and accelerate the shift toward cleaner operations.",
    icon: Target,
  },
  {
    title: "Our Vision",
    description:
      "To become the most trusted clean-energy implementation partner for organizations building a sustainable and energy-secure future.",
    icon: Eye,
  },
];

export default function VisionMission() {
  const isAmharic = useLocale() === "am";
  const localizedCards = isAmharic
    ? cards.map((card) => ({
        ...card,
        title: card.title === "Our Mission" ? "ተልዕኳችን" : "ራዕያችን",
        description:
          card.title === "Our Mission"
            ? "የኃይል ወጪን የሚቀንሱ፣ ቋቋሚነትን የሚጨምሩ እና ወደ ንጹህ አሰራር ሽግግርን የሚፋጠኑ ከፍተኛ ተፅእኖ ያላቸው የታዳሽ ኃይል ስርዓቶችን ማቅረብ።"
            : "ዘላቂ እና የኃይል ደህንነት ያለው ወደፊት ለሚገነቡ ድርጅቶች እጅግ ታማኝ የንጹህ ኃይል አፈጻጸም አጋር መሆን።",
      }))
    : cards;

  return (
    <section id="vision-mission" className="px-6 py-20 scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.14 },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {localizedCards.map(({ title, description, icon: Icon }) => (
            <motion.article
              key={title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-xl bg-white p-8 shadow-lg"
            >
              <Icon className="size-9 text-[#16a34a]" aria-hidden="true" />
              <h3 className="mt-5 text-2xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
