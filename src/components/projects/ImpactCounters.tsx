"use client";

import { motion, useInView, useMotionValue, useMotionValueEvent, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CounterItem = {
  label: string;
  value: number;
  suffix?: string;
};

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 100, damping: 20 });
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(springValue, "change", (latest) => {
    setDisplayValue(Math.round(latest));
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  return <motion.span ref={ref}>{displayValue}{suffix}</motion.span>;
}

export default function ImpactCounters({ counters }: { counters: CounterItem[] }) {
  return (
    <section className="mt-20 rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50 p-8 sm:p-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Impact in Numbers</h2>
        <p className="mt-3 max-w-3xl text-base text-slate-600 sm:text-lg">
          Every system we install is designed for measurable, long-term outcomes for homes, businesses, and communities.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {counters.map((counter, index) => (
            <motion.article
              key={counter.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-2xl border border-green-100 bg-white/95 p-5 shadow-sm"
            >
              <p className="text-3xl font-semibold text-green-600 sm:text-4xl">
                <AnimatedCounter value={counter.value} suffix={counter.suffix} />
              </p>
              <p className="mt-2 text-sm text-slate-600">{counter.label}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
