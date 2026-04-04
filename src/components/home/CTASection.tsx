import { Button } from "@/components/button";

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl rounded-2xl bg-gradient-to-r from-slate-950 to-slate-800 px-6 py-14 text-center text-white shadow-xl sm:px-10">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Start Saving with Solar Today
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-200 sm:text-base">
          Talk to our experts and receive a tailored plan with projected savings,
          timelines, and a transparent quote.
        </p>
        <div className="mt-8">
          <Button
            href="/contact"
            className="rounded-full bg-emerald-500 px-6 py-3 text-white data-[hover]:bg-emerald-400"
          >
            Request a Free Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
