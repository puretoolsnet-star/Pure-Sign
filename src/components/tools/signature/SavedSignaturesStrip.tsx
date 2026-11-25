"use client";

import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { useI18n } from "@/i18n/context";
import { SignaturePaperSurface } from "@/components/tools/signature/SignaturePaperSurface";
import { cn } from "@/lib/cn";
import type { PadSurfaceMode } from "@/lib/signatures/paper-surface";
import {
  deleteSavedSignature,
  listSavedSignatures,
  type SavedSignature,
} from "@/lib/signatures/storage";

type SavedSignaturesStripProps = {
  onApply: (dataUrl: string) => void;
  className?: string;
  displaySurface?: PadSurfaceMode;
};

export function SavedSignaturesStrip({
  onApply,
  className,
  displaySurface = "paper",
}: SavedSignaturesStripProps) {
  const { t } = useI18n();
  const [items, setItems] = useState<SavedSignature[]>([]);

  const refresh = useCallback(() => {
    setItems(listSavedSignatures());
  }, []);

  useEffect(() => {
    refresh();
    const onStorage = (event: StorageEvent) => {
      if (event.key === "puresign-signatures-v1") refresh();
    };
    const onCustom = () => refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener("puresign-signatures-changed", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("puresign-signatures-changed", onCustom);
    };
  }, [refresh]);

  if (!items.length) return null;

  return (
    <div className={cn("min-w-0 space-y-2", className)}>
      <p className="text-xs text-gray-500">{t.sign.savedTitle}</p>
      <ul className="flex min-w-0 gap-2 overflow-x-auto pb-1">
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <div className="group relative p-0.5">
              <SignaturePaperSurface
                mode={displaySurface}
                showBaseline={false}
                frameClassName="rounded-lg"
                className="!min-h-0"
              >
                <button
                  type="button"
                  className="block h-12 w-24"
                  onClick={() => onApply(item.dataUrl)}
                  title={t.sign.savedUse(item.name)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.dataUrl}
                    alt={item.name}
                    className="pointer-events-none h-full w-full object-contain"
                  />
                </button>
              </SignaturePaperSurface>
              <button
                type="button"
                className="absolute -right-1 -top-1 rounded-full border border-slate-700 bg-slate-900 p-1 text-gray-400 hover:text-rose-300"
                aria-label={t.sign.savedDelete(item.name)}
                onClick={() => {
                  deleteSavedSignature(item.id);
                  refresh();
                }}
              >
                <Trash2 className="h-3 w-3" aria-hidden />
              </button>
            </div>
            <p className="mt-1 max-w-24 truncate text-center text-[10px] text-gray-500">
              {item.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function notifySavedSignaturesChanged() {
  window.dispatchEvent(new Event("puresign-signatures-changed"));
}