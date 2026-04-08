"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/i18n/I18nProvider";

export type ServiceDetail = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
};

type ServiceBlockProps = {
  service: ServiceDetail;
  reverse?: boolean;
};

export default function ServiceBlock({ service, reverse = false }: ServiceBlockProps) {
  const isAmharic = useLocale() === "am";

  return (
    <motion.article
      id={service.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="scroll-mt-28"
    >
      <div className="grid items-center gap-10 rounded-xl bg-white p-8 shadow-lg md:grid-cols-2 md:p-12">
        <div className={reverse ? "order-1 md:order-2" : "order-1"}>
          <div className="overflow-hidden rounded-xl">
            <Image
              src={service.image}
              alt={service.imageAlt}
              width={1200}
              height={900}
              className="h-[320px] w-full object-cover transition duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className={reverse ? "order-2 md:order-1" : "order-2"}>
          <h3 className="text-3xl font-semibold tracking-tight text-slate-900">
            {service.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            {service.description}
          </p>
          <ul className="mt-6 space-y-3">
            {service.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#16a34a]" />
                <span className="text-sm text-slate-700 sm:text-base">{bullet}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-7 inline-flex rounded-xl bg-[#16a34a] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-600"
          >
            {isAmharic ? "ከባለሙያ ጋር ይነጋገሩ" : "Talk to an Expert"}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
