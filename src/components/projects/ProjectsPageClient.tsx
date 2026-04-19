"use client";

import { Project, ProjectCategory } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, BadgeCheck, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import clsx from "clsx";
import ImpactCounters from "./ImpactCounters";
import ProjectMap from "./ProjectMap";
import StickyProjectCTA from "./StickyProjectCTA";
import { useLanguage } from "@/context/language";
import { getLocalizedValue } from "@/lib/language";

type CategoryFilter = "all" | ProjectCategory;
type CapacityFilter = "all" | "small" | "mid" | "large";

const categoryLabels: Record<CategoryFilter, string> = {
  all: "All",
  residential: "Residential",
  commercial: "Commercial",
  government: "Government",
  industrial: "Industrial",
};

const capacityLabels: Record<CapacityFilter, string> = {
  all: "Any Capacity",
  small: "0 - 100 kW",
  mid: "101 - 500 kW",
  large: "500+ kW",
};

const toTitleCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
const parseCapacity = (capacity: string) => Number.parseInt(capacity.replace(/[^0-9]/g, ""), 10) || 0;
const projectCountry = (location: string) => location.split(",").at(-1)?.trim() ?? location;

export default function ProjectsPageClient({
  projects,
  locale,
}: {
  projects: Project[];
  locale: string;
}) {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [activeCountry, setActiveCountry] = useState<string>("all");
  const [activeCapacity, setActiveCapacity] = useState<CapacityFilter>("all");
  const [keyword, setKeyword] = useState("");

  const featuredProjects = useMemo(() => projects.filter((project) => project.featured).slice(0, 3), [projects]);

  const countries = useMemo(
    () => Array.from(new Set(projects.map((project) => projectCountry(project.location)))).sort(),
    [projects],
  );

  const filteredProjects = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return projects.filter((project) => {
      const projectCategory = project.category ?? project.projectType;
      const categoryMatch = activeCategory === "all" || projectCategory === activeCategory;
      const countryMatch = activeCountry === "all" || projectCountry(project.location) === activeCountry;

      const projectCapacity = parseCapacity(project.capacity);
      const capacityMatch =
        activeCapacity === "all" ||
        (activeCapacity === "small" && projectCapacity <= 100) ||
        (activeCapacity === "mid" && projectCapacity > 100 && projectCapacity <= 500) ||
        (activeCapacity === "large" && projectCapacity > 500);

      const searchMatch =
        !normalizedKeyword ||
        [getLocalizedValue(project.title, lang, ""), project.location, getLocalizedValue(project.overview, lang, ""), projectCategory, project.capacity]
          .join(" ")
          .toLowerCase()
          .includes(normalizedKeyword);

      return categoryMatch && countryMatch && capacityMatch && searchMatch;
    });
  }, [activeCapacity, activeCategory, activeCountry, keyword, projects]);

  const totalKwInstalled = projects.reduce((sum, project) => sum + parseCapacity(project.capacity), 0);

  const counters = [
    { label: "Total Projects", value: projects.length, suffix: "+" },
    { label: "Total kW Installed", value: totalKwInstalled, suffix: "+" },
    { label: "Customers Served", value: projects.length * 8, suffix: "+" },
    { label: "CO₂ Saved (tons/year)", value: projects.length * 15, suffix: "+" },
  ];

  return (
    <div className={clsx("bg-white pb-20 transition-all duration-300", lang === "ar" ? "text-right" : "text-left")}>
      <section className="relative overflow-hidden border-b border-green-100/70 bg-gradient-to-br from-white via-green-50/60 to-emerald-50/70 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-600">Case Studies</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Premium Projects Experience</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              A startup-grade portfolio with interactive mapping, rich filtering, and measurable impact intelligence.
            </p>
          </motion.div>

          <motion.div
            className="ui-glow-card relative h-[280px] overflow-hidden rounded-3xl border border-green-100 bg-white p-6 shadow-subtle sm:h-[360px]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <motion.div className="absolute -right-12 -top-12 size-52 rounded-full bg-green-100/80" animate={{ y: [0, -12, 0], x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} />
            <motion.div className="absolute -bottom-16 -left-16 size-64 rounded-full bg-emerald-200/60" animate={{ y: [0, 10, 0], x: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }} />
            <div className="relative h-full rounded-2xl border border-green-100 bg-[radial-gradient(circle_at_top_right,rgba(22,163,74,0.15),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.16),transparent_40%)] p-6">
              <p className="text-sm font-medium text-green-700">Live Deployment Snapshot</p>
              <div className="mt-6 space-y-4">
                {[["System uptime", "99.2%"], ["Avg. savings", "41%"], ["Energy reliability", "24/7"]].map((item) => (
                  <div key={item[0]} className="rounded-xl bg-white/80 p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.15em] text-slate-500">{item[0]}</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-900">{item[1]}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <label className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Search by title, location, category..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm"
              />
            </label>

            <select value={activeCountry} onChange={(event) => setActiveCountry(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700">
              <option value="all">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>

            <select value={activeCapacity} onChange={(event) => setActiveCapacity(event.target.value as CapacityFilter)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700">
              {(Object.keys(capacityLabels) as CapacityFilter[]).map((filter) => (
                <option key={filter} value={filter}>{capacityLabels[filter]}</option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2">
              {(Object.keys(categoryLabels) as CategoryFilter[]).map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={clsx(
                    "rounded-full border px-4 py-2 text-xs font-medium transition",
                    activeCategory === category ? "border-green-600 bg-green-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-green-300 hover:text-green-700",
                  )}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Featured Projects</h2>
            <p className="mt-2 text-slate-600">Flagship deployments with verified outcomes and enterprise-grade execution.</p>
          </div>
        </div>
        <div className="mt-8 space-y-6">
          {featuredProjects.map((project, index) => {
            const imageUrl = project.mainImage ? urlFor(project.mainImage).width(1400).height(900).url() : null;
            return (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-green-200/40"
              >
                <div className="grid gap-0 md:grid-cols-[1.3fr_1fr]">
                  <div className="relative h-72 overflow-hidden md:h-full">
                    {imageUrl ? (
                      <Image src={imageUrl} alt={project.mainImage?.alt ?? getLocalizedValue(project.title, lang, "Project")} fill loading="lazy" className="object-cover transition duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="h-full w-full bg-slate-200" />
                    )}
                  </div>
                  <div className="p-7 sm:p-8">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-green-700">{toTitleCase(project.category ?? project.projectType ?? "project")}</span>
                      {project.isVerified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"><BadgeCheck className="size-3.5" /> Verified Project</span>
                      )}
                      {project.completionStatus && <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{project.completionStatus}</span>}
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold text-slate-900">{getLocalizedValue(project.title, lang, "")}</h3>
                    <p className="mt-2 text-sm text-slate-500">{project.location} · {project.capacity}</p>
                    <p className="mt-4 line-clamp-3 text-slate-600">{getLocalizedValue(project.overview, lang, "")}</p>
                    <Link href={`/${locale}/projects/${project.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition group-hover:translate-x-1">
                      View Case Study <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-slate-900">All Case Studies</h2>
        <p className="mt-2 text-slate-600">{filteredProjects.length} matching projects</p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const imageUrl = project.mainImage ? urlFor(project.mainImage).width(900).height(650).url() : null;
              return (
                <motion.article
                  layout
                  key={project._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  transition={{ duration: 0.25 }}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-green-200/40"
                >
                  <div className="relative h-56 overflow-hidden">
                    {imageUrl ? (
                      <Image src={imageUrl} alt={project.mainImage?.alt ?? getLocalizedValue(project.title, lang, "Project")} fill loading="lazy" className="object-cover transition duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="h-full w-full bg-slate-200" />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-green-700">{toTitleCase(project.category ?? project.projectType ?? "project")}</span>
                      {project.isVerified && <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Verified</span>}
                      {project.completionStatus && <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{project.completionStatus}</span>}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-slate-900">{getLocalizedValue(project.title, lang, "")}</h3>
                    <p className="mt-2 text-xs text-slate-500">{project.location} · {project.capacity}</p>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{getLocalizedValue(project.overview, lang, "")}</p>
                    <Link href={`/${locale}/projects/${project.slug}`} className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-200 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50">
                      View Case Study <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProjectMap projects={filteredProjects} locale={locale} />
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-green-100 bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-12 text-white">
          <h2 className="text-3xl font-semibold sm:text-4xl">Have a project in mind?</h2>
          <p className="mt-3 max-w-2xl text-white/90">Let&apos;s design a reliable solar solution that reduces your operating cost and increases long-term resilience.</p>
          <Link href={`/${locale}/contact`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50">
            Request a Quote <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ImpactCounters counters={counters} />
      </section>

      <StickyProjectCTA href={`/${locale}/contact`} />
    </div>
  );
}
