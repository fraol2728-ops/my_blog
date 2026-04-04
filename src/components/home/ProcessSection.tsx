import { CircleHelp, Headset, Paintbrush, Wrench } from "lucide-react";

const steps = [
  {
    title: "Consultation",
    description: "We evaluate your energy usage and goals.",
    icon: CircleHelp,
  },
  {
    title: "Design",
    description: "Engineers create your custom solar blueprint.",
    icon: Paintbrush,
  },
  {
    title: "Installation",
    description: "Certified technicians install your system safely.",
    icon: Wrench,
  },
  {
    title: "Support",
    description: "We monitor performance and assist when needed.",
    icon: Headset,
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          How It Works
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              {index < steps.length - 1 && (
                <span className="absolute -right-5 top-1/2 hidden h-px w-10 -translate-y-1/2 bg-emerald-300 md:block" />
              )}
              <step.icon className="size-8 text-emerald-600" aria-hidden="true" />
              <p className="mt-4 text-sm font-medium uppercase tracking-wider text-emerald-600">
                Step {index + 1}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
