import type { MetadataRoute } from "next";

import { absoluteUrl, getSiteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  const host = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
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
    sitemap: absoluteUrl("/sitemap.xml"),
    host,
  };
}
