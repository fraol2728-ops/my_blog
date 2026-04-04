import * as Headless from "@headlessui/react";
import { clsx } from "clsx";
import Link from "next/link";

const variants = {
  primary: clsx(
    "inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]",
    "rounded-full border border-transparent bg-gray-950 shadow-md",
    "whitespace-nowrap text-base font-medium text-white",
    "data-[disabled]:bg-gray-950 data-[hover]:bg-gray-800 data-[disabled]:opacity-40"
  ),
  secondary: clsx(
    "relative inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]",
    "rounded-full border border-transparent bg-black shadow-md ring-1 ring-black/30",
    "after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d]",
    "whitespace-nowrap text-base font-medium text-white",
    "data-[disabled]:bg-black data-[hover]:bg-gray-800 data-[disabled]:opacity-40"
  ),
  outline: clsx(
    "inline-flex items-center justify-center px-2 py-[calc(theme(spacing.[1.5])-1px)]",
    "rounded-full border border-black bg-black shadow ring-1 ring-black/10",
    "whitespace-nowrap text-sm font-medium text-white",
    "data-[disabled]:bg-black data-[hover]:bg-gray-800 data-[disabled]:opacity-40"
  ),
};

type ButtonProps = {
  variant?: keyof typeof variants;
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (Headless.ButtonProps & { href?: undefined })
);

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  className = clsx(className, variants[variant]);

  if (typeof props.href === "undefined") {
    return <Headless.Button {...props} className={className} />;
  }

  return <Link {...props} className={className} />;
}
