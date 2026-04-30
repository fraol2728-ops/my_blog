"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useLocale } from "@/i18n/I18nProvider";

const projects = [
  {
    title: {
      en: "200kW Retail Campus",
      ar: "مجمع تجاري بقدرة 200 كيلوواط",
    },
    image: "/project1.jpg",
  },
  {
    title: {
      en: "Industrial Rooftop Retrofit",
      ar: "تحديث أنظمة الطاقة لأسطح صناعية",
    },
    image: "/project2.jpg",
  },
  {
    title: {
      en: "Multi-site Hospitality Rollout",
      ar: "تنفيذ مشاريع ضيافة متعددة المواقع",
    },
    image: "/project3.jpg",
  },
  {
    title: {
      en: "Utility-Scale Expansion",
      ar: "توسعة على مستوى المرافق العامة",
    },
    image: "/project4.jpg",
  },
];

export default function ProjectsSection() {
  const isAmharic = useLocale() === "ar";

  return (
    <section className="bg-slate-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {isAmharic ? "مشاريع مميزة" : "Featured Projects"}
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <motion.article
              key={project.title.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-xl shadow-lg"
            >
              <Image
                src={project.image}
                alt={isAmharic ? project.title.ar : project.title.en}
                width={900}
                height={1200}
                className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

              <h3 className="absolute bottom-4 left-4 right-4 text-lg font-semibold text-white">
                {isAmharic ? project.title.ar : project.title.en}
              </h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
