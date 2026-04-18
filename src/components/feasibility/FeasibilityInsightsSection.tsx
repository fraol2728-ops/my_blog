import { Button } from "@/components/button";
import { Reveal } from "@/components/ui/reveal";
import { urlFor } from "@/sanity/lib/image";
import type { FeasibilityPost } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

type FeasibilityInsightsSectionProps = {
  title: string;
  kicker: string;
  description: string;
  posts: FeasibilityPost[];
};

export default function FeasibilityInsightsSection({
  title,
  kicker,
  description,
  posts,
}: FeasibilityInsightsSectionProps) {
  if (!posts.length) return null;

  return (
    <section className="section-shell py-14">
      <Reveal>
        <p className="ui-kicker">{kicker}</p>
        <h2 className="ui-title">{title}</h2>
        <p className="ui-subtitle max-w-2xl">{description}</p>
        <div className="mt-7">
          <Button href="/en/contact?service=feasibility-study">Request Free Study</Button>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post._id} delay={index * 0.06}>
            <article className="ui-card ui-card-hover group flex h-full flex-col overflow-hidden">
              <Link href={`/feasibility-study/${post.slug}`} className="block">
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
                <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-slate-900">{post.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm text-slate-600">{post.shortDescription}</p>
                <div className="mt-5">
                  <Link
                    href={`/feasibility-study/${post.slug}`}
                    className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-600"
                  >
                    Read Study →
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
