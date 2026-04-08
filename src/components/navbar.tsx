"use client";

import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

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
  const t = useTranslations("nav");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [desktopOpenDropdown, setDesktopOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdowns, setMobileOpenDropdowns] = useState<Record<string, boolean>>({});
  const [desktopKeyword, setDesktopKeyword] = useState("");
  const [mobileKeyword, setMobileKeyword] = useState("");

  const navLinks: NavItem[] = [
    { href: "/", label: t("home") },
    {
      label: t("about"),
      dropdownItems: [
        { href: "/about#company-overview", label: t("aboutOverview") },
        { href: "/about#vision-mission", label: t("aboutVision") },
        { href: "/about#our-values", label: t("aboutValues") },
        { href: "/about#leadership", label: t("aboutLeadership") },
        { href: "/about#our-projects", label: t("aboutProjects") },
        { href: "/about#sustainability", label: t("aboutSustainability") },
      ],
    },
    {
      label: t("services"),
      dropdownItems: [
        { href: "/services#solar-energy-solutions", label: t("servicesSolar") },
        { href: "/services#epc", label: t("servicesEpc") },
        { href: "/services#energy-storage-systems", label: t("servicesStorage") },
        { href: "/services#maintenance-support", label: t("servicesMaintenance") },
        { href: "/services#consultancy", label: t("servicesConsultancy") },
        { href: "/services#custom-projects", label: t("servicesCustom") },
      ],
    },
    { href: "/news", label: t("news") },
    { href: "/contact#faqs", label: t("faqs") },
    { href: "/contact", label: t("contact") },
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
      router.push("/news");
      return;
    }

    router.push(`/news?q=${encodeURIComponent(trimmedKeyword)}`);
  };

  const switchLocale = (nextLocale: AppLocale) => {
    router.replace(pathname, { locale: nextLocale });
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
          <Link href="/" className="group flex items-center gap-3" aria-label="Go to homepage">
            <Image
              src="/logo.png"
              alt="Master Premier Green Energy Co. Ltd"
              width={44}
              height={44}
              className="h-11 w-11 rounded-md object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <span className="hidden text-base font-semibold text-slate-900 sm:block">{t("brand")}</span>
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
            <div className="flex items-center rounded-full border border-slate-200 bg-white p-1">
              {([
                { code: "en", label: t("english") },
                { code: "am", label: t("amharic") },
              ] as const).map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => switchLocale(lang.code)}
                  className={clsx(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    locale === lang.code ? "bg-emerald-600 text-white" : "text-slate-700"
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>

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
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchLabel")}
                className="ui-input w-44 rounded-full"
              />
              <button
                type="submit"
                aria-label={t("searchLabel")}
                className="rounded-full border border-slate-200 p-2 text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
              >
                <MagnifyingGlassIcon className="size-5" />
              </button>
            </form>
            <Button href="/contact" variant="primary" className="shadow-sm">
              {t("quote")}
            </Button>
          </div>

          <DisclosureButton className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700 lg:hidden">
            <span className="sr-only">{t("toggleMenu")}</span>
            {open ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
          </DisclosureButton>

          <DisclosurePanel className="absolute inset-x-0 top-full border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur-2xl lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5">
              <div className="mb-2 flex items-center justify-end gap-2">
                {([
                  { code: "en", label: t("english") },
                  { code: "am", label: t("amharic") },
                ] as const).map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => switchLocale(lang.code)}
                    className={clsx(
                      "rounded-full border px-3 py-1 text-xs font-semibold",
                      locale === lang.code
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-200 text-slate-700"
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

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
                    placeholder={t("searchPlaceholder")}
                    aria-label={t("searchLabel")}
                    className="ui-input w-full"
                  />
                  <button
                    type="submit"
                    aria-label={t("searchLabel")}
                    className="rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
                  >
                    <MagnifyingGlassIcon className="size-5" />
                  </button>
                </form>
                <Button href="/contact" variant="primary" className="flex-1 justify-center">
                  {t("quote")}
                </Button>
              </div>
            </nav>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}
