"use client";

import { useCallback } from "react";

import { useI18n } from "@/i18n/context";
import { withLocaleInUrl } from "@/lib/ecosystem";
import { localizedPath } from "@/lib/i18n/routing";

export function useLocalizedPath() {
  const { locale } = useI18n();

  return useCallback(
    (path: string) => {
      if (path.startsWith("http://") || path.startsWith("https://")) {
        return withLocaleInUrl(path, locale);
      }
      return localizedPath(locale, path);
    },
    [locale],
  );
}
