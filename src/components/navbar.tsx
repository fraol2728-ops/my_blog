"use client";

import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "@/i18n/I18nProvider";
import type { AppLocale } from "@/i18n/config";
import LanguageSwitcher from "./language-switcher";

type DropdownItem = {
  href: string;
  label: string;
};

type NavItem = {
  href?: string;
  label: string;
  dropdownItems?: DropdownItem[];
};

const isActivePath = (pathname: string, href: string) => {
  const basePath = href.split("#")[0];
  return basePath === "/" ? pathname === "/" : pathname === basePath || pathname.startsWith(`${basePath}/`);
};

export default function Navbar() {
  const t = useTranslations;
  const locale = useLocale() as AppLocale;
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [desktopOpenDropdown, setDesktopOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdowns, setMobileOpenDropdowns] = useState<Record<string, boolean>>({});
  const [desktopKeyword, setDesktopKeyword] = useState("");
  const [mobileKeyword, setMobileKeyword] = useState("");

  const navLinks: NavItem[] = [
    { href: "/", label: t("nav.home") },
    {
      label: t("nav.about"),
      dropdownItems: [
        { href: "/about#company-overview", label: t("nav.aboutOverview") },
        { href: "/about#vision-mission", label: t("nav.aboutVision") },
        { href: "/about#our-values", label: t("nav.aboutValues") },
        { href: "/about#leadership", label: t("nav.aboutLeadership") },
        { href: "/about#our-projects", label: t("nav.aboutProjects") },
        { href: "/about#sustainability", label: t("nav.aboutSustainability") },
      ],
    },
    {
      label: t("nav.services"),
      dropdownItems: [
        { href: "/services#solar-energy-solutions", label: t("nav.servicesSolar") },
        { href: "/services#epc", label: t("nav.servicesEpc") },
        { href: "/services#energy-storage-systems", label: t("nav.servicesStorage") },
        { href: "/services#maintenance-support", label: t("nav.servicesMaintenance") },
        { href: "/services#consultancy", label: t("nav.servicesConsultancy") },
        { href: "/services#custom-projects", label: t("nav.servicesCustom") },
      ],
    },
    { href: "/news", label: t("nav.news") },
    { href: "/contact#faqs", label: t("nav.faqs") },
    { href: "/contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobileDropdown = (label: string) => {
    setMobileOpenDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const submitSearch = (keyword: string) => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      router.push(localizedHref("/news"));
      return;
    }

    router.push(`${localizedHref("/news")}?q=${encodeURIComponent(trimmedKeyword)}`);
  };

  const localizedHref = (href: string) => {
    if (href.startsWith("http") || href.startsWith("#")) return href;

    return `/${locale}${href === "/" ? "" : href}`;
  };


  return (
    <Disclosure
      as="header"
      className={clsx(
        "sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur-2xl transition-all duration-300",
        isScrolled ? "shadow-lg shadow-slate-900/10" : "shadow-sm shadow-slate-900/5"
      )}
    >
      {({ open }) => (
        <div
          className={clsx(
            "mx-auto flex w-full max-w-7xl items-center justify-between px-6 transition-all duration-300 lg:px-8",
            isScrolled ? "h-[72px]" : "h-20"
          )}
        >
          <Link href={localizedHref("/")} className="group flex items-center gap-3" aria-label="Go to homepage">
            <Image
              src="/logo.png"
              alt="Master Premier Green Energy Co. Ltd"
              width={44}
              height={44}
              className="h-11 w-11 rounded-md object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <span className="hidden text-base font-semibold text-slate-900 sm:block">{t("nav.brand")}</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((item) => {
              if (!item.dropdownItems || !item.dropdownItems.length) {
                return (
                  <Link
                    key={item.label}
                    href={localizedHref(item.href!)}
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
                      "ui-nav-link flex items-center gap-1",
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
                        className="ui-card absolute left-1/2 top-full mt-3 w-[240px] -translate-x-1/2 p-4 shadow-lg"
                      >
                        <div className="space-y-1">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.label}
                              href={localizedHref(dropdownItem.href)}
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
            <LanguageSwitcher />

            <form
              className="flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                submitSearch(desktopKeyword);
              }}
            >
              <input
                type="search"
                name="q"
                value={desktopKeyword}
                onChange={(event) => setDesktopKeyword(event.target.value)}
                placeholder={t("nav.searchPlaceholder")}
                aria-label={t("nav.searchLabel")}
                className="ui-input w-44 rounded-full"
              />
              <button
                type="submit"
                aria-label={t("nav.searchLabel")}
                className="rounded-full border border-slate-200 p-2 text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
              >
                <MagnifyingGlassIcon className="size-5" />
              </button>
            </form>
            <Button href={localizedHref("/contact")} variant="primary" className="shadow-sm">
              {t("nav.quote")}
            </Button>
          </div>

          <DisclosureButton className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700 lg:hidden">
            <span className="sr-only">{t("nav.toggleMenu")}</span>
            {open ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
          </DisclosureButton>

          <DisclosurePanel className="absolute inset-x-0 top-full border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur-2xl lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5">
              <LanguageSwitcher mobile />

              {navLinks.map((item) => {
                if (!item.dropdownItems || !item.dropdownItems.length) {
                  return (
                    <Link
                      key={item.label}
                      href={localizedHref(item.href!)}
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
                              href={localizedHref(dropdownItem.href)}
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
                <form
                  className="flex flex-1 items-center gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    submitSearch(mobileKeyword);
                  }}
                >
                  <input
                    type="search"
                    name="q"
                    value={mobileKeyword}
                    onChange={(event) => setMobileKeyword(event.target.value)}
                    placeholder={t("nav.searchPlaceholder")}
                    aria-label={t("nav.searchLabel")}
                    className="ui-input w-full"
                  />
                  <button
                    type="submit"
                    aria-label={t("nav.searchLabel")}
                    className="rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
                  >
                    <MagnifyingGlassIcon className="size-5" />
                  </button>
                </form>
                <Button href={localizedHref("/contact")} variant="primary" className="flex-1 justify-center">
                  {t("nav.quote")}
                </Button>
              </div>
            </nav>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}
