"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Post, PostCategory } from "@/types";
import { useLocale } from "@/i18n/I18nProvider";
import { BRAND_KEYWORDS } from "@/lib/seo";
import CategoryFilter from "./CategoryFilter";
import NewsCard from "./NewsCard";
import Pagination from "./Pagination";
import Sidebar from "./Sidebar";

const POSTS_PER_PAGE = 6;

interface NewsGridProps {
  posts: Post[];
  categories: PostCategory[];
  initialSearch?: string;
}

export default function NewsGrid({ posts, categories, initialSearch = "" }: NewsGridProps) {
  const isAmharic = useLocale() === ("am" as string);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "all" ||
        (Array.isArray(post.categories) &&
          post.categories.some((category) => {
            if (typeof category === "string") {
              return category.toLowerCase() === activeCategory;
            }

            return category.slug === activeCategory;
          }));

      const haystack = [
        post.title,
        post.excerpt,
        post.author?.name,
        ...(post.seo?.keywords ?? []),
        ...BRAND_KEYWORDS,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = !keyword || haystack.includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, posts, search]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (safeCurrentPage - 1) * POSTS_PER_PAGE,
    safeCurrentPage * POSTS_PER_PAGE,
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <section className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div>
        <CategoryFilter categories={categories} activeCategory={activeCategory} onChange={handleCategoryChange} />

        <motion.div layout className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {paginatedPosts.map((post) => (
              <NewsCard key={post.slug} post={post} />
            ))}
          </AnimatePresence>
        </motion.div>

        {paginatedPosts.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            {isAmharic ? "ከአሁኑ ማጣሪያዎች ጋር የሚመጣጠን ዜና አልተገኘም።" : "No news matched your current filters."}
          </div>
        )}

        <Pagination currentPage={safeCurrentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      <Sidebar
        categories={categories}
        recentPosts={posts.slice(0, 5)}
        search={search}
        onSearchChange={handleSearchChange}
      />
    </section>
  );
}
