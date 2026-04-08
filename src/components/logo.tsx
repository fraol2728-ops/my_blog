import clsx from "clsx";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" title="Home">
      <Image
        src="/fulllogo.png"
        alt="Company logo"
        width={220}
        height={60}
        className={clsx("h-12 w-auto px-0 object-contain", className)}
        priority
      />
    </Link>
  );
}
