import Link from "next/link";
import React from "react";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Logo from "./logo";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const services = [
  { href: "/services", label: "Solar Panel Installation" },
  { href: "/services", label: "Energy Consultation" },
  { href: "/services", label: "Battery Storage" },
  { href: "/services", label: "System Maintenance" },
];

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", icon: Facebook },
  { href: "https://twitter.com", label: "Twitter", icon: Twitter },
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <Logo className="px-0 text-white" />
            <p className="max-w-sm text-sm leading-6 text-white/70">
              Master Premier Green Energy Co. Ltd provides reliable, modern and intelligent renewable energy
              solutions to build green economies, create sustainable living and promote rural access.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">Quick Links</h3>
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
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">Services</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              {services.map((service) => (
                <li key={service.label}>
                  <Link className="inline-flex hover:text-emerald-300" href={service.href}>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">Contact</h3>
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
                <a className="inline-flex items-center gap-2 hover:text-emerald-300" href="tel:+211928004848">
                  <Phone className="h-4 w-4" />
                  +211 928 004 848
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
          <p className="text-sm text-white/60">© {new Date().getFullYear()} All rights reserved.</p>
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
