import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative isolate min-h-[70vh] overflow-hidden">
      <Image
        src="/hero.png"
        alt="Solar panels on a modern corporate building"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-slate-950/65" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6 py-24 text-center">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-300">
            About SolarPeak
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Building Long-Term Energy Confidence Through Smart Solar Solutions
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-200 sm:text-lg">
            We partner with homeowners, enterprises, and institutions to
            design high-performance solar systems that reduce costs and support
            measurable sustainability goals.
          </p>
        </div>
      </div>
    </section>
  );
}
