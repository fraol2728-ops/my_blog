"use client";

import BlogCard from "@/components/BlogCard";
import { Post } from "@/types";
import { motion } from "motion/react";
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
              News & Insights
            </p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">
              Latest updates from our solar team
            </h2>
          </div>
          <Link
            href="/news"
            className="text-sm font-semibold text-slate-700 transition hover:text-emerald-600"
          >
            View all posts
          </Link>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {posts.slice(0, 3).map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              className="h-full"
            >
              <BlogCard post={post} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
