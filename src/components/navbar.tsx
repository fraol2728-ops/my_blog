"use client";
import Link from "next/link";
import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "motion/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import clsx from "clsx";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const DesktopNav = ({ scrolled }: { scrolled: boolean }) => {
  const { data: session } = useSession();

  return (
    <nav className="relative hidden lg:flex items-center">
      {navLinks?.map((item) => (
        <div key={item?.href} className="flex">
          <Link
            href={item?.href}
            className={clsx(
              "px-4 py-2 text-base font-medium transition-colors duration-300",
              scrolled
                ? "text-white hover:bg-white/10"
                : "text-slate-100 hover:bg-white/10"
            )}
          >
            {item?.label}
          </Link>
        </div>
      ))}
      <div className="flex items-center">
        {session?.user ? (
          <button
            onClick={() => signOut()}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-full border border-black bg-black text-white transition-colors duration-300",
              scrolled && "border-white"
            )}
          >
            <Image
              src={session?.user?.image as string}
              width={50}
              height={50}
              className="w-8 h-8 rounded-full object-cover"
              alt="userImage"
            />
            <p>{session?.user?.name}</p>
          </button>
        ) : (
          <Link
            href="/login"
            className="px-6 py-2 text-base font-medium rounded-full border border-black bg-black text-white"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

const MobileNavButton = ({ open, scrolled }: { open: boolean; scrolled: boolean }) => {
  return (
    <DisclosureButton className="flex size-12 items-center justify-center self-center rounded-lg data-[hover]:bg-black/5 lg:hidden duration-300">
      {open ? (
        <XMarkIcon className={clsx("size-6", scrolled ? "text-white" : "text-slate-100")} />
      ) : (
        <Bars2Icon className={clsx("size-6", scrolled ? "text-white" : "text-slate-100")} />
      )}
    </DisclosureButton>
  );
};

export const MobileNav = ({ scrolled }: { scrolled: boolean }) => {
  const { data: session } = useSession();
  return (
    <DisclosurePanel className="lg:hidden">
      <div className="flex flex-col gap-6 py-4">
        {navLinks?.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
              rotateX: { duration: 0.3, delay: index * 0.1 },
            }}
            key={item?.href}
          >
            <Link
              href={item?.href}
              className={clsx(
                "text-base font-medium hover:underline underline-offset-2 decoration-[1px] transition-colors",
                scrolled
                  ? "text-white hover:text-emerald-300"
                  : "text-slate-100 hover:text-emerald-300"
              )}
            >
              {item?.label}
            </Link>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, rotateX: -90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.15,
            ease: "easeInOut",
            rotateX: { duration: 0.3, delay: 0.4 },
          }}
        >
          {session?.user ? (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-black bg-black text-white"
            >
              <Image
                src={session?.user?.image as string}
                width={50}
                height={50}
                className="w-8 h-8 rounded-full object-cover"
                alt="userImage"
              />
              <p className="text-base font-medium">{session?.user?.name}</p>
            </button>
          ) : (
            <Link
              href="/login"
              className="inline-flex px-6 py-2 text-base font-medium rounded-full border border-black bg-black text-white"
            >
              Login
            </Link>
          )}
        </motion.div>
      </div>
    </DisclosurePanel>
  );
};

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Disclosure
      as="header"
      className={clsx(
        "fixed inset-x-0 top-4 z-50 border-b border-transparent bg-transparent transition-all duration-300",
        scrolled
          ? "shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          : "shadow-[0_8px_24px_rgba(0,0,0,0.22)]"
      )}
    >
      {({ open }) => (
        <div className="mx-auto max-w-7xl px-6 py-1.5 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="py-1">
              <div className="group flex items-center gap-3 px-2 py-1.5 transition-colors duration-300 hover:bg-emerald-600/10">
                <Image
                  src="/logo.png"
                  alt="Master Premier Green Energy Co. Ltd"
                  width={48}
                  height={48}
                  className="h-10 w-10 rounded-md object-contain"
                  priority
                />
                <p
                  className={clsx(
                    "text-sm sm:text-base font-semibold leading-tight max-w-[185px] sm:max-w-[220px]",
                    "text-white"
                  )}
                >
                  Master Premier
                  <br />
                  Green Energy Co. Ltd
                </p>
              </div>
            </Link>
            <DesktopNav scrolled={scrolled} />
            <MobileNavButton open={open} scrolled={scrolled} />
          </div>
          <MobileNav scrolled={scrolled} />
        </div>
      )}
    </Disclosure>
  );
}
