import Image from "next/image";

export default function ServicesHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/hero.png"
        alt="Large scale solar array powering commercial infrastructure"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-slate-950/70" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6 py-24 text-center">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-300">
            Our Services
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Comprehensive Solar Solutions for Every Need
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-200 sm:text-lg">
            From installation to maintenance, we provide complete solar energy
            services tailored to your requirements.
          </p>
        </div>
      </div>
    </section>
  );
}
