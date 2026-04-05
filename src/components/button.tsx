import * as Headless from "@headlessui/react";
import { clsx } from "clsx";
import Link from "next/link";

const baseButton =
  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: clsx(baseButton, "bg-primary text-white shadow-subtle hover:-translate-y-0.5 hover:bg-primary/90"),
  secondary: clsx(
    baseButton,
    "border border-dark/80 bg-transparent text-dark hover:-translate-y-0.5 hover:border-dark hover:bg-dark hover:text-white"
  ),
  outline: clsx(baseButton, "border border-dark/20 bg-white text-dark hover:border-primary hover:text-primary"),
};

type ButtonProps = {
  variant?: keyof typeof variants;
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (Headless.ButtonProps & { href?: undefined })
);

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  className = clsx(className, variants[variant]);

  if (typeof props.href === "undefined") {
    return <Headless.Button {...props} className={className} />;
  }

  return <Link {...props} className={className} />;
}
