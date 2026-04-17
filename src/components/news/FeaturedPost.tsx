"use client";

import { Post } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { useLocale } from "@/i18n/I18nProvider";

export default function FeaturedPost({ post }: { post: Post }) {
  const locale = useLocale();
  const isAmharic = locale === ("am" as string);
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1400).height(700).url() : null;

  return (
    <article className="group relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={post.title}
          width={1400}
          height={700}
          className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
          priority
        />
      ) : (
        <div className="h-[420px] w-full bg-slate-200" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-10">
        <p className="text-sm text-white/80">
          {dayjs(post.publishedAt).format("MMMM D, YYYY")} · {post.author?.name ?? (isAmharic ? "የኤዲቶሪያል ቡድን" : "Editorial Team")}
        </p>
        <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-4xl">{post.title}</h2>
        {post.excerpt && <p className="mt-4 max-w-3xl text-white/90">{post.excerpt}</p>}
        <Link
          href={`/${locale}/post/${post.slug}`}
          className="mt-6 inline-flex rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-500"
        >
          {isAmharic ? "ሙሉ ዜናውን ያንብቡ" : "Read Full Story"}
        </Link>
      </div>
    </article>
  );
}
