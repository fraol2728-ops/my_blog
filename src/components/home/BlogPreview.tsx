"use client";

import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/types";
import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPreview({ posts }: { posts: Post[] | null }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Insights
            </p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">
              Latest from our blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-slate-700 transition hover:text-emerald-600"
          >
            View all posts
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              {post.mainImage ? (
                <Image
                  src={urlFor(post.mainImage).width(1000).height(700).url()}
                  alt={post.title}
                  width={1000}
                  height={700}
                  className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="h-52 bg-gradient-to-br from-emerald-100 via-white to-slate-100" />
              )}
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                  {dayjs(post.publishedAt).format("MMM D, YYYY")}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {post.excerpt}
                </p>
                <Link
                  href={`/post/${post.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-600"
                >
                  Read More
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
