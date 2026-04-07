"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { LazyMotion, AnimatePresence, domAnimation, m } from "motion/react";
import { ArrowLeft, ArrowRight, Factory, TowerControl, Wrench, Zap } from "lucide-react";

const sliderImages = ["/project1.jpg", "/project2.jpg", "/project3.jpg", "/project4.jpg"];

const stats = [
  { icon: TowerControl, label: "Transmission Lines", value: 420, suffix: "+" },
  { icon: Wrench, label: "Ongoing Projects", value: 86, suffix: "" },
  { icon: Factory, label: "Completed Projects", value: 1375, suffix: "+" },
  { icon: Zap, label: "Substations", value: 210, suffix: "" },
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
      className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-4"
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
  latestPost?: unknown;
};

export default function HeroSection({ latestPost: _latestPost }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activeImage = useMemo(() => sliderImages[activeIndex], [activeIndex]);

  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % sliderImages.length);

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-screen overflow-hidden bg-black">
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
                alt="Master Premier renewable energy project"
                fill
                priority={activeIndex === 0}
                sizes="100vw"
                className="object-cover"
              />
            </m.div>
          </m.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-black/25" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 pb-44 pt-32 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-center md:text-left"
          >
            <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
              Clean Energy Infrastructure
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Powering the Future of Sustainable Energy
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/80 md:mx-0 md:text-lg">
              Delivering advanced solar and energy infrastructure solutions for industries, governments, and
              communities.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row md:justify-start">
              <Link
                href="/contact"
                className="rounded-xl bg-emerald-600 px-7 py-3.5 text-center font-semibold text-white shadow-lg shadow-emerald-600/35 transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-500"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/services"
                className="rounded-xl border border-white/60 bg-transparent px-7 py-3.5 text-center font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>
          </m.div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-8">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="pointer-events-auto rounded-full border border-white/25 bg-black/30 p-3 text-white/90 backdrop-blur transition hover:scale-105 hover:bg-black/50"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="pointer-events-auto rounded-full border border-white/25 bg-black/30 p-3 text-white/90 backdrop-blur transition hover:scale-105 hover:bg-black/50"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="absolute bottom-32 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "w-8 bg-emerald-500" : "w-2.5 bg-white/55 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 z-30 w-[92%] max-w-6xl -translate-x-1/2 md:bottom-6">
          <div className="rounded-2xl border border-white/15 bg-black/40 p-4 shadow-2xl shadow-black/35 backdrop-blur-lg md:p-6">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {stats.map((item, index) => (
                <StatItem key={item.label} {...item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
