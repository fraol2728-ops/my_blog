"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics/events";

export default function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent({
      event: "page_view",
      payload: {
        path: pathname,
        query: typeof window !== "undefined" ? window.location.search : "",
      },
    });
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        trackEvent({
          event: "performance_metric",
          payload: {
            metric: entry.name,
            value: entry.duration,
          },
        });
      }
    });

    observer.observe({ type: "largest-contentful-paint", buffered: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
