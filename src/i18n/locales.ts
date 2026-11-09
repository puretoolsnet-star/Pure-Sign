export {
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  LOCALES,
  STORAGE_KEY,
  TOOL_IDS,
  isLocale,
  type Locale,
  type ToolId,
} from "@/i18n/config";

export type { Dictionary } from "@/i18n/types";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { de } from "@/i18n/dictionaries/de";
import { en } from "@/i18n/dictionaries/en";
import { es } from "@/i18n/dictionaries/es";
import { fr } from "@/i18n/dictionaries/fr";
import { pl } from "@/i18n/dictionaries/pl";
import { uk } from "@/i18n/dictionaries/uk";

export const dictionaries: Record<Locale, Dictionary> = {
  uk,
  en,
  de,
  fr,
  es,
  pl,
};
