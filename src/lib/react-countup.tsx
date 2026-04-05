"use client";

import { useEffect, useMemo, useState } from "react";

type CountUpProps = {
  end: number;
  duration?: number;
  suffix?: string;
};

export default function CountUp({ end, duration = 2, suffix = "" }: CountUpProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const target = useMemo(() => Math.max(0, end), [end]);

  useEffect(() => {
    let animationFrame = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const nextValue = Math.round(progress * target);

      setCurrentValue(nextValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [duration, target]);

  return (
    <span>
      {currentValue}
      {suffix}
    </span>
  );
}
