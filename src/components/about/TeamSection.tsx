"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useLocale } from "@/i18n/I18nProvider";

const team = [
  { name: "Alicia Morgan", role: "Chief Executive Officer", image: "/project1.jpg" },
  { name: "Daniel Reyes", role: "Director of Engineering", image: "/project2.jpg" },
  { name: "Maya Patel", role: "Head of Sustainability", image: "/project3.jpg" },
  { name: "Ethan Brooks", role: "Operations Director", image: "/project4.jpg" },
];

export default function TeamSection() {
  const isAmharic = useLocale() === ("am" as string);
  return (
    <section id="leadership" className="px-6 py-20 scroll-mt-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16a34a]">
            {isAmharic ? "የአመራር ቡድን" : "Leadership Team"}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {isAmharic ? "የኃይል ለውጥን የሚመሩ ባለልምድ መሪዎች" : "Experienced Leaders Driving Energy Transformation"}
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
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {team.map((member) => (
            <motion.article
              key={member.name}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -5 }}
              className="overflow-hidden rounded-xl bg-white shadow-lg"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{member.role}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
