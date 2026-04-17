"use client";

import { useLocale } from "@/i18n/I18nProvider";


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const isAmharic = useLocale() === ("am" as string);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label={isAmharic ? "ገጽ መቀየሪያ" : "Pagination"}>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
        const isActive = currentPage === page;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-green-600 text-white"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {page}
          </button>
        );
      })}
    </nav>
  );
}
