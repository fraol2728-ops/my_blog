const highlights = [
  "Certified experts delivering enterprise-grade quality and safety standards",
  "Performance-focused system design that maximizes long-term energy yield",
  "Transparent communication, timelines, and project cost management",
  "Reliable post-installation service with proactive maintenance programs",
];

export default function WhyChooseUs() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Why Choose Us
          </h2>
          <ul className="mt-8 grid gap-5 text-base text-slate-700 md:grid-cols-2">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3 leading-relaxed">
 main
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
