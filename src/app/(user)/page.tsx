import { Button } from "@/components/button";
import Container from "@/components/container";
import PostList from "@/components/post-list";
import { getAllPosts } from "@/sanity/queries";
import {
  BatteryCharging,
  Leaf,
  ShieldCheck,
  Sun,
  Wrench,
  Zap,
} from "lucide-react";

const services = [
  {
    title: "Residential Solar",
    description:
      "Custom rooftop systems designed to reduce utility bills and increase home value.",
    icon: Sun,
  },
  {
    title: "Commercial Projects",
    description:
      "Scalable energy systems for offices, warehouses, and multi-site businesses.",
    icon: BatteryCharging,
  },
  {
    title: "Ongoing Maintenance",
    description:
      "Proactive inspections, performance checks, and rapid issue resolution.",
    icon: Wrench,
  },
  {
    title: "Energy Optimization",
    description:
      "Data-backed recommendations to maximize output and long-term savings.",
    icon: Zap,
  },
];

const reasons = [
  {
    title: "Certified Team",
    description: "Licensed engineers and installers with proven project delivery.",
    icon: ShieldCheck,
  },
  {
    title: "Sustainable Impact",
    description:
      "Lower your carbon footprint with clean, renewable energy solutions.",
    icon: Leaf,
  },
  {
    title: "Reliable Performance",
    description: "High-quality equipment backed by clear warranties and support.",
    icon: Sun,
  },
];

export default async function Home() {
  const posts = await getAllPosts(3);

  return (
    <div className="overflow-hidden pb-24">
      <Container>
        <section className="mt-12 rounded-4xl border border-emerald-100 bg-gradient-to-b from-emerald-50 via-white to-amber-50 p-8 shadow-sm sm:mt-16 sm:p-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Clean Energy for Every Roof
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-gray-950 sm:text-6xl">
            Power your home and business with smarter solar solutions.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-gray-600 sm:text-lg">
            We design, install, and maintain efficient solar systems that help
            you save on energy costs while investing in a greener future.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" className="bg-emerald-700 data-[hover]:bg-emerald-600">
              Get a Free Consultation
            </Button>
            <Button href="/services" variant="outline">
              Explore Services
            </Button>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-medium tracking-tight text-gray-950">
            Services built for long-term energy savings
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <service.icon className="size-8 text-emerald-600" />
                <h3 className="mt-4 text-xl font-medium text-gray-950">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-medium tracking-tight text-gray-950">
            Why choose SolarPeak
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-3xl border border-emerald-100 bg-emerald-50/40 p-6"
              >
                <reason.icon className="size-7 text-emerald-700" />
                <h3 className="mt-3 text-lg font-medium text-gray-950">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                Featured Insights
              </p>
              <h2 className="mt-2 text-3xl font-medium tracking-tight text-gray-950">
                Latest News & Project Stories
              </h2>
            </div>
            <Button href="/blog" variant="outline">
              View all updates
            </Button>
          </div>
          <div className="mt-6">
            <PostList
              posts={posts}
              showAuthor={false}
              readMoreLabel="Read insight"
            />
          </div>
        </section>

        <section className="mt-16 rounded-4xl bg-gray-950 p-8 text-white sm:p-12">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Ready to switch to solar?
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
            Talk with our experts to get a tailored proposal for your property.
            Start your clean energy journey with confidence.
          </p>
          <div className="mt-6">
            <Button href="/contact" className="bg-amber-400 text-gray-950 data-[hover]:bg-amber-300">
              Request a Quote
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
