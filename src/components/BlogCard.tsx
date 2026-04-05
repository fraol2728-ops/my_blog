import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const authorName = post?.author?.name || "SolarPeak Editorial Team";

  return (
    <article className="group flex h-full flex-col">
      <Link href={`/post/${post?.slug}`} className="block overflow-hidden rounded-2xl">
        {post?.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(1000).height(680).url()}
            alt={post?.title || "News post image"}
            width={1000}
            height={680}
            className="aspect-[4/3] w-full rounded-2xl object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-emerald-50 to-slate-100" />
        )}
      </Link>

      <p className="mt-5 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
        {dayjs(post?.publishedAt).format("MMM D, YYYY")} · {authorName}
      </p>

      <Link
        href={`/post/${post?.slug}`}
        className="mt-3 line-clamp-2 text-xl font-semibold leading-tight text-slate-900 transition hover:text-emerald-700"
      >
        {post?.title}
      </Link>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{post?.excerpt}</p>

      <Link
        href={`/post/${post?.slug}`}
        className="mt-5 inline-flex text-sm font-semibold text-emerald-700 transition hover:text-emerald-600"
      >
        Read Full Article →
      </Link>
    </article>
  );
}
