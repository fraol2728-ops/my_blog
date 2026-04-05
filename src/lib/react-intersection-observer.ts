"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  triggerOnce?: boolean;
  threshold?: number;
};

type UseInViewResult<T extends Element> = {
  ref: (node: T | null) => void;
  inView: boolean;
};

export function useInView<T extends Element = HTMLElement>({
  triggerOnce = false,
  threshold = 0,
}: UseInViewOptions = {}): UseInViewResult<T> {
  const [inView, setInView] = useState(false);
  const [target, setTarget] = useState<T | null>(null);
  const hasTriggered = useRef(false);

  const ref = useCallback((node: T | null) => {
    setTarget(node);
  }, []);

  useEffect(() => {
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;

        if (triggerOnce && hasTriggered.current) {
          return;
        }

        if (isVisible) {
          setInView(true);
          hasTriggered.current = true;

          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
          return;
        }

        if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [target, threshold, triggerOnce]);

  return { ref, inView };
}
