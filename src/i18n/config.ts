export const LOCALES = ["uk", "en", "de", "fr", "es", "pl"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE = "uk" satisfies Locale;

export const TOOL_IDS = [
  "sign",
  "stamp",
  "fill-form",
  "page-numbers",
  "redact",
  "extract-text",
] as const;

export type ToolId = (typeof TOOL_IDS)[number];

export const LOCALE_LABELS: Record<
  Locale,
  { code: string; native: string; flag: string }
> = {
  uk: { code: "UA", native: "Українська", flag: "🇺🇦" },
  en: { code: "EN", native: "English", flag: "🇬🇧" },
  de: { code: "DE", native: "Deutsch", flag: "🇩🇪" },
  fr: { code: "FR", native: "Français", flag: "🇫🇷" },
  es: { code: "ES", native: "Español", flag: "🇪🇸" },
  pl: { code: "PL", native: "Polski", flag: "🇵🇱" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export const STORAGE_KEY = "puresign-locale";
