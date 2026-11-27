import type { MetadataRoute } from "next";

import { CANONICAL_SITE_URL, canonicalAbsoluteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/og"],
      },
      {
        userAgent: ["Googlebot", "Googlebot-Image", "Google-InspectionTool"],
        allow: "/",
      },
      {
        userAgent: ["Bingbot", "Applebot"],
        allow: "/",
      },
    ],
    sitemap: canonicalAbsoluteUrl("/sitemap.xml"),
    host: CANONICAL_SITE_URL,
  };
}
