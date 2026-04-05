"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Projects Completed",
  },
  {
    value: 10,
    suffix: "+",
    label: "Years Experience",
  },
  {
    value: 20,
    suffix: "MW+",
    label: "Energy Delivered",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
  },
];

export default function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-black py-16 text-white"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-10 text-center md:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-xl border border-[#f2922A] px-4 py-5 md:px-5"
            >
              <p className="text-4xl font-bold md:text-5xl" style={{ color: "#f2922A" }}>
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                ) : (
                  `0${stat.suffix}`
                )}
              </p>
              <p className="mt-3 text-sm text-slate-400 md:text-base">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
