const stats = [
  { value: "1,000+", label: "Installations" },
  { value: "10+", label: "Years Experience" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "24/7", label: "Support" },
];

export default function StatsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-slate-50 p-6 text-center transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-4xl font-semibold tracking-tight text-emerald-600">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
