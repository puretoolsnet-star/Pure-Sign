import type { MetadataRoute } from "next";

import { LOCALES, TOOL_IDS } from "@/i18n/locales";
import { localizedPath } from "@/lib/i18n/routing";
import { buildOgImageUrl } from "@/lib/seo/og";
import { absoluteUrl, buildLanguageAlternates } from "@/lib/seo/site";
import type { SeoPageId } from "@/i18n/seo/copy";

const LAST_MODIFIED = new Date("2026-11-06");

function entry(locale: (typeof LOCALES)[number], path: string, page: SeoPageId, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]) {
  return {
    url: absoluteUrl(localizedPath(locale, path)),
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
    alternates: {
      languages: buildLanguageAlternates(path),
    },
    images: [absoluteUrl(buildOgImageUrl(locale, page))],
  } satisfies MetadataRoute.Sitemap[number];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push(entry(locale, "/", "home", 1, "weekly"));
  }

  for (const toolId of TOOL_IDS) {
    const path = `/tools/${toolId}`;
    for (const locale of LOCALES) {
      entries.push(entry(locale, path, toolId, 0.9, "monthly"));
    }
  }

  return entries;
}
