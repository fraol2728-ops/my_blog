"use client";

import { motion } from "motion/react";
import Image from "next/image";

const projects = [
  { title: "200kW Retail Campus", image: "/project1.jpg" },
  { title: "Industrial Rooftop Retrofit", image: "/project2.jpg" },
  { title: "Multi-site Hospitality Rollout", image: "/project3.jpg" },
  { title: "Utility-Scale Expansion", image: "/project4.jpg" },
];

export default function ProjectsSection() {
  return (
    <section className="bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Featured Projects
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-xl shadow-lg"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={900}
                height={1200}
                className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
              <h3 className="absolute bottom-4 left-4 right-4 text-lg font-semibold text-white">
                {project.title}
              </h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
