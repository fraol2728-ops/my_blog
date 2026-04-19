"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { LazyMotion, AnimatePresence, domAnimation, m } from "motion/react";
import { Smile, Wrench, Zap } from "lucide-react";
import { useLocale } from "@/i18n/I18nProvider";
import { urlFor } from "@/sanity/lib/image";
import type { Project } from "@/types";

const sliderImages = ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg", "/slide4.jpg"];

const stats = [
  { icon: Zap, label: "Energy Generated", value: 50, suffix: "MW" },
  { icon: Smile, label: "Client Satisfaction", value: 98, suffix: "%" },
  { icon: Wrench, label: "Years Experience", value: 10, suffix: "+" },
];

function useCountUp(end: number, duration = 1700) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId = 0;
    const start = performance.now();

    const update = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(end * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      }
    };

    frameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameId);
  }, [end, duration]);

  return count;
}

function StatItem({
  icon: Icon,
  label,
  value,
  suffix,
  index,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: number;
  suffix: string;
  index: number;
}) {
  const count = useCountUp(value, 1300 + index * 200);

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15 + index * 0.1 }}
      className="flex w-full max-w-[320px] flex-1 items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-4"
    >
      <div className="rounded-lg bg-emerald-500/20 p-2.5 text-emerald-300">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-semibold text-white sm:text-3xl">
          {count}
          {suffix}
        </p>
        <p className="text-sm text-white/75">{label}</p>
      </div>
    </m.div>
  );
}

type HeroSectionProps = {
  featuredProject: Project | null;
};

export default function HeroSection({ featuredProject }: HeroSectionProps) {
  const locale = useLocale();
  const isAmharic = locale === "am";
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activeImage = useMemo(() => sliderImages[activeIndex], [activeIndex]);
  const localizedStats = useMemo(
    () =>
      stats.map((item) => ({
        ...item,
        label:
          isAmharic
            ? {
                "Energy Generated": "የተመነጨ ኃይል",
                "Client Satisfaction": "የደንበኛ እርካታ",
                "Years Experience": "የልምድ ዓመታት",
              }[item.label] ?? item.label
            : item.label,
      })),
    [isAmharic],
  );

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-[calc(100svh-var(--site-header-height,0px))] overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <m.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <m.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 5.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={activeImage}
                alt="Master Premier Green Energy renewable energy project"
                fill
                priority={activeIndex === 0}
                sizes="100vw"
                className="object-cover"
              />
            </m.div>
          </m.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-black/35" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        <div className="relative mx-auto flex min-h-[calc(100svh-var(--site-header-height,0px))] w-full max-w-7xl items-center px-6 pb-8 pt-[clamp(2rem,3vw,3rem)] md:pb-12 lg:px-8">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10">
            <m.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl text-center md:text-left"
            >
              <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                {isAmharic ? "የንፁህ ኃይል መሠረተ ልማት" : "Clean Energy Infrastructure"}
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Master Premier Green Energy Co. Ltd
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/80 md:mx-0 md:text-lg">
                {isAmharic
                  ? "በደቡብ ሱዳን ውስጥ የታዳሽ ኃይል ተደራሽነትን ለማሳደግ የምህንድስና፣ አማካሪ፣ ተከላ እና የጥገና አገልግሎቶችን እንሰጣለን።"
                  : "Delivering engineering, advisory, installation and servicing solutions for renewable energy access across South Sudan."}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row md:justify-start">
                <Link
                  href={`/${locale}/contact`}
                  className="ui-glow-btn rounded-xl bg-emerald-600 px-7 py-3.5 text-center font-semibold text-white shadow-lg shadow-emerald-600/35 transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-500"
                >
                  {isAmharic ? "ነፃ የዋጋ ጥያቄ ያቅርቡ" : "Get a Free Quote"}
                </Link>
                <Link
                  href={`/${locale}/services`}
                  className="ui-glow-btn rounded-xl border border-white/60 bg-transparent px-7 py-3.5 text-center font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white/10"
                >
                  {isAmharic ? "አገልግሎቶቻችንን ይመልከቱ" : "Explore Services"}
                </Link>
              </div>
            </m.div>

            {featuredProject?.slug && (
              <m.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                className="hidden lg:block"
              >
                <Link
                  href={`/${locale}/projects/${featuredProject.slug}`}
                  className="ui-glow-card group relative block overflow-hidden rounded-3xl border border-white/35 bg-white/10 p-3 text-white shadow-[0_0_35px_rgba(16,185,129,0.25)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/80 hover:shadow-[0_0_48px_rgba(16,185,129,0.4)]"
                >
                  <m.div
                    animate={{ opacity: [0.2, 0.45, 0.2] }}
                    transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
                    className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-emerald-400/35 blur-3xl"
                  />
                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/90">
                      {isAmharic ? "ተመራጭ ፕሮጀክት" : "Featured Project"}
                    </p>

                    <div className="mt-2.5 overflow-hidden rounded-2xl border border-white/20">
                      {featuredProject.mainImage ? (
                        <Image
                          src={urlFor(featuredProject.mainImage).width(900).height(540).url()}
                          alt={featuredProject.title || "Featured project image"}
                          width={900}
                          height={540}
                          className="aspect-[16/8] w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="aspect-[16/9] w-full bg-gradient-to-br from-emerald-500/25 to-slate-900/90" />
                      )}
                    </div>

                    <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-tight text-white">
                      {featuredProject.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/80">
                      {featuredProject.overview}
                    </p>

                    <span className="mt-3.5 inline-flex items-center rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white transition group-hover:border-emerald-300 group-hover:bg-emerald-500/20">
                      {isAmharic ? "ፕሮጀክቱን ይመልከቱ" : "View project"}
                    </span>
                  </div>
                </Link>
              </m.div>
            )}
          </div>
        </div>

        <div className="relative z-20 mx-auto mt-1 flex w-fit gap-2.5 md:mt-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={isAmharic ? `${index + 1}ኛው ስላይድ ይክፈቱ` : `Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "w-8 bg-emerald-500" : "w-2.5 bg-white/55 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        <div className="relative z-30 mx-auto mt-3 w-[92%] max-w-6xl pb-8 md:mt-4">
          <div className="rounded-2xl border border-white/15 bg-black/40 p-4 shadow-2xl shadow-black/35 backdrop-blur-lg md:p-6">
            <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3 lg:gap-4">
              {localizedStats.map((item, index) => (
                <StatItem key={item.label} {...item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
