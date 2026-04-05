import { clsx } from "clsx";
import { motion } from "motion/react";
import Link from "next/link";

const variants = {
  primary: clsx(
    "inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]",
    "rounded-full border border-transparent bg-gray-950 shadow-md",
    "whitespace-nowrap text-base font-medium text-white",
    "disabled:opacity-40 hover:bg-gray-800"
  ),
  secondary: clsx(
    "relative inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]",
    "rounded-full border border-transparent bg-black shadow-md ring-1 ring-black/30",
    "after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d]",
    "whitespace-nowrap text-base font-medium text-white",
    "disabled:opacity-40 hover:bg-gray-800"
  ),
  outline: clsx(
    "inline-flex items-center justify-center px-2 py-[calc(theme(spacing.[1.5])-1px)]",
    "rounded-full border border-black bg-black shadow ring-1 ring-black/10",
    "whitespace-nowrap text-sm font-medium text-white",
    "disabled:opacity-40 hover:bg-gray-800"
  ),
};

type SharedProps = {
  variant?: keyof typeof variants;
  className?: string;
  animateOnInteraction?: boolean;
};

type ButtonAsLink = SharedProps & React.ComponentPropsWithoutRef<typeof Link>;
type ButtonAsButton = SharedProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({
  variant = "primary",
  className,
  animateOnInteraction = true,
  ...props
}: ButtonProps) {
  const composedClassName = clsx(className, variants[variant]);
  const interactionProps = animateOnInteraction
    ? { whileHover: { y: -2, scale: 1.01 }, whileTap: { scale: 0.98 } }
    : {};

  if (typeof (props as ButtonAsLink).href !== "undefined") {
    const linkProps = props as ButtonAsLink;

    return (
      <motion.div className="inline-block" {...interactionProps}>
        <Link {...linkProps} className={composedClassName} />
      </motion.div>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <motion.div className="inline-block" {...interactionProps}>
      <button {...buttonProps} className={composedClassName} />
    </motion.div>
  );
}
