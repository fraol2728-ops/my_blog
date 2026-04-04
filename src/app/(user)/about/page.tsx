import Container from "@/components/container";
import { Award, Leaf, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pb-24">
      <Container className="mt-16">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          About SolarPeak
        </p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight text-gray-950 sm:text-6xl">
          Solar experts focused on dependable clean energy.
        </h1>
        <p className="mt-6 max-w-3xl text-base text-gray-600 sm:text-lg">
          SolarPeak is a full-service solar provider helping homeowners and
          businesses design, install, and optimize renewable energy systems. We
          combine technical precision with transparent service from planning to
          long-term support.
        </p>

        <section className="mt-14 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <Target className="size-8 text-emerald-600" />
            <h2 className="mt-4 text-2xl font-medium text-gray-950">Mission</h2>
            <p className="mt-2 text-sm text-gray-600">
              Deliver accessible solar solutions that reduce energy costs,
              improve energy independence, and accelerate sustainability.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <Leaf className="size-8 text-emerald-600" />
            <h2 className="mt-4 text-2xl font-medium text-gray-950">Vision</h2>
            <p className="mt-2 text-sm text-gray-600">
              Build communities powered by clean, reliable, and affordable
              energy for generations to come.
            </p>
          </div>
        </section>

        <section className="mt-14 rounded-4xl border border-emerald-100 bg-emerald-50/50 p-8 sm:p-10">
          <h2 className="text-3xl font-medium tracking-tight text-gray-950">
            Why choose us
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Certified installation teams and strict quality standards",
              "Project planning tailored to your property and energy goals",
              "Monitoring and maintenance support after installation",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-emerald-200 bg-white p-5"
              >
                <Award className="size-6 text-amber-500" />
                <p className="mt-3 text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
