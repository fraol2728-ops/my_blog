"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function StickyProjectCTA({ href }: { href: string }) {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <Link
        href={href}
        className="ui-glow-btn inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-green-900/20 hover:bg-green-700"
      >
        Start Your Project <ArrowUpRight className="size-4" />
      </Link>
    </div>
  );
}
