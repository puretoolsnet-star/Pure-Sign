import type { Locale } from "@/i18n/locales";

/** Sets <html lang> from the first paint so crawlers see the correct locale. */
export function DocumentLang({ locale }: { locale: Locale }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang=${JSON.stringify(locale)};`,
      }}
    />
  );
}
