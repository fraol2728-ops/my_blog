export const dynamic = "force-dynamic";

import { PortableText } from "next-sanity";
import { ArrowRight, BarChart3, CalendarDays, Lightbulb, MapPin, Sun, Zap } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import ProjectGallery from "@/components/projects/ProjectGallery";
import { Reveal } from "@/components/ui/reveal";
import { isValidLocale } from "@/i18n/config";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getProjectBySlug, getProjects } from "@/sanity/queries";
import { Project } from "@/types";

const portableTextComponents: any = {
  block: {
    h2: ({ children }: any) => <h2 className="mt-10 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{children}</h2>,
    h3: ({ children }: any) => <h3 className="mt-7 text-2xl font-semibold text-slate-900">{children}</h3>,
    normal: ({ children }: any) => <p className="mt-4 text-base leading-8 text-slate-700 sm:text-lg">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-slate-700 sm:text-lg">{children}</ul>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-emerald-700">{children}</strong>,
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

  const pageTitle = `${project.title} | Premium Solar Case Study`;
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

  const projects = ((await getProjects()) ?? []) as Project[];
  const relatedProjects = projects.filter((item) => item.slug !== project.slug).slice(0, 3);
  const heroImage = project.mainImage ? urlFor(project.mainImage).width(1900).height(1100).url() : null;
  const gallery = project.gallery ?? [];

  const metaItems = [
    { label: "Capacity", value: project.capacity ?? "—", icon: Zap },
    { label: "Year", value: project.year ?? "—", icon: CalendarDays },
    { label: "Location", value: project.location ?? "—", icon: MapPin },
    { label: "Type", value: project.projectType ?? "—", icon: Sun },
  ];

  return (
    <div className="bg-white pb-20">
      <article>
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <Link href={`/${locale}/projects`} className="text-sm font-medium text-green-700 hover:text-green-800">
            ← Back to Projects
          </Link>
        </div>

        <Reveal className="relative mt-6 overflow-hidden" delay={0.05}>
          {heroImage ? (
            <div className="relative h-[54vh] min-h-[380px] w-full sm:min-h-[480px]">
              <Image src={heroImage} alt={project.mainImage?.alt ?? project.title} fill priority className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/50 to-transparent" />
            </div>
          ) : (
            <div className="h-[54vh] min-h-[380px] bg-gradient-to-br from-slate-900 to-emerald-900" />
          )}

          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 text-white sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Case Study</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">{project.title}</h1>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-white sm:text-base">
              <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" /> {project.location}</span>
              <span className="inline-flex items-center gap-1.5"><Sun className="size-4" /> {project.projectType ?? "Solar Project"}</span>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-4" delay={0.08}>
            {metaItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                  <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    <Icon className="size-4" /> {item.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">{item.value}</p>
                </div>
              );
            })}
          </Reveal>

          <Reveal className="mx-auto mt-16 max-w-3xl" delay={0.1}>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Overview</h2>
            <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">{project.overview}</p>
          </Reveal>

          {!!project.stats?.length && (
            <Reveal className="mt-16" delay={0.12}>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Project Impact Metrics</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {project.stats.map((stat, index) => (
                  <div key={`${stat.label}-${index}`} className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6">
                    <p className="text-3xl font-bold text-emerald-700 sm:text-4xl">{stat.value}</p>
                    <p className="mt-3 text-sm font-medium uppercase tracking-[0.12em] text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal className="mt-16 grid gap-6 lg:grid-cols-2" delay={0.14}>
            <section className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-slate-900">Challenge</h3>
              <p className="mt-4 text-base leading-8 text-slate-700">{project.challenge}</p>
            </section>
            <section className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-slate-900">Solution</h3>
              <p className="mt-4 text-base leading-8 text-slate-700">{project.solution}</p>
            </section>
          </Reveal>

          <Reveal className="mt-16 rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-600 to-green-700 p-7 text-white sm:p-10" delay={0.16}>
            <h2 className="inline-flex items-center gap-2 text-3xl font-semibold tracking-tight"><BarChart3 className="size-7" /> Results</h2>
            <p className="mt-4 max-w-4xl text-base font-medium leading-8 text-emerald-50 sm:text-lg">{project.results}</p>
            <div className="mt-7">
              <Link
                href={`/${locale}/feasibility-study`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Start Feasibility Study <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          {gallery.length > 0 && (
            <Reveal className="mt-16" delay={0.18}>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Project Gallery</h2>
              <p className="mt-3 text-slate-600">A visual walkthrough of implementation and final delivery.</p>
              <div className="mt-8 [&_img]:transition-transform [&_img]:duration-500 hover:[&_img]:scale-[1.02]">
                <ProjectGallery images={gallery} title={project.title} />
              </div>
            </Reveal>
          )}

          {!!project.body?.length && (
            <Reveal className="mx-auto mt-16 max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-10" delay={0.2}>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Detailed Case Study</h2>
              <div className="mt-2">
                <PortableText value={project.body} components={portableTextComponents} />
              </div>
            </Reveal>
          )}

          {relatedProjects.length > 0 && (
            <Reveal className="mt-16" delay={0.22}>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Related Projects</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {relatedProjects.map((relatedProject) => {
                  const imageUrl = relatedProject.mainImage ? urlFor(relatedProject.mainImage).width(800).height(520).url() : null;

                  return (
                    <article key={relatedProject._id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <div className="relative h-48 overflow-hidden">
                        {imageUrl ? (
                          <Image src={imageUrl} alt={relatedProject.mainImage?.alt ?? relatedProject.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200" />
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-semibold text-slate-900">{relatedProject.title}</h3>
                        <p className="mt-2 text-sm text-slate-600">{relatedProject.location}</p>
                        <Link
                          href={`/${locale}/projects/${relatedProject.slug}`}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition group-hover:translate-x-1"
                        >
                          View Project <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </Reveal>
          )}

          <Reveal className="mt-16 rounded-3xl border border-emerald-100 bg-slate-950 px-6 py-12 text-white sm:px-10" delay={0.24}>
            <h2 className="text-3xl font-semibold">Have a Similar Project in Mind?</h2>
            <p className="mt-3 max-w-2xl text-white/80">We can validate your site, optimize your system design, and deliver a clear technical and financial plan.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400">
                Request Consultation
              </Link>
              <Link href={`/${locale}/feasibility-study`} className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Get Free Feasibility Study
              </Link>
            </div>
            <div className="mt-6 rounded-2xl border border-white/20 bg-white/5 p-4">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-200">
                <Lightbulb className="size-4" /> Want to know if solar works for your site?
              </p>
              <Link href={`/${locale}/feasibility-study`} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white">
                Start Feasibility Study <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </article>
    </div>
  );
}
