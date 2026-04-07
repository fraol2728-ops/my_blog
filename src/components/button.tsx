import * as Headless from "@headlessui/react";
import { clsx } from "clsx";
import Link from "next/link";

const baseButton =
  "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: clsx(
    baseButton,
    "bg-emerald-600 text-white shadow-[0_10px_25px_rgba(5,150,105,0.25)] hover:-translate-y-0.5 hover:bg-emerald-500"
  ),
  secondary: clsx(
    baseButton,
    "border border-slate-300 bg-white text-slate-800 hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-900 hover:text-white"
  ),
  outline: clsx(
    baseButton,
    "border border-slate-300 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-emerald-500 hover:text-emerald-700"
  ),
};

type ButtonProps = {
  variant?: keyof typeof variants;
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (Headless.ButtonProps & { href?: undefined })
);

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  className = clsx(variants[variant], className);

  if (typeof props.href === "undefined") {
    return <Headless.Button {...props} className={className} />;
  }

  return <Link {...props} className={className} />;
}
