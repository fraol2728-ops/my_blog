import { Eye, Target } from "lucide-react";

const cards = [
  {
    title: "Mission",
    description:
      "Provide reliable, modern and intelligent renewable energy solutions to build green economies, create sustainable living and promote rural access.",
    icon: Target,
  },
  {
    title: "Vision",
    description:
      "Be a trusted leader in South Sudan's renewable transition through world-class engineering, advisory excellence and customer-focused delivery.",
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
              <Icon className="size-9 text-[#458137]" aria-hidden="true" />
              <h3 className="mt-5 text-2xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
