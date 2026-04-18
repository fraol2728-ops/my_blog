import { Button } from "@/components/button";
import { Reveal } from "@/components/ui/reveal";
import { urlFor } from "@/sanity/lib/image";
import { getFeasibilityPostBySlug } from "@/sanity/queries";
import type { FeasibilityPost } from "@/types";
import dayjs from "dayjs";
import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getFeasibilityPostBySlug(slug);

  if (!post) {
    return {
      title: "Feasibility study not found",
      description: "The requested feasibility study could not be found.",
    };
  }

  return {
    title: `${post.title} | Feasibility Study`,
    description: post.shortDescription,
    alternates: {
      canonical: `/feasibility-study/${slug}`,
    },
  };
}

export default async function FeasibilityStudyDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const post = (await getFeasibilityPostBySlug(slug)) as FeasibilityPost | null;

  if (!post) notFound();

  return (
    <main className="bg-white text-slate-900">
      <section className="section-shell pb-12">
        <Reveal>
          <Link href="/feasibility-study" className="text-sm font-semibold text-emerald-700">
            ← Back to feasibility insights
          </Link>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {post.category} • {dayjs(post.publishedAt).format("MMMM D, YYYY")}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-600">{post.shortDescription}</p>
          <div className="mt-8">
            <Button href="/en/contact?service=feasibility-study">Request Free Study</Button>
          </div>
        </Reveal>
      </section>

      {post.mainImage && (
        <section className="px-6">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Image
                src={urlFor(post.mainImage).width(1600).height(950).url()}
                alt={post.mainImage.alt ?? post.title}
                width={1600}
                height={950}
                className="w-full rounded-3xl object-cover"
              />
            </Reveal>
          </div>
        </section>
      )}

      <section className="section-shell">
        <Reveal>
          <article className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700">
            {post.content && (
              <PortableText
                value={post.content}
                components={{
                  types: {
                    image: ({ value }) => (
                      <Image
                        src={urlFor(value).width(1400).height(900).url()}
                        alt={value.alt || post.title}
                        width={1400}
                        height={900}
                        className="w-full rounded-2xl"
                      />
                    ),
                  },
                }}
              />
            )}
          </article>
        </Reveal>
      </section>

      {!!post.gallery?.length && (
        <section className="section-shell pt-0">
          <Reveal>
            <p className="ui-kicker">Gallery</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Study snapshots</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {post.gallery.map((image, index) => (
              <Reveal key={`${post._id}-${index}`} delay={index * 0.05}>
                <Image
                  src={urlFor(image).width(900).height(700).url()}
                  alt={image.alt ?? `${post.title} gallery image ${index + 1}`}
                  width={900}
                  height={700}
                  className="h-full min-h-52 w-full rounded-2xl object-cover"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="section-shell pt-2">
        <Reveal className="ui-card ui-glow-card overflow-hidden rounded-3xl bg-slate-950 px-8 py-12 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Next Step</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to validate your project with a tailored feasibility report?
          </h2>
          <p className="mt-4 max-w-2xl text-base text-slate-200">
            Share your project details and our engineering team will deliver a practical and
            investment-ready study.
          </p>
          <div className="mt-8">
            <Button href="/en/contact?service=feasibility-study" className="ui-glow-btn">
              Request Free Study
            </Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
