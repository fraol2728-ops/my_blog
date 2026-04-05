export default function NewsletterSection() {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Stay Updated with Solar News
        </h2>
        <p className="mt-4 text-base text-slate-600 sm:text-lg">
          Subscribe to receive the latest updates and insights.
        </p>

        <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="h-12 w-full rounded-xl border border-emerald-200 bg-white px-4 text-slate-900 outline-none ring-emerald-400 transition placeholder:text-slate-400 focus:ring-2"
            aria-label="Email address"
          />
          <button
            type="button"
            className="h-12 rounded-xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
