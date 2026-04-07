export default function Newsletter() {
  return (
    <section className="rounded-3xl bg-slate-900 px-8 py-10 text-white shadow-xl sm:px-12">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-green-300">Newsletter</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight">Stay ahead of market-moving updates</h2>
      <p className="mt-3 max-w-2xl text-slate-300">
        Receive quarterly announcements, media kits, and strategic business updates directly in your
        inbox.
      </p>

      <form className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          placeholder="Business email address"
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-300 focus:border-green-400 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-500"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
