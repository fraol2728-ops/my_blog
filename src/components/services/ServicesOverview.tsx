"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Factory, PackageCheck, ShieldCheck, SunMedium } from "lucide-react";
import { useLocale } from "@/i18n/I18nProvider";

const iconMap = {
  installation: SunMedium,
  supply: PackageCheck,
  manufacturing: Factory,
  maintenance: ShieldCheck,
} as const;

type IconName = keyof typeof iconMap;

export type ServiceOverviewItem = {
  id: string;
  title: string;
  summary: string;
  iconName: IconName;
};

type ServicesOverviewProps = {
  services: ServiceOverviewItem[];
};

export default function ServicesOverview({ services }: ServicesOverviewProps) {
  const isAmharic = useLocale() === ("am" as string);

  return (
    <section id="services-overview" className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16a34a]">
            {isAmharic ? "የአገልግሎት አጠቃላይ እይታ" : "Services Overview"}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {isAmharic ? "የሚፈልጉትን መፍትሄ ይምረጡ" : "Choose the Solution You Need"}
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {services.map((item) => {
            const Icon = iconMap[item.iconName];

            return (
              <motion.div
                key={item.id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`#${item.id}`}
                  className="block rounded-xl border border-slate-200 bg-white p-6 shadow-lg transition hover:border-green-200"
                >
                  <Icon className="h-8 w-8 text-[#16a34a]" />
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.summary}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
