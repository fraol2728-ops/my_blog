"use client";

import { motion, type MotionProps } from "motion/react";
import type { PropsWithChildren } from "react";
import { clsx } from "clsx";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}> &
  MotionProps;

export function Reveal({ className, delay = 0, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={clsx(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
