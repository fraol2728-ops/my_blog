import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const authorName = post?.author?.name || "SolarPeak Editorial Team";

  return (
    <article className="grid items-stretch gap-8 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-lg shadow-slate-900/5 md:grid-cols-2 md:p-6">
      <Link href={`/post/${post?.slug}`} className="group block overflow-hidden rounded-2xl">
        {post?.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(1400).height(900).url()}
            alt={post?.title || "Featured news image"}
            width={1400}
            height={900}
            className="h-full min-h-[260px] w-full rounded-2xl object-cover transition duration-500 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="h-full min-h-[260px] rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-slate-100" />
        )}
      </Link>

      <div className="flex flex-col justify-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Featured article</p>

        <Link
          href={`/post/${post?.slug}`}
          className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 transition hover:text-emerald-700 sm:text-3xl"
        >
          {post?.title}
        </Link>

        <p className="mt-4 line-clamp-4 text-base leading-7 text-slate-600">{post?.excerpt}</p>

        <p className="mt-5 text-sm text-slate-500">
          {dayjs(post?.publishedAt).format("MMMM D, YYYY")} · {authorName}
        </p>

        <Link
          href={`/post/${post?.slug}`}
          className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-700 transition hover:text-emerald-600"
        >
          Read Full Article →
        </Link>
      </div>
    </article>
  );
}
