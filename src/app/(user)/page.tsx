import { Button } from "@/components/button";
import Container from "@/components/container";
import PostList from "@/components/post-list";
import { getAllPosts } from "@/sanity/queries";
import {
  BadgeCheck,
  BatteryCharging,
  Building2,
  Handshake,
  Leaf,
  ShieldCheck,
  Sun,
  TrendingUp,
  Wrench,
} from "lucide-react";

const stats = [
  { value: "5,000+", label: "Solar Installations" },
  { value: "120 MW", label: "Clean Energy Generated" },
  { value: "32%", label: "Avg. Utility Savings" },
  { value: "98%", label: "Client Satisfaction Rate" },
];

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
    icon: Building2,
  },
  {
    title: "Battery Storage",
    description:
      "Store excess energy for peak times, outages, and better grid independence.",
    icon: BatteryCharging,
  },
  {
    title: "Ongoing Maintenance",
    description:
      "Proactive inspections, performance checks, and rapid issue resolution.",
    icon: Wrench,
  },
];

const reasons = [
  {
    title: "Certified Team",
    description: "Licensed engineers and installers with proven project delivery.",
    icon: ShieldCheck,
  },
  {
    title: "Transparent Process",
    description:
      "From proposal to activation, we keep timelines, pricing, and performance clear.",
    icon: Handshake,
  },
  {
    title: "Sustainable Impact",
    description:
      "Lower your carbon footprint with clean, renewable energy solutions.",
    icon: Leaf,
  },
  {
    title: "Performance Driven",
    description:
      "High-efficiency equipment and data-backed optimization for long-term output.",
    icon: TrendingUp,
  },
];

const testimonials = [
  {
    quote:
      "Our electricity costs dropped within the first billing cycle. The team was fast, professional, and highly organized.",
    name: "Maria Thompson",
    role: "Homeowner, Austin TX",
  },
  {
    quote:
      "SolarPeak delivered a multi-site rollout ahead of schedule. Their communication and quality control were excellent.",
    name: "Daniel Reed",
    role: "Operations Director, Northline Logistics",
  },
  {
    quote:
      "From consultation to installation, everything felt smooth and transparent. We highly recommend their service.",
    name: "Alyssa Patel",
    role: "Facility Manager, BrightCare Clinic",
  },
];

const footerLinks = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Project Insights", href: "/blog" },
      { label: "Support", href: "/contact" },
    ],
  },
  {
    heading: "Get Started",
    links: [
      { label: "Free Consultation", href: "/contact" },
      { label: "Request a Quote", href: "/contact" },
      { label: "Partner With Us", href: "/contact" },
    ],
  },
];

export default async function Home() {
  const posts = await getAllPosts(3);

  return (
    <div className="overflow-hidden pb-24">
      <Container>
        <section className="relative mt-12 overflow-hidden rounded-4xl border border-emerald-100 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 p-8 shadow-xl sm:mt-16 sm:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,21,0.35),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.15),transparent_40%)]" />
          <div className="relative z-10 max-w-4xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-emerald-50">
              Clean Energy for Every Roof
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Build a resilient energy future with premium solar solutions.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-emerald-50/95 sm:text-lg">
              We engineer and install high-performance solar systems for homes
              and businesses—designed for lower costs, long-term reliability,
              and measurable sustainability impact.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href="/contact"
                className="bg-yellow-400 text-gray-950 transition-transform duration-300 data-[hover]:bg-yellow-300 data-[hover]:-translate-y-0.5"
              >
                Get a Free Consultation
              </Button>
              <Button
                href="/services"
                variant="outline"
                className="border-white/80 bg-white/10 text-white backdrop-blur transition-transform duration-300 data-[hover]:-translate-y-0.5 data-[hover]:bg-white/20"
              >
                Explore Services
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-4xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-gray-100 bg-gray-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-3xl font-semibold tracking-tight text-emerald-600">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-medium tracking-tight text-gray-950">
            Services built for long-term energy savings
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
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
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
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
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500">
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

        <section className="mt-16 rounded-4xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2 text-emerald-700">
            <BadgeCheck className="size-5" />
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Client Testimonials
            </p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-3xl border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm leading-relaxed text-gray-700">
                  “{testimonial.quote}”
                </p>
                <p className="mt-5 font-medium text-gray-950">{testimonial.name}</p>
                <p className="text-xs text-gray-500">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-4xl bg-gray-950 p-8 text-white shadow-lg sm:p-12">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Ready to power your property with solar?
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
            Get a tailored proposal with transparent pricing, expected savings,
            and implementation timeline from our solar specialists.
          </p>
          <div className="mt-6">
            <Button
              href="/contact"
              className="bg-yellow-400 text-gray-950 transition-transform duration-300 data-[hover]:bg-yellow-300 data-[hover]:-translate-y-0.5"
            >
              Request a Quote
            </Button>
          </div>
        </section>

        <section className="mt-16 rounded-4xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-8 sm:p-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xl font-semibold tracking-tight text-gray-950">
                SolarPeak
              </p>
              <p className="mt-3 max-w-xs text-sm text-gray-600">
                Professional solar design, installation, and lifecycle support
                for homes and businesses.
              </p>
            </div>

            {footerLinks.map((group) => (
              <div key={group.heading}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                  {group.heading}
                </h3>
                <ul className="mt-4 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-600 transition-colors hover:text-emerald-700"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
