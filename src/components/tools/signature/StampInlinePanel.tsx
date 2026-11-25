"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { StampSourcePanel } from "@/components/tools/signature/StampSourcePanel";
import { useI18n } from "@/i18n/context";
import type { DocumentStampMeta } from "@/lib/stamps/types";

export type StampInsertPayload = {
  dataUrl: string;
  relativeWidth: number;
  meta: DocumentStampMeta;
};

type StampInlinePanelProps = {
  open: boolean;
  onClose: () => void;
  onInsert: (payload: StampInsertPayload) => void;
};

export function StampInlinePanel({ open, onClose, onInsert }: StampInlinePanelProps) {
  const { t } = useI18n();
  const [size, setSize] = useState(0.32);
  const [assetUrl, setAssetUrl] = useState<string | null>(null);
  const metaRef = useRef<DocumentStampMeta | null>(null);
  const [panelKey, setPanelKey] = useState(0);

  useEffect(() => {
    if (!open) return;
    setSize(0.32);
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
      aria-label={t.sign.addStamp}
    >
      <div className="flex items-center justify-between gap-2 border-b border-slate-800/60 px-3 py-2">
        <h2 className="text-sm font-semibold text-white">{t.sign.addStamp}</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-white/5 hover:text-white"
          aria-label={t.ecosystem.close}
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <div className="max-h-[min(46dvh,18.5rem)] overflow-y-auto overscroll-contain px-3 py-2">
        <StampSourcePanel
          key={panelKey}
          compact
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