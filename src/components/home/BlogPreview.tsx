"use client";

import BlogCard from "@/components/BlogCard";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { Post } from "@/types";
import Link from "next/link";

export default function BlogPreview({ posts }: { posts: Post[] | null }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <Section>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            kicker="News & Insights"
            title="Latest updates from our solar team"
          />
          <Link href="/news" className="text-sm font-semibold text-slate-700 transition hover:text-emerald-600">
            View all posts
          </Link>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {posts.slice(0, 3).map((post, index) => (
            <Reveal key={post.slug} className="h-full" delay={index * 0.08}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
