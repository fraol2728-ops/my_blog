"use client";

import { Project } from "@/types";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/context/language";
import { getLocalizedValue } from "@/lib/language";

declare global {
  interface Window {
    L?: {
      map: (element: HTMLElement) => LeafletMap;
      tileLayer: (url: string, options: Record<string, unknown>) => { addTo: (map: LeafletMap) => void };
      divIcon: (options: { html: string; className: string; iconSize: [number, number] }) => unknown;
      marker: (latLng: [number, number], options: { icon: unknown }) => LeafletMarker;
    };
  }
}

type LeafletMap = {
  setView: (center: [number, number], zoom: number) => LeafletMap;
  remove: () => void;
  fitBounds: (bounds: [number, number][], options?: { padding?: [number, number] }) => void;
};

type LeafletMarker = {
  addTo: (map: LeafletMap) => LeafletMarker;
  bindTooltip: (content: string, options: { direction: string; offset: [number, number]; opacity: number }) => LeafletMarker;
  on: (event: string, handler: () => void) => LeafletMarker;
};

const ensureLeaflet = async () => {
  if (typeof window === "undefined") return;
  if (window.L) return;

  await Promise.all([
    new Promise<void>((resolve) => {
      const existing = document.querySelector<HTMLLinkElement>('link[data-leaflet="style"]');
      if (existing) return resolve();
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.dataset.leaflet = "style";
      link.onload = () => resolve();
      document.head.appendChild(link);
    }),
    new Promise<void>((resolve) => {
      const existing = document.querySelector<HTMLScriptElement>('script[data-leaflet="script"]');
      if (existing && window.L) return resolve();
      if (existing) {
        existing.addEventListener("load", () => resolve(), { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.async = true;
      script.dataset.leaflet = "script";
      script.onload = () => resolve();
      document.body.appendChild(script);
    }),
  ]);
};

const previewCard = (project: Project, lang: "en" | "ar") => `
  <div style="min-width:180px;padding:4px 6px">
    <p style="font-size:11px;color:#166534;font-weight:700;letter-spacing:0.12em;text-transform:uppercase">${project.category}</p>
    <p style="margin:4px 0 0;font-size:14px;font-weight:700;color:#0f172a">${getLocalizedValue(project.title, lang, "")}</p>
    <p style="margin:3px 0 0;font-size:12px;color:#334155">${project.location}</p>
  </div>
`;

export default function ProjectMap({ projects, locale }: { projects: Project[]; locale: string }) {
  const { lang } = useLanguage();
  const mapNodeRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  const mapProjects = useMemo(
    () => projects.filter((project) => Number.isFinite(project.latitude) && Number.isFinite(project.longitude)),
    [projects],
  );

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      await ensureLeaflet();
      if (!mounted || !mapNodeRef.current || !window.L) return;

      const L = window.L;
      if (!L) return;

      const map = L.map(mapNodeRef.current).setView([7.5, 30], 4);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const markerIcon = L.divIcon({
        className: "",
        html: '<div style="width:16px;height:16px;background:#16a34a;border:2px solid #f0fdf4;border-radius:9999px;box-shadow:0 0 0 8px rgba(34,197,94,0.2)"></div>',
        iconSize: [16, 16],
      });

      const bounds: [number, number][] = [];

      mapProjects.forEach((project) => {
        const latLng: [number, number] = [project.latitude as number, project.longitude as number];
        bounds.push(latLng);
        L
          .marker(latLng, { icon: markerIcon })
          .addTo(map)
          .bindTooltip(previewCard(project, lang), { direction: "top", offset: [0, -8], opacity: 0.96 })
          .on("click", () => router.push(`/${locale}/projects/${project.slug}`));
      });

      if (bounds.length > 1) {
        map.fitBounds(bounds, { padding: [36, 36] });
      } else if (bounds.length === 1) {
        map.setView(bounds[0], 8);
      }

      setLoaded(true);
    };

    init();

    return () => {
      mounted = false;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [lang, locale, mapProjects, router]);

  return (
    <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex items-center gap-2 text-green-700">
        <MapPin className="size-5" />
        <p className="text-sm font-semibold uppercase tracking-[0.14em]">Project Footprint Map</p>
      </div>
      <h2 className="mt-2 text-2xl font-semibold text-slate-900">Where we deliver measurable impact</h2>
      <p className="mt-2 text-sm text-slate-600">Hover markers for a preview and click any location to open the full case study.</p>
      <div className="relative mt-6 h-[440px] overflow-hidden rounded-2xl border border-slate-200">
        <div ref={mapNodeRef} className="h-full w-full" />
        {!loaded && <div className="absolute inset-0 grid place-items-center bg-slate-50 text-sm text-slate-500">Loading interactive map…</div>}
      </div>
    </section>
  );
}
