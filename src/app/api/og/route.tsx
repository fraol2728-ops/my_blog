import { SITE_NAME } from "@/lib/seo";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Cybersecurity Solutions";
  const locale = searchParams.get("locale") ?? "en";
  const path = searchParams.get("path") ?? "/";

  const subtitle = locale === "am" ? "የሳይበር ደህንነት አገልግሎቶች" : "Managed SOC • Incident Response • Cloud Security";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #020617 0%, #0f766e 55%, #14532d 100%)",
          color: "#ffffff",
          padding: "64px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 700 }}>{SITE_NAME}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, lineHeight: 1.1, fontWeight: 800, maxWidth: "95%" }}>{title}</div>
          <div style={{ fontSize: 28, opacity: 0.9 }}>{subtitle}</div>
        </div>
        <div style={{ fontSize: 24, opacity: 0.85 }}>{path}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
