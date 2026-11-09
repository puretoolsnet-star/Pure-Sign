"use client";

import { ShieldCheck } from "lucide-react";

import { useI18n } from "@/i18n/context";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer
      className="mt-auto w-full min-w-0 border-t border-slate-800/60 bg-[#070a12]/90"
      aria-label={t.footer.rights}
    >
      <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-8">
        <p className="min-w-0 text-sm text-gray-400 [overflow-wrap:anywhere]">
          {t.footer.rights}
        </p>
        <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-200">
          <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
          <span className="min-w-0 [overflow-wrap:anywhere]">{t.footer.privacyBadge}</span>
        </div>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-6 text-center text-xs text-gray-500 [overflow-wrap:anywhere] sm:px-6 sm:text-left md:px-8">
        {t.footer.tagline}
      </p>
    </footer>
  );
}
