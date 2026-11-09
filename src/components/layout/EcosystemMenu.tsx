"use client";

import { ChevronDown, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { EcosystemDialog } from "@/components/layout/EcosystemDialog";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export function EcosystemMenu() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!open || !isDesktop) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open, isDesktop]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={t.ecosystem.menuAria}
        onClick={() => setOpen((value) => !value)}
        className="glass-card relative z-10 inline-flex max-w-[44vw] items-center gap-1.5 rounded-xl border-slate-800/60 px-2 py-1.5 text-xs text-gray-200 transition-colors hover:border-slate-700 hover:bg-surface-hover/60 sm:max-w-none sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
      >
        <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary sm:h-4 sm:w-4" aria-hidden />
        <span className="hidden font-medium sm:inline">{t.ecosystem.menuLabel}</span>
        <span className="truncate font-medium sm:hidden">{t.ecosystem.menuShort}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-gray-400 transition-transform sm:h-4 sm:w-4",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <EcosystemDialog
        open={open}
        onClose={() => setOpen(false)}
        layout={isDesktop ? "dropdown" : "sheet"}
      />
    </div>
  );
}
