export const dynamic = "force-dynamic";

import { PortableText } from "next-sanity";
import dayjs from "dayjs";
import { ArrowRight, BadgeCheck, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import ProjectGallery from "@/components/projects/ProjectGallery";
import StickyProjectCTA from "@/components/projects/StickyProjectCTA";
import { Reveal } from "@/components/ui/reveal";
import { isValidLocale } from "@/i18n/config";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getProjectBySlug } from "@/sanity/queries";
import { Project } from "@/types";

const portableTextComponents: any = {
  block: {
    h2: ({ children }: any) => <h2 className="mt-12 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{children}</h2>,
    h3: ({ children }: any) => <h3 className="mt-8 text-2xl font-semibold text-slate-900">{children}</h3>,
    normal: ({ children }: any) => <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="mt-5 max-w-3xl list-disc space-y-2 pl-6 text-base leading-8 text-slate-700 sm:text-lg">{children}</ul>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-green-700">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-slate-800">{children}</em>,
  },
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlFor(value).width(1400).height(900).url();
      return (
        <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/60">
          <Image src={imageUrl} alt={value.alt ?? "Project content image"} width={1400} height={900} className="h-auto w-full object-cover" />
        </div>
      );
    },
  },
};

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

        <Reveal className="mt-6">
          <div className="flex flex-wrap gap-2">
            <p className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-green-700">
              {project.category}
            </p>
            {project.isVerified && (
              <p className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <BadgeCheck className="size-3.5" /> Verified Project
              </p>
            )}
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{project.title}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
            <p className="inline-flex items-center gap-1">
              <MapPin className="size-4" /> {project.location}
            </p>
            <p>{dayjs(project.date).format("MMMM D, YYYY")}</p>
            <p className="font-semibold text-green-700">{project.capacity}</p>
          </div>
        </Reveal>

        {heroImage && (
          <Reveal className="relative mt-8 overflow-hidden rounded-3xl border border-slate-200" delay={0.08}>
            <Image
              src={heroImage}
              alt={project.mainImage?.alt ?? project.title}
              width={1800}
              height={1100}
              priority
              className="h-[360px] w-full object-cover sm:h-[520px]"
            />
          </Reveal>
        )}

        <Reveal className="mt-12 rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8" delay={0.1}>
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Project Details</h2>
          {project.body?.length ? (
            <div className="mt-4 space-y-2">
              <PortableText value={project.body} components={portableTextComponents} />
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              <p className="max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">{project.overview}</p>
              <p className="max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">{project.challenge}</p>
              <p className="max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">{project.solution}</p>
            </div>
          )}
        </Reveal>

        <Reveal className="mt-8 rounded-3xl border border-green-100 bg-green-50/60 p-6 sm:p-8" delay={0.12}>
          <h2 className="text-2xl font-semibold text-slate-900">Results Snapshot</h2>
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
        </Reveal>

        <Reveal delay={0.14}>
          <ProjectGallery images={gallery} title={project.title} />
        </Reveal>

        <Reveal className="mt-16 rounded-3xl border border-green-100 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-10 text-white sm:px-8 sm:py-12" delay={0.16}>
          <h2 className="text-3xl font-semibold">Start Your Own Solar Project</h2>
          <p className="mt-3 max-w-2xl text-white/90">We&apos;ll design a system around your site, load profile, timeline, and long-term savings goals.</p>
          <Link href={`/${locale}/contact`} className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50">
            Request Free Consultation <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </article>

      <StickyProjectCTA href={`/${locale}/contact`} />
    </div>
  );
}
