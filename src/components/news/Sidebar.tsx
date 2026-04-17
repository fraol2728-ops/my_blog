"use client";

import { Post, PostCategory } from "@/types";
import dayjs from "dayjs";
import Link from "next/link";
import { useLocale } from "@/i18n/I18nProvider";

interface SidebarProps {
  categories: PostCategory[];
  recentPosts: Post[];
  search: string;
  onSearchChange: (value: string) => void;
}

export default function Sidebar({ categories, recentPosts, search, onSearchChange }: SidebarProps) {
  const locale = useLocale();
  const isAmharic = locale === ("am" as string);

  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{isAmharic ? "ዜና ፈልግ" : "Search News"}</h3>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={isAmharic ? "ርዕሶችን ፈልግ..." : "Search headlines..."}
          className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{isAmharic ? "የቅርብ ማሻሻያዎች" : "Recent Updates"}</h3>
        <ul className="mt-4 space-y-4">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/${locale}/post/${post.slug}`} className="text-sm font-medium text-slate-800 hover:text-green-600">
                {post.title}
              </Link>
              <p className="mt-1 text-xs text-slate-500">{dayjs(post.publishedAt).format("MMM D, YYYY")}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{isAmharic ? "ምድቦች" : "Categories"}</h3>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          {categories.map((category) => (
            <li key={category.slug}>{category.title}</li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
