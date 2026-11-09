"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

import { BodyPortal } from "@/components/layout/BodyPortal";
import { EcosystemProjectList } from "@/components/layout/EcosystemProjectList";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { Z } from "@/lib/layer-stack";

type EcosystemDialogProps = {
  open: boolean;
  onClose: () => void;
  layout: "sheet" | "dropdown";
};

export function EcosystemDialog({
  open,
  onClose,
  layout,
}: EcosystemDialogProps) {
  const { t } = useI18n();
  const isSheet = layout === "sheet";

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !isSheet) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, isSheet]);

  if (!open) {
    return null;
  }

  const header = (
    <div className="relative shrink-0 border-b border-slate-800/60 bg-surface/30 px-4 py-3">
      <div className="flex items-start gap-3">
        {isSheet && (
          <div className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-slate-600/80" />
        )}
        <div className={cn("min-w-0 flex-1", isSheet && "pt-2")}>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            {t.ecosystem.menuLabel}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-gray-400">
            {t.ecosystem.menuHint}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.ecosystem.close}
          className="shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );

  const list = (
    <EcosystemProjectList
      onNavigate={onClose}
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4"
    />
  );

  if (isSheet) {
    return (
      <BodyPortal open={open}>
        <button
          type="button"
          aria-label={t.ecosystem.close}
          className="pointer-events-auto fixed inset-0 touch-manipulation bg-black/75 backdrop-blur-sm"
          style={{ zIndex: Z.modalBackdrop }}
          onClick={onClose}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.ecosystem.menuAria}
          className="glass-card pointer-events-auto fixed bottom-0 left-1/2 flex w-[92vw] max-w-md -translate-x-1/2 flex-col overflow-hidden rounded-t-3xl border border-slate-800/60 shadow-2xl shadow-black/50"
          style={{
            zIndex: Z.bottomSheet,
            maxHeight: "min(88dvh, 40rem)",
            paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
          }}
        >
          {header}
          {list}
        </div>
      </BodyPortal>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.ecosystem.menuAria}
      className="glass-card pointer-events-auto absolute right-0 top-full z-[40] mt-2 flex w-[min(92vw,32rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-slate-800/60 shadow-xl shadow-black/40"
      style={{ maxHeight: "min(82vh, 40rem)" }}
    >
      {header}
      {list}
    </div>
  );
}
