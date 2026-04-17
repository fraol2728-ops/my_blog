"use client";

import { urlFor } from "@/sanity/lib/image";
import { ProjectImage } from "@/types";
import Image from "next/image";
import { useMemo, useState } from "react";

type BeforeAfterSliderProps = {
  beforeImage?: ProjectImage | null;
  afterImage?: ProjectImage | null;
  title: string;
};

export default function BeforeAfterSlider({ beforeImage, afterImage, title }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  const beforeUrl = useMemo(
    () => (beforeImage ? urlFor(beforeImage).width(1600).height(980).fit("crop").url() : null),
    [beforeImage],
  );
  const afterUrl = useMemo(
    () => (afterImage ? urlFor(afterImage).width(1600).height(980).fit("crop").url() : null),
    [afterImage],
  );

  if (!beforeUrl || !afterUrl) return null;

  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-slate-900">Before / After Transformation</h2>
      <p className="mt-2 text-sm text-slate-600">Drag the slider to compare site conditions and completed delivery.</p>
      <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200">
        <Image src={beforeUrl} alt={beforeImage?.alt ?? `${title} before`} width={1600} height={980} className="h-[440px] w-full object-cover" />
        <div className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
          <Image src={afterUrl} alt={afterImage?.alt ?? `${title} after`} width={1600} height={980} className="h-[440px] w-full max-w-none object-cover" />
        </div>

        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
          <div className="h-full w-1 bg-white/95 shadow-[0_0_0_1px_rgba(15,23,42,0.2)]" />
          <div className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow">
            ↔
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          aria-label="Compare before and after"
        />

        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-semibold text-white">After</div>
        <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-semibold text-white">Before</div>
      </div>
    </section>
  );
}
