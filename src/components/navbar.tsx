"use client";

import Link from "next/link";
import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from "./button";

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

  return (
    <Disclosure as="header" className="sticky top-0 z-50 border-b border-black/5 bg-white/80 shadow-sm backdrop-blur-lg">
      {({ open }) => (
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3" aria-label="Go to homepage">
            <Image
              src="/logo.png"
              alt="Master Premier Green Energy Co. Ltd"
              width={44}
              height={44}
              className="h-11 w-11 rounded-md object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <span className="hidden text-sm font-semibold text-dark sm:block">Master Premier</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  isActivePath(pathname, item.href)
                    ? "bg-emerald-50 text-emerald-700 shadow-sm"
                    : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 active:bg-emerald-100"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              href="/contact"
              variant="primary"
              className="bg-emerald-600 shadow-sm hover:bg-emerald-700 focus-visible:ring-emerald-500/40"
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
              <Button
                href="/contact"
                variant="primary"
                className="mt-1 bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-500/40"
              >
                Get a Quote
              </Button>
            </nav>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}
