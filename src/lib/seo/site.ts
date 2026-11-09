import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/locales";
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

/** ISO 639-1 codes matching URL prefixes — Google hreflang primary keys. */
export const HREFLANG_MAP: Record<Locale, string> = {
  uk: "uk",
  en: "en",
  de: "de",
  fr: "fr",
  es: "es",
  pl: "pl",
};

/** Optional regional variants pointing at the same localized URL. */
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

export function buildLanguageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of LOCALES) {
    const url = absoluteUrl(localizedPath(locale, path));
    languages[HREFLANG_MAP[locale]] = url;
    languages[HREFLANG_REGIONAL[locale]] = url;
  }

  languages["x-default"] = absoluteUrl(localizedPath(DEFAULT_LOCALE, path));
  return languages;
}
