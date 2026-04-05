"use client";

import Link from "next/link";
import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";

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

  return (
    <Disclosure
      as="header"
      className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur"
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
            <span className="hidden text-sm font-semibold text-gray-900 sm:block">
              Master Premier
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200",
                  isActivePath(pathname, item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary/90"
            >
              Get a Quote
            </Link>
          </div>

          <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition hover:text-primary lg:hidden">
            <span className="sr-only">Toggle menu</span>
            {open ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
          </DisclosureButton>

          <DisclosurePanel className="absolute inset-x-0 top-full border-b border-gray-200 bg-white shadow-sm lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                    isActivePath(pathname, item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:text-primary"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 inline-flex w-fit items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary/90"
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
