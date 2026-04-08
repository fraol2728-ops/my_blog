import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/en/", "/am/"],
        disallow: ["/api", "/admin", "/private"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/private", "/api/auth"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
