import { BadgeCheck, Handshake, Leaf, ShieldCheck, Zap } from "lucide-react";

const values = [
  {
    title: "Quality First",
    description:
      "We apply strict engineering and installation standards to every project.",
    icon: BadgeCheck,
  },
  {
    title: "Integrity",
    description:
      "Transparent pricing, realistic timelines, and honest guidance at every step.",
    icon: Handshake,
  },
  {
    title: "Sustainability",
    description:
      "Every solution is designed to maximize long-term environmental impact.",
    icon: Leaf,
  },
  {
    title: "Reliability",
    description:
      "Performance monitoring and proactive service keep systems operating efficiently.",
    icon: ShieldCheck,
  },
  {
    title: "Innovation",
    description:
      "We continuously adopt proven technologies to improve output and resilience.",
    icon: Zap,
  },
];

export default function ValuesSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
            Core Values
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Principles That Shape Every Solar Project
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
