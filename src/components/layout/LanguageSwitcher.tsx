"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { LOCALE_LABELS, LOCALES, type Locale } from "@/i18n/locales";
import { useI18n } from "@/i18n/context";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const current = LOCALE_LABELS[locale];

  return (
    <div ref={rootRef} className="relative z-30 shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.selectLanguage}
        onClick={() => setOpen((value) => !value)}
        className="glass-card inline-flex items-center gap-1.5 rounded-xl border-slate-800/60 px-2 py-1.5 text-xs text-gray-200 transition-colors hover:border-slate-700 hover:bg-surface-hover/60 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
      >
        <span className="hidden sm:inline" aria-hidden>
          {current.flag}
        </span>
        <span className="hidden font-medium sm:inline">{current.native}</span>
        <span className="font-medium sm:hidden">{current.code}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-gray-400 transition-transform sm:h-4 sm:w-4",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t.nav.selectLanguage}
          className="glass-card absolute right-0 z-[120] mt-2 w-[min(92vw,16rem)] max-w-[calc(100vw-1rem)] overflow-hidden rounded-xl border border-slate-800/60 py-1 shadow-xl shadow-black/40"
        >
          {LOCALES.map((item) => {
            const meta = LOCALE_LABELS[item];
            const selected = item === locale;
            return (
              <li key={item} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    setLocale(item as Locale);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors sm:py-2",
                    selected
                      ? "bg-primary/15 text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <span aria-hidden>{meta.flag}</span>
                  <span className="min-w-0 truncate">{meta.native}</span>
                  <span className="ml-auto text-xs text-gray-500">{meta.code}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
