import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/types";
import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPreview({ posts }: { posts: Post[] | null }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Featured Blog Posts
          </h2>
          <Link href="/blog" className="text-sm font-semibold text-emerald-700 hover:text-emerald-600">
            View all
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts?.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              {post.mainImage ? (
                <Image
                  src={urlFor(post.mainImage).width(900).height(600).url()}
                  alt={post.title}
                  width={900}
                  height={600}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="h-48 bg-gradient-to-br from-emerald-100 to-slate-200" />
              )}
              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  {dayjs(post.publishedAt).format("MMM D, YYYY")}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{post.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm text-slate-600">{post.excerpt}</p>
                <Link
                  href={`/post/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-600"
                >
                  Read More <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
