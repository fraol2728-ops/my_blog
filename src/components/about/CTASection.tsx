import Link from "next/link";

export default function CTASection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-green-700 px-8 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to Build Your Solar Roadmap?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-green-50 sm:text-lg">
            Connect with our team to evaluate your property, estimate savings,
            and launch a custom solar solution built for long-term returns.
          </p>

          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex rounded-xl bg-white px-7 py-3 text-sm font-semibold uppercase tracking-wide text-green-700 transition hover:bg-green-100"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
