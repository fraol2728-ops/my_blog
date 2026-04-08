export type AnalyticsEvent = {
  event: string;
  payload?: Record<string, unknown>;
};

export async function trackEvent({ event, payload = {} }: AnalyticsEvent) {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event, payload, timestamp: new Date().toISOString() }),
      keepalive: true,
    });
  } catch {
    // non-blocking analytics
  }
}
