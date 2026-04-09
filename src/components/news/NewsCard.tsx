"use client";

import { Post } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import dayjs from "dayjs";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/i18n/I18nProvider";

export default function NewsCard({ post }: { post: Post }) {
  const locale = useLocale();
  const isAmharic = locale === "am";
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(800).height(500).url() : null;
  const category = Array.isArray(post.categories) ? post.categories[0] : undefined;
  const categoryLabel = typeof category === "string" ? category : category?.title;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <Link href={`/${locale}/post/${post.slug}`} className="block">
        <div className="relative h-52 w-full overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              width={800}
              height={500}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-slate-200" />
          )}
        </div>

        <div className="p-6">
          {categoryLabel && (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-600">{categoryLabel}</p>
          )}
          <h3 className="mt-3 line-clamp-2 text-xl font-semibold text-slate-900">{post.title}</h3>
          {post.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>}
          <p className="mt-5 text-sm text-slate-500">
            {dayjs(post.publishedAt).format("MMM D, YYYY")} · {post.author?.name ?? (isAmharic ? "የኤዲቶሪያል ቡድን" : "Editorial Team")}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
