import { Button } from "@/components/button";
import { Reveal } from "@/components/ui/reveal";
import { urlFor } from "@/sanity/lib/image";
import type { FeasibilityPost } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export default function FeasibilityStudyPage({
  posts,
  featuredPosts,
  locale,
}: {
  posts: FeasibilityPost[];
  featuredPosts: FeasibilityPost[];
  locale?: string;
}) {
  const localizedLocale = locale ?? "en";
  return (
    <main className="bg-white text-slate-900">
      <section className="border-b border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white">
        <div className="section-shell">
          <Reveal>
            <p className="ui-kicker">Feasibility Study Insights</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Dynamic solar feasibility intelligence from real projects
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600">
              Explore technical and financial studies to de-risk your solar investment and move
              faster with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={`/${localizedLocale}/contact?service=feasibility-study`}>Request Free Study</Button>
              <Button href="#all-feasibility-posts" variant="secondary">
                Explore Insights
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="section-shell py-14">
          <Reveal>
            <p className="ui-kicker">Featured Posts</p>
            <h2 className="ui-title">Most important feasibility reads</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {featuredPosts.map((post, index) => (
              <Reveal key={post._id} delay={index * 0.08}>
                <article className="ui-card ui-card-hover group flex h-full flex-col overflow-hidden">
                  <Link href={`/${localizedLocale}/feasibility-study/${post.slug}`} className="block">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(1200).height(760).url()}
                        alt={post.mainImage.alt ?? post.title}
                        width={1200}
                        height={760}
                        className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="aspect-[16/10] w-full bg-gradient-to-br from-emerald-50 to-slate-100" />
                    )}
                  </Link>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                      {post.category} • {dayjs(post.publishedAt).format("MMM D, YYYY")}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                      <Link href={`/${localizedLocale}/feasibility-study/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm text-slate-600">{post.shortDescription}</p>
                    <div className="mt-6">
                      <Button href={`/${localizedLocale}/contact?service=feasibility-study`} variant="outline">
                        Request Free Study
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section id="all-feasibility-posts" className="section-shell pt-8">
        <Reveal>
          <p className="ui-kicker">All Posts</p>
          <h2 className="ui-title">Feasibility study library</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post._id} delay={index * 0.05}>
              <article className="ui-card ui-card-hover group flex h-full flex-col overflow-hidden">
                <Link href={`/${localizedLocale}/feasibility-study/${post.slug}`} className="block">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(900).height(620).url()}
                      alt={post.mainImage.alt ?? post.title}
                      width={900}
                      height={620}
                      className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="aspect-[4/3] w-full bg-gradient-to-br from-emerald-50 to-slate-100" />
                  )}
                </Link>
                <div className="flex h-full flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {post.category} • {dayjs(post.publishedAt).format("MMM D, YYYY")}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">
                    <Link href={`/${localizedLocale}/feasibility-study/${post.slug}`} className="hover:text-emerald-700">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm text-slate-600">{post.shortDescription}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <Link
                      href={`/${localizedLocale}/feasibility-study/${post.slug}`}
                      className="text-sm font-semibold text-emerald-700 hover:text-emerald-600"
                    >
                      Read Full Study →
                    </Link>
                    <Button href={`/${localizedLocale}/contact?service=feasibility-study`} variant="outline">
                      Request Free Study
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
