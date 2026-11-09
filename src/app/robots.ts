import type { MetadataRoute } from "next";

import { absoluteUrl, getSiteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  const host = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host,
  };
}
