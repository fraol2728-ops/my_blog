"use client";

import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type ProjectVideoSectionProps = {
  videoUrl?: string;
  title: string;
  thumbnail?: string | null;
};

const isEmbeddable = (url: string) => /youtube\.com|youtu\.be|vimeo\.com/.test(url);

const toEmbedUrl = (url: string) => {
  if (url.includes("youtube.com/watch")) {
    const id = new URL(url).searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (url.includes("vimeo.com/")) {
    const id = url.split("vimeo.com/")[1]?.split("?")[0];
    return id ? `https://player.vimeo.com/video/${id}` : url;
  }
  return url;
};

export default function ProjectVideoSection({ videoUrl, title, thumbnail }: ProjectVideoSectionProps) {
  const [open, setOpen] = useState(false);
  const embedUrl = useMemo(() => (videoUrl ? toEmbedUrl(videoUrl) : null), [videoUrl]);

  if (!embedUrl) return null;

  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-slate-900">Project Walkthrough</h2>
      <p className="mt-2 text-sm text-slate-600">Quick visual breakdown of design, deployment, and final performance.</p>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative mt-6 block w-full overflow-hidden rounded-2xl border border-slate-200"
      >
        {thumbnail ? (
          <Image src={thumbnail} alt={`${title} video thumbnail`} width={1600} height={900} className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-105" />
        ) : (
          <div className="grid h-[360px] w-full place-items-center bg-gradient-to-br from-slate-200 to-slate-300 text-slate-600">Video preview</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/20 to-transparent" />
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid size-16 place-items-center rounded-full bg-white text-green-700 shadow-lg transition group-hover:scale-110">
            <Play className="ml-1 size-7" />
          </span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-black"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 z-10 rounded-full bg-black/65 p-2 text-white"
                aria-label="Close video"
              >
                <X className="size-5" />
              </button>
              {isEmbeddable(embedUrl) ? (
                <iframe
                  src={embedUrl}
                  title={`${title} video`}
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video src={embedUrl} controls autoPlay className="aspect-video w-full" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
