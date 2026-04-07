"use client";

import Link from "next/link";
import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from "./button";
import { useEffect, useState } from "react";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "group relative py-2 text-sm font-medium transition-colors duration-200",
                  isActivePath(pathname, item.href) ? "text-emerald-600" : "text-slate-700 hover:text-slate-900"
                )}
              >
                {item.label}
                <span
                  className={clsx(
                    "absolute -bottom-0.5 left-0 h-0.5 bg-emerald-600 transition-all duration-300",
                    isActivePath(pathname, item.href) ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
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
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                    isActivePath(pathname, item.href)
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 active:bg-emerald-100"
                  )}
                >
                  {item.label}
                </Link>
              ))}
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
