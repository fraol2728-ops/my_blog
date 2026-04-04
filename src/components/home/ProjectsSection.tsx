"use client";

import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const featuredProject = {
  title: "Commercial Solar Installation",
  description:
    "A large-scale solar installation designed to power commercial operations efficiently while reducing long-term energy costs.",
  highlights: [
    "High-capacity system",
    "Optimized energy output",
    "Long-term savings",
  ],
  image: "/project1.jpg",
  alt: "Commercial rooftop solar installation with extensive panel array",
};

const projects = [
  {
    title: "Residential Solar System",
    description:
      "Efficient rooftop solar designed for homeowners seeking lower utility bills and cleaner daily energy use.",
    image: "/project2.jpg",
    alt: "Residential home fitted with rooftop solar panels",
  },
  {
    title: "Industrial Solar Solution",
    description:
      "Scalable solar infrastructure built to support industrial facilities with stable, high-demand power needs.",
    image: "/project3.jpg",
    alt: "Industrial facility using a large-scale ground-mounted solar system",
  },
  {
    title: "Solar + Battery Storage",
    description:
      "Integrated solar and battery setup delivering reliable backup power and improved energy independence.",
    image: "/project4.jpg",
    alt: "Solar panels paired with modern battery energy storage units",
  },
];

export default function ProjectsSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm uppercase text-green-600">Our Projects</p>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Delivering Solar Solutions That Make an Impact
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From residential systems to large-scale installations, our projects reflect our
            commitment to quality, performance, and sustainability.
          </p>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="grid overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2"
        >
          <div className="group relative overflow-hidden">
            <Image
              src={featuredProject.image}
              alt={featuredProject.alt}
              width={1400}
              height={1000}
              className="h-full min-h-[280px] w-full object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
          </div>

          <div className="p-8 md:p-10">
            <h3 className="text-3xl font-bold text-slate-900">{featuredProject.title}</h3>
            <p className="mt-4 text-lg text-gray-600">{featuredProject.description}</p>

            <ul className="mt-6 space-y-3">
              {featuredProject.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden="true" />
                  <span className="text-base text-slate-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.article>

        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              className="group overflow-hidden rounded-2xl bg-white shadow-lg"
            >
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={project.image}
                  alt={project.alt}
                  width={900}
                  height={600}
                  className="h-56 w-full rounded-xl object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
                <p className="mt-3 text-gray-600">{project.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
