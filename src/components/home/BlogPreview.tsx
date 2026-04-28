"use client";

import BlogCard from "@/components/BlogCard";
import { useLocale } from "@/i18n/I18nProvider";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { Post } from "@/types";
import Link from "next/link";

export default function BlogPreview({ posts }: { posts: Post[] | null }) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <Section>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            kicker={isArabic ? "نص عربي" : "News & Insights"}
            title={isArabic ? "نص عربي" : "Latest updates from our solar team"}
          />
          <Link href={`/${locale}/news`} className="text-sm font-semibold text-slate-700 transition hover:text-emerald-600">
            {isArabic ? "نص عربي" : "View all posts"}
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
