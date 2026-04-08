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

      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6 py-20 text-center">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-300">
            About Us
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Master Premier Green Energy Co. Ltd
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-200 sm:text-lg">
            A South Sudan based renewable energy company delivering engineering and clean energy advisory services for
            sustainable growth, rural energy access, and long-term value.
          </p>
        </div>
      </div>
    </section>
  );
}
