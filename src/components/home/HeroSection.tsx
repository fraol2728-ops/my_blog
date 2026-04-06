"use client";

import { useState } from "react";
import { Post } from "@/types";
import { LazyMotion, domAnimation, m } from "motion/react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Bolt, Lightbulb } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

type HeroSectionProps = {
  latestPost?: Post | null;
};

export default function HeroSection({ latestPost }: HeroSectionProps) {
  const [isEnergyOn, setIsEnergyOn] = useState(true);

  const newsTitle = latestPost?.title || "Stay tuned for the latest renewable energy updates";
  const newsDate = latestPost?.publishedAt ? dayjs(latestPost.publishedAt).format("MMMM D, YYYY") : "Updated daily";
  const newsAuthor = latestPost?.author?.name || "Solara Editorial";
  const newsSlug = latestPost?.slug ? `/post/${latestPost.slug}` : "/news";

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative isolate overflow-hidden bg-white text-slate-900">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(240,253,244,0.92) 65%, rgba(220,252,231,0.78) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute right-[-10%] top-16 h-[22rem] w-[22rem] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(22, 163, 74, 0.2) 0%, rgba(22, 163, 74, 0) 70%)",
            filter: "blur(20px)",
          }}
        />

        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center gap-14 px-4 pt-24 pb-12 md:grid-cols-2 md:gap-10 md:px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            className="text-center md:text-left"
          >
            <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Premium Solar Infrastructure
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
              Powering the Future with Intelligent Solar Energy
            </h1>

            <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-slate-600 md:mx-0">
              Advanced solar solutions for homes, industries, and governments with reliable, elegant,
              and sustainable energy systems.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <Link
                href="/contact"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-center font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 active:translate-y-0"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/services"
                className="rounded-xl border border-emerald-300 bg-white/80 px-6 py-3 text-center font-semibold text-emerald-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50 active:translate-y-0"
              >
                Explore Services
              </Link>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.12, ease: "easeInOut" }}
            className="relative flex items-center justify-center pb-28 md:pb-24"
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[18rem] w-[18rem] rounded-full bg-emerald-200/40 blur-3xl md:h-[22rem] md:w-[22rem]" />
            </div>

            <div className="relative z-10 flex h-[320px] w-full max-w-md items-center justify-center overflow-hidden rounded-3xl border border-emerald-100/80 bg-white/80 shadow-[0_30px_90px_-50px_rgba(22,163,74,0.55)] backdrop-blur-sm md:h-[430px]">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white/90 to-emerald-100/40" />

              <m.div
                initial={{ y: -58, opacity: 0 }}
                animate={{ y: [-58, -14, -20, -14], opacity: [0, 1, 1, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
                className="absolute top-8 z-20"
                style={{
                  filter: "drop-shadow(0 0 12px rgba(34,197,94,0.52))",
                }}
              >
                <Bolt className="h-10 w-10 text-emerald-500" strokeWidth={2.3} />
              </m.div>

              <m.div
                animate={{ rotate: 360 }}
                transition={{ duration: isEnergyOn ? 14 : 36, repeat: Infinity, ease: "linear" }}
                className="absolute z-10 h-44 w-44 rounded-full border border-emerald-300/70 md:h-52 md:w-52"
              />
              <m.div
                animate={{ rotate: -360 }}
                transition={{ duration: isEnergyOn ? 11 : 32, repeat: Infinity, ease: "linear" }}
                className="absolute z-10 h-56 w-56 rounded-full border border-emerald-200/70 border-dashed md:h-64 md:w-64"
              />
              <m.div
                animate={{ scale: isEnergyOn ? [1, 1.1, 1] : [1, 1.02, 1], opacity: isEnergyOn ? [0.5, 0.85, 0.5] : [0.2, 0.35, 0.2] }}
                transition={{ duration: isEnergyOn ? 2.8 : 6.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-0 h-36 w-36 rounded-full bg-gradient-to-br from-emerald-300/55 via-emerald-200/30 to-lime-100/25 blur-lg md:h-40 md:w-40"
              />

              <div className="absolute bottom-16 z-20 flex flex-col items-center gap-5 md:bottom-20">
                <m.div
                  animate={
                    isEnergyOn
                      ? { scale: [1, 1.06, 1], opacity: [0.95, 1, 0.95] }
                      : { scale: 1, opacity: 0.45 }
                  }
                  transition={{ duration: isEnergyOn ? 2.2 : 0.4, repeat: isEnergyOn ? Infinity : 0, ease: "easeInOut" }}
                  className="relative"
                >
                  <div
                    className="absolute inset-[-14px] rounded-full"
                    style={{
                      background: isEnergyOn
                        ? "radial-gradient(circle, rgba(253,224,71,0.42) 0%, rgba(34,197,94,0.22) 50%, rgba(34,197,94,0) 80%)"
                        : "none",
                      filter: "blur(8px)",
                    }}
                  />
                  <Lightbulb className={`relative h-14 w-14 ${isEnergyOn ? "text-emerald-500" : "text-slate-400"}`} strokeWidth={1.9} />
                </m.div>

                <button
                  type="button"
                  onClick={() => setIsEnergyOn((prev) => !prev)}
                  aria-label={isEnergyOn ? "Turn energy system off" : "Turn energy system on"}
                  aria-pressed={isEnergyOn}
                  className={`relative h-9 w-16 rounded-full border transition-colors duration-300 ${
                    isEnergyOn ? "border-emerald-300 bg-emerald-500/85" : "border-slate-300 bg-slate-300/80"
                  }`}
                >
                  <m.span
                    layout
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    className="absolute top-1.5 h-6 w-6 rounded-full bg-white shadow-md"
                    style={{ left: isEnergyOn ? "calc(100% - 1.85rem)" : "0.35rem" }}
                  />
                </button>
              </div>
            </div>

            <m.article
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: [0, -4, 0] }}
              transition={{ opacity: { duration: 0.75, delay: 0.35, ease: "easeInOut" }, y: { duration: 4.6, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute bottom-0 left-1/2 z-30 hidden w-full max-w-lg -translate-x-1/2 gap-4 rounded-xl border border-white/60 bg-white/40 p-4 text-slate-900 shadow-xl shadow-emerald-900/10 backdrop-blur-md md:flex"
            >
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                {latestPost?.mainImage ? (
                  <Image
                    src={urlFor(latestPost.mainImage).width(320).height(220).url()}
                    alt={latestPost.title || "Latest news thumbnail"}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-emerald-100 to-lime-50" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-1 text-sm font-semibold leading-5 text-slate-900">{newsTitle}</h3>
                <p className="mt-1 text-xs text-slate-500">
                  {newsDate} · {newsAuthor}
                </p>
                <Link href={newsSlug} className="mt-2 inline-flex text-xs font-semibold text-emerald-700 hover:text-emerald-600">
                  Read more →
                </Link>
              </div>
            </m.article>
          </m.div>
        </div>

        <div className="px-4 pb-12 md:hidden">
          <m.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            whileHover={{ y: -2 }}
            className="mx-auto mt-2 flex w-full max-w-lg gap-4 rounded-xl border border-white/70 bg-white/50 p-4 text-slate-900 shadow-lg shadow-emerald-900/10 backdrop-blur-md"
          >
            <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">
              {latestPost?.mainImage ? (
                <Image
                  src={urlFor(latestPost.mainImage).width(280).height(200).url()}
                  alt={latestPost.title || "Latest news thumbnail"}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-emerald-100 to-lime-50" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-1 text-sm font-semibold">{newsTitle}</h3>
              <p className="mt-1 text-xs text-slate-500">
                {newsDate} · {newsAuthor}
              </p>
              <Link href={newsSlug} className="mt-2 inline-flex text-xs font-semibold text-emerald-700 hover:text-emerald-600">
                Read more →
              </Link>
            </div>
          </m.article>
        </div>
      </section>
    </LazyMotion>
  );
}
