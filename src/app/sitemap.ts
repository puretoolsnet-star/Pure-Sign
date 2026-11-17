import type { MetadataRoute } from "next";

import { LOCALES, TOOL_IDS } from "@/i18n/locales";
import type { SeoPageId } from "@/i18n/seo/copy";
import { localizedPath } from "@/lib/i18n/routing";
import { buildOgImageUrl } from "@/lib/seo/og";
import {
  buildSitemapLanguageAlternates,
  canonicalAbsoluteUrl,
  seoPath,
} from "@/lib/seo/site";

const LAST_MODIFIED = new Date("2026-11-17");

type SitemapChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

const PAGES: {
  page: SeoPageId;
  priority: number;
  changeFrequency: SitemapChangeFrequency;
}[] = [
  { page: "home", priority: 1, changeFrequency: "weekly" },
  ...TOOL_IDS.map((toolId) => ({
    page: toolId as SeoPageId,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  })),
];

function entry(
  locale: (typeof LOCALES)[number],
  page: SeoPageId,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
) {
  const path = seoPath(page);
  return {
    url: canonicalAbsoluteUrl(localizedPath(locale, path)),
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
    alternates: {
      languages: buildSitemapLanguageAlternates(path),
    },
    images: [canonicalAbsoluteUrl(buildOgImageUrl(locale, page))],
  } satisfies MetadataRoute.Sitemap[number];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { page, priority, changeFrequency } of PAGES) {
    for (const locale of LOCALES) {
      entries.push(entry(locale, page, priority, changeFrequency));
    }
  }

  return entries;
}
