import { Eye, Target } from "lucide-react";

const cards = [
  {
    title: "Mission",
    description:
      "Deliver accessible, high-efficiency solar solutions that lower operating costs and improve long-term energy independence.",
    icon: Target,
  },
  {
    title: "Vision",
    description:
      "Lead the transition to cleaner infrastructure by making dependable renewable energy a practical standard for every property.",
    icon: Eye,
  },
];

export default function MissionVision() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
