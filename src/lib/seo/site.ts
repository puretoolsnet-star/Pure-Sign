import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/locales";
import type { SeoPageId } from "@/i18n/seo/copy";
import { localizedPath } from "@/lib/i18n/routing";

export { DEFAULT_LOCALE, LOCALES };

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "https://puresign.app";
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

export function seoPath(page: SeoPageId): string {
  return page === "home" ? "/" : `/tools/${page}`;
}

/**
 * ISO 639-1 hreflang keys matching URL prefixes (`/uk`, `/en`, …).
 * Language-only codes are the right signal when pages are not region-specific.
 */
export const HREFLANG_MAP: Record<Locale, string> = {
  uk: "uk",
  en: "en",
  de: "de",
  fr: "fr",
  es: "es",
  pl: "pl",
};

/** BCP 47 tags for JSON-LD `inLanguage` (not used as duplicate hreflang). */
export const HREFLANG_REGIONAL: Record<Locale, string> = {
  uk: "uk-UA",
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES",
  pl: "pl-PL",
};

export const OPEN_GRAPH_LOCALE: Record<Locale, string> = {
  uk: "uk_UA",
  en: "en_US",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  pl: "pl_PL",
};

/**
 * Absolute hreflang map for `<link rel="alternate">` and sitemap xhtml links.
 * Includes every locale (self + peers) plus `x-default` → default locale.
 */
export function buildLanguageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of LOCALES) {
    languages[HREFLANG_MAP[locale]] = absoluteUrl(localizedPath(locale, path));
  }

  languages["x-default"] = absoluteUrl(localizedPath(DEFAULT_LOCALE, path));
  return languages;
}

export function buildSitemapLanguageAlternates(path: string): Record<string, string> {
  return buildLanguageAlternates(path);
}
