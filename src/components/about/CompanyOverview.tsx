import Image from "next/image";

export default function CompanyOverview() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
          <Image
            src="/homeabout.jpg"
            alt="Solar engineers reviewing a project site"
            width={1200}
            height={900}
            className="h-full w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
            Company Overview
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            A Trusted Solar Partner for Scalable and Efficient Energy Systems
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            SolarPeak is a full-service solar company focused on engineering,
            installation, and lifecycle support. We combine technical rigor,
            premium equipment, and transparent project delivery to ensure each
            system performs reliably from day one.
          </p>
          <p className="text-lg leading-relaxed text-slate-600">
            Our teams collaborate closely with clients from consultation to
            commissioning, providing clear communication, predictable timelines,
            and long-term value.
          </p>
        </div>
      </div>
    </section>
  );
}
