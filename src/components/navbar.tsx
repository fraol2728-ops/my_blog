"use client";

import Link from "next/link";
import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type DropdownItem = {
  href: string;
  label: string;
};

type NavItem = {
  href?: string;
  label: string;
  dropdownItems?: DropdownItem[];
};

const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  {
    label: "About Us",
    dropdownItems: [
      { href: "/about#company-overview", label: "Company Overview" },
      { href: "/about#vision-mission", label: "Vision & Mission" },
      { href: "/about#our-values", label: "Our Values" },
      { href: "/about#leadership", label: "Leadership" },
      { href: "/about#our-projects", label: "Our Projects" },
      { href: "/about#sustainability", label: "Sustainability" },
    ],
  },
  {
    label: "Services",
    dropdownItems: [
      { href: "/services#solar-energy-solutions", label: "Solar Energy Solutions" },
      { href: "/services#epc", label: "EPC (Engineering, Procurement & Construction)" },
      { href: "/services#energy-storage-systems", label: "Energy Storage Systems" },
      { href: "/services#maintenance-support", label: "Maintenance & Support" },
      { href: "/services#consultancy", label: "Consultancy" },
      { href: "/services#custom-projects", label: "Custom Projects" },
    ],
  },
  { href: "/news", label: "News" },
  { href: "/contact#faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

const isActivePath = (pathname: string, href: string) => {
  const basePath = href.split("#")[0];
  return basePath === "/" ? pathname === "/" : pathname === basePath || pathname.startsWith(`${basePath}/`);
};

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [desktopOpenDropdown, setDesktopOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdowns, setMobileOpenDropdowns] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobileDropdown = (label: string) => {
    setMobileOpenDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <Disclosure
      as="header"
      className={clsx(
        "sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-lg transition-all duration-300",
        isScrolled ? "shadow-lg shadow-black/5" : "shadow-sm"
      )}
    >
      {({ open }) => (
        <div
          className={clsx(
            "mx-auto flex w-full max-w-7xl items-center justify-between px-6 transition-all duration-300 lg:px-8",
            isScrolled ? "h-[72px]" : "h-20"
          )}
        >
          <Link href="/" className="group flex items-center gap-3" aria-label="Go to homepage">
            <Image
              src="/logo.png"
              alt="Master Premier Green Energy Co. Ltd"
              width={44}
              height={44}
              className="h-11 w-11 rounded-md object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <span className="hidden text-base font-semibold text-slate-900 sm:block">Master Premier</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((item) => {
              if (!item.dropdownItems || !item.dropdownItems.length) {
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={clsx(
                      "group relative py-2 text-sm font-medium transition-colors duration-200",
                      isActivePath(pathname, item.href!) ? "text-emerald-600" : "text-slate-700 hover:text-slate-900"
                    )}
                  >
                    {item.label}
                    <span
                      className={clsx(
                        "absolute -bottom-0.5 left-0 h-0.5 bg-emerald-600 transition-all duration-300",
                        isActivePath(pathname, item.href!) ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </Link>
                );
              }

              const isOpen = desktopOpenDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDesktopOpenDropdown(item.label)}
                  onMouseLeave={() => setDesktopOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className={clsx(
                      "flex items-center gap-1 py-2 text-sm font-medium transition-colors duration-200",
                      isOpen ? "text-emerald-600" : "text-slate-700 hover:text-slate-900"
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDownIcon
                      className={clsx("size-4 transition-transform duration-200", isOpen && "rotate-180")}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.24 }}
                        className="absolute left-1/2 top-full mt-3 w-[240px] -translate-x-1/2 rounded-xl bg-white p-4 shadow-lg"
                      >
                        <div className="space-y-1">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.label}
                              href={dropdownItem.href}
                              className="block rounded-md px-3 py-2 text-sm text-slate-700 transition-colors duration-200 hover:bg-green-50 hover:text-green-600"
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              aria-label="Search"
              className="rounded-full border border-slate-200 p-2 text-slate-700 transition hover:border-emerald-200 hover:text-emerald-600"
            >
              <MagnifyingGlassIcon className="size-5" />
            </button>
            <Button
              href="/contact"
              variant="primary"
              className="rounded-xl bg-emerald-600 shadow-sm hover:bg-emerald-700 focus-visible:ring-emerald-500/40"
            >
              Get a Quote
            </Button>
          </div>

          <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700 lg:hidden">
            <span className="sr-only">Toggle menu</span>
            {open ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
          </DisclosureButton>

          <DisclosurePanel className="absolute inset-x-0 top-full border-b border-black/5 bg-white/95 shadow-sm backdrop-blur lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5">
              {navLinks.map((item) => {
                if (!item.dropdownItems || !item.dropdownItems.length) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href!}
                      className={clsx(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                        isActivePath(pathname, item.href!)
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 active:bg-emerald-100"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                }

                const isOpen = !!mobileOpenDropdowns[item.label];

                return (
                  <div key={item.label} className="rounded-xl bg-white">
                    <button
                      type="button"
                      onClick={() => toggleMobileDropdown(item.label)}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-green-50 hover:text-green-600"
                    >
                      <span>{item.label}</span>
                      <ChevronDownIcon
                        className={clsx("size-4 transition-transform duration-200", isOpen && "rotate-180")}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.24 }}
                          className="mt-1 space-y-1 rounded-xl bg-white p-2"
                        >
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.label}
                              href={dropdownItem.href}
                              className="block rounded-md px-3 py-2 text-sm text-slate-700 transition-colors duration-200 hover:bg-green-50 hover:text-green-600"
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="mt-1 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Search"
                  className="rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:border-emerald-200 hover:text-emerald-600"
                >
                  <MagnifyingGlassIcon className="size-5" />
                </button>
                <Button
                  href="/contact"
                  variant="primary"
                  className="flex-1 justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-500/40"
                >
                  Get a Quote
                </Button>
              </div>
            </nav>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}
