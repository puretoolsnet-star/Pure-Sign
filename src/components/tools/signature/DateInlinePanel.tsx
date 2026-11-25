"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { DateSourcePanel } from "@/components/tools/signature/DateSourcePanel";
import { useI18n } from "@/i18n/context";
import type { SignDateOverlayMeta } from "@/lib/pdf/overlays";

export type DateInsertPayload = {
  dataUrl: string;
  relativeWidth: number;
  meta: SignDateOverlayMeta;
};

type DateInlinePanelProps = {
  open: boolean;
  onClose: () => void;
  onInsert: (payload: DateInsertPayload) => void;
};

export function DateInlinePanel({ open, onClose, onInsert }: DateInlinePanelProps) {
  const { t } = useI18n();
  const [size, setSize] = useState(0.3);
  const [assetUrl, setAssetUrl] = useState<string | null>(null);
  const metaRef = useRef<SignDateOverlayMeta | null>(null);
  const [panelKey, setPanelKey] = useState(0);

  useEffect(() => {
    if (!open) return;
    setSize(0.3);
    setAssetUrl(null);
    metaRef.current = null;
    setPanelKey((k) => k + 1);
  }, [open]);

  if (!open) return null;

  const handleInsert = () => {
    const meta = metaRef.current;
    if (!meta || !assetUrl) return;
    onInsert({ dataUrl: assetUrl, relativeWidth: size, meta });
    onClose();
  };

  return (
    <section
      className="min-w-0 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/90 shadow-lg"
      aria-label={t.sign.addDate}
    >
      <div className="flex items-center justify-between gap-2 border-b border-slate-800/60 px-3 py-2">
        <h2 className="text-sm font-semibold text-white">{t.sign.addDate}</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-white/5 hover:text-white"
          aria-label={t.ecosystem.close}
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <div className="max-h-[min(50dvh,20rem)] overflow-y-auto overscroll-contain px-3 py-2">
        <DateSourcePanel
          key={panelKey}
          size={size}
          onSizeChange={setSize}
          onAssetChange={setAssetUrl}
          onMetaChange={(meta) => {
            metaRef.current = meta;
          }}
        />
      </div>
      <div className="border-t border-slate-800/60 p-3">
        <button
          type="button"
          className="btn-primary w-full"
          disabled={!assetUrl}
          onClick={handleInsert}
        >
          {t.sign.insertIntoDocument}
        </button>
      </div>
    </section>
  );
}