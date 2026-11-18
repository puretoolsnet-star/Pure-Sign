import type { MetadataRoute } from "next";

import { LOCALES } from "@/i18n/locales";
import { SEO_PAGE_IDS, type SeoPageId } from "@/i18n/seo/copy";
import { localizedPath } from "@/lib/i18n/routing";
import { buildOgImageUrl } from "@/lib/seo/og";
import {
  buildLanguageAlternates,
  canonicalAbsoluteUrl,
  seoPath,
} from "@/lib/seo/site";

const LAST_MODIFIED = new Date("2026-11-18");

type SitemapChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

function pagePriority(page: SeoPageId): number {
  if (page === "home") return 1;
  if (page === "sign") return 0.95;
  return 0.9;
}

function pageChangeFrequency(page: SeoPageId): SitemapChangeFrequency {
  return page === "home" ? "weekly" : "monthly";
}

function entry(locale: (typeof LOCALES)[number], page: SeoPageId) {
  const path = seoPath(page);
  return {
    url: canonicalAbsoluteUrl(localizedPath(locale, path)),
    lastModified: LAST_MODIFIED,
    changeFrequency: pageChangeFrequency(page),
    priority: pagePriority(page),
    alternates: {
      languages: buildLanguageAlternates(path),
    },
    images: [canonicalAbsoluteUrl(buildOgImageUrl(locale, page))],
  } satisfies MetadataRoute.Sitemap[number];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of SEO_PAGE_IDS) {
    for (const locale of LOCALES) {
      entries.push(entry(locale, page));
    }
  }

  return entries;
}
