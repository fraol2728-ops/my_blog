"use client";

import BlogCard from "@/components/BlogCard";
import { useLocale } from "@/i18n/I18nProvider";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { Post } from "@/types";
import Link from "next/link";

export default function BlogPreview({ posts }: { posts: Post[] | null }) {
  const locale = useLocale();
  const isAmharic = locale === ("am" as string);
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <Section>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            kicker={isAmharic ? "ዜና እና ግንዛቤ" : "News & Insights"}
            title={isAmharic ? "ከፀሐይ ኃይል ቡድናችን የቅርብ ጊዜ መረጃዎች" : "Latest updates from our solar team"}
          />
          <Link href={`/${locale}/news`} className="text-sm font-semibold text-slate-700 transition hover:text-emerald-600">
            {isAmharic ? "ሁሉንም ዜናዎች ይመልከቱ" : "View all posts"}
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
