import { Button } from "@/components/button";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const highlights = [
  "Certified Experts",
  "High-Quality Equipment",
  "Sustainable Solutions",
];

export default function AboutSection() {
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="relative h-80 overflow-hidden rounded-2xl shadow-lg sm:h-96">
          <Image
            src="/homeabout.jfif"
            alt="Solar technician inspecting rooftop panels"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Who We Are
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Delivering smarter energy choices for every property.
          </h2>
          <p className="mt-5 text-slate-600">
            We help homeowners and businesses transition to clean power with
            end-to-end solar solutions, transparent guidance, and reliable
            long-term support.
          </p>

          <ul className="mt-6 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-700">
                <CheckCircle2 className="size-5 text-emerald-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button
              href="/about"
              className="rounded-full bg-slate-900 px-6 py-3 text-white data-[hover]:bg-slate-800"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
