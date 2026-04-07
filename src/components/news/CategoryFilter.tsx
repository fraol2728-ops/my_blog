"use client";

import { PostCategory } from "@/types";
import { motion } from "motion/react";

interface CategoryFilterProps {
  categories: PostCategory[];
  activeCategory: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onChange }: CategoryFilterProps) {
  return (
    <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
      {[{ title: "All", slug: "all" }, ...categories].map((category) => {
        const isActive = activeCategory === category.slug;

        return (
          <button
            key={category.slug}
            type="button"
            onClick={() => onChange(category.slug)}
            className={`relative whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "border-green-600 bg-green-50 text-green-700"
                : "border-slate-200 bg-white text-slate-700 hover:border-green-200 hover:text-green-700"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="categoryIndicator"
                className="absolute inset-0 -z-10 rounded-xl bg-green-100"
                transition={{ type: "spring", stiffness: 280, damping: 30 }}
              />
            )}
            {category.title}
          </button>
        );
      })}
    </div>
  );
}
