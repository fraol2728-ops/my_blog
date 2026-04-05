"use client";

import Link from "next/link";
import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

const isActivePath = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Disclosure
      as="header"
      className={clsx(
        "sticky top-0 z-50 border-b transition-all duration-300",
        isScrolled
          ? "border-[#f2922A]/20 bg-white/70 shadow-lg shadow-slate-900/5 backdrop-blur-xl"
          : "border-transparent bg-white/30 backdrop-blur-md"
      )}
    >
      {({ open }) => (
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Master Premier Green Energy Co. Ltd"
              width={44}
              height={44}
              className="h-11 w-11 rounded-md object-contain"
              priority
            />
            <span className="hidden text-sm font-semibold text-gray-900 sm:block">Master Premier</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    active ? "text-slate-900" : "text-gray-700 hover:text-[#f2922A]"
                  )}
                >
                  {item.label}
                  <span
                    className={clsx(
                      "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full transition-opacity",
                      active ? "bg-[#f2922A] opacity-100" : "bg-transparent opacity-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-[#f2922A] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#f2922A]/30 transition-colors duration-200 hover:bg-[#dd8223]"
            >
              Get a Quote
            </Link>
          </div>

          <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition hover:text-[#f2922A] lg:hidden">
            <span className="sr-only">Toggle menu</span>
            {open ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
          </DisclosureButton>

          <DisclosurePanel className="absolute inset-x-0 top-full border-b border-gray-200/80 bg-white/90 shadow-sm backdrop-blur-xl lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                    isActivePath(pathname, item.href)
                      ? "bg-[#f2922A]/15 text-[#d17516]"
                      : "text-gray-700 hover:text-[#f2922A]"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 inline-flex w-fit items-center rounded-full bg-[#f2922A] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#dd8223]"
              >
                Get a Quote
              </Link>
            </nav>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}
