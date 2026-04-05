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
    <footer className="bg-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <Logo className="px-0 text-white" />
            <p className="max-w-sm text-sm leading-6 text-white/70">
              SolarPeak provides reliable residential and commercial solar solutions designed to reduce energy costs
              and support a cleaner tomorrow.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link className="inline-flex transition-colors hover:text-primary" href={link.href}>
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
                  <Link className="inline-flex transition-colors hover:text-primary" href={service.href}>
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
                <span>123 Solar Avenue, San Diego, CA</span>
              </li>
              <li>
                <a className="inline-flex items-center gap-2 transition-colors hover:text-primary" href="tel:+15551234567">
                  <Phone className="h-4 w-4" />
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                  href="mailto:hello@solarpeak.com"
                >
                  <Mail className="h-4 w-4" />
                  hello@solarpeak.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/60">© {new Date().getFullYear()} SolarPeak. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  aria-label={social.label}
                  className="rounded-full p-2 text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:text-primary"
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
