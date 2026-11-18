import type { Locale } from "@/i18n/locales";
import type { SeoPageId } from "@/i18n/seo/copy";
import type {
  SeoPageContent,
  SeoPageContentCatalog,
} from "@/i18n/seo/content-types";
import { de } from "@/i18n/seo/content/de";
import { en } from "@/i18n/seo/content/en";
import { es } from "@/i18n/seo/content/es";
import { fr } from "@/i18n/seo/content/fr";
import { pl } from "@/i18n/seo/content/pl";
import { uk } from "@/i18n/seo/content/uk";

export type {
  SeoBenefit,
  SeoFaqItem,
  SeoPageContent,
  SeoPageContentCatalog,
  SeoSection,
} from "@/i18n/seo/content-types";

const CATALOG: Record<Locale, SeoPageContentCatalog> = {
  uk,
  en,
  de,
  fr,
  es,
  pl,
};

export function getSeoPageContent(
  page: SeoPageId,
  locale: Locale,
): SeoPageContent {
  return CATALOG[locale][page];
}
