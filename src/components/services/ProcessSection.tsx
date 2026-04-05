const processSteps = [
  "Consultation",
  "Site Assessment",
  "System Design",
  "Installation",
  "Support",
];

export default function ProcessSection() {
  return (
    <section className="bg-slate-50 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
            Project Process
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            A Structured Delivery Journey From Planning to Long-Term Support
          </h2>
        </div>

        <ol className="mt-12 grid gap-8 md:grid-cols-5 md:gap-4">
          {processSteps.map((step, index) => (
            <li key={step} className="relative">
              <div className="flex items-center gap-4 md:block">
 main
                  {index + 1}
                </span>
                <p className="text-base font-semibold text-slate-900 md:mt-4">
                  {step}
                </p>
              </div>
              {index < processSteps.length - 1 ? (
                <div className="absolute left-5 top-10 h-10 w-px bg-green-200 md:left-auto md:right-0 md:top-5 md:h-px md:w-[calc(100%-2rem)]" />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
