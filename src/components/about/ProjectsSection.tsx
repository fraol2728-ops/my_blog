"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useLocale } from "@/i18n/I18nProvider";

const projects = [
  { title: "North Ridge Logistics Hub", type: "Commercial Solar", image: "/project1.jpg" },
  { title: "Sunline Manufacturing Campus", type: "Industrial Retrofit", image: "/project2.jpg" },
  { title: "Green Valley Municipality", type: "Public Infrastructure", image: "/project3.jpg" },
  { title: "Harbor Tech Park", type: "Corporate Energy Program", image: "/project4.jpg" },
];

export default function ProjectsSection() {
  const isAmharic = useLocale() === "am";
  return (
    <section id="our-projects" className="bg-slate-50 px-6 py-20 scroll-mt-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16a34a]">
            {isAmharic ? "ተመራጭ ፕሮጀክቶች" : "Featured Projects"}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {isAmharic ? "በተለያዩ የኃይል አካባቢዎች የተረጋገጠ አፈጻጸም" : "Proven Delivery Across Diverse Energy Environments"}
          </h2>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-xl shadow-lg"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={1200}
                height={900}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-900/80 via-slate-900/25 to-transparent p-6 opacity-95 transition group-hover:opacity-100">
                <div>
                  <p className="text-sm font-medium text-green-300">{project.type}</p>
                  <h3 className="mt-1 text-xl font-semibold text-white">{project.title}</h3>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
