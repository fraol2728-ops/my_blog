"use client";

import Link from "next/link";
import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./logo";
import { useLocale } from "@/i18n/I18nProvider";

const services = [
  { href: "/services", en: "Energy audit & feasibility studies", am: "የኃይል ኦዲት እና የአዋጭነት ጥናቶች" },
  { href: "/services", en: "Energy management plans", am: "የኃይል አስተዳደር እቅዶች" },
  { href: "/services", en: "System design & commercial proposals", am: "የስርዓት ንድፍ እና የንግድ ፕሮፖዛሎች" },
  { href: "/services", en: "Installation & after-service support", am: "ተከላ እና ከአገልግሎት በኋላ ድጋፍ" },
];

const socialLinks = [
  { href: "mailto:mpgenergy@gmail.com", label: "Email", icon: Mail },
  { href: "tel:+211982004848", label: "Phone 1", icon: Phone },
  { href: "tel:+211928004848", label: "Phone 2", icon: Phone },
  { href: "https://maps.google.com/?q=Thongping,Florian+Road,Block+3,Plot+No.+258,+Juba,+South+Sudan", label: "Location", icon: MapPin },
];

export default function Footer() {
  const locale = useLocale();
  const isAmharic = locale === ("am" as string);
  const localized = (path: string) => `/${locale}${path === "/" ? "" : path}`;

  const quickLinks = [
    { href: localized("/"), label: isAmharic ? "መነሻ" : "Home" },
    { href: localized("/about"), label: isAmharic ? "ስለ Master Premier" : "About Master Premier" },
    { href: localized("/services"), label: isAmharic ? "አገልግሎቶቻችን" : "Our Services" },
    { href: localized("/news"), label: isAmharic ? "ዜና እና ዝመናዎች" : "News & Updates" },
    { href: localized("/contact"), label: isAmharic ? "አግኙን" : "Contact Us" },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <Logo className="px-0 text-white" />
            <p className="max-w-sm text-sm leading-6 text-white/70">
              Master Premier Green Energy Co. Ltd provides engineering and clean energy advisory services
              {isAmharic
                ? " የምህንድስና እና የንፁህ ኃይል አማካሪ አገልግሎቶችን በመስጠት ደንበኞች ታማኝ፣ ተመጣጣኝ እና ዘላቂ የፀሐይ ኃይል መፍትሄ እንዲያገኙ ያግዛል።"
                : " that help customers access reliable, affordable, and sustainable solar power solutions."}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">{isAmharic ? "ፈጣን አገናኞች" : "Quick Links"}</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link className="inline-flex hover:text-emerald-300" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">{isAmharic ? "ዋና አገልግሎቶች" : "Core Services"}</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              {services.map((service) => (
                <li key={service.en}>
                  <Link className="inline-flex hover:text-emerald-300" href={localized(service.href)}>
                    {isAmharic ? service.am : service.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">{isAmharic ? "ያግኙን" : "Contact"}</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                <span>Thongping, Florian Road, Block 3, Plot No. 258 - Juba, South Sudan</span>
              </li>
              <li>
                <a className="inline-flex items-center gap-2 hover:text-emerald-300" href="tel:+211982004848">
                  <Phone className="h-4 w-4" />
                  +211 982 004 848
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-2 hover:text-emerald-300" href="mailto:mpgenergy@gmail.com">
                  <Mail className="h-4 w-4" />
                  mpgenergy@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Master Premier Green Energy Co. Ltd.{" "}
              {isAmharic ? "መብቶቹ በሙሉ የተጠበቁ ናቸው።" : "All rights reserved."}
            </p>
            <p className="text-sm text-white/60">
              {isAmharic ? "ኮድ አርቲስት:" : "Code artist:"}{" "}
              <a
                className="text-white/80 underline-offset-4 transition-colors hover:text-emerald-300 hover:underline"
                href="https://www.devfraol.com.et/services/web-development"
                rel="noreferrer"
                target="_blank"
              >
                Fraol Belachew
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  aria-label={social.label}
                  className="rounded-full p-2 text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-emerald-300"
                  href={social.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
