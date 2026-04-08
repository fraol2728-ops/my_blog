import type { PropsWithChildren } from "react";
import { clsx } from "clsx";

export function Section({ className, children }: PropsWithChildren<{ className?: string }>) {
  return <section className={clsx("section-shell", className)}>{children}</section>;
}

export function SectionHeader({
  kicker,
  title,
  subtitle,
  align = "left",
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={clsx("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {kicker ? <p className="ui-kicker">{kicker}</p> : null}
      <h2 className="ui-title">{title}</h2>
      {subtitle ? <p className="ui-subtitle">{subtitle}</p> : null}
    </div>
  );
}
