"use client";

import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const services = [
  {
    title: "Solar System Installation",
    description:
      "From site survey to final commissioning, we design and install high-performance solar systems tailored to your property and energy goals.",
    highlights: [
      "Detailed site evaluation and system sizing",
      "Professional rooftop and ground-mount installation",
      "Grid integration and commissioning support",
    ],
    image: "/service1.jpg",
    alt: "Technicians installing solar panels on a rooftop",
  },
  {
    title: "Solar Equipment & Product Supply",
    description:
      "We supply premium solar panels, inverters, batteries, and accessories to ensure every project is built for efficiency, durability, and long-term value.",
    highlights: [
      "Tier-1 panels and trusted inverter brands",
      "Battery storage and backup power components",
      "Fast, reliable procurement and delivery",
    ],
    image: "/service2.jpg",
    alt: "Solar equipment and hardware prepared for installation",
  },
  {
    title: "Local Solar Panel Manufacturing",
    description:
      "Our local manufacturing capabilities help deliver quality-controlled solar modules while reducing lead times and supporting regional clean energy growth.",
    highlights: [
      "Locally produced modules with strict QA",
      "Scalable output for residential and commercial demand",
      "Reduced logistics time and project delays",
    ],
    image: "/service3.jpg",
    alt: "Solar panel manufacturing line with assembled modules",
  },
  {
    title: "Maintenance & Technical Support",
    description:
      "Keep your solar investment performing at its best with preventive maintenance, diagnostics, and responsive technical support from certified specialists.",
    highlights: [
      "Routine inspections and performance checks",
      "Rapid troubleshooting and repair services",
      "Long-term monitoring and optimization",
    ],
    image: "/service4.png",
    alt: "Engineer providing technical support for a solar system",
  },
];

export default function ServicesSection() {
  return (
    <section>
      <div className="section-shell max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="ui-kicker">Our Services</p>
          <h2 className="ui-title">Comprehensive Solar Solutions for Every Need</h2>
          <p className="ui-subtitle">
            We provide complete solar energy solutions, from installation to manufacturing and
            long-term support.
          </p>
        </motion.div>

        <div className="mt-16 space-y-12">
          {services.map((service, index) => {
            const imageFirst = index % 2 === 0;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                className="ui-card ui-card-hover grid items-center gap-8 p-6 md:grid-cols-2 md:p-8"
              >
                <div className={imageFirst ? "order-1" : "order-2 md:order-2"}>
                  <div className="overflow-hidden rounded-2xl">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      width={1200}
                      height={800}
                      className="h-[400px] w-full object-cover transition duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                <div className={imageFirst ? "order-2" : "order-1 md:order-1"}>
                  <h3 className="text-2xl font-semibold text-slate-900 md:text-3xl">{service.title}</h3>
                  <p className="mt-4 text-base text-slate-600 md:text-lg">{service.description}</p>

                  <ul className="mt-6 space-y-3">
                    {service.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3">
                        <CheckCircle
                          className="mt-0.5 h-5 w-5 shrink-0 text-[#458137]"
                          aria-hidden="true"
                        />
                        <span className="text-base text-slate-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
