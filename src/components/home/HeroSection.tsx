"use client";

import { Post } from "@/types";
import { motion } from "motion/react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

type HeroSectionProps = {
  latestPost?: Post | null;
};

export default function HeroSection({ latestPost }: HeroSectionProps) {
  const newsTitle = latestPost?.title || "Stay tuned for the latest renewable energy updates";
  const newsDate = latestPost?.publishedAt ? dayjs(latestPost.publishedAt).format("MMMM D, YYYY") : "Updated daily";
  const newsExcerpt =
    latestPost?.excerpt || "Discover project milestones, market insights, and solar innovation announcements.";
  const newsSlug = latestPost?.slug ? `/post/${latestPost.slug}` : "/news";

  return (
    <section className="relative isolate overflow-hidden bg-white text-slate-900">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 10% 0%, rgba(220, 252, 231, 0.75) 0%, rgba(255, 255, 255, 0.96) 45%, rgba(255, 255, 255, 1) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-[-10%] top-16 h-[22rem] w-[22rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34, 197, 94, 0.16) 0%, rgba(34, 197, 94, 0) 68%)",
          filter: "blur(18px)",
        }}
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center gap-14 px-4 pt-24 pb-20 md:grid-cols-2 md:gap-10 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
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
              className="rounded-xl border border-emerald-200 bg-white px-6 py-3 text-center font-semibold text-emerald-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 active:translate-y-0"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.12, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[22rem] w-[22rem] rounded-full bg-emerald-200/35 blur-3xl" />
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 flex h-[330px] w-full max-w-md items-center justify-center overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_25px_80px_-50px_rgba(16,185,129,0.6)] md:h-[430px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/40" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              className="absolute h-64 w-64 rounded-full border border-emerald-200/80 border-dashed"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute h-44 w-44 rounded-full border border-emerald-300/80"
            />
            <div className="relative z-10 flex flex-col items-center gap-3 text-center">
              <div className="grid h-20 w-20 place-items-center rounded-2xl bg-emerald-600 text-3xl text-white shadow-lg shadow-emerald-500/35">
                ⚡
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Live Energy Flow</p>
              <p className="max-w-[220px] text-sm leading-6 text-slate-600">
                Smart, connected generation and storage designed for resilient clean power.
              </p>
            </div>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: "easeOut" }}
            className="absolute bottom-[-26px] left-1/2 hidden w-full max-w-lg -translate-x-1/2 gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-slate-900 shadow-xl shadow-slate-200/80 md:flex"
          >
            <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100">
              {latestPost?.mainImage ? (
                <Image
                  src={urlFor(latestPost.mainImage).width(320).height(220).url()}
                  alt={latestPost.title || "Latest news thumbnail"}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-emerald-100 to-slate-100" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">Latest News</p>
              <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-slate-900">{newsTitle}</h3>
              <p className="mt-1 text-xs text-slate-500">{newsDate}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600">{newsExcerpt}</p>
              <Link href={newsSlug} className="mt-2 inline-flex text-xs font-semibold text-emerald-700 hover:text-emerald-600">
                Read update →
              </Link>
            </div>
          </motion.article>
        </motion.div>
      </div>

      <div className="px-4 pb-12 md:hidden">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mx-auto mt-2 flex w-full max-w-lg gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-slate-900 shadow-lg shadow-slate-200/80"
        >
          <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
            {latestPost?.mainImage ? (
              <Image
                src={urlFor(latestPost.mainImage).width(280).height(200).url()}
                alt={latestPost.title || "Latest news thumbnail"}
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-emerald-100 to-slate-100" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">Latest News</p>
            <h3 className="mt-1 line-clamp-2 text-sm font-bold">{newsTitle}</h3>
            <p className="mt-1 text-xs text-slate-500">{newsDate}</p>
            <p className="mt-1 line-clamp-2 text-xs text-slate-600">{newsExcerpt}</p>
            <Link href={newsSlug} className="mt-2 inline-flex text-xs font-semibold text-emerald-700 hover:text-emerald-600">
              Read update →
            </Link>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
