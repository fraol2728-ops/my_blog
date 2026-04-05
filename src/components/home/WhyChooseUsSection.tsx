"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Shield } from "lucide-react";
import { motion } from "motion/react";

const reasons = [
  {
    title: "Industry Expertise",
    description:
      "Our experienced solar professionals design systems that maximize energy output for your property.",
    icon: CheckCircle,
  },
  {
    title: "Premium Quality Materials",
    description:
      "We use high-performance components engineered to withstand demanding weather and deliver consistent results.",
    icon: CheckCircle,
  },
  {
    title: "Local Manufacturing Advantage",
    description:
      "In-house regional production shortens delivery timelines while ensuring strict quality control at every stage.",
    icon: CheckCircle,
  },
  {
    title: "End-to-End Solutions",
    description:
      "From consultation and design to installation and support, we handle every step with a single trusted team.",
    icon: CheckCircle,
  },
  {
    title: "Long-Term Reliability",
    description:
      "Durable engineering and proactive after-sales support keep your solar investment efficient for years to come.",
    icon: Shield,
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-black">Why Choose Us</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Delivering Reliable Solar Solutions You Can Trust
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            We combine advanced technology, expert engineering, and local manufacturing to
            deliver solar solutions that are efficient, durable, and built for long-term
            performance.
          </p>

          <ul className="mt-10 space-y-6">
            {reasons.map(({ title, description, icon: Icon }) => (
              <li key={title} className="flex items-start gap-4">
                <Icon className="mt-0.5 size-5 shrink-0 text-[#458137]" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="#contact"
            className="mt-10 inline-flex rounded-xl bg-[#458137] px-6 py-3 text-white transition hover:bg-[#3b6f2f]"
          >
            Get a Free Consultation
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="w-full"
        >
          <Image
            src="/service1.jpg"
            alt="Solar technicians installing premium rooftop panels"
            width={900}
            height={1100}
            className="w-full rounded-2xl object-cover shadow-xl"
            priority={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
