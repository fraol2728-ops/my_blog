import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const authorName = post?.author?.name || "Premier Green Team";

  return (
    <article className="group flex h-full transform flex-col space-y-4 transition duration-300 hover:-translate-y-1">
      <Link href={`/post/${post?.slug}`} className="block overflow-hidden rounded-xl">
        {post?.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(1200).height(675).url()}
            alt={post?.title || "Blog post thumbnail"}
            width={1200}
            height={675}
            className="aspect-video w-full rounded-xl object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-emerald-100 via-white to-slate-100" />
        )}
      </Link>

      <p className="text-sm text-gray-500">
        {formattedDate} • By {authorName}
      </p>

      <Link
        href={`/post/${post?.slug}`}
        className="line-clamp-2 text-lg font-semibold text-gray-900 transition hover:text-green-600"
      >
        {post?.title}
      </Link>

      <p className="line-clamp-3 text-gray-600">{post?.excerpt}</p>

      <Link
        href={`/post/${post?.slug}`}
        className="mt-auto text-sm text-green-600 transition hover:underline"
      >
        Read More →
      </Link>
    </article>
  );
}
