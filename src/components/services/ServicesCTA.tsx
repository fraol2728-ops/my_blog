import Link from "next/link";

export default function ServicesCTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-green-700 px-8 py-14 text-center text-white sm:px-12">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to Switch to Solar?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-green-50 sm:text-lg">
            Connect with our team for a tailored roadmap that aligns technical
            performance, financial return, and sustainability outcomes.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
            >
              Get a Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
