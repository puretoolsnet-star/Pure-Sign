import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocaleShell } from "@/components/i18n/LocaleShell";
import { DocumentLang } from "@/components/seo/DocumentLang";
import { isLocale, LOCALES, type Locale } from "@/i18n/locales";

type LocaleLayoutProps = LayoutProps<"/[locale]">;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};

  return {
    other: {
      "content-language": raw,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <div lang={locale}>
      <DocumentLang locale={locale} />
      <LocaleShell locale={locale}>{children}</LocaleShell>
    </div>
  );
}
