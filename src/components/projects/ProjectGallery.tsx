"use client";

import { urlFor } from "@/sanity/lib/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

type GalleryImage = {
  alt?: string;
  [key: string]: unknown;
};

export default function ProjectGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!images.length) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Project Gallery</h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => {
          const imageUrl = urlFor(image).width(1200).height(900).url();
          return (
            <button
              key={`${imageUrl}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative overflow-hidden rounded-2xl"
            >
              <Image
                src={imageUrl}
                alt={image.alt ?? `${title} image ${index + 1}`}
                width={1200}
                height={900}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white"
              onClick={() => setActiveIndex(null)}
              aria-label="Close image"
            >
              <X className="size-6" />
            </button>
            <motion.div
              initial={{ scale: 0.96, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 18 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-2xl"
            >
              <Image
                src={urlFor(images[activeIndex]).width(1800).height(1300).url()}
                alt={images[activeIndex]?.alt ?? `${title} image ${activeIndex + 1}`}
                width={1800}
                height={1300}
                className="max-h-[88vh] w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
