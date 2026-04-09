"use client";

import { urlFor } from "@/sanity/lib/image";
import { useLocale } from "@/i18n/I18nProvider";
import { Post } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const locale = useLocale();
  const authorName = post?.author?.name || "SolarPeak Editorial Team";
  const postHref = `/${locale}/post/${post?.slug}`;

  return (
    <article className="ui-card ui-card-hover group flex h-full flex-col p-4">
      <Link href={postHref} className="block overflow-hidden rounded-xl">
        {post?.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(1000).height(680).url()}
            alt={post?.title || "News post image"}
            width={1000}
            height={680}
            className="aspect-[4/3] w-full rounded-xl object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-emerald-50 to-slate-100" />
        )}
      </Link>

      <p className="mt-5 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
        {dayjs(post?.publishedAt).format("MMM D, YYYY")} · {authorName}
      </p>

      <Link
        href={postHref}
        className="mt-3 line-clamp-2 text-xl font-semibold leading-tight text-slate-900 transition hover:text-emerald-700"
      >
        {post?.title}
      </Link>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{post?.excerpt}</p>

      <Link
        href={postHref}
        className="mt-5 inline-flex text-sm font-semibold text-emerald-700 transition hover:text-emerald-600"
      >
        Read Full Article →
      </Link>
    </article>
  );
}
