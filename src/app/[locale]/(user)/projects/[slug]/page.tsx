export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import type { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";

import { isValidLocale } from "@/i18n/config";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getProjectBySlug } from "@/sanity/queries";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { Project } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) notFound();

  const project = (await getProjectBySlug(slug)) as Project | null;

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const pageTitle = `${project.title} | Solar Case Study`;
  const description = project.overview;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: `/${locale}/projects/${project.slug}`,
    },
    openGraph: {
      type: "article",
      title: pageTitle,
      description,
      siteName: SITE_NAME,
      url: `${SITE_URL}/${locale}/projects/${project.slug}`,
      images: project.mainImage
        ? [
            {
              url: urlFor(project.mainImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: project.mainImage?.alt ?? project.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const project = (await getProjectBySlug(slug)) as Project | null;

  if (!project) {
    notFound();
  }

  const heroImage = project.mainImage ? urlFor(project.mainImage).width(1800).height(1100).url() : null;
  const gallery = project.gallery ?? [];

  return (
    <div className="bg-white py-12 sm:py-16">
      <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}/projects`} className="text-sm font-medium text-green-700 hover:text-green-800">
          ← Back to Projects
        </Link>

        <header className="mt-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-green-700">
            {project.category}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{project.title}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
            <p className="inline-flex items-center gap-1"><MapPin className="size-4" /> {project.location}</p>
            <p>{dayjs(project.date).format("MMMM D, YYYY")}</p>
            <p>{project.capacity}</p>
          </div>
        </header>

        {heroImage && (
          <div className="relative mt-8 overflow-hidden rounded-3xl border border-slate-200">
            <Image
              src={heroImage}
              alt={project.mainImage?.alt ?? project.title}
              width={1800}
              height={1100}
              priority
              className="h-[420px] w-full object-cover sm:h-[520px]"
            />
          </div>
        )}

        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-2xl font-semibold text-slate-900">Overview</h2>
            <p className="mt-4 leading-7 text-slate-600">{project.overview}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-2xl font-semibold text-slate-900">The Challenge</h2>
            <p className="mt-4 leading-7 text-slate-600">{project.challenge}</p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">The Solution</h2>
          <p className="mt-4 leading-7 text-slate-600">{project.solution}</p>
        </section>

        <section className="mt-8 rounded-2xl border border-green-100 bg-green-50/60 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">Results</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Energy Output</p>
              <p className="mt-2 text-2xl font-semibold text-green-700">{project.results?.energyOutput ?? "—"}</p>
            </div>
            <div className="rounded-xl bg-white p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">People Served</p>
              <p className="mt-2 text-2xl font-semibold text-green-700">{project.results?.peopleServed ?? "—"}</p>
            </div>
            <div className="rounded-xl bg-white p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Cost Savings</p>
              <p className="mt-2 text-2xl font-semibold text-green-700">{project.results?.costSavings ?? "—"}</p>
            </div>
          </div>
        </section>

        <ProjectGallery images={gallery} title={project.title} />

        <section className="mt-16 rounded-3xl border border-green-100 bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-12 text-white">
          <h2 className="text-3xl font-semibold">Start Your Project</h2>
          <p className="mt-3 max-w-2xl text-white/90">
            Talk to our team about a custom solar design tailored to your facility, budget, and long-term energy goals.
          </p>
          <Link
            href={`/${locale}/contact`}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
          >
            Start Your Project <ArrowRight className="size-4" />
          </Link>
        </section>
      </article>
    </div>
  );
}
