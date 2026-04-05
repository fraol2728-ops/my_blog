import clsx from "clsx";
import React from "react";

export function Gradient({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "bg-[linear-gradient(120deg,var(--tw-gradient-stops))] from-white via-[#fff7ee] to-[#fff2e1]"
      )}
    />
  );
}

export const GradientBackground = () => {
  return (
    <div className="pointer-events-none relative mx-auto max-w-7xl">
      <div
        className={clsx(
          "absolute -right-44 -top-36 h-56 w-[28rem] transform-gpu md:right-0",
          "bg-[linear-gradient(120deg,var(--tw-gradient-stops))] from-primary/40 via-primary/20 to-transparent",
          "rotate-[-10deg] rounded-full blur-3xl"
        )}
      />
    </div>
  );
};
